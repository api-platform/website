import React from 'react';
import Nav from './Nav';

const Layout: React.ComponentType = ({ children }) => (
  <div className="full scrollable">
    <Nav />
    {children}
  </div>
);

export default Layout;
