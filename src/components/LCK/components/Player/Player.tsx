import LanePositon from '../LanePostion/LanePositon';
import styles from './Player.module.scss';
import classNames from 'classnames';
import { PlayersType } from '../../typings';

const Player = ({ id, engName, name, position, summoner, image, logo }: PlayersType) => {
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
          <div className={styles.names}>
            <h3 className={styles.summoner}>{summoner}</h3>
            <h3 className={styles.name}>
              {name} <span className={styles.eng_name}>({engName})</span>
            </h3>
          </div>
          <div className={styles.position}>
            <LanePositon position={position} />
          </div>
        </div>

        <div className={styles.player_img}>
          {image !== '' ? (
            <img src={image} alt="player_img" />
          ) : (
            <img src="src/assets/images/Team/none.png" alt="nonePlayer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
