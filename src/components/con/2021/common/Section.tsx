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

  const { sectionsVisibles, setSectionsVisibles } = useContext(ConfContext);

  const intersection = useIntersection(containerRef, {
    threshold: 0.2,
  });

  const isVisible = intersection?.isIntersecting;

  useEffect(() => {
    if (isVisible && !sectionsVisibles.includes(section)) {
      setSectionsVisibles([...sectionsVisibles, section]);
    } else if (false === isVisible && sectionsVisibles.includes(section)) {
      setSectionsVisibles(sectionsVisibles.filter((sectionVisible) => sectionVisible !== section));
    }
  }, [isVisible, setSectionsVisibles, sectionsVisibles, section]);

  return (
    <SectionContext.Provider value={isVisible}>
      <section className={className} ref={containerRef} id={section}>
        {children}
      </section>
    </SectionContext.Provider>
  );
};

export default Section;
