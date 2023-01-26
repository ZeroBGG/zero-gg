import { useCallback, useEffect, useState } from 'react';
import styles from './PlayerList.module.scss';
import List from './List';

import { dbService } from 'src/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

import myTeam from '@/components/LCK/Zustand/myTeam';
import SkeletonProfile from '../../Skeleton/SkeletonProfile';
import { ListProps } from '@/components/LCK/typings';

const PlayerList = () => {
  const [teams, setTeam] = useState<ListProps[]>();
  const { myteam } = myTeam();
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
    setTimeout(() => {
      fetchData();
    }, 5000);
  }, []);

  return (
    <div className={styles.list_container}>
      {teams &&
        teams.map((team: ListProps) =>
          myteam !== team.id ? (
            ''
          ) : (
            <div className={styles.list_wrapper} key={team.id}>
              <div className={styles.list}>
                <List id={team.id} teamName={team.teamName} logo={team.logo} players={team.players} />
              </div>
            </div>
          ),
        )}

      {!teams && (
        <div className={styles.list_wrapper}>
          <SkeletonProfile />
        </div>
      )}
    </div>
  );
};

export default PlayerList;
