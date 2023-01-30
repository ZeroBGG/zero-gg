import { NONE_PLAYER } from '../Constant/constant';
import styles from './SkeletonProfile.module.scss';

const SkeletonProfile = () => {
  return (
    <div className={styles.skeleton_container}>
      <div className={`${styles.skeleton_wrapper} ${styles.shimmer}`}>
        {/* <div className={styles.header}>
          <div className={`${styles.unknown}`}>&nbsp;</div>
          <span className={`${styles.question} ${styles.laneShimmer}`}>&nbsp;</span>
        </div>
        <div className={`${styles.skeleton_img} ${styles.shimmer}`}>&nbsp;</div> */}
        <div className={styles.spinner}></div>
        <span className={styles.loading}>Loading...</span>
      </div>
    </div>
  );
};

export default SkeletonProfile;
