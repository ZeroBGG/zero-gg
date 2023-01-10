import React, { useState } from 'react';
import PlayerList from './PlayerList/PlayerList';
import TeamSlide from './TeamSlide/TeamSlide';
import styles from './Team.module.scss';
const Team = () => {
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
};

export default Team;
