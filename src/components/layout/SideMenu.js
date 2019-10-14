import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import links from '../../data/menu';
import LogoSpider from '../../images/logo_spider.svg';
import Logo from './Logo';
import Search from './Search';
import MenuItem from './MenuItem';

const nav = links.map(link => <MenuItem key={link.text} {...link} />);

const SideMenu = ({ open }) => (
  <div className={classNames('side-menu', { open })}>
    <div className="side-menu__top">
      <div className="side-menu__logo">
        <div className="logo__circle">
          <img className="logo__spider" src={LogoSpider} alt="spidey" width="555" height="321" />
        </div>
        <Logo className="logo__text" />
      </div>
      <Search className="side-menu__search" />
    </div>
    <nav className="side-menu__nav">
      <MenuItem key="home" path="/" text="Home" />
      {nav}
      <div className="menu-item menu-item__social">
        <a href="https://twitter.com/ApiPlatform" target="blank" aria-label="find us on twitter">
          <i className="icon-twitter" />
        </a>
        <a href="https://github.com/api-platform/api-platform" target="blank" aria-label="find us on github">
          <i className="icon-github" />
        </a>
      </div>
    </nav>
  </div>
);

SideMenu.defaultProps = {
  open: false,
};

SideMenu.propTypes = {
  open: PropTypes.bool,
};

export default SideMenu;
