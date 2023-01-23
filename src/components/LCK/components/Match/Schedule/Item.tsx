import { matchTeamType, teamType } from '@/components/LCK/typings';
import { useState } from 'react';
import Button from './common/Button';
import styles from './Item.module.scss';

type ItemType = {
  matchType: any;
};

const Item = ({ matchType }: ItemType) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [liveHovering, setLiveHovering] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleLiveMouseOver = () => {
    setLiveHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handleLiveMouseOut = () => {
    setLiveHovering(false);
  };

  return (
    <article className={styles.item_container}>
      {/* 경기 정보 (시간,장소,경기내용) */}
      <div className={styles.match_container}>
        <div className={styles.match_info}>
          <span className={styles.time}>{matchType.time}</span>
          <span className={styles.stadium}>
            서울
            <br />
            LOL Park
          </span>
          <span className={styles.state}>{matchType.state}</span>
        </div>
        <div className={styles.play_team_container}>
          <div className={styles.team_wrapper}>
            <div className={`${styles.home} ${styles.card}`}>
              <img src={matchType.home.logoUrl} alt="home" className={styles.img_logo} />
              <span className={styles.team_initial}>{matchType.home.initial}</span>
            </div>
            <div className={styles.score}>
              <span className={styles.win}>{matchType.home.win}</span>
              <span className={styles.verse}> VS </span>
              <span className={styles.win}>{matchType.away.win}</span>
            </div>
            <div className={styles.team}>
              <div className={`${styles.away} ${styles.card}`}>
                <img src={matchType.away.logoUrl} alt="away" className={styles.img_logo} />
                <span className={styles.team_initial}>{matchType.away.initial}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.lck_btn_container}>
          <div className={styles.btnLayOut}>
            <Button
              onMouseOut={handleLiveMouseOut}
              onMouseOver={handleLiveMouseOver}
              ishovering={isHovering}
              content={'중계 보기'}
            />
          </div>
          <div className={styles.btnLayOut}>
            <Button
              ishovering={isHovering}
              onMouseOut={handleMouseOut}
              onMouseOver={handleMouseOver}
              content={'하이라이트보기'}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Item;
