import { FILTER_CATEGORYS } from '@/data/filterCategory';
import { useDateStore } from '@/components/LCK/Zustand/myMonth';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Month.module.scss';
import { useTeams } from '@/components/LCK/Zustand/useTeams';

const Month = () => {
  const [month, setMonth] = useState<any[]>([]);
  const { mon, getMonth } = useDateStore();
  const monthArr = FILTER_CATEGORYS;
  useEffect(() => {
    setMonth(monthArr);
  }, []);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      getMonth(event.currentTarget.id);
      console.log(event.currentTarget.id);
    },
    [month],
  );

  return (
    <>
      {month.map((m, idx) => (
        <li className={styles.item} onClick={onClick} id={m.id} key={idx}>
          <Link to={m.id} style={{ color: '#fff' }}>
            <div className={styles.month}>
              <span>{m.month}</span>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
};

export default React.memo(Month);
