import styles from './LCK.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function LCK() {
  const [isHover, setIsHover] = useState(false);
  const [isHoverTeam, setIsHoverTeam] = useState(false);
  const toggleHover = () => {
    setIsHover((prev) => !prev);
  };
  const toggleHoverTeam = () => {
    setIsHoverTeam((prev) => !prev);
  };
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <Link to={'team'} className={styles.go_to_Team} onMouseEnter={toggleHoverTeam} onMouseLeave={toggleHoverTeam}>
          {!isHoverTeam ? (
            <div className={styles.lck_logo}>
              <img src="src/assets/images/Logo/lck_log.png" alt="lck_logo" />
            </div>
          ) : (
            <div className={styles.trophy}>
              <span>팀 스쿼드</span>
            </div>
          )}
        </Link>

        <Link to={'matches'} className={styles.go_to_Match} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
          {!isHover ? (
            <div className={styles.lck_logo}>
              <img src="src/assets/images/Logo/lck_log.png" alt="lck_logo" />
            </div>
          ) : (
            <div className={styles.lck_logo}>
              <span className={styles.lck_match}>LCK 경기일정</span>
            </div>
          )}
        </Link>
      </div>
    </section>
  );
}
