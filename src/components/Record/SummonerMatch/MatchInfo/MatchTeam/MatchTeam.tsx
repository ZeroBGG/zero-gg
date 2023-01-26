import styles from './MatchTeam.module.scss';
import React, { useState, useEffect } from 'react';

import { TypeParticipants } from '@/components/Record/types/type';
import { VERSION } from '@/constants/url';
import { Link } from 'react-router-dom';

const CHAMPION_IMAGE_PATH = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion`;

export default function MatchTeam({ MatchTeamData }: { MatchTeamData: TypeParticipants[] }) {
  const [teamRed, setTeamRed] = useState<TypeParticipants[]>([]);
  const [teamBlue, setTeamBlue] = useState<TypeParticipants[]>([]);

  useEffect(() => {
    const teamRedFilter = () => {
      const red = MatchTeamData.filter((value, index) => {
        if (index < 5) {
          return value;
        }
      });
      setTeamRed(red);
    };

    const teamBlueFilter = () => {
      const blue = MatchTeamData.filter((value, index) => {
        if (index > 4) {
          return value;
        }
      });
      setTeamBlue(blue);
    };

    teamRedFilter();
    teamBlueFilter();
  }, [MatchTeamData]);

  return (
    <div className={styles.teams}>
      {teamRed && (
        <ul className={styles.team}>
          {teamRed.map((el) => (
            <li key={el.puuid} className={styles.list}>
              <img
                src={`${CHAMPION_IMAGE_PATH}/${el.championName}.png`}
                alt={el.championName}
                className={styles.championImg}
              />
              <Link className={styles.link} to={`/record/${el.summonerName}`}>
                {el.summonerName}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {teamBlue && (
        <ul className={styles.team}>
          {teamBlue.map((el) => (
            <li key={el.puuid} className={styles.list}>
              <img
                src={`${CHAMPION_IMAGE_PATH}/${el.championName}.png`}
                alt={el.championName}
                className={styles.championImg}
              />
              <Link className={styles.link} to={`/record/${el.summonerName}`}>
                {el.summonerName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
