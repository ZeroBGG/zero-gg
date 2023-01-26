import { SKELTON_DATA } from '@/data/skeleton';
import React, { useState } from 'react';
import { NONE_PLAYER } from '../Constant/constant';
import styles from './SkeletonProfile.module.scss';

interface SkeletonType {
  id: string;
  url: string;
}

const SkeletonProfile = () => {
  const [skeleton, useSkeleton] = useState<SkeletonType[]>(SKELTON_DATA);

  return (
    <div className={styles.skeleton_container}>
      {skeleton.map((ske) => {
        return (
          <div className={`${styles.skeleton_wrapper} ${styles.shimmer}`} key={ske.id}>
            <div className={styles.header}>
              <span className={styles.unknown}>UNKNOWN</span>
              <span className={styles.question}>？</span>
            </div>
            <div className={styles.skeleton_img}>
              <img src={ske.url} alt="lck" className={styles.img} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonProfile;
