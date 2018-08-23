import React from 'react';
import code from 'data/seo-code';
import Laptop from 'images/laptop.svg';
import Prism from 'vendor/Prism.js';

const Seo = () => (
  <section className="home__seo home__part">
    <div className="container seo__container">
      <h1 className="seo__title">
        Enhance <strong>SEO</strong> and Interoperability
      </h1>
      <div className="seo__code">
        <img src={Laptop} alt="interoperability" width="505" height="445" />
        <pre className="language-json">
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(code, Prism.languages.json),
            }}
          />
        </pre>
      </div>
      <div className="seo__content">
        <p>
          Adding{' '}
          <a href="http://schema.org/" target="_blank" rel="noopener noreferrer">
            Schema.org
          </a>{' '}
          markup to websites and apps increase their ranking in search engines results and enable awesome features such
          as{' '}
          <a href="https://developers.google.com/structured-data/" target="_blank" rel="noopener noreferrer">
            Google Rich Snippets
          </a>{' '}
          and{' '}
          <a href="https://developers.google.com/gmail/markup/" target="_blank" rel="noopener noreferrer">
            Gmail markup
          </a>
          .
        </p>
        <p className="hidden-small">
          Mapping your app data model to Schema.org structures can be a tedious task. Using{' '}
          <a href="/docs/schema-generator">the generator</a>, your data model will be a derived from Schema.org.
          Serializing your data as JSON-LD will not require specific mapping nor adaptation.
        </p>
        <p>
          Simply include a JSON-LD file in your page instead of enriching the DOM:{' '}
          <strong>it’s a matter of minutes before being SEO Ready</strong>.
        </p>
        <p className="hidden-small">
          Schema.org improves the interoperability of your applications. Used with hypermedia technologies such as{' '}
          <a href="http://www.hydra-cg.com/" target="_blank" rel="noopener noreferrer">
            Hydra
          </a>{' '}
          it&#39;s a big step towards the semantic and machine readable web. It opens the way to generic web API clients
          able to extract and process data from any website or app using such technologies.
        </p>
      </div>
    </div>
  </section>
);

export default Seo;
