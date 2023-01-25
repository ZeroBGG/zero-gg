import styles from './LCK.module.scss';
import { Link } from 'react-router-dom';
import { LCK_BG_URL } from './components/Constant/constant';

export default function LCK() {
  return (
    <section className={styles.container}>
      <nav className={styles.lck_nav}>
        <span className={styles.title}>LCK Page</span>
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
            <img src={LCK_BG_URL} alt="teamBg" className={styles.sohwansa} />
          </Link>
        </div>
      </div>
    </section>
  );
}
const teamBg =
  'https://static.wixstatic.com/media/a3bed3_eba1fcc056034f1aa354812281e38284.jpg/v1/fill/w_600,h_286,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a3bed3_eba1fcc056034f1aa354812281e38284.jpg';
