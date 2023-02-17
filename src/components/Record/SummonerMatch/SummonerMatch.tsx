import styles from './SummonerMatch.module.scss';
import { useEffect, useState } from 'react';

import { getMatch, getDetailMatch } from '@/api/matchAPi';
import MatchInfo from './MatchInfo/MatchInfo';

import { TypeMatch } from '@/components/Record/types/type';

import Loading from '@/components/Common/Loading/Loading';

export default function SummonerMacth({ puuid, data }: { puuid: string; data: string[] }) {
  const [dataSet, setDataSet] = useState<string[]>(data);
  const [matchData, setMatchData] = useState<TypeMatch[]>([]);
  const [start, setStart] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fnMatchData = async () => {
    try {
      const res = await getMatch(puuid, start);
      setDataSet(res);
      if (res.length === 0) {
        setLoading(false);
      }
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
    // fnMatchData();
  }, [puuid]);

  useEffect(() => {
    if (start > 0) {
      fnMatchData();
    }
  }, [start]);

  useEffect(() => {
    const matchDetailData = async (data: string) => {
      try {
        const res = await getDetailMatch(data);
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const feactData = async () => {
      setLoading(true);
      if (dataSet.length > 0) {
        const res = dataSet.map(async (data) => {
          try {
            return await matchDetailData(data);
          } catch (err) {
            console.log(err);
          }
        });
        // console.log(res);
        await Promise.all(res).then((res) => {
          setMatchData((prev) => [...prev, ...res]);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    };

    feactData();
  }, [dataSet]);

  {
    return (
      <>
        {matchData.length > 0 && (
          <>
            {matchData.map((data: TypeMatch) => (
              <MatchInfo matchData={data} puuid={puuid} key={data.metadata.matchId} />
            ))}
            {matchData.length < 20 && matchData.length % 5 === 0 && !loading && (
              <div className={styles.btn} onClick={handleClick} role="button">
                더보기
              </div>
            )}
          </>
        )}
        {loading ? <Loading /> : matchData.length <= 0 && <p className={styles.noMatchData}>전적 기록이 없습니다.</p>}
      </>
    );
  }
}
