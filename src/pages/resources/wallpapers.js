import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import Layout from "../../components/Layout";
import { Grid, GridItem } from "../../components/common/Grid";

const Wallpapers = ({ location, data }) => (
  <Layout location={location}>
    <div className="wallpapers">
      <Helmet title="Wallpapers" />
      <header className="page__header-overlaid bg-blue">
        <div className="container">
          <h1 className="page__title color-white">
            Our <strong>wallpapers</strong>
          </h1>
        </div>
      </header>
      <section className="container">
        <Grid className="wallpapers__grid">
          {data.allFile.nodes.map(
            ({
              name,
              childImageSharp: { original, mini, w1920x1080, w1920x1200 }
            }) => (
              <GridItem padding={10}>
                <a
                  className="wallpaper__card card p-10 clickable"
                  href={original.src}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={mini.src} alt={name} />
                  <div className="wallpaper__resolutions">
                    <a
                      href={original.src}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{`${original.width}x${original.height}`}</a>
                    <a
                      href={w1920x1080.src}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{`${w1920x1080.width}x${w1920x1080.height}`}</a>
                    <a
                      href={w1920x1200.src}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{`${w1920x1200.width}x${w1920x1200.height}`}</a>
                  </div>
                </a>
              </GridItem>
            )
          )}
        </Grid>
      </section>
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "wallpapers" } }) {
      nodes {
        name
        childImageSharp {
          original {
            src
            height
            width
          }
          w1920x1200: resize(width: 1920, height: 1200) {
            src
            width
            height
          }
          w1920x1080: resize(width: 1920, height: 1080) {
            src
            width
            height
          }
          mini: resize(width: 500) {
            src
            width
            height
          }
        }
      }
    }
  }
`;

const imageType = PropTypes.shape({
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
});

Wallpapers.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
      nodes: PropTypes.arrayOf({
        name: PropTypes.string,
        childImageSharp: PropTypes.shape({
          original: imageType,
          mini: imageType,
          w1920x1200: imageType,
          w1920x1080: imageType
        })
      })
    })
  }).isRequired,
  location: PropTypes.object.isRequired
};

export default Wallpapers;
