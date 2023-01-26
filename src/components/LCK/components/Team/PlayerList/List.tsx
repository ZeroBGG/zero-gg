import { motion } from 'framer-motion';
import { ListProps, PlayerListType } from '../../../typings';
import Player from '../Player/Player';
import { LeftToRightMotion } from './varients';
import styles from './List.module.scss';

const List = ({ logo, teamName, id, players }: ListProps) => {
  return (
    <>
      <div className={styles.team_info}>
        <motion.div
          className={styles.team_info_list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={LeftToRightMotion}
        >
          {players?.map((player: PlayerListType, idx: number) => {
            const { korName, summoner, image, position, captain } = player;
            return (
              <div className={styles.card} key={`${player.id}_${idx}a`}>
                <Player
                  name={korName}
                  summoner={summoner}
                  image={image}
                  position={position}
                  logo={logo}
                  captain={captain}
                  id={0}
                  korName={korName}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};

export default List;
