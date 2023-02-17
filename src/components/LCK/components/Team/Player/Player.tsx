import LanePositon from '../LanePostion/LanePositon';
import styles from './Player.module.scss';
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
const BACKGORUND = {
  POSITION: '240% 0%',
  REPEAT: 'no-repeat',
  SIZE: '80%',
  ZINDEX: '0',
} as const;

const Player = ({ name, position, summoner, image, logo, captain, Loading }: PlayerProps) => {
  return Loading ? (
    <SkeletonProfile />
  ) : (
    <div className={styles.player}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.player_info}
        style={{
          backgroundImage: `url(${logo})`,
          backgroundPosition: BACKGORUND.POSITION,
          backgroundRepeat: BACKGORUND.REPEAT,
          backgroundSize: BACKGORUND.SIZE,
          zIndex: BACKGORUND.ZINDEX,
        }}
      >
        <div className={styles.info}>
          <div className={styles.names}>
            <h3 className={styles.summoner}> {summoner} </h3>
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

        <motion.div className={styles.player_img} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
