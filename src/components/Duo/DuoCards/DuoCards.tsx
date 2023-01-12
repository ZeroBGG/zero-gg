import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DuoType } from '../utils/DuoType';
import styles from './DuoCards.module.scss';
import { LANE_ICONS_URL, TIER_IMG_URL } from '../Constants/constant';
import { positions, tiers } from '../utils/DuoArr';

const DuoCards = ({ duoObj }: { duoObj: DuoType }) => {
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

  return (
    <>
      <Link to={`${duoObj.userId}`} state={{ duoObj }}>
        <li className={styles.list}>
          <div className={styles.wrapper}>
            <div className={styles.icons}>{ti}</div>
            <div className={styles.icons}>{lane}</div>
            <div className={styles.user}>
              <p>{duoObj.nickName}</p>
            </div>
            <div className={styles.title}>
              <h2>{duoObj.title}</h2>
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
