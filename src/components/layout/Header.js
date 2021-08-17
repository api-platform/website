import React, { useState, useCallback, useContext } from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import links from '../../data/menu';
import LogoSpider from '../../images/logo_spider.svg';
import SwitchTheme from '../common/SwitchTheme';
import BurgerButton from './BurgerButton';
import Logo from './Logo';
import Search from './Search';
import MenuItem from './MenuItem';
import NavContext from './NavContext';
import MovingMessage from '../common/MovingMessage';

const nav = links.map((link) => <MenuItem key={link.text} {...link} />);

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { setShowResponsiveMenu, showResponsiveMenu } = useContext(NavContext);

  const onSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const onSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const toggleResponsiveMenu = useCallback(() => {
    setShowResponsiveMenu(!showResponsiveMenu);
  }, [setShowResponsiveMenu, showResponsiveMenu]);

  return (
    <>
      <Link to="/con/">
        <MovingMessage>
          <strong>API Platform Con 2021</strong>: join us in Lille (France) or online on September 10 for our 1st
          international conference.
        </MovingMessage>
      </Link>
      <header
        className={classnames('header openable', {
          'expand-search': isSearchFocused,
        })}
      >
        <Link to="/" className="header__logo">
          <div className="logo__circle">
            <img className="logo__spider" src={LogoSpider} alt="spidey" width="555" height="321" />
          </div>
          <Logo className="logo__text" />
        </Link>
        <Search className="header__search" onFocus={onSearchFocus} onBlur={onSearchBlur} />
        <nav className="header__nav">{nav}</nav>
        <nav className="header__social">
          <a
            href="https://twitter.com/ApiPlatform"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="find us on twitter"
          >
            <span className="icon-twitter" />
          </a>
          <a
            href="https://github.com/api-platform/api-platform"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="find us on github"
          >
            <span className="icon-github" />
          </a>
        </nav>
        <SwitchTheme />
      </header>
      <BurgerButton onClick={toggleResponsiveMenu} status={showResponsiveMenu ? 'close' : 'burger'} />
    </>
  );
};

export default Header;
