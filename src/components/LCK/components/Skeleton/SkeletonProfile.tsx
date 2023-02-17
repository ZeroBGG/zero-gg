import styles from './SkeletonProfile.module.scss';

const SkeletonProfile = () => {
  return (
    <div className={styles.skeleton_container}>
      <div className={styles.skeleton_wrapper}>
        <div className={styles.spinner}></div>
        <span className={styles.loading}>Loading...</span>
      </div>
    </div>
  );
};

export default SkeletonProfile;
