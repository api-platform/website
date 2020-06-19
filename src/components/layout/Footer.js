/* eslint-disable no-undef */

import React, { useEffect, useRef } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Logo from '../../images/logo.svg';

const createWidget = (twitterButton) => () =>
  twttr.widgets.createFollowButton('ApiPlatform', twitterButton, {
    size: 'medium',
    showScreenName: false,
  });

export default () => {
  const twitterButton = useRef(null);

  useEffect(() => {
    if (twttr.widgets) {
      createWidget(twitterButton.current)();
    } else {
      twttr.ready(createWidget(twitterButton.current));
    }
  }, []);

  const {
    currentBuildDate: { currentDate },
  } = useStaticQuery(graphql`
    query {
      currentBuildDate {
        currentDate
      }
    }
  `);

  return (
    <footer className="footer openable">
      <img className="footer__logo" src={Logo} alt="spidey" width="400" height="419" />
      <p className="footer__copyright">
        Copyright © {currentDate} <a href="https://dunglas.fr">Kévin Dunglas</a>
      </p>
      <p className="footer__tilleuls">
        Sponsored by <a href="https://les-tilleuls.coop">Les-Tilleuls.coop</a>
      </p>
      <p className="footer__licence">
        Code licensed under{' '}
        <a
          href="https://github.com/api-platform/api-platform/blob/master/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT
        </a>
        , documentation under{' '}
        <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">
          CC BY 3.0
        </a>
        .
      </p>
      <p className="footer__policy">
        <Link to="/trademark-policy">Trademark policy</Link>
      </p>
      <div className="footer__follow">
        <iframe
          title="github"
          src="https://ghbtns.com/github-btn.html?user=api-platform&repo=api-platform&type=star&count=true&size=small"
        />
        <div className="footer__twitter" ref={twitterButton} />
      </div>
    </footer>
  );
};
