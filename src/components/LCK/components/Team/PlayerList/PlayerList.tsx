import { useEffect, useState } from 'react';
import styles from './PlayerList.module.scss';
import List from './List';

import { dbService } from 'src/firebase';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { useParams } from 'react-router';

const PlayerList = () => {
  const [teams, setTeam] = useState<any[]>([]);
  const id = useParams();

  useEffect(() => {
    const lckTeam = query(collection(dbService, 'lck_teamSquad'));
    onSnapshot(lckTeam, (querySnapshot) => {
      const info = querySnapshot.docs.map((docs) => ({
        id: docs.id,
        ...docs.data(),
      }));
      setTeam(info);
    });
  }, []);
  console.log(id.team);
  return (
    <div className={styles.list_container}>
      {teams.map((team) => {
        if (id.team !== team.id) {
          return <></>;
        } else {
          return (
            <div key={team.id} className={styles.list}>
              <List id={team.id} teamName={team.teamName} logo={team.logo} players={team.players} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default PlayerList;
