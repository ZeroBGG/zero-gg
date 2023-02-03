import styles from './LCK.module.scss';
import { Link } from 'react-router-dom';
import { LCK_LOGO, RIOT, RIOT_LOGO } from './components/Constant/constant';

export default function LCK() {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.border_gradient}>
          <div className={styles.lck_side}>
            <img src="/assets/LCK/LCK2003.jpeg" alt="2023LCK" className={styles.lck2023} />
          </div>
          <div className={styles.card_container}>
            <div className={`${styles.team_container} ${styles.card}`}>
              <Link to={'team'} className={styles.link_page}>
                <span className={`${styles.title} ${styles.roaster}`}>
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
                backgroundSize: '40%',
                backgroundPosition: '80%',
              }}
            >
              <Link to={'matches'} className={styles.link_page} id={'lck'}>
                <span className={styles.title}>
                  2023
                  <br />
                  LCK
                  <br />
                  SPRING
                </span>
              </Link>
            </div>
            <div className={`${styles.riot_container} ${styles.card}`}>
              <a
                href={RIOT}
                target={'_blank'}
                className={styles.riot_page}
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
