import React, { ChangeEvent } from 'react';
import styles from './InputRadio.module.scss';

interface InputType {
  type: string;
  name: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inLabelText: string;
}

const InputRadio = (inputProps: InputType) => {
  const {
    type = inputProps.type,
    name = inputProps.name,
    id = inputProps.id,
    value = inputProps.value,
    inLabelText = inputProps.inLabelText,
    className = inputProps.className,
    ...props
  } = inputProps;
  return (
    <>
      <input type={type} id={id} name={name} value={value} className={className} {...props} />
      <label htmlFor={id}>{inLabelText}</label>
    </>
  );
};

export default InputRadio;
