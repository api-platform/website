/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useCallback, useContext } from 'react';
import classNames from 'classnames';
import { useLocation } from '@reach/router';
import { ConfContext } from '.';

const MobileNav: React.ComponentType = () => {
  const { pathname } = useLocation();
  const [opened, setOpened] = useState(false);
  const { nav } = useContext(ConfContext);

  const toggleOpen = useCallback(() => {
    setOpened(!opened);
  }, [setOpened, opened]);

  return (
    <>
      <div className={classNames('conf__burger-btn', { opened })} onClick={toggleOpen}>
        <div className="burger-btn__line" />
      </div>
      <div className={classNames('conf__mobile-nav', { opened })}>
        {nav.backLink && nav.backLink.to !== pathname ? (
          <a
            key={nav.backLink.text}
            href={nav.backLink.to}
            className="conf__mobile-item conf__mobile-item-back"
            onClick={toggleOpen}
          >
            {`< ${nav.backLink.text}`}
          </a>
        ) : null}
        {nav.links.map((link) => (
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
