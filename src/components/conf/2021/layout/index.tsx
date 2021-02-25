import React, { useEffect, useRef, useState, useCallback } from 'react';
import Nav from './Nav';

const Layout: React.ComponentType = ({ children }) => {
  const [hasScroll, setHasScroll] = useState(false);
  const container = useRef(null);
  const onScroll = useCallback(() => {
    setHasScroll(50 < container.current?.scrollTop);
  }, [container]);
  useEffect(() => {
    if (container.current) {
      window.addEventListener('mousewheel', onScroll);
      window.addEventListener('touchmove', onScroll);
    }
    return () => {
      window.removeEventListener('mousewheel', onScroll);
      window.removeEventListener('touchemove', onScroll);
    };
  }, [onScroll]);
  return (
    <div className="conf full scrollable" ref={container}>
      <Nav withScroll={hasScroll} />
      {children}
    </div>
  );
};

export default Layout;
