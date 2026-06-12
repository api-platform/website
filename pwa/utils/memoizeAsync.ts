/**
 * Process-level memoization for async functions.
 *
 * Unlike React's `cache()` (which only dedupes within a single render/request),
 * this keeps results for the lifetime of the Node process. During `next build`
 * the same data files would otherwise be read, parsed and image-processed
 * hundreds of times — once per generated page. Static generation runs across a
 * handful of worker processes, so each worker memoizes the pages it renders.
 *
 * The returned promise is cached (so concurrent callers share one run), and a
 * rejection is evicted so failures are not memoized.
 */
export function memoizeAsync<Args extends any[], R>(
  fn: (...args: Args) => Promise<R>,
  keyFn: (...args: Args) => string = (...args) => JSON.stringify(args)
): (...args: Args) => Promise<R> {
  const store = new Map<string, Promise<R>>();

  return (...args: Args): Promise<R> => {
    const key = keyFn(...args);
    const existing = store.get(key);
    if (existing) return existing;

    const promise = fn(...args).catch((error) => {
      store.delete(key);
      throw error;
    });
    store.set(key, promise);
    return promise;
  };
}
