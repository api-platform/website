import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import adminImage from 'images/admin_component.svg';
import scaffoldingImage from 'images/scaffolding_component.svg';
import apiImage from 'images/api_component.svg';
import schemaImage from 'images/schema_component.svg';
import Button from 'components/common/Button';

const EcosystemCard = ({ big, image, link, text, title }) => (
  <div className={classnames('grid__item', { full: big })}>
    <div className={classnames('card ecosystem__card', { big })}>
      <div className="card__circle">
        <img src={image} alt={title} width="646" height="646" />
      </div>
      <div className="card__content">
        <h3>{title}</h3>
        <article className="card__autosize">
          <p>{text}</p>
        </article>
        <Button
          text="Read more"
          className="btn ecosystem__button small"
          link={link}
        />
      </div>
    </div>
  </div>
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
      <h1 className="ecosystem__title">
        The API Platform <strong>framework</strong>
      </h1>
      <h5>
        API Platform is a set of tools to help you building API-first projects
      </h5>
      <div className="ecosystem__content grid__container">
        <EcosystemCard
          big
          image={apiImage}
          link="/docs/core/index"
          text="Build a working and fully-featured CRUD API in minutes. Leverage its awesome features to develop complex and high performance API-first projects. Extend or override everything you want."
          title="API Component"
        />
        <EcosystemCard
          image={schemaImage}
          link="/docs/schema-generator/index"
          text="Instantly generates a PHP data model from the Schema.org vocabulary."
          title="Schema Gen Component"
        />
        <EcosystemCard
          image={adminImage}
          link="/docs/admin/index"
          text="Adds a convenient Material Design administration interface built with React without writing a line of code."
          title="Admin Component"
        />
        <EcosystemCard
          image={scaffoldingImage}
          link="/docs/client-generator/index"
          text="Scaffolds a fully functional Single-Page-Application built with React, Redux, React Router and Bootstrap thanks to the CRUD generator."
          title="Client Gen Component"
        />
      </div>
    </div>
  </section>
);

export default Ecosystem;
