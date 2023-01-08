import data from '@/data/teamSquad.json';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayerListType } from '../../../typings';
import Player from '../Player/Player';
import styles from './PlayerList.module.scss';
import { motion } from 'framer-motion';
interface Props {
  id: string;
}

const PlayerList = ({ id }: Props) => {
  const [teams, setTeams] = useState<any[]>([]);
  useEffect(() => {
    setTeams(data);
  }, []);
  console.log();
  return (
    <div className={styles.container}>
      {teams.map((team) => {
        if (id === team.id) {
          return (
            <div className={styles.team_info} key={team.id}>
              <div className={styles.wrapper}>
                <motion.div
                  className={styles.team_name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <div className={styles.logo}>
                    <img src={team.logo} alt="logo" />
                  </div>
                  <h2>{team.teamName}</h2>
                </motion.div>
                <motion.div
                  className={styles.player_list}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  {team.players.map((player: PlayerListType) => {
                    return (
                      <div className={styles.card} key={team.id}>
                        <Player
                          id={player.id}
                          name={player.korName}
                          engName={player.name}
                          summoner={player.summoner}
                          image={player.image}
                          position={player.position}
                          logo={team.logo}
                        />
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default PlayerList;
{
  /* <motion.div
  className="md:w-3/5"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.5 }}
  variants={{
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  }}
></motion.div>; */
}
