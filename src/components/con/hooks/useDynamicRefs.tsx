import React, { useState, useEffect, useCallback } from 'react';

const mapRef = new Map<string, React.RefObject<HTMLDivElement>>();

const listeners = new Set<() => void>();

const setRef: (key: string) => React.RefObject<HTMLDivElement> = (key) => {
  const ref = React.createRef<HTMLDivElement>();
  mapRef.set(key, ref);
  listeners.forEach((listener) => listener());
  return ref;
};

const useDynamicRefs: () => [
  (key: string) => React.RefObject<HTMLDivElement>,
  (key: string) => React.RefObject<HTMLDivElement>
] = () => {
  const [refs, setRefs] = useState(mapRef);

  useEffect(() => {
    const listener = () => {
      setRefs(mapRef);
    };
    listeners.add(listener);
    listener(); // in case it's already changed
    return () => listeners.delete(listener); // cleanup
  }, []);

  const getRef = useCallback((key) => refs.get(key), [refs]);

  return [getRef, setRef];
};

export default useDynamicRefs;
