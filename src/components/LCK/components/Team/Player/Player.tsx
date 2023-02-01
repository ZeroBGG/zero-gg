import LanePositon from '../LanePostion/LanePositon';
import styles from './Player.module.scss';
import useHover from '@/hooks/useHover';
import SkeletonProfile from '../../Skeleton/SkeletonProfile';
import { motion } from 'framer-motion';

interface PlayerProps {
  Loading: boolean;
  name: string;
  position: string;
  summoner: string;
  image: string;
  logo: string;
  captain: boolean;
  KorName: string;
}

const Player = ({ name, position, summoner, image, logo, captain, Loading }: PlayerProps) => {
  const [ref, hover] = useHover();

  return Loading ? (
    <SkeletonProfile />
  ) : (
    <div className={styles.player}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.player_info}
        style={{
          backgroundImage: `url(${logo})`,
          backgroundPosition: '240% 0%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '80%',
          zIndex: '0',
        }}
      >
        <div className={styles.info}>
          <div className={styles.names} ref={ref as React.RefObject<HTMLDivElement>}>
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

        <motion.div
          className={styles.player_img}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {image !== '' ? (
            <img className={styles.image} src={image} alt="player_img" />
          ) : (
            <img src="/assets/images/Team/none.png" alt="nonePlayer" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Player;
