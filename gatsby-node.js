/* eslint-disable no-console */

const path = require('path');
const URL = require('url');
const fetch = require('node-fetch');

const { createFilePath } = require(`gatsby-source-filesystem`);
const jsyaml = require('js-yaml');
const { readFileSync } = require('fs');
const fs = require('fs');
const { current, versions } = require('./constants');
const versionHelper = require('./src/lib/versionHelper');
const staticEventsData = require('./src/data/events.json');
const repositories = require('./src/data/repositories.json');

const { handleCon } = require(`./src/utils/gatsby-node-con`);

if (fs.existsSync('.env.local')) {
  // eslint-disable-next-line global-require
  require('dotenv').config({
    path: '.env.local',
  });
}

const parseLinkHeader = (header) => {
  if (0 === header.length) {
    throw new Error('input must not be of zero length');
  }

  // Split parts by comma and parse each part into a named link
  return header.split(/(?!\B"[^"]*),(?![^"]*"\B)/).reduce((links, part) => {
    const section = part.split(/(?!\B"[^"]*);(?![^"]*"\B)/);
    if (2 > section.length) {
      throw new Error("section could not be split on ';'");
    }
    const url = section[0].replace(/<(.*)>/, '$1').trim();
    const name = section[1].replace(/rel="(.*)"/, '$1').trim();

    // eslint-disable-next-line no-param-reassign
    links[name] = url;

    return links;
  }, {});
};

const navs = {};
versions.push(current);
versions.forEach((version) => {
  const prefixedVersion = `${versionHelper.getPrefixedVersion(version)}/`;
  navs[prefixedVersion] = jsyaml.safeLoad(readFileSync(`./src/pages/docs/${prefixedVersion}nav.yml`, 'utf8'));
});
const delay = (time) => new Promise((res) => setTimeout(() => res(), time));

// GITHUB
const fetchFromGithubApi = async (url) => {
  const response = await fetch(url, {
    headers: {
      authorization: `token ${process.env.GITHUB_KEY}`,
    },
  });

  if (401 === response.status) throw new Error('UNAUTHORIZED: check your github token');

  // if rate limit excedeed : wait for reset time
  if ('0' === response.headers.get('x-ratelimit-remaining')) {
    const rateLimitResetTime = response.headers.get('x-ratelimit-reset') * 1000;
    const timeToWait = rateLimitResetTime - new Date().getTime();
    if (timeToWait > process.env.GATSBY_BUILD_TIMEOUT) {
      throw new Error('rate limit reset time too long');
    }
    await delay(timeToWait);
    return fetchFromGithubApi(url);
  }

  return response;
};

const sortByContributions = (a, b) => {
  if (a.contributions < b.contributions) return 1;
  if (a.contributions > b.contributions) return -1;
  if (a.lines && a.lines < b.lines) return 1;
  if (a.lines && a.lines > b.lines) return -1;
  return 0;
};

const REPOSITORIES_TO_IGNORE = ['symfonycon-berlin-workshop-eod'];

const getRepositoryList = async (organizationName) => {
  const repos = await fetchFromGithubApi(`https://api.github.com/orgs/${organizationName}/repos`);
  const data = await repos.json();

  return data.filter((repo) => !REPOSITORIES_TO_IGNORE.includes(repo.name));
};

const getStaticRepositoryList = async () => {
  const repos = await Promise.all(
    repositories.map((repoName) => fetchFromGithubApi(`https://api.github.com/repos/${repoName}`))
  );
  const data = await Promise.all(repos.map((repo) => repo.json()));

  return data;
};

const getRepoContributorsStats = async (repository) => {
  const response = await fetchFromGithubApi(`${repository.url}/stats/contributors`);
  let stats = await response.json();
  if (!Array.isArray(stats)) stats = [];
  return stats.map((stat) => ({
    id: stat.author.id,
    additions: stat.weeks.reduce((acc, week) => acc + week.a, 0),
    deletions: stat.weeks.reduce((acc, week) => acc + week.d, 0),
    contributions: stat.total,
  }));
};

const getListOfContributorsFromRepository = async (repository) => {
  let pageToFetch = `${repository.url}/contributors?page=1&per_page=100`;
  let contributors = [];
  while (pageToFetch) {
    // eslint-disable-next-line no-await-in-loop
    const response = await fetchFromGithubApi(pageToFetch);
    // eslint-disable-next-line no-await-in-loop
    const newContributors = await response.json();
    contributors = [...contributors, ...newContributors];
    pageToFetch = response.headers.get('Link') && parseLinkHeader(response.headers.get('Link')).next;
  }
  return contributors.filter((c) => 'Bot' !== c.type);
};

const createContributor = (repository, contributor, stat) => {
  return {
    id: contributor.id,
    url: contributor.url,
    login: contributor.login,
    avatar: contributor.avatar_url,
    profile_url: contributor.html_url,
    projects: [
      {
        name: repository.name,
        fullName: repository.full_name,
        link: repository.html_url,
        contributions: contributor.contributions,
        additions: stat ? stat.additions : 0,
        deletions: stat ? stat.deletions : 0,
      },
    ],
    contributions: contributor.contributions,
    lines: stat ? stat.additions + stat.deletions : 0,
  };
};

const getAllContributorsFromOrganization = async (organizationName) => {
  try {
    const repos = await getRepositoryList(organizationName);
    const staticRepos = await getStaticRepositoryList();
    const allRepos = [...repos, ...staticRepos];
    const allContributors = [];
    await Promise.all(
      allRepos.map(async (repo) => {
        const contributors = await getListOfContributorsFromRepository(repo);
        const stats = await getRepoContributorsStats(repo);
        contributors.forEach((contributor) => {
          const contributorStat = stats.find((stat) => stat.id === contributor.id);
          const personFromList = allContributors.find((c) => c.login === contributor.login);
          if (personFromList) {
            personFromList.contributions += contributor.contributions;
            if (contributorStat) {
              personFromList.lines += contributorStat.additions + contributorStat.deletions;
            }
            personFromList.projects.push({
              name: repo.name,
              fullName: repo.full_name,
              link: repo.html_url,
              contributions: contributor.contributions,
              additions: contributorStat ? contributorStat.additions : 0,
              deletions: contributorStat ? contributorStat.deletions : 0,
            });
            personFromList.projects.sort(sortByContributions);
          } else {
            allContributors.push(createContributor(repo, contributor, contributorStat));
          }
        });
      })
    );
    return allContributors.sort(sortByContributions).map((contributor, i) => ({ ...contributor, position: i + 1 }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// EVENTS
const fetchFromMeetupApi = async (url) => {
  const response = await fetch(url);

  // if rate limit excedeed : wait for reset time
  if ('0' === response.headers.get('x-ratelimit-remaining')) {
    const rateLimitResetTime = response.headers.get('x-ratelimit-reset') * 1000;
    const timeToWait = rateLimitResetTime - new Date().getTime();
    if (timeToWait > process.env.GATSBY_BUILD_TIMEOUT) {
      throw new Error('rate limit reset time too long');
    }
    await delay(timeToWait);
    return fetchFromMeetupApi(url);
  }

  return response;
};

const getAllMeetupEvents = async () => {
  const events = await fetchFromMeetupApi(
    'https://api.meetup.com/api-platform/events?desc=true&status=past,upcoming&fields=featured_photo'
  );
  const data = await events.json();
  data.push({
    name: 'dummy',
    local_date: '2020-03-05',
    local_time: '19:00',
    venue: {
      name: 'dummy',
      city: 'dummy',
    },
    featured_photo: {
      photo_link: 'dummy',
    },
    description: 'dummy',
    link: 'dummy',
    status: 'dummy',
  });
  const staticEvents = await Promise.all(
    staticEventsData.map(async (event) =>
      fetchFromMeetupApi(`https://api.meetup.com/${event.group}/events/${event.id}?desc=true&fields=featured_photo`)
    )
  );
  const staticEventsdata = await Promise.all(staticEvents.map((event) => event.json()));
  return [...data, ...staticEventsdata];
};

const CONTRIBUTOR_NODE_TYPE = `Contributor`;
const EVENT_NODE_TYPE = `Event`;

const getOrganizationTeamMembers = async (organizationName, teamName) => {
  const members = await fetchFromGithubApi(`https://api.github.com/orgs/${organizationName}/teams/${teamName}/members`);
  const data = await members.json();

  return data.map((member) => member.login);
};

const getOrganizationTeams = async (organizationName) => {
  try {
    const teams = await fetchFromGithubApi(`https://api.github.com/orgs/${organizationName}/teams`);
    const data = await teams.json();

    const fullTeams = await Promise.all(
      data.map(async (team) => ({
        ...team,
        members: await getOrganizationTeamMembers(organizationName, team.slug),
      }))
    );

    return fullTeams;
  } catch (error) {
    console.error(
      `UNAUTHORIZED: You have restricted rights to ${organizationName} teams. You can't retrieve core teams members`
    );
    return [];
  }
};

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
  const { createNode } = actions;
  const teams = await getOrganizationTeams('api-platform');
  const contributors = await getAllContributorsFromOrganization('api-platform');
  const fullContributors = await Promise.all(
    contributors.map(async (contributor) => {
      const userResponse = await fetchFromGithubApi(contributor.url);
      await delay(1000);
      const user = await userResponse.json();
      return {
        ...contributor,
        name: user.name,
        blog: user.blog,
        location: user.location,
        bio: user.bio,
        company: user.company,
        teams: [
          'dummy-team',
          ...teams.filter((team) => team.members.includes(contributor.login)).map((team) => team.slug),
        ],
      };
    })
  );
  if (0 === fullContributors.length) {
    // create dummy contributor to avoid graphql build error
    fullContributors.push({
      login: 'dummy-api-platform',
      name: 'dummy',
      company: 'dummy',
      location: 'dummy',
      blog: 'dummy',
      bio: 'dummy',
      projects: {
        contributions: 0,
        link: 'dummy',
        name: 'dummy',
        fullName: 'dummy',
        additions: 0,
        deletions: 0,
      },
      avatar: 'dummy',
      contributions: 0,
      position: 0,
      lines: 0,
      profile_url: 'dummy',
      teams: ['dummy-team'],
    });
  }
  fullContributors.forEach((item) => {
    const nodeMetadata = {
      id: createNodeId(`contributor-${item.id}`),
      parent: null,
      children: [],
      internal: {
        type: CONTRIBUTOR_NODE_TYPE,
        content: JSON.stringify(item),
        contentDigest: createContentDigest(item),
      },
    };

    const node = { ...item, ...nodeMetadata };
    createNode(node);
  });
  const events = await getAllMeetupEvents();
  events.forEach((item) => {
    const nodeMetadata = {
      id: createNodeId(`event-${item.id}`),
      parent: null,
      children: [],
      internal: {
        type: EVENT_NODE_TYPE,
        content: JSON.stringify(item),
        contentDigest: createContentDigest(item),
      },
    };

    const node = { ...item, ...nodeMetadata };
    createNode(node);
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  // Redirect 301 old page
  createRedirect({ fromPath: '/news/', toPath: '/resources/news/', isPermanent: true, redirectInBrowser: true });
  createRedirect({ fromPath: '/support/', toPath: '/community/', isPermanent: true, redirectInBrowser: true });
  createRedirect({
    fromPath: '/docs/core/swagger/',
    toPath: '/docs/core/openapi/',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/docs/client-generator/',
    toPath: '/docs/create-client/',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/docs/core/data-providers/',
    toPath: '/docs/main/core/state-providers/',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/docs/core/data-persisters/',
    toPath: '/docs/main/core/state-processors/',
    isPermanent: true,
    redirectInBrowser: true,
  });

  // Documentation pages
  const docPageTemplate = path.resolve('src/templates/doc.js');
  const docResult = await graphql(`
    {
      allMarkdownRemark(limit: 1000, filter: { frontmatter: { type: { eq: null } } }) {
        edges {
          node {
            fileAbsolutePath
            html
            headings {
              value
            }
            fields {
              slug
              redirect
            }
          }
        }
      }
    }
  `);

  if (docResult.errors) {
    throw docResult.errors;
  }

  const docPages = docResult.data.allMarkdownRemark.edges;

  docPages.forEach((edge) => {
    const { redirect } = edge.node.fields;
    const slug = edge.node.fields.slug.replace(`${current}/`, '');
    const slugArray = edge.node.fields.slug.split('/');
    const prefixedVersion = slugArray[2];
    const prefixedVersionSlug = `${prefixedVersion}/`.replace(`${current}/`, '');
    const originalVersion = versionHelper.getOriginalVersion(slugArray[2]);
    const section = slugArray[3];
    const article = slugArray[4] ? slugArray[4] : 'index';

    const previous = {};
    const next = {};

    if ('.github' === section || !edge.node.headings.length) return; // ignore .github folder and untitled files

    const nav = navs[`${prefixedVersion}/`];
    nav.chapters
      .filter((chapter) => chapter.path === section)
      .forEach((chapter) => {
        chapter.items.forEach((item, indexItem) => {
          if (item.id !== article) {
            return;
          }

          if (chapter.items.length - 1 !== indexItem) {
            next.slug = versionHelper.generateSlugNextChapter(
              prefixedVersionSlug,
              section,
              chapter.items[indexItem + 1].id
            );
            next.title = chapter.items[indexItem + 1].title;
          }

          if (0 !== indexItem) {
            previous.slug = versionHelper.generateSlugPreviousChapter(
              prefixedVersionSlug,
              section,
              chapter.items[indexItem - 1].id
            );
            previous.title = chapter.items[indexItem - 1].title;
          }
        });
      });
    createPage({
      component: docPageTemplate,
      context: {
        html: edge.node.html,
        nav,
        next,
        prefixedVersion,
        previous,
        title: edge.node.headings[0].value,
        urlEditDocumentation: versionHelper.generateSlugEditDocumentation(originalVersion, section, article),
        version: prefixedVersionSlug,
      },
      path: slug,
    });

    const redirects = [slug.slice(0, -1)];
    if (redirect) {
      redirects.push(redirect, `${redirect}/`);
    }
    redirects.forEach((redirectPath) =>
      createRedirect({
        fromPath: redirectPath,
        toPath: slug,
        isPermanent: true,
        redirectInBrowser: true,
      })
    );
  });

  const conYears = [2021, 2022];

  await Promise.all(
    conYears.map(async (year) => {
      await handleCon(graphql, actions, year);
    })
  );

  createRedirect({ fromPath: '/con/', toPath: '/con/2022/', isPermanent: false, redirectInBrowser: true });
  createRedirect({ fromPath: '/con', toPath: '/con/2022/', isPermanent: false, redirectInBrowser: true });
  createRedirect({
    fromPath: '/con/2022/conferences/opening-keynote-day-1/',
    toPath: '/con/2022/conferences/opening-keynote-introduction-to-API-platform-3/',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/con/2022/conferences/opening-keynote-day-2/',
    toPath: '/con/2022/conferences/opening-keynote-a-deeper-look-into-API-platform-3/',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/con/2022/conferences/nicolas-grekas-talk/',
    toPath: '/con/2022/conferences/how-do-we-decide-to-create-a-symfony-component/',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/con/2022/conferences/how-do-you-decide-to-create-a-symfony-component/',
    toPath: '/con/2022/conferences/how-do-we-decide-to-create-a-symfony-component/',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/con/2022/conferences/apis-the-next-10-years-beyond-the-interface/',
    toPath: '/con/2022/',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: 'con/2022/speakers/mehdi-medjaoui/',
    toPath: '/con/2022/',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/con/2022/conferences/round-table/',
    toPath: '/con/2022/conferences/comment-remettre-la-tech-au-service-du-bien-commun/',
    isPermanent: true,
    redirectInBrowser: true,
  });

  // Contributors page
  const contributors = await graphql(`
    {
      allContributor {
        nodes {
          login
          name
          company
          location
          blog
          bio
          projects {
            contributions
            link
            name
            fullName
            additions
            deletions
          }
          avatar
          contributions
          position
          lines
          teams
        }
      }
    }
  `);
  contributors.data.allContributor.nodes.forEach((node) => {
    if ('dummy-api-platform' !== node.login)
      createPage({
        path: `/community/contributors/${node.login}`,
        component: path.resolve(`./src/templates/contributor.js`),
        context: {
          ...node,
        },
      });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (`MarkdownRemark` === node.internal.type) {
    const fileNode = getNode(node.parent);
    const nodePath = fileNode.relativePath.replace('.md', '');
    const collection = fileNode.sourceInstanceName;
    let html = node.internal.content;
    const localUrls = [];
    let matches;
    const regex = /(\]\((?!http)(?!#)(.*?)\))/gi;

    // eslint-disable-next-line no-cond-assign
    while ((matches = regex.exec(html))) {
      localUrls.push(matches[2]);
    }

    localUrls.map((url) => {
      let newUrl = `/${URL.resolve(nodePath, url)}`;
      newUrl = newUrl.replace(/(\/index)?\.md/, '/');
      newUrl = newUrl.replace(`/${current}/`, '/');
      html = html.replace(url, newUrl);
      return true;
    });

    // eslint-disable-next-line no-param-reassign
    node.internal.content = html;

    const slug = createFilePath({ node, getNode, basePath: `pages` });

    if ('index' === path.basename(nodePath)) {
      createNodeField({
        node,
        name: 'redirect',
        value: `/${nodePath}`,
      });
    }

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });

    createNodeField({
      node,
      name: `collection`,
      value: collection,
    });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@con': path.resolve(__dirname, 'src/con'),
      },
    },
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      type: String
    }
  `;
  createTypes(typeDefs);
};
