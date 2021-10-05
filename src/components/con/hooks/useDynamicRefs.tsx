import React, { useState, useEffect, createRef, useCallback } from 'react';

const mapRef = new Map<string, React.RefObject<HTMLDivElement>>();

const updaters = new Set<() => void>();

const setRef = (key: string) => {
  if (mapRef.has(key)) return mapRef.get(key);
  const ref = createRef<HTMLDivElement>();
  mapRef.set(key, ref);
  updaters.forEach((updater) => updater());
  return ref;
};

const useDynamicRefs: () => [
  (key: string) => React.RefObject<HTMLDivElement>,
  (key: string) => React.RefObject<HTMLDivElement>
] = () => {
  const [refs, setRefs] = useState(mapRef);
  const getRef = useCallback((key: string) => refs.get(key), [refs]);
  useEffect(() => {
    const updater = () => {
      setRefs(mapRef);
    };
    updaters.add(updater);
    updater();
    return () => updaters.delete(updater); // cleanup
  }, []);
  return [getRef, setRef];
};

export default useDynamicRefs;
