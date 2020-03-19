import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import { Grid, GridItem } from '../../components/common/Grid';
import Painter from '../../images/painter.svg';

const metaDescription =
  'It’s time to pull out your colored pencils! You don’t need to be an artist to color Webby’s pages. Pick an image that you like and color it however you like, just don’t forget to share your work by mentioning API Platform on Twitter!';

const Colouring = ({ location, data }) => (
  <Layout location={location}>
    <div className="colouring">
      <Helmet title="Colouring webby">
        <meta name="description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={`${process.env.GATSBY_ROOT_URL}/previews/colouring.png`} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="512" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Colouring webby" />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={`${process.env.GATSBY_ROOT_URL}/previews/colouring.png`} />
      </Helmet>
      <header className="page__header-overlaid bg-blue-dark">
        <div className="container header__container">
          <img className="header__image" src={Painter} alt="painter" />
          <div className="header__text">
            <h1 className="page__title color-white">
              <strong>Colouring</strong> Webby
            </h1>
            <p className="h4-like color-white">
              It’s time to pull out your colored pencils! Coloring is a great way to kill time and relax during social
              distancing. Coloring is not just for kids. It improves focus and goes beyond being a great activity for
              destress.
            </p>
            <p className="h4-like color-white">
              You (and your kids) are in quarantine and get bored? Download our coloring pages and share your work by
              mentioning{' '}
              <a href="https://twitter.com/ApiPlatform" target="_blank" rel="noopener noreferrer">
                API Platform on Twitter
              </a>
              !
            </p>
          </div>
        </div>
      </header>
      <section className="container">
        <Grid className="colouring__grid">
          {data.allFile.nodes.map(({ name, childImageSharp: { original, mini } }) => (
            <GridItem padding={10}>
              <a
                className="colouring__card card p-10 clickable"
                href={original.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={mini.src} alt={name} />
              </a>
            </GridItem>
          ))}
        </Grid>
      </section>
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "colouring" } }) {
      nodes {
        name
        childImageSharp {
          original {
            src
          }
          mini: resize(width: 500, quality: 100) {
            src
          }
        }
      }
    }
  }
`;

const imageType = PropTypes.shape({
  src: PropTypes.string.isRequired,
});

Colouring.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          childImageSharp: PropTypes.shape({
            original: imageType,
            mini: imageType,
          }),
        })
      ),
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default Colouring;
