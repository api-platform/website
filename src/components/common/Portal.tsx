// Example from gatsby-plugin-portal
// https://www.gatsbyjs.com/plugins/gatsby-plugin-portal/?=gatsby-plugin-portal#gatsby-gotcha---document-is-undefined

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

// Use a ternary operator to make sure that the document object is defined
const portalRoot = `undefined` !== typeof document ? document.getElementById('portal') : null;

const Portal: React.ComponentType = ({ children }) => {
  const el = `undefined` !== typeof document ? document.createElement('div') : null;

  useEffect(() => {
    if (!el) return null;
    portalRoot.appendChild(el);
    return () => {
      if (el) portalRoot.removeChild(el);
    };
  }, [el]);

  return el ? ReactDOM.createPortal(children, el) : null;
};

export default Portal;
