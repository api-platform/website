import React from 'react';
import links from 'data/menu';
import Link from 'gatsby-link';
import LogoSpider from 'images/logo_spider.svg';
import Logo from './Logo';
import Search from './Search';
import MenuItem from './MenuItem';

const nav = links.map(link => <MenuItem key={link.text} {...link} />);

const Header = () => (
  <header className="header openable">
    <Link to="/" className="header__logo">
      <img className="logo__spider" src={LogoSpider} alt="spidey" width="555" height="321" />
      <Logo className="logo__text" />
    </Link>
    <Search className="header__search" />
    <nav className="header__nav">{nav}</nav>
    <nav className="header__social">
      <a href="https://twitter.com/ApiPlatform" target="blank">
        <i className="icon-twitter" />
      </a>
      <a href="https://github.com/api-platform/api-platform" target="blank">
        <i className="icon-github" />
      </a>
    </nav>
  </header>
);

export default Header;
