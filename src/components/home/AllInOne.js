import React from 'react';

const data = [
  <p>
    <strong>Linked data</strong> and <strong>semantic web</strong> compatible
  </p>,
  <p>
    Super easy <strong>one click install</strong> with docker
  </p>,
  <p>
    Generate your <strong>Progressive Web Apps</strong> and{' '}
    <strong>Native Mobile Apps</strong>
  </p>,
  <p>
    <strong>Deploy instantly</strong> in your cloud with Kubernetes
  </p>,
];

const circles = data.map((content, index) => (
  <article key={`article${index}`} className="aio__circle">
    {content}
  </article>
));

const AllInOne = () => (
  <section className="home__part home__all-in-one">
    <div className="container">
      <h1 className="aio__title">
        An <strong>all in one solution</strong> for modern projects
      </h1>
      <div className="aio__circles">{circles}</div>
    </div>
  </section>
);

export default AllInOne;
