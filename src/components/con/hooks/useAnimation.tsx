import { useRef } from 'react';
import { useIntersection } from 'react-use';
import gsap from 'gsap';

export type DirectionType = 'bottom' | 'left' | 'right' | 'top' | 'scale';

const fadeIn = (element: gsap.TweenTarget, duration: number) => {
  gsap.to(element, duration, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    ease: 'power4.out',
  });
};

const fadeOut = (element: gsap.TweenTarget, direction: DirectionType, duration: number) => {
  let x = 0;
  let y = 0;
  let scale = 1;
  switch (direction) {
    case 'bottom':
      y = +100;
      break;
    case 'left':
      x = +100;
      break;
    case 'right':
      x = -100;
      break;
    case 'scale':
      scale = 0.8;
      break;
    default:
      y = +100;
  }

  gsap.to(element, duration, {
    opacity: 0,
    x,
    y,
    scale,
    ease: 'power4.out',
  });
};

const useAnimation: (
  direction?: DirectionType,
  intersectionParams?: { rootMargin?: string },
  duration?: number
) => React.RefObject<HTMLDivElement> = (
  direction = 'right',
  intersectionParams = { rootMargin: '-10%' },
  duration = 1
) => {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {
    root: null,
    ...intersectionParams,
  });

  if (
    intersection &&
    ref.current &&
    ('bottom' !== direction || 0 < intersection.boundingClientRect.y) // avoid intersection box issue
  ) {
    if (intersection.isIntersecting) fadeIn(ref.current, duration);
    else fadeOut(ref.current, direction, duration);
  }
  return ref;
};

export default useAnimation;
