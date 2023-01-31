import { Link } from 'react-router-dom';
import { DuoType } from '../utils/DuoType';
import { positions, tiers } from '../utils/DuoArr';
import { LANE_ICONS_URL, TIER_IMG_URL } from '@/components/Duo/Constants/constant';
import styles from './DuoCards.module.scss';

const DuoCards = ({ duoObj }: { duoObj: DuoType }) => {
  const UNIQUE_KEY = duoObj.userId + duoObj.timeSet;
  const lane = positions.map((item) => {
    if (item.lane === duoObj.position) {
      return (
        <>
          <img src={`${LANE_ICONS_URL}/${item.url}`} />
        </>
      );
    }
  });

  const ti = tiers.map((item) => {
    if (item.tier === duoObj.tier) {
      return (
        <>
          <img src={`${TIER_IMG_URL}/${item.url}`} />
        </>
      );
    }
  });

  // console.log(duoObj.userId);

  if (duoObj.userId === null) {
    console.log('존재하지 않습니다.');
    return (
      <>
        <li>
          <p>존재하지 않습니다.</p>
        </li>
      </>
    );
  }

  return (
    <>
      <Link to={`${duoObj.userId}`} state={{ duoObj }} key={UNIQUE_KEY}>
        <li className={styles.list} key={UNIQUE_KEY}>
          <div className={styles.wrapper}>
            <div className={styles.icons}>{ti}</div>
            <div className={styles.icons}>{lane}</div>
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
    </>
  );
};

export default DuoCards;
