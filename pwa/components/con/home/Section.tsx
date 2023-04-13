import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { useIntersection } from "react-use";
import useDynamicRefs from "hooks/con/useDynamicRefs";

interface SectionProps extends PropsWithChildren {
  className?: string;
  section: string;
}

interface SectionsContextInterface {
  sectionsVisibles: string[];
  setSectionsVisibles: (sections: string[]) => void;
  isVisible: (section: string) => boolean;
}

export const SectionsContext = createContext<SectionsContextInterface>({
  sectionsVisibles: [],
  setSectionsVisibles: () => null,
  isVisible: () => false,
});

export default function Section({
  className = "",
  section,
  children,
}: SectionProps) {
  const [, setRef] = useDynamicRefs();
  const containerRef = setRef(`section-${section}`);
  const { sectionsVisibles, setSectionsVisibles } = useContext(SectionsContext);

  const intersection =
    containerRef &&
    useIntersection(containerRef, {
      threshold: 0.2,
    });

  const isVisible = intersection?.isIntersecting;

  useEffect(() => {
    if (isVisible && !sectionsVisibles.includes(section)) {
      setSectionsVisibles([...sectionsVisibles, section]);
    } else if (false === isVisible && sectionsVisibles.includes(section)) {
      setSectionsVisibles(
        sectionsVisibles.filter(
          (sectionVisible: string) => sectionVisible !== section
        )
      );
    }
  }, [isVisible, setSectionsVisibles, sectionsVisibles, section]);

  return (
    <section
      key={section}
      className={className}
      ref={containerRef}
      id={section}
    >
      {children}
    </section>
  );
}
