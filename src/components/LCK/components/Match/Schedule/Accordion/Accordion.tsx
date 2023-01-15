import React, { useRef } from 'react';
import useToggle from '../../hook/useToggle';
import Month from '../Month/Month';
import Teams from '../Teams/Teams';
import styles from './Accordion.module.scss';
interface Props {
  title: string;
  handleChange: (event: React.MouseEvent) => void;
}

const Accordian = ({ title, handleChange }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const handletoggle = useToggle({ parentRef, childRef });
  return (
    <div className={styles.toggle}>
      <div className={styles.wrapper} onClick={handletoggle}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.click_btn}>▾</span>
      </div>
      <div className={styles.content_wrapper} ref={parentRef}>
        <div className={styles.content1} ref={childRef}>
          {title === 'TEAM' ? (
            <div className={styles.teams_wrapper}>
              <Teams onChange={handleChange} />
            </div>
          ) : (
            <div className={styles.month_wrapper}>
              <Month />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordian;
