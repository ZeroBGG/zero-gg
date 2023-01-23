import React, { useRef } from 'react';
import useToggle from '../../hook/useToggle';
import Month from '../Month/Month';
import Teams from '../Teams/Teams';
import styles from './Accordion.module.scss';
interface Props {
  title: string;
  handleMonthClick: (month: string) => void;
  handleTeamClick: (team: string) => void;
}

const Accordian = ({ title, handleTeamClick, handleMonthClick }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const handletoggle = useToggle({ parentRef, childRef });

  const sendData = () => {};
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
              <Teams onClick={handleTeamClick} />
            </div>
          ) : (
            <div className={styles.month_wrapper}>
              <Month onClick={handleMonthClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordian;
