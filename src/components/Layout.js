import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from './layout/Header';
import Footer from './layout/Footer';
import SideMenu from './layout/SideMenu';
import '../styles/main.scss';
import helmetConfig from '../helmetConfig';
import NavContext from '../contexts/NavContext';
import ModalCon from '../components/ModalCon';

const Layout = ({ children, location }) => {
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  const isDoc = -1 !== location.pathname.search('/docs');
  const [hasScroll, setHasScroll] = useState(false);

  const onScroll = useCallback(() => {
    setHasScroll(20 < window.scrollY);
  }, [setHasScroll]);

  useEffect(() => {
    setHasScroll(20 < window.scrollY);
  }, [setHasScroll]);

  useEffect(() => {
    if (hasScroll) {
      document.body.classList.add('has-scroll');
    } else {
      document.body.classList.remove('has-scroll');
    }
    return () => {
      document.body.classList.remove('has-scroll');
    };
  }, [hasScroll]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <>
      <NavContext.Provider value={{ showResponsiveMenu, setShowResponsiveMenu }}>
        <div
          className={classNames('main full', {
            open: showResponsiveMenu,
            'is-doc': isDoc,
          })}
        >
          <div className="full">
            <Helmet {...helmetConfig.head}>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/docsearch.js/2.5/docsearch.min.css" />
            </Helmet>
            <Header />
            <div className="page openable">{children}</div>
            {isDoc ? null : <Footer />}
          </div>
          <div role="presentation" className="overlay" onClick={() => setShowResponsiveMenu(false)} />
          <SideMenu open={showResponsiveMenu} />
        </div>
        <ModalCon />
      </NavContext.Provider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object.isRequired,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
