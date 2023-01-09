import { motion } from 'framer-motion';
import { ListProps, PlayerListType } from '../../../typings';
import Player from '../Player/Player';
import { LeftToRightMotion } from './motion';
import styles from './PlayerList.module.scss';

const List = ({ logo, teamName, id, players }: ListProps) => {
  return (
    <>
      <div className={styles.team_info} key={id}>
        <div className={styles.wrapper}>
          <motion.div
            className={styles.team_name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={LeftToRightMotion}
          >
            <div className={styles.logo}>
              <img src={logo} alt="logo" className={styles.logo_img} />
            </div>
            <h2 className={styles.team_name}>{teamName}</h2>
          </motion.div>
          <motion.div
            className={styles.player_list}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={LeftToRightMotion}
          >
            {players.map((player: PlayerListType) => {
              return (
                <div className={styles.card} key={id}>
                  <Player
                    id={player.id}
                    name={player.korName}
                    engName={player.name}
                    summoner={player.summoner}
                    image={player.image}
                    position={player.position}
                    logo={logo}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default List;
