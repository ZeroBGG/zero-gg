import styles from './MatchTeam.module.scss';
import React, { useState, useEffect } from 'react';

import { TypeParticipants } from '@/components/Record/types/type';
import { storeVersion } from '@/store/store';
import { Link } from 'react-router-dom';

const RED_TEAM_NUMBER = 5; // 레드팀 0번~4번 인덱스
const BLUE_TEAM_NUMBER = 4; // 블루팀 5번~9번 인덱스

export default function MatchTeam({ MatchTeamData }: { MatchTeamData: TypeParticipants[] }) {
  const [teamRed, setTeamRed] = useState<TypeParticipants[]>([]);
  const [teamBlue, setTeamBlue] = useState<TypeParticipants[]>([]);
  const { version } = storeVersion();
  const CHAMPION_IMAGE_PATH = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion`;

  useEffect(() => {
    const teamRedFilter = () => {
      const red = MatchTeamData.filter((value, index) => {
        if (index < RED_TEAM_NUMBER) {
          return value;
        }
      });
      setTeamRed(red);
    };

    const teamBlueFilter = () => {
      const blue = MatchTeamData.filter((value, index) => {
        if (index > BLUE_TEAM_NUMBER) {
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
                src={`${CHAMPION_IMAGE_PATH}/${
                  el.championName === 'FiddleSticks' ? (el.championName = 'Fiddlesticks') : el.championName
                }.png`}
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
                src={`${CHAMPION_IMAGE_PATH}/${
                  el.championName === 'FiddleSticks' ? (el.championName = 'Fiddlesticks') : el.championName
                }.png`}
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
