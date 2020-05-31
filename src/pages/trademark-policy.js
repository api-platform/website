import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import copyrightImage from '../images/copyright.svg';

const Policy = ({ location }) => (
  <Layout location={location}>
    <div className="trademark-policy">
      <Helmet title="Trademark policy" />
      <header className="page__header-overlaid bg-blue color-white">
        <div className="container">
          <h1 className="page__title color-white">
            Trademark <strong>policy</strong>
          </h1>
        </div>
      </header>
      <div className="container">
        <div className="card card__policy">
          <div className="policy__intro">
            <div className="intro__image">
              <img src={copyrightImage} alt="copyright API Platform" />
            </div>
            <p className="policy__intro">
              {`API Platform is built by its community. We share these guidelines to provide our requirements regarding the use of the logotypes of API Platform available for download from our website (or any other trademarks, logos, slogans, copyrighted designs or other brand features of API Platform obtained from the website).
`}
            </p>
          </div>
          <h2 className="h3-like color-blue">Property</h2>
          <p>
            The Logos are the sole and exclusive property of API Platform and{' '}
            <a href="https://les-tilleuls.coop/en" target="_blank" rel="noopener noreferrer">
              Les-Tilleuls.coop
            </a>
            .
          </p>
          <h2 className="h3-like color-blue">Permitted use of our Marks</h2>
          <p>
            Proper use of our Marks on websites to name or accurately describe{' '}
            <a href="https://les-tilleuls.coop/en" target="_blank" rel="noopener noreferrer">
              Les-Tilleuls.coop
            </a>
            ’s products, services or technology is permitted.
          </p>
          <p>
            The use of our Marks should not be misleading or likely to cause confusion as to whether the website is
            sponsored by or affiliated with{' '}
            <a href="https://les-tilleuls.coop/en" target="_blank" rel="noopener noreferrer">
              Les-Tilleuls.coop
            </a>{' '}
            or whether the products, services or technology are offered by{' '}
            <a href="https://les-tilleuls.coop/en" target="_blank" rel="noopener noreferrer">
              Les-Tilleuls.coop
            </a>
            .
          </p>
          <p>
            API Platform and{' '}
            <a href="https://les-tilleuls.coop/en" target="_blank" rel="noopener noreferrer">
              Les-Tilleuls.coop
            </a>{' '}
            reserve the right to revoke their approval of your use of the logos at any time.
          </p>
          <h2 className="h3-like color-blue">Forbidden use of our Marks:</h2>
          <ul>
            <li>As part of your own trademark.</li>
            <li>
              In any way that suggests that API Platform is affiliated with, sponsors, approves or endorses you, your
              organization, your websites, your products or your services,{' '}
              <strong>unless such a relationship exists</strong>. We reserve the right, in our sole discretion, to
              determine when this condition is met or violated.
            </li>
            <li>
              In a manner that disparages{' '}
              <a href="https://les-tilleuls.coop/en" target="_blank" rel="noopener noreferrer">
                Les-Tilleuls.coop
              </a>{' '}
              or its products, services or technology.
            </li>
            <li>In connection with products, services or activities which, in our judgment, may diminish goodwill.</li>
            <li>In connection with any unlawful activities or to encourage unlawful activities.</li>
            <li>In any manner that discredits API Platform or tarnishes its reputation and goodwill</li>
            <li>In any manner that is false or misleading</li>
            <li>Use in a domain name or URL.</li>
            <li>Use for merchandising purposes, e.g. on swags (t-shirts, stickers…)</li>
            <li>
              Any and all use of our Marks in connection with account names, profiles, avatars or handles on social
              media platforms is subject to the same guidelines set forth herein as for other uses.
            </li>
            <li>
              The use of any of our Marks in an account name or profile name on social media platforms is not permitted.
            </li>
            <li>
              Use or reproduction of{' '}
              <a href="https://les-tilleuls.coop/en" target="_blank" rel="noopener noreferrer">
                Les-Tilleuls.coop
              </a>
              ’s original works of authorship, including the API Platform “Webby” spider design is prohibited without
              prior approval from Les-Tilleuls.coop.
            </li>
          </ul>
          <p>
            Your use of any Logo implies acceptance of, and agreement with, the terms of this policy. If you do not
            accept and agree to follow the rules for using the Logos as set out in this policy, you do not have the
            right to use the Logos and should not use them. We may cancel, modify, or change the terms of this policy
            from time to time without any notice.
          </p>
          <h2 className="h3-like color-blue">Questions</h2>
          <p>
            If you&apos;d like to make any use of our Logos that is not covered by this policy, or for further
            information or clarification about use of the Logos, please contact us:{' '}
            <a href="mailto:contact@les-tilleuls.coop">contact@les-tilleuls.coop</a>
          </p>
        </div>
      </div>
    </div>
  </Layout>
);
Policy.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Policy;
