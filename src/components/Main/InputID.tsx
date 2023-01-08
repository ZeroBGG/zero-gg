import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';

import styles from './InputID.module.scss';

export default function InputID() {
  const [name, setName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <form className={styles.form}>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="소환사명"
        />
        <button className={styles.button}>
          <GoSearch size="16" color="red" />
        </button>
      </div>
    </form>
  );
}
