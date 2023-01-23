import { TEAM_CATEGORYS } from '@/data/filterCategory';
import useFilterValueStore from '@/hooks/useStore';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import styles from './Teams.module.scss';

interface Props {
  onClick: (team: string) => void;
}
const Teams = (props: Props) => {
  const [team, setTeam] = useState<any[]>([]);
  const [value, setValue] = useState<string>('');
  const teams = TEAM_CATEGORYS;
  useEffect(() => {
    setTeam(teams);
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    props.onClick(event.currentTarget.id);
  };
  return (
    <li className={styles.logo_wrapper}>
      {team.map((t) => (
        <button type="button" onClick={handleClick} id={t.id} key={t.id}>
          <div
            className={styles.logo_item}
            style={{
              backgroundImage: `url(${t.url})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
            }}
          ></div>
        </button>
      ))}
    </li>
  );
};

export default Teams;
