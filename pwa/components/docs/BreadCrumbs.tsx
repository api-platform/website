"use client";

import { DocContext } from "contexts/DocContext";
import { useContext, useEffect } from "react";
import { BreadCrumbLink } from "types";

export default function BreadCrumbs({
  breadCrumbs,
}: {
  breadCrumbs: BreadCrumbLink[];
}) {
  const { setBreadCrumbs } = useContext(DocContext);

  useEffect(() => {
    setBreadCrumbs(breadCrumbs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
