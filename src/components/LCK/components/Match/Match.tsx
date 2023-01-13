import { useCallback, useEffect, useState } from 'react';
import styles from './Match.module.scss';
import Months from './Months/Month';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
const Match = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>경기 일정</h1>
      </header>
      <Months />
    </section>
  );
};

export default Match;
