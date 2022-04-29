import Wave from '@con/components/common/Wave';
import React from 'react';
import LogoTilleuls from '@con/components/common/LogoTilleuls';
import Logo from '@con/images/logo.svg';

export interface FooterColumn {
  title: string;
  links: { title: string; link: string }[];
}

const Footer: React.ComponentType<{ links: FooterColumn[]; withSocial?: boolean }> = ({
  links,
  withSocial = false,
}) => (
  <div className="conf__footer">
    <div className="container">
      <div className="footer__columns">
        <div className="footer__event">
          <img src={Logo} className="footer__logo" alt="Api Platform Conference" />
          <span className="footer__by">an event by</span>
          <a className="footer__tilleuls" href="https://les-tilleuls.coop/en" target="_blank" rel="noreferrer noopener">
            <LogoTilleuls width="100%" />
          </a>
        </div>
        {links.map((column) => (
          <div key={column.title} className="footer__column">
            <span className="h6 footer__title">{column.title}</span>
            {column.links.map(({ link, title }) => (
              <a key={title} href={link}>
                {title}
              </a>
            ))}
          </div>
        ))}
        {withSocial ? (
          <div className="footer__column">
            <span className="h6 footer__title">Follow us</span>
            <a href="https://mastodon.online/@cooptilleuls" target="_blank" rel="noopener noreferrer">
              <i className="icon-mastodon mr-10" />
              <span>Mastodon</span>
            </a>
            <a href="https://twitter.com/ApiPlatform" target="_blank" rel="noopener noreferrer">
              <i className="icon-twitter mr-10" />
              <span>Twitter</span>
            </a>
            <a href="https://fr.linkedin.com/company/les-tilleuls-coop" target="_blank" rel="noopener noreferrer">
              <i className="icon-linkedin mr-10" />
              <span>LinkedIn</span>
            </a>
          </div>
        ) : null}
      </div>
      <span className="body2 footer__copyright">
        Copyright © 2021{' '}
        <a href="https://les-tilleuls.coop/en" target="_blank" rel="noreferrer noopener">
          Les-Tilleuls.coop
        </a>
      </span>
    </div>
    <Wave className="footer__wave" />
  </div>
);

export default Footer;
