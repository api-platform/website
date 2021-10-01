/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useCallback } from 'react';
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
        <a href="/con/" className="conf__mobile-item conf__mobile-item-back" onClick={toggleOpen}>
          {`< Current edition`}
        </a>
        <a
          href="/con/2021/"
          className={classNames('conf__mobile-item', {
            active: '/con/2021/' === pathname,
          })}
          onClick={toggleOpen}
        >
          Home
        </a>
        {links.map((link) => (
          <a
            key={link.text}
            href={link.to}
            className={classNames('conf__mobile-item', {
              active: link.to === pathname,
            })}
            onClick={toggleOpen}
          >
            {link.text}
          </a>
        ))}
      </div>
    </>
  );
};

export default MobileNav;
