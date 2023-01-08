import LanePositon from '../LanePostion/LanePositon';
import styles from './Player.module.scss';
import { PlayersType } from '../../../typings';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const Player = ({ id, engName, name, position, summoner, image, logo }: PlayersType) => {
  const [isHoverName, setIsHoverName] = useState(false);
  const isMobile = useMediaQuery({
    query: 'min-width: 560px',
  });
  const isPC = useMediaQuery({
    query: '(min-width: 1024px) and (max-width:1920px) ',
  });
  const toggleName = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.currentTarget);
  };

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
          <div className={styles.names} onMouseEnter={toggleName} onMouseLeave={toggleName}>
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
            <img src="../src/assets/images/Team/none.png" alt="nonePlayer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
