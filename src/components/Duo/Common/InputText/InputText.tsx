import React, { ChangeEvent } from 'react';
import styles from './InputText.module.scss';

interface InputType {
  type: string;
  name?: string;
  id?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // reset: () => void;
  placeholder?: string;
  className?: string;
  inLabelText?: string;
  value: string | number;
}

const InputText = (inputProps: InputType) => {
  const {
    type = inputProps.type,
    name = inputProps.name,
    placeholder = inputProps.placeholder,
    id = inputProps.id,
    inLabelText = inputProps.inLabelText,
    className = inputProps.className,
    value = inputProps.value,
    ...props
  } = inputProps;

  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {inLabelText}
      </label>
      {value !== undefined ? (
        <>
          <input
            type={type}
            name={name}
            id={id}
            className={className}
            placeholder={placeholder}
            value={value}
            {...props}
          />
        </>
      ) : (
        <>
          <input type={type} name={name} id={id} className={className} placeholder={placeholder} {...props} />
        </>
      )}
    </div>
  );
};

export default React.memo(InputText);
