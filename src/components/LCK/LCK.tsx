import styles from './LCK.module.scss';
import { Link } from 'react-router-dom';
import { LCK_BG_URL, LCK_LOGO, RIOT, RIOT_LOGO } from './components/Constant/constant';

export default function LCK() {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.border_gradient}>
          <div className={styles.lck_side}>
            <img src="src/assets/LCK/LCK2003.jpeg" alt="2023LCK" className={styles.lck2023} />
          </div>
          <div className={styles.card_container}>
            <div className={`${styles.team_container} ${styles.card}`}>
              <Link to={'team'} className={styles.link_team_page}>
                <span className={styles.title}>
                  2023
                  <br />
                  ROASTER
                </span>
              </Link>
            </div>
            <div
              className={`${styles.match_container} ${styles.card}`}
              style={{
                backgroundImage: `url(${LCK_LOGO})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '170%, 160%',
                backgroundPosition: '90% 60%',
              }}
            >
              <Link to={'matches'} className={styles.link_match_page}>
                <span className={styles.title}>LCK</span>
              </Link>
            </div>
            <div className={`${styles.riot_container} ${styles.card}`}>
              <a
                href={RIOT}
                className={styles.riot_link}
                style={{
                  backgroundImage: `url(${RIOT_LOGO})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const teamBg =
  'https://static.wixstatic.com/media/a3bed3_eba1fcc056034f1aa354812281e38284.jpg/v1/fill/w_600,h_286,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a3bed3_eba1fcc056034f1aa354812281e38284.jpg';
