import styles from './Skeleton_Logo.module.scss';

const Skeleton_Logo = () => {
  return (
    <div className={styles.skeleton_logo}>
      <div className={`${styles.wrapper} ${styles.shimmer}`}>
        <div className={styles.skeleton_slide}>
          <div className={`${styles.skeleton_logo} ${styles.shimmer}`}>&nbsp;</div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton_Logo;
