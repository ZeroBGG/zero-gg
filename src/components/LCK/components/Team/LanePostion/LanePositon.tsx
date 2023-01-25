import { icons } from '@/data/position';
import { ICON_URL } from '@/components/LCK/components/Constant/constant';

import styles from '../LanePostion/LanePosition.module.scss';
import { RefObject } from 'react';
interface PositionType {
  position: string;
}
const LanePositon = ({ position }: PositionType) => {
  return (
    <div>
      {icons.map((p, index) => {
        if (position === p.name)
          return (
            <div key={`${p.name}_${index}`} className={styles.lane}>
              <img src={`${ICON_URL}/${p.url}`} alt="position" className={styles.lane_img} />
            </div>
          );
      })}
    </div>
  );
};

export default LanePositon;
