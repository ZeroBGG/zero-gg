import React, { useCallback, useRef, useState } from 'react';
import useToggle from '../hook/useToggle';
import Accordian from './Accordion/Accordion';
import styles from './SideBar.module.scss';

interface Props {
  handleMonth: (month: string) => void;
  handleTeam: (team: string) => void;
}

const SideBar = ({ handleMonth, handleTeam }: Props) => {
  return (
    <aside className={styles.sidebar_container}>
      <Accordian title={'MONTH'} handleMonthClick={handleMonth} handleTeamClick={() => {}} />
      <Accordian title={'TEAM'} handleMonthClick={() => {}} handleTeamClick={handleTeam} />
    </aside>
  );
};

export default SideBar;
