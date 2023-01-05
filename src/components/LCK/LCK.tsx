import React, { useState } from 'react';
import PlayerList from './components/PlayerList/PlayerList';
import TeamSlide from './components/TeamSlide/TeamSlide';
import styles from './LCK.module.scss';

export default function LCK() {
  const [teamId, setTeamId] = useState('');
  const onClick = (e: React.MouseEvent) => {
    setTeamId(e.currentTarget.id);
    console.log(teamId);
  };
  return (
    <section className={styles.container}>
      <article className={styles.slide}>
        <TeamSlide teamClick={onClick} />
      </article>
      <article className={styles.player_list}>
        <PlayerList id={teamId} />
      </article>
    </section>
  );
}
