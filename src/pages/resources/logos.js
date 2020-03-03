import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import { Grid, GridItem } from '../../components/common/Grid';
import LogoCard from '../../components/community/LogoCard';

const Wallpapers = ({ location, data }) => {
  const allLogos = data.svg.nodes.map(logo => ({
    name: logo.name,
    thumbnail: logo.publicURL,
    types: [
      {
        type: 'svg',
        formats: [
          {
            name: 'default',
            src: logo.publicURL,
          },
        ],
      },
    ],
  }));
  const createTypeDataFromPng = logoPng => ({
    type: 'png',
    src: logoPng.formats.medium.src,
    formats: Object.keys(logoPng.formats)
      .filter(key => logoPng.formats[key].src)
      .map(key => ({
        name: key,
        src: logoPng.formats[key].src,
      })),
  });
  data.png.nodes.map(logo => {
    const existingLogo = allLogos.find(l => l.name === logo.name);
    if (existingLogo) return existingLogo.types.push(createTypeDataFromPng(logo));
    return allLogos.push({
      name: logo.name,
      thumbnail: logo.formats.small.src,
      types: [createTypeDataFromPng(logo)],
    });
  });

  return (
    <Layout location={location}>
      <div className="logos">
        <Helmet title="Logos" />
        <header className="page__header-overlaid bg-blue">
          <div className="container">
            <h1 className="page__title color-white">
              Identity and <strong>logos</strong>
            </h1>
            <p className="h4-like color-white">
              Before using the API Platform logos, read our{' '}
              <Link className="color-white" to="/trademark-policy">
                Trademark and Logo Policy
              </Link>
              .
            </p>
          </div>
        </header>
        <section className="container">
          <Grid className="logo__grid">
            {allLogos.map(logo => (
              <GridItem padding={10}>
                <LogoCard logo={logo} />
              </GridItem>
            ))}
          </Grid>
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    svg: allFile(
      filter: { sourceInstanceName: { eq: "logos" }, ext: { eq: ".svg" } }
      sort: { fields: name, order: ASC }
    ) {
      nodes {
        name
        ext
        publicURL
      }
    }
    png: allFile(
      filter: { sourceInstanceName: { eq: "logos" }, ext: { eq: ".png" } }
      sort: { fields: name, order: ASC }
    ) {
      nodes {
        name
        ext
        publicURL
        formats: childImageSharp {
          large: resize(width: 1200) {
            src
          }
          medium: resize(width: 600) {
            src
          }
          small: resize(width: 300) {
            src
          }
        }
      }
    }
  }
`;

const formatType = PropTypes.shape({
  src: PropTypes.string,
});

Wallpapers.propTypes = {
  data: PropTypes.shape({
    svg: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          ext: PropTypes.string,
          publicURL: PropTypes.string,
        })
      ),
    }),
    png: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          ext: PropTypes.string,
          formats: PropTypes.shape({
            small: formatType,
            medium: formatType,
            large: formatType,
          }),
        })
      ),
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default Wallpapers;
