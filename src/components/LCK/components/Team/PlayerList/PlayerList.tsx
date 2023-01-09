import data from '@/data/teamSquad.json';
import { useEffect, useState } from 'react';
import styles from './PlayerList.module.scss';
import List from './List';
interface Props {
  id: string;
}

const PlayerList = ({ id }: Props) => {
  const [teams, setTeams] = useState<any[]>([]);
  useEffect(() => {
    setTeams(data);
  }, []);

  return (
    <div className={styles.list_container}>
      {teams.map((team) => {
        if (id !== team.id) {
          return <></>;
        } else {
          return <List id={team.id} teamName={team.teamName} logo={team.logo} players={team.players} />;
        }
      })}
    </div>
  );
};

export default PlayerList;
