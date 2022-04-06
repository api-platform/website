const path = require('path');

const handleConferences = async (graphql, actions, year) => {
  const { createPage } = actions;
  const conferenceTemplate = path.resolve(`src/con/components/${year}/templates/ConferenceTemplate.tsx`);
  const conferencesResult = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { type: { eq: "conference" } }, fields: { collection: { eq: "con${year}" } } }
      ) {
        edges {
          node {
            html
            headings(depth: h1) {
              value
            }
            fields {
              slug
              collection
            }
            frontmatter {
              type
              speakers
              track
              start
              end
              short
            }
          }
        }
      }
    }
  `);

  const conferencePages = conferencesResult.data.allMarkdownRemark.edges;
  conferencePages.forEach((edge) => {
    createPage({
      path: `/con/${year}${edge.node.fields.slug}`,
      component: conferenceTemplate,
      context: {
        html: edge.node.html,
        ...edge.node.frontmatter,
        title: 0 < edge.node.headings.length ? edge.node.headings[0].value : '',
        edition: year,
      },
    });
  });
};

const handleSpeakers = async (graphql, actions, year) => {
  const { createPage } = actions;
  const speakerTemplate = path.resolve(`src/con/components/${year}/templates/SpeakerTemplate.tsx`);

  const speakerResult = await graphql(`
    {
       allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { type: { eq: "speaker" } }, fields: { collection: { eq: "con${year}" } } }
      ) {
        edges {
          node {
            html
            headings(depth: h1) {
              value
            }
            fields {
              slug
              collection
            }
            frontmatter {
              name
              id
              job
              twitter
              github
            }
          }
        }
      }
    }
  `);

  const speakerPages = speakerResult.data.allMarkdownRemark.edges;
  speakerPages.forEach((edge) => {
    createPage({
      path: `/con/${year}${edge.node.fields.slug}`,
      component: speakerTemplate,
      context: {
        description: edge.node.html,
        ...edge.node.frontmatter,
        title: 0 < edge.node.headings.length ? edge.node.headings[0].value : '',
        edition: year,
      },
    });
  });
};

const handleLegal = async (graphql, actions, year) => {
  const { createPage } = actions;
  // conf legal pages
  const legalTemplate = path.resolve(`src/con/components/${year}/templates/LegalTemplate.tsx`);

  const legalResult = await graphql(`
    {
      allMarkdownRemark(limit: 1000, filter: { frontmatter: { type: { eq: "legal" } } }) {
        edges {
          node {
            html
            headings(depth: h1) {
              value
            }
            fields {
              slug
              collection
            }
          }
        }
      }
    }
  `);

  const legalPages = legalResult.data.allMarkdownRemark.edges;
  legalPages.forEach((edge) => {
    createPage({
      path: `/con/${year}${edge.node.fields.slug}`,
      component: legalTemplate,
      context: {
        html: edge.node.html,
        title: 0 < edge.node.headings.length ? edge.node.headings[0].value : '',
        edition: year,
      },
    });
  });
};

const handleCon = async (graphql, actions, year) => {
  await handleConferences(graphql, actions, year);
  await handleSpeakers(graphql, actions, year);
  await handleLegal(graphql, actions, year);
};

module.exports.handleConferences = handleConferences;
module.exports.handleSpeakers = handleSpeakers;
module.exports.handleLegal = handleLegal;
module.exports.handleCon = handleCon;
