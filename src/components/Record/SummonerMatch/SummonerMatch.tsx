import styles from './SummonerMatch.module.scss';
import { useEffect, useState } from 'react';

import { getMatchApi, getDetailMatchApi } from '@/api/matchAPi';
import MatchInfo from './MatchInfo/MatchInfo';

import { TypeMatch } from '@/components/Record/types/type';

export default function SummonerMacth({ puuid }: { puuid: string }) {
  const [dataSet, setDataSet] = useState<string[]>([]);
  const [matchData, setMatchData] = useState<TypeMatch[]>([]);
  const [start, setStart] = useState<number>(0);

  const fnMatchData = async () => {
    try {
      const res = await getMatchApi(puuid, start);
      setDataSet(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setStart(start + 5);
  };

  useEffect(() => {
    setStart(0);
    setMatchData([]);
    fnMatchData();
  }, [puuid]);

  useEffect(() => {
    if (start > 0) {
      fnMatchData();
    }
  }, [start]);

  useEffect(() => {
    const matchDetailData = async (data: string) => {
      try {
        const res = await getDetailMatchApi(data);
        // console.log(res);

        // setMatchData((matchData) => [...matchData, res]);
        // return new Promise((resolve) => resolve);
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const feactData = async () => {
      if (dataSet.length > 0) {
        const res = dataSet.map(async (data) => {
          try {
            return await matchDetailData(data);
          } catch (err) {
            console.log(err);
          }
        });
        // console.log(res);
        await Promise.all(res).then((res) => setMatchData((prev) => [...prev, ...res]));
      }
    };

    feactData();
  }, [dataSet]);

  useEffect(() => {
    console.log(matchData);
  }, [matchData]);

  {
    return (
      <>
        {matchData ? (
          <>
            {matchData.map((data: TypeMatch) => (
              <MatchInfo matchData={data} puuid={puuid} key={data.metadata.matchId} />
            ))}
            {matchData.length < 20 && (
              <div className={styles.btn} onClick={handleClick} role="button">
                더보기
              </div>
            )}
          </>
        ) : (
          <div>전적 기록이 없습니다.</div>
        )}
      </>
    );
  }
}
