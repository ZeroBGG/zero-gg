import { NO_MARK } from '@/components/LCK/components/Constant/constant';
import styles from './NoSchedule.module.scss';

const NoSchedule = () => {
  return (
    <article className={styles.no_schedule}>
      <div className={styles.wrapper}>
        <img src={NO_MARK} alt="no" className={styles.noImg} />
        <h3 className={styles.content}>
          현재 일정이
          <br />
          일정이 없습니다.
        </h3>
      </div>
    </article>
  );
};

export default NoSchedule;
