import { teamType } from '@/components/LCK/typings';
import styles from './Item.module.scss';

type ItemType = {
  time: string;
  date: string;
  blue: teamType;
  red: teamType;
  idx: number;
  state: string;
};
const Item = ({ time, date, red, blue, state }: ItemType) => {
  return (
    <>
      {/* 경기 정보 (시간,장소,경기내용) */}
      <div className={styles.match_info}>
        <span className={styles.time}>{time}</span>
        <span className={styles.stadium}>Seoul LoL Park</span>
        <span className={styles.state}>{state}</span>
      </div>
      {/* Team 관련 */}
      <div className={styles.team_info}>
        <div className={[styles.blue, styles.team].join('')}>
          <span className={styles.initial}>{blue.initial}</span>
          <img src={blue.logoUrl} alt="blue_logo" className={styles.img_logo} />
        </div>
        <span className={styles.win}>{blue.win}</span>
        <span className={styles.verse}>VS</span>
        <div className={styles.win}>{red.win}</div>
        <div className={[styles.red, styles.team].join('')}>
          <img src={red.logoUrl} alt="red_logo" className={styles.img_logo} />
          <span className={styles.initial}>{red.initial}</span>
        </div>
      </div>
    </>
  );
};

export default Item;
