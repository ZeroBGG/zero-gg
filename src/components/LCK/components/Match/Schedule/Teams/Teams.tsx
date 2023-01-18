import { matchProps, teamType } from '@/components/LCK/typings';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { useMemo, useState } from 'react';
import { dbService } from 'src/firebase';
import styles from './Teams.module.scss';

type TeamType = {
  id: string;
  logo: string;
}[];
interface ClickProps {
  onChange: (event: React.MouseEvent) => void;
}

const Teams = ({ onChange }: ClickProps) => {
  const [logos, setLogos] = useState<TeamType>([]);
  const [checked, setChecked] = useState<boolean>(false);
  useMemo(() => {
    const lckTeam = query(collection(dbService, 'lck_teamSquad'));
    onSnapshot(lckTeam, (querySnapshot) => {
      try {
        const info: any = querySnapshot.docs.map((docs) => ({
          id: docs.id,
          ...docs.data(),
        }));
        setLogos(info);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  return (
    <div className={styles.logo_wrapper}>
      <div className={styles.logo_item} id={'all'}>
        전체
      </div>
      {logos.map((logo) => (
        <div
          className={styles.logo_item}
          key={logo.id}
          onClick={onChange}
          id={logo.id}
          style={{
            backgroundImage: `url(${logo.logo})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
          }}
        ></div>
      ))}
    </div>
  );
};

export default Teams;
