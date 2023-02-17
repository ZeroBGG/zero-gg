import { useState, useCallback, ChangeEvent } from 'react';

// interface ResetProps {
//   reset: (initialstate: string) => void;
// }

const useInput = (initialstate: string) => {
  const [value, setValue] = useState<string>(initialstate);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      setValue(e.currentTarget.value);
    },
    [value],
  );

  const reset = useCallback(() => setValue(initialstate), [initialstate]);

  return { value, setValue, onChange, reset };
};

export default useInput;
