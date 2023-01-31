import useHover from '@/hooks/useHover';
import React, { RefObject } from 'react';
import styles from './TeamSlide.module.scss';
interface LogosType {
  logo: string;
  teamName: string;
  id: string;
  onClick: (event: React.MouseEvent) => void;
}

const Logos = (props: LogosType) => {
  const [ref, hover] = useHover();
  return (
    <div
      className={styles.team_logo}
      ref={ref as React.RefObject<HTMLDivElement>}
      id={props.id}
      onClick={props.onClick}
    >
      {!hover ? (
        <img src={props.logo} id={props.id} alt="props" className={styles.img} />
      ) : (
        <p className={styles.teamName}>{props.teamName}</p>
      )}
    </div>
  );
};

export default Logos;
