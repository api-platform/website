import React from 'react';
import spider from '../../images/giants.svg';
import HomeList from './HomeList';

const data = [
  'extend the framework with thousands of existing <a href="https://symfony.com/doc/bundles/" target="_blank" rel="noopener noreferrer">Symfony bundles</a> and <a href="https://github.com/brillout/awesome-react-components#ui-components" target="_blank" rel="noopener noreferrer">React components</a>',
  'use the server library in any existing Symfony or PHP app, use client components with any API documented with Hydra or OpenAPI, regardless of its programming language',
  'reuse all your Symfony, React and Docker skills and benefit of their high quality docs; you are in known territory',
];

const Giants = () => (
  <section className="home__part home__giants">
    <article className="container giants__container">
      <h2 className="h1-like giants__title">
        Built on the Shoulders of <strong>Giants</strong>
      </h2>
      <div className="giants__content">
        <p className="hidden-small">
          API Platform is built on top of <strong>battle-tested products</strong>. The server skeleton includes the
          famous <strong>Symfony</strong> framework and the <strong>Doctrine</strong> ORM. Our scaffolding tool supports
          the most popular JavaScript libraries. The development environment and the deployment mechanism leverage{' '}
          <strong>Docker, Kubernetes and Helm</strong>.
        </p>
        <HomeList data={data} className="giants__list" />
        <p className="hidden-small">
          API Platform is also designed as a set of independent and reusable components. You can perfectly use them in a
          standalone way, or integrate them by yourself in your own project.
        </p>
      </div>
      <div className="giants__spider">
        <img src={spider} alt="Built on the shoulders of giants" width="371" height="344" />
      </div>
    </article>
  </section>
);

export default Giants;
