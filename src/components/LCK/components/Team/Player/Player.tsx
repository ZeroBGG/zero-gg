import LanePositon from '../LanePostion/LanePositon';
import styles from './Player.module.scss';
import { PlayerListType } from '../../../typings';
import { useState } from 'react';
import useHover from '@/hooks/useHover';

const Player = ({ name, position, summoner, image, logo, captain }: PlayerListType) => {
  const [ref, hover] = useHover();

  return (
    <div
      className={styles.player}
      style={{
        backgroundImage: `url(${logo})`,
        backgroundPosition: '400% 40%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '90%',
        zIndex: '0',
      }}
    >
      <div className={styles.player_info}>
        <div className={styles.info}>
          <div className={styles.names} ref={ref}>
            <h3 className={styles.summoner}>{!hover ? summoner : name}</h3>
          </div>
          <div className={styles.position}>
            {captain && (
              <div className={styles.captain_mark}>
                <span className={styles.cap}>C</span>
              </div>
            )}
            {position === 'HeadCoach' && <div className={styles.HC_mark}>HEAD COACH</div>}

            <LanePositon position={position} />
          </div>
        </div>

        <div className={styles.player_img}>
          {image !== '' ? (
            <img className={styles.image} src={image} alt="player_img" />
          ) : (
            <img src="/src/assets/images/Team/none.png" alt="nonePlayer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
