import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSummonerInfo, getSummonerEntries } from '@/api/summonerApi';
import { TypeSummoner, TypeSummonerRank } from '@/components/Record/types/type';

import styles from './Record.module.scss';
import SummonerInfo from './SummonerInfo/SummonerInfo';
import SummonerRank from './SummonerRank/SummonerRank';

export default function Record() {
  const { summonerId } = useParams<{ summonerId: string }>();

  const [info, setInfo] = useState<TypeSummoner | null>(null);
  const [summonerRankInfo, setSummonerRankInfo] = useState<TypeSummonerRank[]>([]);
  const [timer, setTimer] = useState(0); // 디바운싱 타이머

  const navigate = useNavigate();

  // 소환사 데이터 조회 함수 (고유 id, 닉네임, 프로필 사진 번호, 소환사 레벨 등)
  const getSummonerData = async () => {
    try {
      if (summonerId) {
        const res = await getSummonerInfo(summonerId);
        setInfo(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 전적 갱신
  const handleClick = () => {
    // 디바운싱 - 마지막 호출만 적용
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      try {
        getSummonerData();
      } catch (e) {
        console.error('error', e);
      }
    }, 2000);

    setTimer(newTimer);
  };

  useEffect(() => {
    getSummonerData();
  }, [summonerId]);

  useEffect(() => {
    // 소환사의 랭크 정보 확인 (티어, 랭크, 승, 패, 포인트 등)
    const getSummonerEntriesData = async () => {
      try {
        if (info) {
          const res = await getSummonerEntries(info.id);
          setSummonerRankInfo(res);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getSummonerEntriesData();
  }, [info]);

  {
    return summonerId && info ? (
      <main className={styles.main}>
        <article className={styles.article}>{info && <SummonerInfo info={info} handleClick={handleClick} />}</article>
        <article className={styles.article}>
          {summonerRankInfo && <SummonerRank summonerRankInfo={summonerRankInfo} />}
        </article>
      </main>
    ) : (
      <main className={styles.error}>
        <p className={styles.title}>
          <strong className={styles.strong}>{summonerId}</strong> 일치하는 소환사님을 찾을 수 없습니다.
        </p>
      </main>
    );
  }
}
