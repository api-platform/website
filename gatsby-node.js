const path = require('path');
const URL = require('url');
const { createFilePath } = require(`gatsby-source-filesystem`);
const jsyaml = require('js-yaml');
const { readFileSync } = require('fs');
const { current } = require('./constants');

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
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
              redirect
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
    let seoRedirect = [];

    pages.forEach(edge => {
      let slug = edge.node.fields.slug;
      const redirect = edge.node.fields.redirect;

      let previous = {};
      let next = {};

      const slugArray = slug.split('/');
      let version = `${slug.split('/')[2]}/`;
      const nav = jsyaml.safeLoad(readFileSync(`./src/pages/docs/${version}nav.yml`, 'utf8'));

      slug = slug.replace(`${current}/`, '');
      version = version.replace(`${current}/`, '');

      nav.chapters.filter(chapter => slugArray[2] === chapter.path).forEach(chapter => {
          if (index === 0) {
            next.slug = `/docs/${version}${slugArray[2]}/${chapter.items[index + 1].id}/`;
            next.title = chapter.items[index + 1].title;
          }

          if (slugArray[3] === item.id) {
            previous.slug =
              chapter.items[index - 1].id === 'index'
                ? `/docs/${version}${slugArray[2]}/`
                : `/docs/${version}${slugArray[2]}/${chapter.items[index - 1].id}/`;
            previous.title = chapter.items[index - 1].title;

            next.slug = null;

            if (chapter.items.length - 1 !== index) {
              next.slug = `/docs/${version}${slugArray[2]}/${chapter.items[index + 1].id}/`;
              next.title = chapter.items[index + 1].title;
            }
          }
      });

      const editSubPaths = slug.slice(6).split('/');
      const editPath =
        editSubPaths.length > 3
          ? `${editSubPaths.join('/').slice(0, -1)}.md`
          : `${editSubPaths[0]}/${editSubPaths[1]}/index.md`;

      createPage({
        path: slug,
        component: docPageTemplate,
        context: {
          html: edge.node.html,
          editPath,
          title: edge.node.headings[0].value,
          previous,
          next,
          version,
          nav,
        },
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
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    let nodePath = fileNode.relativePath.replace('.md', '');
    let html = node.internal.content;
    let matches;
    const regex = /(\]\((?!http)(?!#)(.*?)\))/gi;

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
