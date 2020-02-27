import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Layout from "../components/Layout";

const LogoUsagePolicy = props => (
  <Layout location={props.location}>
    <div className="logo-policy">
      <Helmet title="Logo usage policy" />
      <header className="page__header-overlaid bg-blue-light">
        <div className="container">
          <h1 className="page__title color-white">
            Logo usage <strong>policy</strong>
          </h1>
        </div>
      </header>
      <div className="container card">
        <p>
          {`This policy provides our requirements regarding use of the logotypes of
        API Platform and its subsidiaries
        available for download from the API Platform website (or any other
        trademarks, logos, slogans, copyrighted
        designs or other brand features of API Platform obtained from the website)
        ("Logos"). As the need to address future branding concerns arises, we
        may cancel, modify, or change the terms of this policy from time to time
        without notice to you. You, as a Logo user (“you"), are responsible for
        complying with any modified terms, so please review this policy and also
        become familiar with any modifications we publish. The Logos are the
        sole and exclusive properly of API Platform and its affiliates. Your use of
        any Logo implies acceptance of, and agreement with, the terms of this
        policy. If you do not accept and agree to follow the rules for using the
        Logos as set out in this policy, you do not have the right to use the
        Logos and should not use them. Any use of the Logos that does not comply
        with this policy is not authorized. If you violate the rules set out in
        this policy, you must cease all use of all Logos, regardless of the uses
        otherwise allowed in this policy. In addition, API Platform reserves the
        right to revoke its approval of your use of the logos at any lime.
        Permission is granted to you to use the Logos only on the following
        conditions :`}
        </p>
        <h2>Rules for Using the Logos</h2>
        <p>
          You must comply with all of the following rules when using a Logo:
        </p>
        <ul>
          <li>Logos may not be used in any confusing way.</li>
          <li>
            No Logo may be used in any way that suggests that IRClass is
            affiliated with, sponsors, approves or endorses you, your
            organization, your websites, your products or your services, unless
            such a relationship exists.
          </li>
          <li>
            No Logo may be used in any way that mischaracterizes any
            relationship between you and API Platform
          </li>
          <li>
            No Logo may be used or displayed in any of the following ways:
            <ol>
              <li>
                in any manner that, in the sole discretion of API Platform,
                discredits API Platform or tarnishes its reputation and goodwill
              </li>
              <li>
                in any manner that infringes, dilutes, depreciates the value, or
                impairs the rights of API Platform in the Logos;
              </li>
              <li>in any manner that is false or misleading</li>
              <li>
                in connection with any pornography, illegal activities, or other
                materials that are defamatory, libelous, obscene, or otherwise
                objectionable
              </li>
              <li>
                in any manner that violates the trademark, copyright or any
                other intellectual property rights of others
              </li>
              <li>
                in any manner that violates any law, regulations, or other
                public policy
              </li>
              or as part of a name of an other product or service than API
              Platform.
            </ol>
          </li>
          <li>
            {`Written materials, such as web pages, must be marked to indicate
            that the Logos used are owned by API Platform or its affiliates (for
            example by using a statement such as "the API Platform logo is a
            registered trademark of API Platform").`}
          </li>
          <li>
            You may not assert rights to any Logo whether by trademark
            registration, domain name registration or anything else.
          </li>
          <li>
            You must make any changes to your use of the Logos that are
            requested by API Platform.
          </li>
        </ul>
        <p>
          If you’d like to make any use of our Logos that is not covered by this
          policy, or for further information or clarification about use of the
          Logos, please contact <a href="#">dunglas@gmail.com</a>.
        </p>
      </div>
    </div>
  </Layout>
);
LogoUsagePolicy.propTypes = {
  location: PropTypes.object.isRequired
};

export default LogoUsagePolicy;
