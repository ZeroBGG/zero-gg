import styles from './MatchInfo.module.scss';
import MatchTeam from './MatchTeam/MatchTeam';

import { useState, useEffect } from 'react';
import { TypeMatch, TypeMatchInfo, TypeParticipants } from '@/components/Record/types/type';

import { SPELL, PERKS } from '@/constants/data';
import { VERSION } from '@/constants/url';

import classnames from 'classnames';

const CHAMPION_IMAGE_PATH = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion`;
const SPELL_IMAGE_PATH = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/spell`;
const ITEM_IMAGE_PATH = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/item`;

export default function MatchInfo({ matchData, puuid }: { matchData: TypeMatch; puuid: string }) {
  const [gameData, setGameData] = useState<TypeMatchInfo>(matchData.info);
  const [myGame, setMyGame] = useState<TypeParticipants>();

  // 경기 지속 시간 (분, 초)
  const gameDuration = (time: number) => {
    // let minutes = (time % 3600) / 60;
    let minutes: string | number = Math.floor(time / 60);
    let seconds: string | number = time - minutes * 60;

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return `${minutes}분 ${seconds}초`;
  };

  // 언제 게임이 끝났는지 확인
  const gameEndTime = (gameEndTimestamp: number) => {
    let start = new Date();
    let end = new Date(gameEndTimestamp);

    let time: string;

    // 연도가 같으면 월을 비교
    if (start.getFullYear() === end.getFullYear()) {
      // 월이 같으면 일을 비교
      if (start.getMonth() === end.getMonth()) {
        // 일이 같으면 시간을 비교
        if (start.getDate() === end.getDate()) {
          // 시간이 같으면 분을 비교
          if (start.getHours() === end.getHours()) {
            if (start.getMinutes() === end.getMinutes()) {
              time = '1분 ';
            } else {
              time = `${start.getMinutes() - end.getMinutes()} 분`;
            }
          } else {
            time = `${start.getHours() - end.getHours()}시간`;
          }
        } else {
          time = `${start.getDate() - end.getDate()}일`;
        }
      } else {
        time = `${start.getMonth() - end.getMonth()}달`;
      }
    } else {
      if (start.getMonth() < end.getMonth()) {
        time = `${start.getMonth() - end.getMonth() + 12}달`;
      } else {
        time = `${start.getFullYear() - end.getFullYear()}년`;
      }
    }

    return `${time} 전`;
  };

  // 킬 / 데스 / 어시스트 점수
  const kdaGrade = (kills: number, deaths: number, assists: number) => {
    if (deaths === 0) {
      return <span className={styles.perfect}>Perfect KDA</span>;
    }

    return <span className={styles.grade}>{((kills + assists) / deaths).toFixed(1)} KDA</span>;
  };

  // 미니언, 정글몹 킬 점수 (CS)
  const creepScore = (minion: number, monster: number, time: number) => {
    let minutes: string | number = Math.floor(time / 60);
    let creep = minion + monster;
    let minutesCS = (creep / minutes).toFixed(1);

    return (
      <span>
        CS {creep} ({minutesCS})
      </span>
    );
  };

  useEffect(() => {
    const myGameData = gameData.participants.filter((data) => {
      return data.puuid === puuid;
    });

    if (myGameData.length > 0) {
      // console.log(myGameData[0]);
      setMyGame(myGameData[0]);
    }
  }, [gameData]);

  {
    return gameData && myGame ? (
      <section className={classnames(styles.card, myGame.win && styles.win)}>
        <article className={styles.title}>
          <span className={classnames(styles['game-result'], myGame.win && styles.win)}>
            {myGame.win ? '승리' : '패배'}
          </span>
          <span className={styles['game-time']}>{gameDuration(gameData.gameDuration)}</span>

          <span className={styles['game-type']}>솔로랭크</span>
          <span className={styles['game-time-stamp']}>{gameEndTime(gameData.gameEndTimestamp)}</span>
        </article>

        <article className={styles['game-stats']}>
          <div className={styles.left}>
            <div className={styles.champion}>
              <img
                src={`${CHAMPION_IMAGE_PATH}/${myGame.championName}.png`}
                alt={myGame.championName}
                className={styles.championImg}
              />

              <div className={styles.spell}>
                <img
                  src={`${SPELL_IMAGE_PATH}/${SPELL[myGame.summoner1Id]}.png`}
                  alt={SPELL[myGame.summoner1Id]}
                  className={styles.spellImg}
                />

                <img
                  src={`${SPELL_IMAGE_PATH}/${SPELL[myGame.summoner2Id]}.png`}
                  alt={SPELL[myGame.summoner2Id]}
                  className={styles.spellImg}
                />
              </div>

              <div className={styles.perk}>
                <img
                  src={`${PERKS[myGame.perks.styles[0].selections[0].perk]}`}
                  alt="메인룬"
                  className={styles.perkImg}
                />
                <img src={`${PERKS[myGame.perks.styles[1].style]}`} alt="서브룬" className={styles.perkImg} />
              </div>
            </div>

            <div className={styles.items}>
              <ul className={styles.list}>
                <li className={styles.item}>
                  {myGame.item0 > 0 && (
                    <img src={`${ITEM_IMAGE_PATH}/${myGame.item0}.png`} alt="아이템" className={styles.itemImg} />
                  )}
                </li>
                <li className={styles.item}>
                  {myGame.item1 > 0 && (
                    <img src={`${ITEM_IMAGE_PATH}/${myGame.item1}.png`} alt="아이템" className={styles.itemImg} />
                  )}
                </li>
                <li className={styles.item}>
                  {myGame.item2 > 0 && (
                    <img src={`${ITEM_IMAGE_PATH}/${myGame.item2}.png`} alt="아이템" className={styles.itemImg} />
                  )}
                </li>
              </ul>
              <ul className={styles.list}>
                <li className={styles.item}>
                  {myGame.item3 > 0 && (
                    <img src={`${ITEM_IMAGE_PATH}/${myGame.item3}.png`} alt="아이템" className={styles.itemImg} />
                  )}
                </li>
                <li className={styles.item}>
                  {myGame.item4 > 0 && (
                    <img src={`${ITEM_IMAGE_PATH}/${myGame.item4}.png`} alt="아이템" className={styles.itemImg} />
                  )}
                </li>
                <li className={styles.item}>
                  {myGame.item5 > 0 && (
                    <img src={`${ITEM_IMAGE_PATH}/${myGame.item5}.png`} alt="아이템" className={styles.itemImg} />
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.kda}>
              <div className={styles.kdaData}>
                <span className={styles.kills}>{myGame.kills} / </span>
                <span className={styles.deaths}>{myGame.deaths} </span>
                <span className={styles.assists}>/ {myGame.assists}</span>
              </div>

              <div className={styles.kdaGrade}>{kdaGrade(myGame.kills, myGame.deaths, myGame.assists)}</div>
              <div className={styles.creepScore}>
                {creepScore(myGame.totalMinionsKilled, myGame.neutralMinionsKilled, gameData.gameDuration)}
              </div>
            </div>

            <div className={styles.teamMatch}>
              <MatchTeam MatchTeamData={gameData.participants} />
            </div>
          </div>
        </article>
      </section>
    ) : (
      <div>전적을 찾을 수 없습니다</div>
    );
  }
}