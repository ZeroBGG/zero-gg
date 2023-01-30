import React, { useCallback, useEffect, useState, useRef, ReactNode } from 'react';

interface Type {
  element: React.MouseEvent<HTMLElement>;
}

const useHover = () => {
  const [state, setState] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseOver = useCallback(() => setState(true), []);
  const handleMouseOut = useCallback(() => setState(false), []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mouseenter', handleMouseOver);
    element.addEventListener('mouseleave', handleMouseOut);

    // useEffect에서 이벤트를 등록할 때는
    // 꼭 정리(clean-up)를 해줘야한다.
    return () => {
      element.removeEventListener('mouseenter', handleMouseOver);
      element.removeEventListener('mouseleave', handleMouseOut);
    };
  }, [ref, handleMouseOver, handleMouseOut]);

  return [ref, state];
};

export default useHover;
