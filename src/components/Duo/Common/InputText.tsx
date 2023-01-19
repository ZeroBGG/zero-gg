import React, { ChangeEvent } from 'react';
import styles from './InputText.module.scss';

interface InputType {
  type: string;
  name: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  inLabelText: string;
}

const InputText = (inputProps: InputType) => {
  const {
    type = inputProps.type,
    name = inputProps.name,
    placeholder = inputProps.placeholder,
    id = inputProps.id,
    inLabelText = inputProps.inLabelText,
    className = inputProps.className,
    ...props
  } = inputProps;

  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {inLabelText}
      </label>
      <input type={type} name={name} id={id} className={styles.input_text} {...props} />
    </>
  );
};

export default InputText;
