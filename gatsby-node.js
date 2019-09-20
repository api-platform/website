const path = require('path');
const URL = require('url');
const { createFilePath } = require(`gatsby-source-filesystem`);
const jsyaml = require('js-yaml');
const { readFileSync } = require('fs');
const { current, versions } = require('./constants');
const versionHelper = require('./src/lib/versionHelper');

const navs = {};
versions.push(current);
versions.forEach(version => {
  const prefixedVersion = `${versionHelper.getPrefixedVersion(version)}/`;
  navs[prefixedVersion] = jsyaml.safeLoad(readFileSync(`./src/pages/docs/${prefixedVersion}nav.yml`, 'utf8'));
});

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
          chapter.items
            .forEach((item, indexItem) => {
              if (item.id !== article) {
                return;
              }

              if ((chapter.items.length - 1) !== indexItem) {
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
          urlEditDocumentation: versionHelper.generateSlugEditDocumentation(
            originalVersion,
            section,
            article
          ),
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
