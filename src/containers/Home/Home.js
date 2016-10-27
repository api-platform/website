import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import HeaderNav from '../Navigation/HeaderNav';

if (!__SERVER__) {
  // @TODO: Find a way to load prisms css during server side rendering
  require('prismjs/themes/prism.css');
  require('prismjs/components/prism-json');
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {windowHeight: 790};

    this.refreshHeight = this.refreshHeight.bind(this)
  }

  componentDidMount() {
    if (!__SERVER__) {
      Prism.highlightAll();
    }

    document.body.classList.add('home');
    window.addEventListener('resize', this.refreshHeight);
    this.refreshHeight();
  }

  componentWillUnmount() {
    document.body.classList.remove('home');
    window.removeEventListener('resize', this.refreshHeight);
  }

  refreshHeight() {
    this.setState({
      windowHeight:  (
          window.innerHeight
          || document.documentElement.clientHeight
          || document.getElementsByTagName('body')[0].clientHeight
        ) - document.querySelector('.navbar').offsetHeight + 'px'
    });
  }

  render() {
    const logoImage = require('./images/api-platform.svg');
    const consumeSchemaImage = require('./images/consume-schema.png');
    const spiderBack = require('./images/spider-back.png');
    const spiderLook = require('./images/spider-look.png');
    const spiderWorld = require('./images/spider-world.png');
    const adeoLogo = require('./images/logos/adeo.svg');
    const alstomLogo = require('./images/logos/alstom.svg');
    const beinsportsLogo = require('./images/logos/beinsports.svg');
    const exaqtworldLogo = require('./images/logos/exaqtworld.svg');
    const hoheyLogo = require('./images/logos/hohey.svg');
    const lesTilleulsLogo = require('./images/logos/les-tilleuls.svg');
    const partiDeGaucheLogo = require('./images/logos/parti-de-gauche.svg');
    const renaultLogo = require('./images/logos/renault.svg');
    const sensiolabsLogo = require('./images/logos/sensiolabs.svg');
    const smileLogo = require('./images/logos/smile.svg');
    const theForkLogo = require('./images/logos/the-fork.svg');
    const tripvissLogo = require('./images/logos/tripviss.svg');
    const villeDeRoubaixLogo = require('./images/logos/ville-de-roubaix.svg');
    const yousignLogo = require('./images/logos/yousign.svg');
    const styles = require('./Home.scss');

    return (
      <div>
        <Helmet title="The Ultimate Web API Framework"/>

        <div id="incredible" className="incredible" style={{minHeight: this.state.windowHeight}}>
          <section className="container">
            <h1><img src={logoImage} alt="API Platform" height={400}/></h1>
            <p>The ultimate <a href="http://php.net" target="_blank">PHP</a> framework to build modern web APIs.</p>

            <Link className="btn btn-primary btn-lg" to="/docs/distribution/" role="button"><span className="fa fa-plus-circle"/> Get started</Link>
            <a className="btn btn-primary btn-lg" href="https://demo.api-platform.com" role="button"><span className="fa fa-mouse-pointer"/>Demo</a>
            <a className="btn btn-primary btn-lg" href="https://api.github.com/repos/api-platform/api-platform/zipball" role="button"  target="_blank"><span className="fa fa-download" /> Download</a>
          </section>
        </div>

        <HeaderNav inline={true}/>

        <div id="features" className="slide features">
          <section className="container">
            <h2>Creating Linked Data <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank">REST</a> APIs has never been so easy</h2>
            <div id="api-desc">
              <div>
                <ul id="api-features">
                  <li><span className="fa fa-rocket" /> Create a <a href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete" target="_blank">CRUD</a> API in minutes</li>
                  <li><span className="fa fa-globe" /> <a href="http://json-ld.org/" target="_blank">JSON-LD</a>, <a href="http://www.hydra-cg.com/" target="_blank">Hydra</a>, <a href="http://stateless.co/hal_specification.html" target="_blank">HAL</a> native support</li>
                  <li><span className="fa fa-book" /> Automatic <a href="http://swagger.io/" target="_blank">Swagger</a> documentation</li>
                  <li><span className="fa fa-trophy" /> Built with <a href="https://symfony.com" target="_blank">Symfony</a> and <a href="http://www.doctrine-project.org" target="_blank">Doctrine</a></li>
                  <li><span className={`fa ${styles['fa-docker']}`} /> <a href="https://www.docker.com/">Docker</a> integration</li>
                  <li><span className="fa fa-exclamation" /> Data validation and error management</li>
                  <li><span className="fa fa-search" /> Pagination, filtering and sorting</li>
                  <li><span className="fa fa-magic" /> Generate the data model using <a href="https://schema.org" target="_blank">Schema.org</a></li>
                  <li><span className="fa fa-user" /> <a href="http://symfony.com/doc/current/bundles/FOSUserBundle/index.html">FOSUser</a>,  <a href="https://jwt.io/" target="_blank">JWT</a>, CORS and <a href="https://oauth.net/" target="_blank">OAuth</a> support</li>
                  <li><span className="fa fa-lock" /> Implements <a href="https://www.owasp.org/index.php/REST_Security_Cheat_Sheet" target="_blank">OWASP's recos</a></li>
                  <li><span className="fa fa-cube" /> Modular</li>
                  <li><span className="fa fa-space-shuttle" /> Designed for speed and caching</li>
                  <li><span className="fa fa-check" /> <a href="http://behat.org/" target="_blank">Behat</a>, <a href="http://phpunit.de" target="_blank">PHPUnit</a> and <a href="https://www.getpostman.com/" target="_blank">Postman</a> spec &amp; testing</li>
                  <li><span className="fa fa-legal" /> 100% open source (MIT)</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div id="architecture" className="architecture slide">
          <section className="container">
            <h2>The web has changed!</h2>

            <ul>
              <li>
                <h3>Javascript webapps (<a href="https://en.wikipedia.org/wiki/Single-page_application" target="_blank">SPA</a>) are the standard.</h3>
              </li>
              <li>
                <h3>Users spend <a
                href="http://techcrunch.com/2014/08/21/majority-of-digital-media-consumption-now-takes-place-in-mobile-apps/"
                target="_blank">more
                time on using mobile devices than desktop</a> or <a
                href="http://techcrunch.com/2015/09/10/u-s-consumers-now-spend-more-time-in-apps-than-watching-tv/"
                target="_blank">TV</a>.</h3>
              </li>
              <li>
                <h3><a href="https://en.wikipedia.org/wiki/Linked_data" target="_blank">Linked Data</a> and <a href="https://en.wikipedia.org/wiki/Semantic_Web" target="_blank">the semantic web</a> are a reality.</h3>
              </li>
              <li>
                <h3>APIs are the heart of this new web.</h3>
              </li>
            </ul>
            <p className="text-center">
              ... and <strong>API Platform</strong> is designed for those changes.
            </p>
          </section>
        </div>

        <div id="consume" className="consume slide">
          <section className="container">
            <div className="row">
              <div className="content col-md-9">
                <h2>Easy to Expose, Easy to Consume !</h2>
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
            <h2>Bootstrap the Data Model from Schema.org</h2>

            <div className="row">
              <div className="col-md-2 hidden-xs hidden-sm" id="spider-world"><img src={spiderWorld} alt width={109}
                                                             className="img-responsive"/></div>
              <div className="content col-md-10">
                <p>
                  <strong>Don't reinvent the wheel</strong>: Schema.org provides a ton of popular and proved efficient data models.
                  They cover a broad spectrum of topics including creative work, e-commerce, event, medicine, social
                  networking,
                  people, postal address, organization, place or review. Schema.org has its root in a ton of preexisting
                  well
                  designed vocabularies and is successfully used by more and more website and applications.
                </p>
                <p>
                  <strong>Bootstrap</strong> a fully featured and working PHP data model from Schema.org types including ORM mappings,
                  validation rules and semantic metadata. Of course you can also handcraft your data model or modify the
                  generated
                  one to fit your needs.
                </p>
                <p>Add visual representation of e-commerce offers to database schema</p>
                <p>
                  Pick up schemas applicable to your application, generate your PHP model, then customize and specialize it
                  to fit your needs.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div id="interoperability" className="slide">
          <section className="container">
            <h2>Enhance SEO and Interoperability</h2>
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
              Simply include a JSON-LD file in your page instead of enriching the DOM: <strong>it’s a matter of minutes
              before being SEO Ready</strong>:
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
              Schema.org <strong>improves the interoperability of your applications</strong>. Used with hypermedia technologies
              such as
              Hydra it's a big step towards the <em>semantic and machine readable web</em>. It opens the way to <strong>generic
              web API
              clients</strong> able to extract and process data from any website or app using such technologies.
            </p>
          </section>
        </div>

        <div id="symfony" className="slide">
          <section className="container">
            <h2>API Platform <span className="fa fa-heart"/> Symfony</h2>
            <p>
              The default distribution of API Platform is a perfectly valid Symfony full-stack application that follows <a href="http://symfony.com/doc/current/best_practices/index.html" target="_blank">Symfony's Best Practices</a>.
              It also includes the famous <a href="http://www.doctrine-project.org/projects/orm.html" target="_blank">Doctrine
              ORM</a>
              and all included tools can leverage it.
            </p>
            <p><strong>It means that you can:</strong></p>
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
            <div className="text-right hidden-xs"><img src={spiderLook} alt width={90}/></div>
          </section>
        </div>
        <div id="references" className="references slide">
          <section className="container">
            <h2>They Use API Platform</h2>

            <div className={styles.logos}>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={theForkLogo} alt="The Fork" height={45} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={beinsportsLogo} alt="beIN SPORTS" height={45} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={alstomLogo} alt="Alstom" height={45} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={sensiolabsLogo} alt="SensioLabs" height={45} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={smileLogo} alt="Smile" height={45} style={{backgroundColor: '#ec660f'}} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={renaultLogo} alt="Renault" height={45} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={adeoLogo} alt="ADEO" height={45} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={exaqtworldLogo} alt="ExaqtWorld" height={45} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={lesTilleulsLogo} alt="Les-Tilleuls.coop" height={45} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={hoheyLogo} alt="HoHey" height={45} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={tripvissLogo} alt="Tripviss" height={45} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={villeDeRoubaixLogo} alt="Ville de Roubaix" height={45} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={yousignLogo} alt="Yousign" height={45} /></div>
              <div className="column col-xs-6 col-sm-4 col-md-3"><img src={partiDeGaucheLogo} alt="Le Parti de Gauche" height={45} /></div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
