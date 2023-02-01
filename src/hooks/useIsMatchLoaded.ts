import { useIsElInViewport } from '@/hooks/useIsElInViewport';
import { useEffect, useState } from 'react';

export const useIsMatchLoaded = (lazy: boolean) => {
  const { elementRef, isVisible } = useIsElInViewport({
    rootMargin: '0px 0px 500px 0px',
  });
  const [isLoaded, setIsLoaded] = useState(!lazy);

  useEffect(() => {
    if (isLoaded || !isVisible) {
      return;
    }

    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return { elementRef, isLoaded };
};
