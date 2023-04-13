"use client";
import { createContext, PropsWithChildren, useState } from "react";
import { BreadCrumbLink } from "types";

type DocContextType = {
  breadCrumbs: BreadCrumbLink[];
  setBreadCrumbs: (value: BreadCrumbLink[]) => void;
};

export const DocContext = createContext<DocContextType>({
  breadCrumbs: [],
  setBreadCrumbs: () => null,
});

export function DocProvider({ children }: PropsWithChildren) {
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumbLink[]>([]);
  return (
    <DocContext.Provider value={{ breadCrumbs, setBreadCrumbs }}>
      {children}
    </DocContext.Provider>
  );
}
