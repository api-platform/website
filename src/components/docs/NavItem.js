import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Collapsible from 'react-collapsible';
import classNames from 'classnames';
import NavItemLink from './NavItemLink';

const NavItem = ({ item, location, current, onClick }) => {
  const { items, path, title } = item.node;
  const open = path === current;
  return items ? (
    <Collapsible
      className="menu__item"
      openedClassName="menu__item open"
      triggerDisabled
      transitionTime={500}
      open={open}
      easing="ease"
      trigger={
        <div
          className="item__title"
          role="presentation"
          onClick={() => onClick(path)}
        >
          <h2 key={path}>{title}</h2>
          <i className={`icon-chevron-${open ? 'top' : 'down'}`} />
        </div>
      }
    >
      <ul className="menu-item__list">
        {items.map((navItem) => {
          const link = 'index' === navItem.id ? `/docs/${path}` : `/docs/${path}/${navItem.id}`;
          const active = link === location.pathname;
          return (
            <li
              key={link}
              className={classNames('menu-item__link', { active })}
            >
              <NavItemLink
                path={link}
                anchors={navItem.anchors}
                title={navItem.title}
                current={active}
                location={location}
              />
            </li>
          );
        })}
      </ul>
    </Collapsible>
  ) : (
    <div className="menu__item">
      <Link className="item__title" to={`/docs/${path}`}>
        <h2 key={path}>{title}</h2>
      </Link>
    </div>
  );
};

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  current: PropTypes.string,
  onClick: PropTypes.func,
};

NavItem.defaultProps = {
  current: null,
  onClick: () => {},
};

export default NavItem;
