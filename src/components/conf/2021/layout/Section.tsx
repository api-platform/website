import React, { createContext, useContext, useRef, useEffect } from 'react';
import { useIntersection } from 'react-use';
import { ConfContext } from '../../../../pages/conf/2021';

interface SectionProps {
  className: string;
  section: string;
}

export const SectionContext = createContext(null);
const Section: React.ComponentType<SectionProps> = ({ className, section, children }) => {
  const containerRef = useRef(null);

  const { activeLink, setActiveLink } = useContext(ConfContext);

  const intersection = useIntersection(containerRef, {
    root: document.querySelector('#conf'),
    rootMargin: '20px 0px -90%',
    threshold: 0,
  });

  const isVisible = intersection?.isIntersecting;

  useEffect(() => {
    if (isVisible) setActiveLink(section);
    if (!isVisible && section === activeLink) setActiveLink(null);
  }, [section, setActiveLink, activeLink, isVisible]);

  return (
    <SectionContext.Provider value={isVisible}>
      <section className={className} ref={containerRef}>
        {children}
      </section>
    </SectionContext.Provider>
  );
};

export default Section;
