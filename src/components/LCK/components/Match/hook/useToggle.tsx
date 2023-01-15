import { useCallback, useState } from 'react';

const useToggle = ({ parentRef, childRef }: any) => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false);

  const toggle_month = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = '0';
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      }

      setIsCollapse(!isCollapse);
    },
    [isCollapse],
  );

  return toggle_month;
};

export default useToggle;
