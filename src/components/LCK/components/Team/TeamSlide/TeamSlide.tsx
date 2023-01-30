import data from '@/data/teamSquad.json';
import { useLoading, useMyTeam } from '@/components/LCK/Zustand/useMyTeam';
import React, { useEffect, useState } from 'react';
import styles from './TeamSlide.module.scss';
import useHover from '@/hooks/useHover';
import Logos from './Logos';
import Skeleton_Logo from '../../Skeleton/logo/Skeleton_Logo';

const TeamSlide = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [ref, hover] = useHover();
  const { myteam, getTeam } = useMyTeam();
  const { loading, getLoading } = useLoading();
  useEffect(() => {
    new Promise<void>((res) => {
      setTimeout(() => {
        res();
      }, 1000);
    }).then(() => {
      setTeams(data);
      setTimeout(() => getLoading(false), 500);
    });
  }, []);

  const onClick = (event: React.MouseEvent) => {
    getTeam(event.currentTarget.id);
  };

  console.log(loading);
  return (
    <div className={styles.slider_container}>
      <div className={styles.wrapper}>
        <div className={styles.team_slide}>
          {loading
            ? new Array(10).fill(1).map((_, i) => {
                return <Skeleton_Logo key={i} />;
              })
            : teams.map((team) => (
                <Logos
                  logo={team.logo}
                  teamName={team.teamName}
                  id={team.id}
                  onClick={onClick}
                  key={`${team.id}_${team.teamName}`}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSlide;
