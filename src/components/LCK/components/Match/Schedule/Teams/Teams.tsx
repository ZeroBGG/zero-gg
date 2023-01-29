import { CategoryType } from '@/components/LCK/typings';
import { useMyTeam } from '@/components/LCK/Zustand/useTeams';
import { TEAM_CATEGORYS } from '@/data/filterCategory';
import useStore from '@/hooks/useStore';
import React, { useEffect, useState } from 'react';

import styles from './Teams.module.scss';

const Teams = React.memo(() => {
  const [team, setTeam] = useState<CategoryType>([]);
  const { id, getId } = useStore();
  const { info, getTeam } = useMyTeam();
  const teams = TEAM_CATEGORYS;
  useEffect(() => {
    setTeam(teams);
  }, []);

  const onClick = (event: React.MouseEvent) => {
    getId(event.currentTarget.id);
    getTeam(event.currentTarget.id);
  };
  return (
    <>
      {team.map((t) => (
        <li className={styles.logo_wrapper} key={t.id}>
          <button className={styles.logo_item} type="button" onClick={onClick} id={t.id} key={t.id}>
            <div
              className={styles.logo}
              style={{
                backgroundImage: `url(${t.url})`,
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
