const path = require('path');
const URL = require('url');
const { createFilePath } = require(`gatsby-source-filesystem`);
const jsyaml = require('js-yaml');
const { readFileSync } = require('fs');
const { docPagesDirectory, versions } = require('constants');

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
      const slug = edge.node.fields.slug;
      const redirect = edge.node.fields.redirect;

      let previous = {};
      let next = {};

      const slugArray = slug.split('/');

      // extract the version from the slug
      let version = Array.from(slug.matchAll(/^\/docs\/([a-zA-Z0-9\.]*)\//g)).map(val => val[1])[0];
      let nav = jsyaml.safeLoad(readFileSync(`./src/pages/docs/${version}/nav.yml`, 'utf8'));

      nav.chapters.forEach(chapter => {
        if (slugArray[2] === chapter.path) {
          chapter.items.forEach((item, index) => {
            if (index === 0) {
              next.slug = `/docs/${version}/${slugArray[2]}/${chapter.items[index + 1].id}/`;
              next.title = chapter.items[index + 1].title;

              let oldLink = next.slug.replace(`/${version}/`, '/');
              let stableLink = next.slug.replace(`/${version}/`, '/stable/');
              seoRedirect.push({ stableLink: stableLink, oldLink: oldLink });

              return;
            }

            if (slugArray[3] === item.id) {
              previous.slug =
                chapter.items[index - 1].id === 'index'
                  ? `/docs/${version}/${slugArray[2]}/`
                  : `/docs/${version}/${slugArray[2]}/${chapter.items[index - 1].id}/`;
              previous.title = chapter.items[index - 1].title;

              next.slug = null;
              if (chapter.items.length - 1 !== index) {
                next.slug = `/docs/${version}/${slugArray[2]}/${chapter.items[index + 1].id}/`;
                next.title = chapter.items[index + 1].title;
              }

              let oldLink = next.slug.replace(`/${version}/`, '/');
              let stableLink = next.slug.replace(`/${version}/`, '/stable/');
              seoRedirect.push({ stableLink: stableLink, oldLink: oldLink });
            }
          });
        }
      });

      const editSubPaths = slug.slice(6).split('/');
      const editPath =
        editSubPaths.length > 3
          ? `${editSubPaths.join('/').slice(0, -1)}.md`
          : `${editSubPaths[0]}/${editSubPaths[1]}/index.md`;

      let oldLink = slug.replace(`/${version}/`, '/');
      let stableLink = slug.replace(`/${version}/`, '/stable/');
      seoRedirect.push({ stableLink: stableLink, oldLink: oldLink });

      createPage({
        path: slug,
        component: docPageTemplate,
        context: {
          html: edge.node.html,
          editPath,
          title: edge.node.headings[0].value,
          previous,
          next,
          version: version,
          nav: nav,
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

    seoRedirect.forEach(redirectTo =>
      createRedirect({
        fromPath: redirectTo.oldLink,
        toPath: redirectTo.stableLink,
        isPermanent: true,
        redirectInBrowser: true,
      })
    );
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
      let newUrl = url.replace(/(\/index)?\.md/, '/');
      newUrl = `/${URL.resolve(nodePath, newUrl)}`;
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
