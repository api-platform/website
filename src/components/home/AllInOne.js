import React from 'react';

const data = [
  <p>
    <strong>GraphQL</strong>, <strong>Linked data</strong>
    &nbsp; and <strong>Semantic Web</strong> compatible
  </p>,
  <p>
    Super easy <strong>one click install</strong> with Docker
  </p>,
  <p>
    Generate your <strong>Progressive Web Apps</strong> and <strong>Native Mobile Apps</strong>
  </p>,
  <p>
    <strong>Deploy instantly</strong> in the cloud with Kubernetes
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
        An <strong>All-in-One solution</strong> for Modern Projects
      </h1>
      <div className="aio__circles">{circles}</div>
    </div>
  </section>
);

export default AllInOne;
