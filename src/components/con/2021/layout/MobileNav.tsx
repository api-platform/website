/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useCallback } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { useLocation } from '@reach/router';
import links from '../data/nav';

const MobileNav: React.ComponentType = () => {
  const { pathname } = useLocation();
  const [opened, setOpened] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpened(!opened);
  }, [setOpened, opened]);

  return (
    <>
      <div className={classNames('conf__burger-btn', { opened })} onClick={toggleOpen}>
        <div className="burger-btn__line" />
      </div>
      <div className={classNames('conf__mobile-nav', { opened })}>
        <Link
          to="/con/2021/"
          className={classNames('conf__mobile-item', {
            active: '/con/2021/' === pathname,
          })}
          onClick={toggleOpen}
        >
          Home
        </Link>
        {links.map((link) => (
          <Link
            to={link.to}
            className={classNames('conf__mobile-item', {
              active: link.to === pathname,
            })}
            onClick={toggleOpen}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </>
  );
};

export default MobileNav;
