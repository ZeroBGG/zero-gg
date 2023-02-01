import { useRef, useState, useEffect } from 'react';

export const useIsElInViewport = (options?: IntersectionObserverInit) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    elementRef.current && observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, isVisible]);

  return { elementRef, isVisible };
};
