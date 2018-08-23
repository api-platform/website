import React from 'react';
import spider from 'images/expose.svg';
import HomeList from './HomeList';

const data = [
  '<strong>Javascript apps</strong> (including but not limited to React and Angular)',
  '<strong>Native mobile apps</strong> (iOS, Android...)',
  '<strong>All modern programming languages</strong> (PHP, Java, .Net, Ruby, Python...)',
];

const Expose = () => (
  <section className="home__part home__expose">
    <div className="container expose__container">
      <article className="expose__content">
        <h1 className="expose__title">
          Easy to <strong>expose</strong>, easy to <strong>consume</strong>!
        </h1>
        <p>
          API Platform is agnostic of the client-side technology. Thanks to open web standards, it is compatible with:
        </p>
        <HomeList data={data} className="expose__list" />
      </article>
      <div className="expose__spider">
        <img src={spider} alt="Expose and consume" width="400" height="419" />
      </div>
    </div>
  </section>
);

export default Expose;
