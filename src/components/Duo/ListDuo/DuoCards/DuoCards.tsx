import { Link } from 'react-router-dom';
import { DuoType, LaneType, TierType } from '../../utils/DuoType';
import { positions, tiers } from '../../utils/DuoArr';
import { LANE_ICONS_URL, TIER_IMG_URL } from '@/components/Duo/Constants/constant';
import styles from './DuoCards.module.scss';

const DuoCards = ({ duoObj }: { duoObj: DuoType }) => {
  const UNIQUE_KEY = duoObj.userId + duoObj.timeSet;
  const lane = positions.map((item: LaneType, idx: number) => {
    if (item.lane === duoObj.position) {
      return (
        <div className={styles.icons} key={`${item.lane}_${idx}`}>
          <img src={`${LANE_ICONS_URL}/${item.url}`} alt="라인 이미지" />
        </div>
      );
    }
  });

  const ti = tiers.map((item: TierType, idx: number) => {
    if (item.tier === duoObj.tier) {
      return (
        <div className={styles.icons} key={`${item.tier}_${idx}`}>
          <img src={`${TIER_IMG_URL}/${item.url}`} alt="티어 이미지" />
        </div>
      );
    }
  });

  if (duoObj.userId === null) {
    console.log('존재하지 않습니다.');
    return (
      <li>
        <p>존재하지 않습니다.</p>
      </li>
    );
  }

  return (
    <Link to={`${duoObj.userId}` + `${duoObj.id}`} state={{ duoObj }} key={UNIQUE_KEY}>
      <li className={styles.list} key={UNIQUE_KEY}>
        <div className={styles.wrapper}>
          {ti}
          {lane}
          <div className={styles.user}>
            <p>{duoObj.nickName}</p>
          </div>
          <div className={styles.title}>
            <h3>{duoObj.title}</h3>
          </div>
          <div className={styles.memo}>
            <p>{duoObj.memo}</p>
          </div>
          <div className={styles.champ}>
            <p>{duoObj.mostChamp}</p>
          </div>
          <div className={styles.time}>
            <p>{duoObj.timeSet}</p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default DuoCards;
