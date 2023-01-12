import LanePositon from '../LanePostion/LanePositon';
import styles from './Player.module.scss';
import { PlayersType } from '../../../typings';
import { useEffect, useRef, useState } from 'react';

const Player = ({ engName, name, position, summoner, image, logo }: PlayersType) => {
  const [isHoverName, setIsHoverName] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver(intersectionObserver);
    imgRef.current && observer.current.observe(imgRef.current);
  }, []);

  const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        setIsLoading(true);
      }
    });
  };

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
            <img
              className={styles.image}
              ref={imgRef}
              src={isLoading ? image : '../src/assets/images/Team/none.png'}
              alt="player_img"
            />
          ) : (
            <img src="../src/assets/images/Team/none.png" alt="nonePlayer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
