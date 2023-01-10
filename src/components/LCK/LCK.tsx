import styles from './LCK.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
export default function LCK() {
  const [isHover, setIsHover] = useState(false);
  const [isHoverTeam, setIsHoverTeam] = useState(false);

  return (
    <section className={styles.container}>
      <nav className={styles.lck_nav}>
        <p className={styles.title}>LCK Page</p>
      </nav>
      <div className={styles.card_container}>
        <div className={`${styles.team_container} ${styles.card}`}>
          <Link to={'team'} className={styles.link_team_page}>
            <span className={styles.lck_team}>TEAM</span>
            <img src={teamBg} alt="teamBg" className={styles.sohwansa} />
          </Link>
        </div>
        <div className={`${styles.match_container} ${styles.card}`}>
          <Link to={'matches'} className={styles.link_match_page}>
            <span className={styles.lck_match}>LCK MATCH</span>
            <img src={matchBg} alt="teamBg" className={styles.sohwansa} />
          </Link>
        </div>
      </div>
    </section>
  );
}
const matchBg = 'https://img.etnews.com/photonews/2006/1312025_20200619134128_111_0002.jpg';
const teamBg =
  'https://static.wixstatic.com/media/a3bed3_eba1fcc056034f1aa354812281e38284.jpg/v1/fill/w_600,h_286,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a3bed3_eba1fcc056034f1aa354812281e38284.jpg';
