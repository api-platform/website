import React from 'react';
import spider from 'images/giants.svg';
import HomeList from './HomeList';

const data = [
  'extend the framework with <a href="https://symfony.com/doc/bundles/" target="_blank" rel="noopener noreferrer">thousands of exciting Symfony bundles</a> <span class="hidden-small">adding features such as authentication (JWT and OAuth), user management, HTTP cache, asynchronous jobs and many more</a>',
  'use API Platform in any existing Symfony application',
  'reuse all your Symfony skills and benefit of the <a href="http://symfony.com/doc/current/index.html" target="_blank" rel="noopener noreferrer">high quality Symfony documentation</a>',
];

const Giants = () => (
  <section className="home__part home__giants">
    <div className="container giants__container">
      <h1 className="giants__title">
        Built on the shoulders of <strong>giants</strong>
      </h1>
      <article className="giants__content">
        <p className="hidden-small">
          The default distribution of API Platform is a perfectly valid Symfony
          full-stack application that follows{' '}
          <strong>Symfonys&apos;s Best Practices</strong>. It also includes the
          famous Doctrine ORM and all included tools can leverage it. It means
          that you can:
        </p>
        <HomeList data={data} className="giants__list" />
        <p className="hidden-small">
          However, API Platform is designed as a set of independent and reusable
          components. You can perfectly use them in raw PHP projects or in
          projects using other frameworks.
        </p>
      </article>
      <div className="giants__spider">
        <img
          src={spider}
          alt="Built on the shoulders of giants"
          width="371"
          height="344"
        />
      </div>
    </div>
  </section>
);

export default Giants;
