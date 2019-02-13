const path = require('path');
const URL = require('url');
const { createFilePath } = require(`gatsby-source-filesystem`);
const jsyaml = require('js-yaml');
const { readFileSync } = require('fs');

const nav = jsyaml.safeLoad(readFileSync('./src/pages/docs/nav.yml', 'utf8'));

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const docPageTemplate = path.resolve('src/templates/doc.js');

  return graphql(`
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
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const pages = result.data.allMarkdownRemark.edges;

    pages.forEach(edge => {
      const slug = edge.node.fields.slug;

      let previous = {};
      let next = {};

      const slugArray = slug.split('/');

      nav.chapters.forEach(chapter => {
        if (slugArray[2] === chapter.path) {
          chapter.items.forEach((item, index) => {
            if (index === 0) {
              next.slug = `/docs/${slugArray[2]}/${chapter.items[index + 1].id}/`;
              next.title = chapter.items[index + 1].title;
            } else if (slugArray[3] === item.id) {
              previous.slug =
                chapter.items[index - 1].id === 'index'
                  ? `/docs/${slugArray[2]}/`
                  : `/docs/${slugArray[2]}/${chapter.items[index - 1].id}/`;
              previous.title = chapter.items[index - 1].title;
              if (chapter.items.length - 1 !== index) {
                next.slug = `/docs/${slugArray[2]}/${chapter.items[index + 1].id}/`;
                next.title = chapter.items[index + 1].title;
              } else {
                next.slug = null;
              }
            }
          });
        }
      });

      const editSubPaths = slug.slice(6).split('/');
      const editPath =
        editSubPaths.length > 2 ? `${editSubPaths.join('/').slice(0, -1)}.md` : `${editSubPaths[0]}/index.md`;

      createPage({
        path: slug,
        component: docPageTemplate,
        context: {
          html: edge.node.html,
          editPath,
          title: edge.node.headings[0].value,
          previous,
          next,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    let nodePath = fileNode.relativePath.replace('.md', '');
    let html = node.internal.content;
    let localUrls = [];
    let matches;
    const regex = /(\]\((?!http)(?!#)(.*?)\))/gi;

    while ((matches = regex.exec(html))) {
      localUrls.push(matches[2]);
    }

    localUrls.map(url => {
      let newUrl = url.replace('.md', '/');
      newUrl = `/${URL.resolve(nodePath, newUrl)}`;
      html = html.replace(url, newUrl);
      return true;
    });

    node.internal.content = html;
    if ('index' === path.basename(nodePath)) {
      createNodeField({
        node,
        name: 'redirect',
        value: nodePath,
      });
      nodePath = `${path.dirname(nodePath)}`;
    }

    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
