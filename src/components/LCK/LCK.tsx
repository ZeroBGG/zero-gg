import styles from './LCK.module.scss';
import { Link } from 'react-router-dom';
import { LCK_LOGO, RIOT, RIOT_LOGO } from '@/components/LCK/components/constant/constant';
import { motion } from 'framer-motion';
import { boxVarients } from '@/components/LCK/varients/variants';
export default function LCK() {
  return (
    // 모션 프레이머는 이니셜은 초기값 애니메이트는 애니메이션 입힐때 설정해주면 된다. variants는 전체에 파생되는 애니메이션 때문에 사용함
    // 전체 컨테이너에 사용하고 싶어서 variants로 따로 관리했음.

    <section className={styles.container}>
      <motion.div className={styles.wrapper} initial="out" animate="in" variants={boxVarients}>
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
      </motion.div>
    </section>
  );
}
