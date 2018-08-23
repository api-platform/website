import React from 'react';
import spider from 'images/giants.svg';
import HomeList from './HomeList';

const data = [
  'extend the framework with thousands of existing <a href="https://symfony.com/doc/bundles/" target="_blank" rel="noopener noreferrer nofollow">Symfony bundles</a> and <a href="https://reactjs.org/community/ui-components.html" target="_blank" rel="noopener noreferrer nofollow">React components</a>',
  'use the server library in any existing Symfony or PHP app, use client components with any Hydra-enabled API, regardless of its programming language',
  'reuse all your Symfony, React and Docker skills and benefit of their high quality docs; you are in known territory',
];

const Giants = () => (
  <section className="home__part home__giants">
    <div className="container giants__container">
      <h1 className="giants__title">
        Built on the Shoulders of <strong>Giants</strong>
      </h1>
      <article className="giants__content">
        <p className="hidden-small">
          API Platform is built on top of <strong>battle-tested products</strong>. The server skeleton includes the
          famous <strong>Symfony 4</strong> microframework and the <strong>Doctrine</strong> ORM. Client-side components
          use Facebook&apos;s <strong>React</strong> (a Vue.js integration is also available). The development
          environment and the deployment mechanism leverage <strong>Docker, Kubernetes and Helm</strong>.
        </p>
        <HomeList data={data} className="giants__list" />
        <p className="hidden-small">
          API Platform is also designed as a set of independent and reusable components. You can perfectly use them in a
          standalone way, or integrate them by yourself in your own project.
        </p>
      </article>
      <div className="giants__spider">
        <img src={spider} alt="Built on the shoulders of giants" width="371" height="344" />
      </div>
    </div>
  </section>
);

export default Giants;
