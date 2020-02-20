import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import adminImage from '../../images/admin_component.svg';
import scaffoldingImage from '../../images/scaffolding_component.svg';
import apiImage from '../../images/api_component.svg';
import schemaImage from '../../images/schema_component.svg';
import Button from '../../components/common/Button';
import { Grid, GridItem } from '../../components/common/Grid';

const EcosystemCard = ({ big, image, link, text, title }) => (
  <GridItem full={big}>
    <div className={classnames('card ecosystem__card', { big })}>
      <div className="avatar blue">
        <img src={image} alt={title} width="646" height="646" />
      </div>
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <article className="card__autosize">
          <p>{text}</p>
        </article>
        <Button text="Read more" className="btn ecosystem__button small" link={link} />
      </div>
    </div>
  </GridItem>
);

EcosystemCard.propTypes = {
  big: PropTypes.bool,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

EcosystemCard.defaultProps = {
  big: false,
};

const Ecosystem = () => (
  <section className="home__part home__ecosystem">
    <div className="container">
      <h2 className="h1-like ecosystem__title">
        The API Platform <strong>Framework</strong>
      </h2>
      <p className="h4-like">API Platform is a set of tools to build and consume web APIs</p>
      <Grid className="ecosystem__content">
        <EcosystemCard
          big
          image={apiImage}
          link="/docs/core"
          text="Build a fully-featured hypermedia or GraphQL API in minutes. Leverage its awesome features to develop complex and high performance API-first projects. Extend or override everything you want."
          title="API Component"
        />
        <EcosystemCard
          image={schemaImage}
          link="/docs/schema-generator"
          text="Instantly generates a PHP data model from the Schema.org vocabulary. Let the ORM create the related tables."
          title="Schema Gen Component"
        />
        <EcosystemCard
          image={adminImage}
          link="/docs/admin"
          text="Adds a convenient Material Design administration interface built with React without writing a line of code. It's a Progressive Web App!"
          title="Admin Component"
        />
        <EcosystemCard
          image={scaffoldingImage}
          link="/docs/client-generator"
          text="Scaffolds a Progressive Web App (React or Vue.js) or a native mobile app (React Native), and edit it to fit your needs."
          title="Client Gen Component"
        />
      </Grid>
    </div>
  </section>
);

export default Ecosystem;
