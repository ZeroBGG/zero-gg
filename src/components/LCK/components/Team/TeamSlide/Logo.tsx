import styles from './TeamSlide.module.scss';
import useHover from '@/hooks/useHover';
import React from 'react';
interface LogoProp {
  logo: string;
  id: string;
  teamName: string;
  onClick: (event: React.MouseEvent) => void;
}

const Logo = ({ logo, id, onClick, teamName }: LogoProp) => {
  const [ref, hover] = useHover();
  return (
    <>
      <li className={styles.team_logo} ref={ref} onClick={onClick} id={id} key={id}>
        {!hover ? <img src={logo} alt="logo" className={styles.img} /> : <p className={styles.teamName}>{teamName}</p>}
      </li>
    </>
  );
};

export default Logo;
