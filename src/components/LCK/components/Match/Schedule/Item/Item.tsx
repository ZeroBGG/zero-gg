import { memo } from 'react';
import Button from '../common/Button';
import styles from './Item.module.scss';
import { matchTeamType } from '@/components/LCK/typings';

type ItemType = {
  matchType: matchTeamType;
};

const Item = ({ matchType }: ItemType) => {
  return (
    <div className={styles.item_container}>
      {/* 경기 정보 (시간,장소,경기내용) */}
      <div className={styles.match_container}>
        <div className={styles.match_info}>
          <span className={styles.time}>{matchType.time}</span>
          <span className={styles.state}>{matchType.state}</span>
        </div>
        <div className={styles.play_team_container}>
          <div className={styles.team_wrapper}>
            <div className={`${styles.home} ${styles.card}`}>
              <img src={matchType.home.logoUrl} alt="home" className={styles.img_logo} />
              <span className={styles.team_initial}>{matchType.home.initial}</span>
            </div>
            <div className={styles.score}>
              <span className={styles.win} id={styles.home}>
                {matchType.home.win}
              </span>
              <span className={styles.verse}> - </span>
              <span className={styles.win} id={styles.away}>
                {matchType.away.win}
              </span>
            </div>
            <div className={`${styles.away} ${styles.card}`}>
              <img src={matchType.away.logoUrl} alt="away" className={styles.img_logo} />
              <span className={styles.team_initial}>{matchType.away.initial}</span>
            </div>
          </div>
        </div>
        <div className={styles.lck_btn_container}>
          <div className={styles.btnLayOut}>
            <Button content={'중계 보기'} />
          </div>
          <div className={styles.btnLayOut}>
            <Button content={'하이라이트보기'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
