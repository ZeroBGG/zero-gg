import useHover from '@/hooks/useHover';
import React from 'react';
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

      <div
        id={props.id}
        className={styles.img}
        style={
          !hover
            ? {
                backgroundImage: `url(${props.logo})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
              }
            : { backgroundImage: '' }
        }
      >
        {!hover ? '' : <p className={styles.teamName}>{props.teamName}</p>}
      </div>

    </div>
  );
};

export default Logos;
