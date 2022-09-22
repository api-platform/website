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
import NavContext from '../../contexts/NavContext';

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
        <BurgerButton
          className="on_header"
          onClick={toggleResponsiveMenu}
          status={showResponsiveMenu ? 'close' : 'burger'}
        />
      </header>
    </>
  );
};

export default Header;
