/* eslint-disable import/prefer-default-export */
export const onClientEntry = async () => {
  if ('undefined' === typeof IntersectionObserver) {
    await import('intersection-observer');
  }
};
