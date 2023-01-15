import data from '@/data/teamSquad.json';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TeamSlide.module.scss';
interface Props {
  teamClick: (e: React.MouseEvent) => void;
}

const TeamSlide = ({ teamClick }: Props) => {
  const [teams, setTeams] = useState<any[]>([]);
  useEffect(() => {
    setTeams(data);
  }, []);
  return (
    <>
      <div className={styles.slider_container}>
        <div className={styles.wrapper}>
          <ul className={styles.team_slide}>
            {teams.map((team) => (
              <Link to={`${team.id}`}>
                <li className={styles.team_logo} onClick={teamClick} id={team.id} key={team.id}>
                  <img src={team.logo} alt="team" id={team.id} />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TeamSlide;
