import { useState, useCallback, ChangeEvent } from 'react';

const useInput = (initialstate: string) => {
  const [value, setValue] = useState(initialstate);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      setValue(e.currentTarget.value);
    },
    [value],
  );

  const reset = useCallback(() => setValue(initialstate), [initialstate]);

  return { value, onChange, reset };
};

export default useInput;
