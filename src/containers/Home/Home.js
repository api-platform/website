import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

if (!__SERVER__) {
  // @TODO: Find a way to load prisms css during server side rendering
  require('prismjs/themes/prism.css');
  require('prismjs/components/prism-json');
}

export default class Home extends Component {
  componentDidMount() {
    if (!__SERVER__) {
      console.log('wtf');
      Prism.highlightAll();
    }
  }

  render() {
    const logoImage = require('./images/api-platform.svg');
    const consumeSchemaImage = require('./images/consume-schema.png');
    const spiderBack = require('./images/spider-back.png');
    const spiderLook = require('./images/spider-look.png');
    const spiderWorld = require('./images/spider-world.png');
    const styles = require('./Home.scss');

    return (
      <div>
        <Helmet title="The Ultimate Web API Framework"/>

        <div id="incredible">
          <section className="container">
            <img src={logoImage} alt="API Platform" width={300}/>
            <p>The ultimate <a href="http://php.net" target="_blank">PHP</a> framework to build modern web APIs.<br /></p>

            <Link className="btn btn-primary btn-lg" to="/docs/distribution/" role="button"><span className="fa fa-plus-circle"/> Get started</Link>
            <Link className="btn btn-primary btn-lg" to="https://demo.api-platform.com" role="button"><span className="fa fa-mouse-pointer"/>Demo</Link>
          </section>
        </div>

        <div id="features" className="slide">
          <section className="container">
            <h1>Creating Linked Data <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank">REST</a> APIs has never been so easy</h1>
            <div id="api-desc">
              <div>
                <ul id="api-features">
                  <li><span className="fa fa-rocket" /> Create a <a href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete" target="_blank">CRUD</a> API in minutes</li>
                  <li><span className="fa fa-globe" /> <a href="http://json-ld.org/" target="_blank">JSON-LD</a>, <a href="http://www.hydra-cg.com/" target="_blank">Hydra</a>, <a href="http://stateless.co/hal_specification.html" target="_blank">HAL</a> native support</li>
                  <li><span className="fa fa-book" /> Automatic <a href="http://swagger.io/" target="_blank">Swagger</a> documentation</li>
                  <li><span className="fa fa-trophy" /> Built with <a href="https://symfony.com" target="_blank">Symfony</a> and <a href="http://www.doctrine-project.org" target="_blank">Doctrine</a></li>
                  <li><span className={`fa ${styles['fa-docker']}`} /> <a href="https://www.docker.com/">Docker</a> integration</li>
                  <li><span className="fa fa-exclamation" /> Data validation and error management</li>
                  <li><span className="fa fa-file-text" /> Pagination</li>
                  <li><span className="fa fa-search" /> Filtering and sorting</li>
                  <li><span className="fa fa-magic" /> Generate the data model using <a href="https://schema.org" target="_blank">Schema.org</a></li>
                  <li><span className="fa fa-user" /> <a href="http://symfony.com/doc/current/bundles/FOSUserBundle/index.html">FOSUser</a> integration</li>
                  <li><span className="fa fa-key" /> <a href="https://jwt.io/" target="_blank">JWT</a> and <a href="https://oauth.net/" target="_blank">OAuth</a> support</li>
                  <li><span className="fa fa-lock" /> Implements <a href="https://www.owasp.org/index.php/REST_Security_Cheat_Sheet" target="_blank">OWASP's recos</a></li>
                  <li><span className="fa fa-wrench" /> Easily customizable (events, DI) and configurable</li>
                  <li><span className="fa fa-cube" /> Modular</li>
                  <li><span className="fa fa-space-shuttle" /> Designed for speed and caching</li>
                  <li><span className="fa fa-check" /> <a href="http://behat.org/" target="_blank">Behat</a>, <a href="http://phpunit.de" target="_blank">PHPUnit</a> and <a href="https://www.getpostman.com/" target="_blank">Postman</a> spec &amp; testing</li>
                  <li><span className="fa fa-html5" /> Works with all JS frameworks (<a href="https://facebook.github.io/react/" target="_blank">React</a>, <a href="https://angular.io/" target="_blank">Angular</a>...)</li>
                  <li><span className="fa fa-legal" /> 100% open source (MIT)</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div id="architecture" className="slide">
          <section className="container">
            <h1>The web has changed!</h1>

            <ul>
              <li>
                <b>Javascript webapps (<a href="https://en.wikipedia.org/wiki/Single-page_application" target="_blank">SPA</a></b>) are the standard:
                <div>
                  Awesome frontend technologies such as <a href="http://facebook.github.io/react/" target="_blank">React</a> and <a href="http://angular.io" target="_blank">Angular</a> help to create them.<br />
                  Thanks to <a href="http://redux.js.org/docs/recipes/ServerRendering.html" target="_blank">Universal Rendering</a>, they they are now indexed by search engines.
                </div>
              </li>
              <li>
                Internet users now spend <a
                href="http://techcrunch.com/2014/08/21/majority-of-digital-media-consumption-now-takes-place-in-mobile-apps/"
                target="_blank"><b>more
                time on mobile devices</b> than on desktops</a> or than <a
                href="http://techcrunch.com/2015/09/10/u-s-consumers-now-spend-more-time-in-apps-than-watching-tv/"
                target="_blank">watching TV</a>!
                <div>Having a responsive website is mandatory and native mobile apps are a must-have.</div>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Linked_data" target="_blank">Linked Data</a> and <a href="https://en.wikipedia.org/wiki/Semantic_Web" target="_blank">te semantic web</a>                 <em>
                  are a reality</em>:
                <div>
                  With the <a href="https://schema.org/" target="_blank">Schema.org</a> initiative and new open web standards
                  such as JSON-LD (RDF for web); search engines and a bunch of other services and software consume structured, machine-readable
                  data at web scale.<br />
                  Not exposing such data decrease interoperability and search engine ranking (see <a href="https://developers.google.com/structured-data/rich-snippets/products" target="_blank">rich snippets</a>).
                </div>
              </li>
              <li>
                APIs are the heart of this new web:
                <div>
                  They are the central point to query and modify data and encapsulate the whole business logic.<br />
                  They allow to share them in desktop and mobile environments as well that with partners systems.
                </div>
              </li>
            </ul>
            <p className="text-center">
              <b>API Platform</b> is designed for this new web. It provides efficient and easy to use solutions to address these issues.
            </p>
            <div id="spider-back" className="text-right">
              <img src={spiderBack} alt="Spider" height={99} className="text-right"/>
            </div>
          </section>
        </div>

        <div id="consume" className="slide">
          <section className="container">
            <div className="row">
              <div className="col-md-3" id="spider-world"><img src={spiderWorld} alt width={109}
                                                               className="img-responsive"/></div>
              <div className="col-md-9">
                <h1>Easy to Expose, Easy to Consume !</h1>
                <p>API Platform is agnostic of the client-side technology. Thanks to open web standards, it is
                  compatible with:</p>
                <ul>
                  <li>Javascript apps (including but not limited to React and Angular)</li>
                  <li>Native mobile apps (iOS, Android...)</li>
                  <li>All modern programming languages (PHP, Java, .NET, Ruby, Python...)</li>
                </ul>
                <img src={consumeSchemaImage} alt="Schema" width={678} className="img-responsive"/>
              </div>
            </div>
          </section>
        </div>

        <div id="model" className="slide">
          <section className="container">
            <h1>Bootstrap the Data Model from Schema.org</h1>
            <p>
              <b>Don't reinvent the wheel</b>: Schema.org provides a ton of popular and proved efficient data models.
              They cover a broad spectrum of topics including creative work, e-commerce, event, medicine, social
              networking,
              people, postal address, organization, place or review. Schema.org has its root in a ton of preexisting
              well
              designed vocabularies and is successfully used by more and more website and applications.
            </p>
            <p>
              <b>Bootstrap</b> a fully featured and working PHP data model from Schema.org types including ORM mappings,
              validation rules and semantic metadata. Of course you can also handcraft your data model or modify the
              generated
              one to fit your needs.
            </p>
            <p>Add visual representation of e-commerce offers to database schema</p>
            <p>
              Pick up schemas applicable to your application, generate your PHP model, then customize and specialize it
              to fit your needs.
            </p>
          </section>
        </div>

        <div id="interoperability" className="slide">
          <section className="container">
            <h1>Enhance SEO and Interoperability</h1>
            <p>
              Adding Schema.org markup to websites and apps increase their ranking in search engines results and enable
              awesome features such as <a href="https://developers.google.com/structured-data/" target="_blank">Google
              Rich Snippets</a> and Gmail markup.
            </p>
            <p>
              Mapping your app data model to Schema.org structures can be a tedious task. Using the generator, your data
              model will be a derived from Schema.org. Serializing your data as JSON-LD will not require specific
              mapping
              nor adaptation.<br />
              Simply include a JSON-LD file in your page instead of enriching the DOM: <b>it’s a matter of minutes
              before being SEO Ready</b>:
            </p>
            <pre className="language-json"><code>{`<script type="application/ld+json">
{
  "@context": "http://schema.org/",
  "@type": "Product",
  "name": "Executive Anvil",
  "image": "http://www.example.com/anvil_executive.jpg",
  "description": "Sleeker than ACME's Classic Anvil.",
  "mpn": "925872",
  "brand": {
    "@type": "Thing",
    "name": "ACME"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.4",
    "reviewCount": "89"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "119.99",
    "priceValidUntil": "2020-11-05",
    "itemCondition": "http://schema.org/UsedCondition",
    "availability": "http://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Executive Objects"
    }
  }
}
</script>`}</code></pre>
            <p>
              Schema.org <b>improves the interoperability of your applications</b>. Used with hypermedia technologies
              such as
              Hydra it's a big step towards the <em>semantic and machine readable web</em>. It opens the way to <b>generic
              web API
              clients</b> able to extract and process data from any website or app using such technologies.
            </p>
          </section>
        </div>

        <div id="symfony" className="slide">
          <section className="container">
            <h1>API Platform <span className="fa fa-heart"/> Symfony</h1>
            <p>
              The default distribution of API Platform is a perfectly valid Symfony full-stack application that follows <a href="http://symfony.com/doc/current/best_practices/index.html" target="_blank">Symfony's Best Practices</a>.
              It also includes the famous <a href="http://www.doctrine-project.org/projects/orm.html" target="_blank">Doctrine
              ORM</a>
              and all included tools can leverage it.
            </p>
            <p><b>It means that you can:</b></p>
            <ul>
              <li>
                extend the framework with <a href="http://knpbundles.com" target="_blank">thousands of exciting Symfony
                bundles</a> adding features such as authentication (<a href="http://jwt.io" target="_blank">JWT</a> and <a
                href="http://oauth.net" target="_blank">OAuth</a>),
                user management, HTTP cache, asynchronous jobs and many more
              </li>
              <li>use API Platform in any existing Symfony application</li>
              <li>
                reuse all your Symfony skills and benefit of the high quality <a
                href="http://symfony.com/doc/current/index.html" target="_blank">Symfony
                documentation</a>
              </li>
            </ul>
            <p>However, API Platform is designed as a set of independent and reusable components. You can perfectly use
              them
              in raw PHP projects or in projects using other frameworks.</p>
            <div className="text-right"><img src={spiderLook} alt width={90}/></div>
          </section>
        </div>
        <div id="references" className="slide">
          <section className="container">
            <h1>They Use API Platform</h1>
            <img src="" alt="The Fork, Smile, PartKeepr, ExaqtWorld, Les-Tilleuls.coop" width={937}
                 className="img-responsive"/>
          </section>
        </div>
      </div>
    );
  }
}
