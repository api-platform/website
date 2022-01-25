import { useCallback, useEffect } from 'react';

const useDebouncedEffect: (effect: () => void, delay: number, deps: any[]) => void = (effect, delay, deps) => {
  const callback = useCallback(effect, [...deps, effect]);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

export default useDebouncedEffect;
