import { createContext } from 'react';

interface SectionsContextInterface {
  sectionsVisibles: string[];
  setSectionsVisibles: (sections: string[]) => void;
}

const SectionsContext = createContext<SectionsContextInterface>(null);

export default SectionsContext;
