import data from '@/data/teamSquad.json';
import { useEffect, useState } from 'react';
import { PlayerListType } from '../../typings';
import Player from '../Player/Player';
import styles from './PlayerList.module.scss';

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
                <div className={styles.team_name}>
                  <div className={styles.logo}>
                    <img src={team.logo} alt="logo" />
                  </div>
                  <h2>{team.teamName}</h2>
                </div>
                <div className={styles.player_list}>
                  {team.players.map((player: PlayerListType) => {
                    return (
                      <div className={styles.player_item} key={team.id}>
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
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default PlayerList;
