import React, { useCallback, useRef, useState } from 'react';
import useToggle from '../hook/useToggle';
import Accordian from './Accordion/Accordion';
import styles from './SideBar.module.scss';

const SideBar = () => {
  return (
    <aside className={styles.sidebar_container}>
      <Accordian title={'MONTH'} />
      <Accordian title={'TEAM'} />
    </aside>
  );
};

export default SideBar;
