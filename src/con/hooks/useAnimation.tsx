import { useRef, useEffect, useState } from 'react';
import { useIntersection } from 'react-use';
import gsap from 'gsap';

export type DirectionType = 'bottom' | 'left' | 'right' | 'top' | 'scale';

const fadeIn = (element: gsap.TweenTarget, duration: number, delay: number) => {
  gsap.to(element, duration, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    ease: 'power4.out',
    delay,
  });
};

const fadeOut = (element: gsap.TweenTarget, direction: DirectionType, duration: number, animationValue: number) => {
  let x = 0;
  let y = 0;
  let scale = 1;
  switch (direction) {
    case 'bottom':
      y = animationValue || +100;
      break;
    case 'left':
      x = animationValue || +100;
      break;
    case 'right':
      x = animationValue || -100;
      break;
    case 'scale':
      scale = animationValue || 0.8;
      break;
    case 'top':
      y = animationValue || +100;
      break;
    default:
      x = animationValue || +100;
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
  duration?: number,
  animationValue?: number,
  delay?: number,
  rootMargin?: string
) => React.RefObject<HTMLDivElement> = (
  direction = 'right',
  duration = 1,
  animationValue,
  delay = 0,
  rootMargin = '-10%'
) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin,
  });

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsMobile(/Mobi/i.test(window.navigator.userAgent));
    }
  }, [setIsMobile]);
  if (isMobile) return ref; // no animation on mobile device
  if (
    intersection &&
    ref.current &&
    ('bottom' !== direction || 0 < intersection.boundingClientRect.y) // avoid intersection box issue
  ) {
    if (intersection.isIntersecting) fadeIn(ref.current, duration, delay);
    else fadeOut(ref.current, direction, duration, animationValue);
  }
  return ref;
};

export default useAnimation;
