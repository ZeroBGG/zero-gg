import { FILTER_CATEGORYS } from '@/data/filterCategory';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Month.module.scss';

interface Props {
  onClick: (month: string) => void;
}

const Month = (props: Props) => {
  const array = Array.from({ length: 12 }, (v, i) => `${i + 1}`);
  const [month, setMonth] = useState<any[]>([]);
  const monthArr = FILTER_CATEGORYS;
  useEffect(() => {
    setMonth(monthArr);
  }, []);
  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    props.onClick(event.currentTarget.id);
  };
  return (
    <>
      {month.map((m, idx) =>
        m.contents.map((item: string, idx: number) => (
          <li className={styles.item} onClick={handleClick} id={item} key={idx}>
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

export default Month;
