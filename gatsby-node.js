const Path = require('path');
const URL = require('url');
const jsyaml = require('js-yaml');
const { readFileSync } = require('fs');
const slugs = require("github-slugger")();

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage, createRedirect } = boundActionCreators;
  const docTemplate = Path.resolve('src/templates/doc.js');
  const navQuery = graphql(`
    {
      allDocsYaml {
        edges {
          node {
            chapters {
              title
              path
              items {
                id
                title
              }
            }
          }
        }
      }
    }
  `);

  const docQuery = graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [fields___path] }, limit: 1000) {
        edges {
          node {
            html
            tableOfContents
            headings {
              depth
              value
            }
            fields {
              path
              redirect
            }
            excerpt(pruneLength: 250)
            html
            id
          }
        }
      }
    }
  `);

  function getNav(nav, currentPath, navItem) {
    if (!navItem.anchors) {
      return nav;
    }

    return [...nav, ...navItem.anchors.map((navSubItem) => {
      const subItemCurrentPath = `${currentPath}/${navSubItem.id}`;

      return {
        path: subItemCurrentPath,
        title: navSubItem.title,
        rootPath: navItem.title,
        items: getNav([], subItemCurrentPath, navSubItem)
      };
    })];
  }

  return Promise.all([navQuery, docQuery]).then((values) => {
    const nav = values[0].data.allDocsYaml.edges;
    const docs = values[1].data.allMarkdownRemark.edges;
    let parseNav = [];

    function parseNavItem(nav) {
      nav.forEach((navItem) => {
        const { path, title, items } = navItem.node;
        parseNav = [...parseNav, ...items.map((subItem) => ({
          path: `docs/${path}/${subItem.id}`,
          title: subItem.title,
          rootPath: title,
          items: getNav([], path, subItem)
        }))]
      },
    )};

    parseNavItem(nav.filter((navItem) => navItem.node.items));

    docs.forEach((edge) => {
      const path = edge.node.fields.path;
      const redirect = edge.node.fields.redirect;
      const index = parseNav.findIndex((element) => element.path === path || element.path === redirect);
      let current,
        prev,
        next,
        rootPath;

      const headings = edge.node.headings;
      const html = edge.node.html;

      const regex = RegExp(/<a href="#((?:[\w-]+(?:-[\w-]+)*)+)" aria-hidden="true" class="anchor">/, 'gm');
      let tmpResult;
      let result = [];

      while ((tmpResult = regex.exec(html)) !== null) {
        result.push(tmpResult[1]);
      }

      headings.forEach((currentVal, index) => {
        if (currentVal.depth !== 1 ) {
          return;
        }
        if (index > 0 ) {
          console.warn('\x1b[31m', `\nMultiple title in single file are not allowed, please change heading node of following title: '${currentVal.value}' in ${path}.md\n`, '\x1b[37m');
          process.exit(1);
        }
      });

      if (headings.length !== result.length) {
        console.warn('\x1b[31m', `There is an unexpected diff between number of headers and number of header anchors in ${path}.md, report to gastby-node.js file to figure out why.\n`, '\x1b[37m');
        process.exit(1);
        return;
      }

      if (-1 !== index) {
        current = parseNav[index];
        rootPath = current.rootPath;

        prev = 0 < index && parseNav[index - 1];
        next = index < parseNav.length - 1 && parseNav[index + 1];

        if (prev && prev.rootPath !== rootPath) {
          prev = { path: prev.path, title: `${prev.rootPath} - ${prev.title}` };
        }
        if (next && next.rootPath !== rootPath) {
          next = { path: next.path, title: `${next.rootPath} - ${next.title}` };
        }

        current = {
          path: current.path,
          title: `${current.rootPath} - ${current.title}`
        };
      }

      slugs.reset();
      const nav = jsyaml.safeLoad(readFileSync(`${__dirname}/src/pages/docs/nav.yml`, 'utf8'));

      function processHomonymAnchors(item) {
        item.anchors.forEach((anchor) => {
          anchor.id = slugs.slug(anchor.id);
          if (!anchor.anchors) {
            return;
          }
          processHomonymAnchors(anchor);
        })
      }

      Object.keys(nav.chapters).forEach(navKey => {
          nav.chapters[navKey].items.filter(item => item.anchors).forEach((item) => {
            processHomonymAnchors(item);
          })
      });

      createPage({
        path,
        component: docTemplate,
        context: {
          path,
          current,
          prev,
          next,
          html,
          nav: nav.chapters
        }
      });

      if (redirect) {
        const redirects = [`/${redirect}`, `/${redirect}/`, `/${path}/`];
        redirects.forEach(redirPath =>
          createRedirect({
            fromPath: redirPath,
            toPath: `/${path}`,
            isPermanent: true,
            redirectInBrowser: true
          })
        );
      }
    });
  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  if ('MarkdownRemark' !== node.internal.type) {
    return;
  }
  const fileNode = getNode(node.parent);
  let nodePath = fileNode.relativePath.replace('.md', '');
  let html = node.internal.content;
  let localUrls = [];
  let matches;
  const regex = /(\]\((?!http)(?!#)(.*?)\))/gi;

  while (matches = regex.exec(html)) {
    localUrls.push(matches[2]);
  }

  localUrls.map((url) => {
    let newUrl = url.replace('.md', '');
    newUrl = `/${URL.resolve(nodePath, newUrl)}`;
    html = html.replace(url, newUrl);
    return true;
  });

  node.internal.content = html;
  if ('index' === Path.basename(nodePath)) {
    createNodeField({
      node,
      name: 'redirect',
      value: nodePath
    });
    nodePath = `${Path.dirname(nodePath)}`;
  }

  createNodeField({
    node,
    name: 'path',
    value: nodePath
  });
};

exports.modifyWebpackConfig = ({ config }) => {
  config.merge({
    resolve: {
      root: Path.resolve(__dirname, './src'),
      alias: {
        styles: 'styles',
        images: 'images',
        data: 'data',
        components: 'components'
      }
    }
  });
  return config;
};
