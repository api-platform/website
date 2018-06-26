const Path = require("path");
const URL = require("url");
const jsyaml = require("js-yaml");
const { readFileSync } = require("fs");


exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage, createRedirect } = boundActionCreators;
  const docTemplate = Path.resolve("src/templates/doc.js");
  const navQuery = graphql(`
    {
      allNavYaml {
        edges {
          node {
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
    if (navItem.anchors) {
      navItem.anchors.map((navSubItem) => {
        let subItemCurrentPath = `${currentPath}/${navSubItem.id}`;
        nav.push({
          path: subItemCurrentPath,
          title: navSubItem.title,
          rootPath: navItem.title,
          items: getNav([], subItemCurrentPath, navSubItem)
        });
      });
    }

    return nav;
  }

  return Promise.all([navQuery, docQuery]).then((values) => {
    const nav = values[0].data.allNavYaml.edges;
    const docs = values[1].data.allMarkdownRemark.edges;
    const parseNav = [];

    nav.map((navItem) => {
      const { path, title, items } = navItem.node;
      if (items) {
        items.map((subItem) => {
          let currentPath = `docs/${path}/${subItem.id}`;

          parseNav.push({
            path: currentPath,
            title: subItem.title,
            rootPath: title,
            items: getNav([], currentPath, subItem)
          });
        });
      }
    });

    docs.map((edge) => {
      const path = edge.node.fields.path;
      const redirect = edge.node.fields.redirect;
      const index = parseNav.findIndex(
        element => element.path === path || element.path === redirect);
      let current,
        prev,
        next,
        rootPath;

      let headings = edge.node.headings;
      let html = edge.node.html;

      const regex = RegExp(/<a href="#((?:[\w-]+(?:-[\w-]+)*)+)" aria-hidden="true" class="anchor">/, 'gm');
      let tmpResult;
      let result = [];
      let indexesToRemove = [];

      while ((tmpResult = regex.exec(html)) !== null) {
        result.push(tmpResult[1]);
      }

      headings.forEach(function (currentVal, index) {
        if (currentVal.depth !== 1 ) {
          return;
        }
        if (index > 0 ) {
          console.warn("\x1b[31m", `\nMultiple title in single file are not allowed, please change heading node of following title: '${currentVal.value}' in ${path}.md\n`, "\x1b[37m");
        }
        indexesToRemove.push(index);
      });

      if (headings.length !== result.length) {
        console.warn("\x1b[31m", `There is an unexpected diff between number of headers and number of header anchors in ${path}.md, report to gastby-node.js file to figure out why.\n`, "\x1b[37m")
        return;
      }

      indexesToRemove.forEach(function (currentVal, index) {
        result.splice(currentVal - index, 1);
        headings.splice(currentVal - index, 1);
      });

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

      const nav = jsyaml.safeLoad(
        readFileSync(`${__dirname}/src/pages/docs/nav.yml`, "utf8"));

      createPage({
        path,
        component: docTemplate,
        context: {
          path,
          current,
          prev,
          next,
          html,
          nav
        }
      });

      if (redirect) {
        const redirects = [`/${redirect}`, `/${redirect}/`, `/${path}/`];
        redirects.map(redirPath =>
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
  if ("MarkdownRemark" !== node.internal.type) {
    return;
  }
  const fileNode = getNode(node.parent);
  let nodePath = fileNode.relativePath.replace(".md", "");
  let html = node.internal.content;
  let localUrls = [];
  let matches;
  const re = /(\]\((?!http)(?!#)(.*?)\))/gi;

  while ((matches = re.exec(html))) {
    localUrls.push(matches[2]);
  }

  localUrls.map((url) => {
    let newUrl = url.replace(".md", "");
    newUrl = `/${URL.resolve(nodePath, newUrl)}`;
    html = html.replace(url, newUrl);
    return true;
  });

  node.internal.content = html;
  if ("index" === Path.basename(nodePath)) {
    createNodeField({
      node,
      name: "redirect",
      value: nodePath
    });
    nodePath = `${Path.dirname(nodePath)}`;
  }

  createNodeField({
    node,
    name: "path",
    value: nodePath
  });
};

exports.modifyWebpackConfig = ({ config }) => {
  config.merge({
    resolve: {
      root: Path.resolve(__dirname, "./src"),
      alias: {
        styles: "styles",
        images: "images",
        data: "data",
        components: "components"
      }
    }
  });
  return config;
};
