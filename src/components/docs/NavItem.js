import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Collapsible from 'react-collapsible';
import classNames from 'classnames';
import NavItemLink from './NavItemLink';

const NavItem = ({ item, location, current, onClick, version }) => {
  const { items, path, title } = item;
  const versionedPath = `${version}${path}`;
  const open = versionedPath === current;
  return items ? (
    <Collapsible
      className="menu__item"
      openedClassName="menu__item open"
      triggerDisabled
      transitionTime={500}
      open={open}
      easing="ease"
      trigger={
        <div className="item__title" role="presentation" onClick={() => onClick(versionedPath)}>
          <h2 key={versionedPath}>{title}</h2>
          <i className={`icon-chevron-${open ? 'top' : 'down'}`} />
        </div>
      }
    >
      <ul className="menu-item__list">
        {items.map(navItem => {
          const link = 'index' === navItem.id ? `/docs/${versionedPath}/` : `/docs/${versionedPath}/${navItem.id}/`;
          const active = link === location.pathname;
          return (
            <li key={link} className={classNames('menu-item__link', { active })}>
              <NavItemLink
                path={link}
                anchors={navItem.anchors}
                title={navItem.title}
                current={active}
                location={location}
                version={version}
              />
            </li>
          );
        })}
      </ul>
    </Collapsible>
  ) : (
    <div className="menu__item">
      <Link className="item__title" to={`/docs/${versionedPath}/`}>
        <h2 key={versionedPath}>{title}</h2>
      </Link>
    </div>
  );
};

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  current: PropTypes.string,
  onClick: PropTypes.func,
  version: PropTypes.string,
};

NavItem.defaultProps = {
  current: null,
  version: '',
  onClick: () => {},
};

export default NavItem;
