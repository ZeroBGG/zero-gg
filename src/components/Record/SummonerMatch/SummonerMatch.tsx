import styles from './SummonerMatch.module.scss';
import { useEffect, useState } from 'react';

import { getMatch, getDetailMatch } from '@/api/matchAPi';
import MatchInfo from './MatchInfo/MatchInfo';
import { TypeMatch } from '@/components/Record/types/type';
import { TypeSummonerRank } from '@/components/Record/types/type';

import Loading from '@/components/Common/Loading/Loading';

export default function SummonerMacth({
  puuid,
  summonerRankInfo,
}: {
  puuid: string;
  summonerRankInfo: TypeSummonerRank[];
}) {
  const [dataSet, setDataSet] = useState<string[]>([]);
  const [matchData, setMatchData] = useState<TypeMatch[]>([]);
  const [start, setStart] = useState<number>(null);
  const [loading, setLoading] = useState(true); // 게임 데이터 로딩

  const fnMatchData = async () => {
    try {
      const res = await getMatch(puuid, start);
      if (res.length === 0) {
        setLoading(false);
        return;
      }
      setDataSet(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setLoading(true);
    setStart(start + 5);
  };

  useEffect(() => {
    if (start === null || loading === false) return;

    fnMatchData();
  }, [start, loading]);

  useEffect(() => {
    setLoading(true);
    setStart(0);
    setMatchData([]);
  }, [summonerRankInfo]);

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
