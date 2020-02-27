import React, { Component } from 'react';
import { Link } from 'gatsby';
import Logo from '../../images/logo.svg';

class Footer extends Component {
  /* eslint-disable no-undef */
  componentDidMount() {
    if (twttr.widgets) {
      this.createWidget();
    } else {
      twttr.ready(this.createWidget);
    }
  }

  createWidget = () => {
    twttr.widgets.createFollowButton('ApiPlatform', this.twitterButton, {
      size: 'medium',
      showScreenName: false,
    });
  };

  /* eslint-enable no-undef */

  render() {
    return (
      <footer className="footer openable">
        <img className="footer__logo" src={Logo} alt="spidey" width="400" height="419" />
        <p className="footer__copyright">
          Copyright © 2019 <a href="https://dunglas.fr">Kévin Dunglas</a>
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
        <p className="footer__policy"><Link to="/trademark-policy">Trademark policy</Link></p>
        <div className="footer__follow">
          <iframe
            title="github"
            src="https://ghbtns.com/github-btn.html?user=api-platform&repo=api-platform&type=star&count=true&size=small"
          />
          <div
            className="footer__twitter"
            ref={el => {
              this.twitterButton = el;
            }}
          />
        </div>
      </footer>
    );
  }
}

export default Footer;
