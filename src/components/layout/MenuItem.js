import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

const MenuItemLink = ({ path, children }) => {
  if (!path) {
    return <div className="menu-item__link">{children}</div>;
  }

  if ('/' === path.substr(0, 1)) {
    return (
      <Link className="menu-item__link" to={path}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className="menu-item__link"
      href={path}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

MenuItemLink.propTypes = {
  children: PropTypes.any,
  path: PropTypes.string,
};

MenuItemLink.defaultProps = {
  children: null,
  path: null,
};

const MenuItem = ({ text, rootPath, path, submenu, location }) => {
  const current =
    location.pathname === path ||
    (rootPath && location.pathname.substr(0, rootPath.length) === rootPath);
  return (
    <div className={classNames('menu-item', { withSubmenu: submenu, current })}>
      <MenuItemLink text={text} path={path}>
        <span>{text}</span>
        {submenu && <i className="icon-chevron-circle-down" />}
      </MenuItemLink>
      {submenu && (
        <div className="menu-item__submenu">
          {submenu.map(({ text: itemText, path: itemPath }) => (
            <Link key={itemText} to={itemPath} className="submenu__item">
              {itemText}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

MenuItem.propTypes = {
  location: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  rootPath: PropTypes.string,
  path: PropTypes.string,
  submenu: PropTypes.array,
};

MenuItem.defaultProps = {
  submenu: null,
  path: null,
  rootPath: null,
};

export default withRouter(MenuItem);
