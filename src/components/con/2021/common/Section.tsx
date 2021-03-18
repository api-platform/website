import React, { createContext, useContext, useRef, useEffect } from 'react';
import { useIntersection } from 'react-use';
import { ConfContext } from '../layout';

interface SectionProps {
  className: string;
  section: string;
}

export const SectionContext = createContext(null);
const Section: React.ComponentType<SectionProps> = ({ className, section, children }) => {
  const containerRef = useRef(null);

  const { activeLink, setActiveLink, sectionsVisibles, setSectionsVisibles } = useContext(ConfContext);

  const intersection = useIntersection(containerRef, {
    rootMargin: '20px 0px -60%',
    threshold: 0,
  });

  const isVisible = intersection?.isIntersecting;

  useEffect(() => {
    if (isVisible && !sectionsVisibles.includes(section)) {
      setSectionsVisibles([...sectionsVisibles, section]);
    } else if (!isVisible && sectionsVisibles.includes(section)) {
      setSectionsVisibles(sectionsVisibles.filter((sectionVisible) => sectionVisible !== section));
    }
  }, [isVisible, setSectionsVisibles, sectionsVisibles, section]);

  useEffect(() => {
    if (isVisible) {
      setActiveLink(section);
      window.history.replaceState({}, '', 'home' === section ? '#' : `#${section}`);
    }
    if (!isVisible && section === activeLink) {
      setActiveLink(null);
      window.history.replaceState({}, '', '#');
    }
  }, [section, setActiveLink, activeLink, isVisible]);

  return (
    <SectionContext.Provider value={isVisible}>
      <section className={className} ref={containerRef} id={section}>
        {children}
      </section>
    </SectionContext.Provider>
  );
};

export default Section;
