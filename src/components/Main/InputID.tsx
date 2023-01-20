import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

import styles from './InputID.module.scss';

export default function InputID() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    navigate(`/record/${name}`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="소환사명"
          autoComplete="off"
        />
        <button className={styles.button}>
          <GoSearch size="18" color="red" className={styles.svg} />
        </button>
      </div>
    </form>
  );
}
