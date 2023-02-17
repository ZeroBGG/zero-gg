import React, { useRef } from 'react';
import useToggle from '../../../../../../hooks/useToggle';
import Month from '../Month/Month';
import Teams from '../Teams/Teams';
import styles from './Accordion.module.scss';
import { ACCODIAN_CATEGORY } from '@/data/filterCategory';
interface Props {
  title: string;
}

const Accordian = ({ title }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const handletoggle = useToggle({ parentRef, childRef });
  return (
    <div className={styles.accordian}>
      <div className={styles.header} onClick={handletoggle}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.click_btn}>▾</span>
      </div>
      <div className={styles.content_wrapper} ref={parentRef}>
        <div className={styles.content1} ref={childRef}>
          {title === ACCODIAN_CATEGORY.TEAM ? (
            <div className={styles.icons_wrapper}>
              <Teams />
            </div>
          ) : (
            <div className={styles.icons_wrapper}>
              <Month />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordian;
