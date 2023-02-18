import { CategoryType } from '@/components/LCK/typings';
import { TEAM_CATEGORYS } from '@/data/filterCategory';
import useStore from '@/components/LCK/Zustand/useStore';
import React, { useEffect, useState } from 'react';

import styles from './Teams.module.scss';

const Teams = React.memo(() => {
  const [team, setTeam] = useState<CategoryType>([]);
  const { teamId, getId } = useStore();
  const teams = TEAM_CATEGORYS;
  useEffect(() => {
    setTeam(teams);
  }, []);

  const onClick = (event: React.MouseEvent) => {
    getId(event.currentTarget.id);
  };
  return (
    <>
      {team.map((item) => (
        <li className={styles.logo_wrapper} key={item.id}>
          <button className={styles.logo_item} type="button" onClick={onClick} id={item.id} key={item.id}>
            <div
              className={styles.logo}
              style={{
                backgroundImage: `url(${item.url})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
              }}
            ></div>
          </button>
        </li>
      ))}
    </>
  );
});

export default Teams;
