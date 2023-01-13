import { motion } from 'framer-motion';
import { ListProps, PlayerListType, PlayersType } from '../../../typings';
import Player from '../Player/Player';
import { LeftToRightMotion } from './varients';
import styles from './PlayerList.module.scss';
import { dbService } from 'src/firebase';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const List = ({ logo, teamName, id, players }: ListProps) => {
  return (
    <>
      <div className={styles.team_info}>
        <motion.div
          className={styles.team_name}
          viewport={{ once: true, amount: 0.5 }}
          initial="hidden"
          whileInView="visible"
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
          variants={LeftToRightMotion}
        >
          {players.map((player: PlayerListType) => {
            return (
              <div className={styles.card} key={player.id}>
                <Player
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
    </>
  );
};

export default List;
