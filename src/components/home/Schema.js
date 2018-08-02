import React from 'react';
import Link from 'gatsby-link';
import dataSchema from 'data/schema';
import spider from 'images/spider_schema.svg';

/* eslint-disable react/prop-types */

const SchemaItem = ({ icon, link, text, title }) => (
  <Link to={link} className="schema__item">
    <div className="schema__card">
      <i className={`schema__icon icon-line-${icon}`} />
      <div className="schema__content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  </Link>
);

const SchemaPart = ({ title, items }) => (
  <div className="schema__part">
    <div className="part__title">
      <h4>{title}</h4>
    </div>
    <div className="schema__group">
      {items.map(item => <SchemaItem key={item.title} {...item} />)}
      <Lines />
    </div>
  </div>
);

const Lines = () => (
  <svg className="lines" width="100%" height="100%">
    <line className="line" x1="50%" y1="0" x2="0" y2="0" stroke="#000" />
    <line className="line" x1="50%" y1="0" x2="100%" y2="0" stroke="#000" />
    <line className="line" x1="0" y1="0" x2="0" y2="100%" stroke="#000" />
    <line className="line" x1="100%" y1="0" x2="100%" y2="100%" stroke="#000" />
    <line className="line" x1="0%" y1="100%" x2="50%" y2="100%" stroke="#000" />
    <line className="line" x1="100%" y1="100%" x2="50%" y2="100%" stroke="#000" />
  </svg>
);

const Schema = () => (
  <section className="home__part home__schema">
    <div className="container schema__container">
      <h1 className="schema__title">
        Creating Linked Data <strong>REST</strong> APIs has Never Been so Easy
      </h1>
      {dataSchema.map(part => <SchemaPart key={part.title} {...part} />)}
    </div>
    <div className="schema__spider">
      <img src={spider} alt="spider" width="256" height="422" />
    </div>
  </section>
);

export default Schema;
