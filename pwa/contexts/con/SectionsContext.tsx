import { createContext } from "react";

interface SectionsContextInterface {
  sectionsVisibles: string[];
  setSectionsVisibles: (sections: string[]) => void;
}

const SectionsContext = createContext<SectionsContextInterface | null>(null);

export default SectionsContext;
