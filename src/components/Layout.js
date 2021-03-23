import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from './layout/Header';
import Footer from './layout/Footer';
import SideMenu from './layout/SideMenu';
import '../styles/main.scss';
import helmetConfig from '../helmetConfig';
import NavContext from './layout/NavContext';

const Layout = ({ children, location }) => {
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  const withSecondMenuDisplayed = -1 !== location.pathname.search('/docs');

  return (
    <NavContext.Provider value={{ showResponsiveMenu, setShowResponsiveMenu }}>
      <div
        className={classNames('main full', {
          open: showResponsiveMenu,
          'with-second-menu-displayed': withSecondMenuDisplayed,
        })}
      >
        <div className="full">
          <Helmet {...helmetConfig.head}>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/docsearch.js/2.5/docsearch.min.css" />
          </Helmet>
          <Header />
          <div className="page openable">{children}</div>
          <Footer />
        </div>
        <div role="presentation" className="overlay" onClick={() => setShowResponsiveMenu(false)} />
        <SideMenu open={showResponsiveMenu} />
      </div>
    </NavContext.Provider>
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
