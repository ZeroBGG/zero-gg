import { useState } from 'react';
import styles from './Match.module.scss';
import Schedule from './Schedule/Schedule';
const Match = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const handleClick = () => {
    setIsHover((prev) => !prev);
  };
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}> LCK 경기 일정</h1>
        <button type="button" onClick={handleClick} className={styles.filter_btn}>
          필터
        </button>
      </header>
      <Schedule isHover={isHover} />
    </section>
  );
};

export default Match;
