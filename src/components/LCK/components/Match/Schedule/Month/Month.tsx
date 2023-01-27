import { FILTER_CATEGORYS } from '@/data/filterCategory';
import { useDateStore } from '@/components/LCK/Zustand/myMonth';

import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Month.module.scss';

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
    },
    [month],
  );

  return (
    <>
      {month.map((m, idx) =>
        m.contents.map((item: string, idx: number) => (
          <li className={styles.item} onClick={onClick} id={item} key={idx}>
            <Link to={item} style={{ color: '#fff' }}>
              <div className={styles.month}>
                <span>{item}</span>
              </div>
            </Link>
          </li>
        )),
      )}
    </>
  );
};

export default React.memo(Month);
