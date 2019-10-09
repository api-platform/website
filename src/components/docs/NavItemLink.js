import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Collapsible from 'react-collapsible';
import classNames from 'classnames';
import NavSubItemLink from './NavSubItemLink';

const NavItemLink = ({ path, anchors, title, current, location }) => {
  if (anchors) {
    return (
      <Collapsible
        className="submenu__item"
        openedClassName="submenu__item open"
        open={current}
        triggerDisabled
        transitionTime={500}
        easing="ease"
        trigger={<Link to={path}>{title}</Link>}
      >
        <ul>
          {anchors.map(item => {
            const link = `${path}#${item.id}`;
            return (
              <li
                key={link}
                className={classNames('submenu-item__link', {
                  current: '' !== location.hash && `#${item.id}` === location.hash,
                })}
              >
                <Link to={link}>{item.title}</Link>
                {item.anchors && (
                  <NavSubItemLink path={path} anchors={item.anchors} title={item.title} location={location} />
                )}
              </li>
            );
          })}
        </ul>
      </Collapsible>
    );
  }

  return (
    <Link className={classNames({ current })} to={path}>
      {title}
    </Link>
  );
};

NavItemLink.propTypes = {
  path: PropTypes.string.isRequired,
  anchors: PropTypes.array,
  title: PropTypes.string.isRequired,
  current: PropTypes.bool,
  location: PropTypes.object,
};

NavItemLink.defaultProps = {
  anchors: null,
  current: false,
  location: null,
};

export default NavItemLink;
