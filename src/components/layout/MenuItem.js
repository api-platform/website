import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
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
    <a className="menu-item__link" href={path} target="_blank" rel="noopener noreferrer">
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

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.current = location.pathname.includes(this.props.path);
  }

  render() {
    const { text, path, submenu } = this.props;
    return (
      <div className={classNames('menu-item', { withSubmenu: submenu, current: this.current })}>
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
  }
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string,
  submenu: PropTypes.array,
};

MenuItem.defaultProps = {
  submenu: null,
  path: null,
};

export default MenuItem;
