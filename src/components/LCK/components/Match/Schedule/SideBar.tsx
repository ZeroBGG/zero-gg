import React, { useCallback, useRef, useState } from 'react';
import useToggle from '../hook/useToggle';
import Accordian from './Accordion/Accordion';
import styles from './SideBar.module.scss';

interface sideBarProp {
  handleChange: (evnet: React.MouseEvent) => void;
}

const SideBar = ({ handleChange }: sideBarProp) => {
  return (
    <aside className={styles.sidebar_container}>
      <Accordian title={'MONTH'} handleChange={() => {}} />
      <Accordian title={'TEAM'} handleChange={handleChange} />
    </aside>
  );
};

export default SideBar;
