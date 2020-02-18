const path = require('path');
const URL = require('url');
const fetch = require('node-fetch');
const { createFilePath } = require(`gatsby-source-filesystem`);
const jsyaml = require('js-yaml');
const { readFileSync } = require('fs');
const { current, versions } = require('./constants');
const versionHelper = require('./src/lib/versionHelper');

const githubKey = "daf5c9e45fca478c35168eeb15c0c45b73b083bc";

const parseLinkHeader = header => {
  if (header.length === 0) {
    throw new Error('input must not be of zero length');
  }

  // Split parts by comma and parse each part into a named link
  return header.split(/(?!\B"[^"]*),(?![^"]*"\B)/).reduce((links, part) => {
    const section = part.split(/(?!\B"[^"]*);(?![^"]*"\B)/);
    if (section.length < 2) {
      throw new Error("section could not be split on ';'");
    }
    const url = section[0].replace(/<(.*)>/, '$1').trim();
    const name = section[1].replace(/rel="(.*)"/, '$1').trim();

    links[name] = url;

    return links;
  }, {});
};

const navs = {};
versions.push(current);
versions.forEach(version => {
  const prefixedVersion = `${versionHelper.getPrefixedVersion(version)}/`;
  navs[prefixedVersion] = jsyaml.safeLoad(readFileSync(`./src/pages/docs/${prefixedVersion}nav.yml`, 'utf8'));
});
const delay = time => new Promise(res => setTimeout(() => res(), time));

const fetchFromGithubApi = async url => {
  const response = await fetch(url, {
    headers: {
      authorization: `token ${githubKey}`
    }
  });

  // if rate limit excedeed : wait for reset time
  if (response.headers.get('x-ratelimit-remaining') === '0') {
    const rateLimitResetTime = response.headers.get('x-ratelimit-reset') * 1000;
    const timeToWait = rateLimitResetTime - new Date().getTime();
    if (timeToWait > process.env.GATSBY_BUILD_TIMEOUT) {
      throw new Error('rate limit reset time to long');
    }
    await delay(timeToWait);
    return fetchFromGithubApi(url);
  }

  return response;
};

const sortByContributions = (a, b) => {
  if (a.contributions < b.contributions) return 1;
  if (a.contributions > b.contributions) return -1;
  return 0;
};

const getRepositoryList = async organizationName => {
  const repos = await fetchFromGithubApi(`https://api.github.com/orgs/${organizationName}/repos`);
  const data = await repos.json();
  return data;
};

const getListOfContributorsFromRepository = async repository => {
  let pageToFetch = `${repository.url}/contributors?page=1&per_page=100`;
  let contributors = [];
  while (pageToFetch) {
    const response = await fetchFromGithubApi(pageToFetch);
    const data = await response.json();
    contributors = [...contributors, ...data];
    pageToFetch = response.headers.get('Link') && parseLinkHeader(response.headers.get('Link')).next;
  }
  //const contributors = await getContributorsPage(repository, page);
  return contributors.filter(c => c.type !== 'Bot');
};

const createContributor = (repository, contributor) => {
  return {
    id: contributor.id,
    url: contributor.url,
    login: contributor.login,
    avatar: contributor.avatar_url,
    profile_url: contributor.html_url,
    projects: [{ name: repository.name, link: repository.url, contributions: contributor.contributions }],
    contributions: contributor.contributions,
  };
};

const getAllContributorsFromOrganization = async organizationName => {
  const repos = await getRepositoryList(organizationName);
  const allContributors = [];
  await Promise.all(
    repos.map(async repo => {
      const contributors = await getListOfContributorsFromRepository(repo);
      for (let contributor of contributors) {
        const personFromList = allContributors.find(c => c.login === contributor.login);
        if (personFromList) {
          personFromList.contributions += contributor.contributions;
          personFromList.projects.push({
            name: repo.name,
            link: repo.url,
            contributions: contributor.contributions,
          });
          personFromList.projects.sort(sortByContributions);
          // personFromList.projects.sort(sortByContributions);
        } else allContributors.push(createContributor(repo, contributor));
      }
    })
  );
  return allContributors.sort(sortByContributions).map((contributor, i) => ({ ...contributor, position: i + 1 }));
};

const NODE_TYPE = `Contributor`;

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
  const { createNode } = actions;
  const contributors = await getAllContributorsFromOrganization('api-platform');
  const fullContributors = await Promise.all(
    contributors.map(async contributor => {
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
      };
    })
  );
  fullContributors.forEach(item => {
    const nodeMetadata = {
      id: createNodeId(`contributor-${item.id}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(item),
        contentDigest: createContentDigest(item),
      },
    };

    const node = Object.assign({}, item, nodeMetadata);
    createNode(node);
  });
  return;
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const docPageTemplate = path.resolve('src/templates/doc.js');

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
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

    if (result.errors) {
      throw result.errors;
    }

    const pages = result.data.allMarkdownRemark.edges;

    pages.forEach(edge => {
      const redirect = edge.node.fields.redirect;
      const slug = edge.node.fields.slug.replace(`${current}/`, '');
      const slugArray = edge.node.fields.slug.split('/');
      const prefixedVersion = slugArray[2];
      const prefixedVersionSlug = `${prefixedVersion}/`.replace(`${current}/`, '');
      const originalVersion = versionHelper.getOriginalVersion(slugArray[2]);
      const section = slugArray[3];
      const article = slugArray[4] ? slugArray[4] : 'index';

      let previous = {};
      let next = {};

      const nav = navs[`${prefixedVersion}/`];
      nav.chapters
        .filter(chapter => chapter.path === section)
        .forEach(chapter => {
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
      redirects.forEach(redirectPath =>
        createRedirect({
          fromPath: redirectPath,
          toPath: slug,
          isPermanent: true,
          redirectInBrowser: true,
        })
      );
    });

      const contributors = await graphql(`
        {
          allContributor {
            nodes {
              login
              name
              company
              bio
              projects {
                contributions
                link
                name
              }
              avatar
              contributions
            }
          }
        }
      `);
      contributors.data.allContributor.nodes.forEach((node) => {
        createPage({
          path: `/community/contributors/${node.login}`,
          component: path.resolve(`./src/templates/contributor.js`),
          context: {
            ...node
          }
        });
      });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    let nodePath = fileNode.relativePath.replace('.md', '');
    let html = node.internal.content;
    const localUrls = [];
    let matches;
    const regex = /(\]\((?!http)(?!#)(.*?)\))/gi;

    while ((matches = regex.exec(html))) {
      localUrls.push(matches[2]);
    }

    localUrls.map(url => {
      let newUrl = url.replace(/(\/index)?\.md/, '/');
      newUrl = `/${URL.resolve(nodePath, newUrl)}`;
      newUrl = newUrl.replace(`/${current}/`, '/');
      html = html.replace(url, newUrl);
      return true;
    });

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
  }
};
