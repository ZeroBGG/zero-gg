import { useCallback, useEffect, useState } from 'react';
import styles from './PlayerList.module.scss';
import List from './List';
import { dbService } from 'src/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useMyTeam } from '@/components/LCK/Zustand/useMyTeam';
import { ListProps } from '@/components/LCK/typings';

const PlayerList = () => {
  const [teams, setTeam] = useState<ListProps[]>([]);
  const { myteam, getTeam } = useMyTeam();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(() => {
    const lckTeam = query(collection(dbService, 'lck_teamSquad'));
    onSnapshot(lckTeam, (querySnapshot) => {
      try {
        const info: any = querySnapshot.docs.map((docs) => ({
          id: docs.id,
          ...docs.data(),
        }));
        setTeam(info);
      } catch (e) {
        console.error(e);
      }
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    new Promise<void>((res) => {
      setTimeout(() => {
        res();
      }, 1000);
    }).then(() => {
      fetchData();
      setTimeout(() => setIsLoading(false), 500);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('Roaster', myteam);

    let saved = localStorage.getItem('Roaster');

    if (saved !== null) {
      getTeam(saved);
    }
  }, []);

  return (
    <div className={styles.list_container}>
      <div className={styles.list_wrapper}>
        <div className={styles.list}>
          <List isLoading={isLoading} teams={teams} />
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
