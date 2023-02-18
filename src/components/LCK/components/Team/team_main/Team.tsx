import React, { useState } from 'react';
import { LCK_BG_URL } from '@/components/LCK/components/Constant/constant';
import PlayerList from '../PlayerList/PlayerList';
import TeamSlide from '../TeamSlide/TeamSlide';
import styles from './Team.module.scss';
const Team = () => {
  const [teamId, setTeamId] = useState('');
  const onClick = (e: React.MouseEvent) => {
    setTeamId(e.currentTarget.id);
    console.log(teamId);
  };
  return (
    <section className={styles.container}>
      <div
        className={styles.Lck_bg}
        style={{ backgroundImage: `url(${LCK_BG_URL})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}
      >
        <h1 className={styles.title}>ROASTER</h1>
      </div>
      <article className={styles.slide}>
        <TeamSlide />
      </article>
      <article className={styles.player_list}>
        <PlayerList />
      </article>
    </section>
  );
};

export default Team;
