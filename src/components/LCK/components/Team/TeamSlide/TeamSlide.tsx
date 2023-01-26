import data from '@/data/teamSquad.json';
import myTeam from '@/components/LCK/Zustand/myTeam';
import React, { useEffect, useState } from 'react';
import styles from './TeamSlide.module.scss';
import useHover from '@/hooks/useHover';
import Logos from './Logos';

const TeamSlide = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [ref, hover] = useHover();
  const { myteam, getTeam } = myTeam();

  useEffect(() => {
    setTeams(data);
  }, []);

  const onClick = (event: React.MouseEvent) => {
    getTeam(event.currentTarget.id);
  };

  console.log(myteam);
  return (
    <>
      <div className={styles.slider_container}>
        <div className={styles.wrapper}>
          <ul className={styles.team_slide}>
            {teams.map((team) => (
              <Logos
                logo={team.logo}
                teamName={team.teamName}
                id={team.id}
                onClick={onClick}
                key={`${team.id}_${team.teamName}`}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TeamSlide;
