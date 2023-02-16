import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSummonerInfo, getSummonerEntries } from '@/api/summonerApi';
import { getMatch } from '@/api/matchAPi';
import { TypeSummoner, TypeSummonerRank } from '@/components/Record/types/type';

import styles from './Record.module.scss';
import SummonerInfo from './SummonerInfo/SummonerInfo';
import SummonerRank from './SummonerRank/SummonerRank';
import SummonerMatch from './SummonerMatch/SummonerMatch';

import classnames from 'classnames';

export default function Record() {
  const { summonerId } = useParams<{ summonerId: string }>(); // 소환사 아이디
  const [info, setInfo] = useState<TypeSummoner>(); // 소환사 정보
  const [summonerRankInfo, setSummonerRankInfo] = useState<TypeSummonerRank[]>([]); // 소환사 랭크 정보
  const [timer, setTimer] = useState(0); // 디바운싱 타이머
  const [btnLoading, setBtnLoading] = useState(true); // 전적 갱신 버튼 로딩
  const [data, setData] = useState<string[]>([]); // 소환사 최근 게임 데이터
  const [loading, setLoading] = useState(false); // 소환사 최근 게임 데이터 로딩

  // 소환사 데이터 조회 함수 (고유 id, 닉네임, 프로필 사진 번호, 소환사 레벨 등)
  const getSummonerData = async () => {
    if (summonerId) {
      try {
        const res = await getSummonerInfo(summonerId);
        if (res) {
          setInfo(res);
        }
      } catch (err) {
        setInfo(undefined);
        console.log(err);
      }
    }
  };

  // 소환사 최근 게임 전적 불러오기 (5경기)
  const fnMatchData = async () => {
    if (!info?.puuid) return;

    try {
      const res = await getMatch(info.puuid, 0);
      setData(res);
      setLoading(true);
      setBtnLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  // 전적 갱신
  const handleClick = () => {
    setBtnLoading(false);

    // 디바운싱 - 마지막 호출만 적용
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      try {
        fnMatchData();
      } catch (e) {
        console.error('error', e);
      }
    }, 1000);

    setTimer(newTimer);
  };

  useEffect(() => {
    getSummonerData();
    setLoading(false);
  }, [summonerId]);

  useEffect(() => {
    fnMatchData();
  }, [summonerRankInfo]);

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
    return info?.puuid ? (
      <section className={styles.section}>
        <article className={styles.article}>
          {<SummonerInfo info={info} handleClick={handleClick} loading={btnLoading} />}
        </article>

        <article className={styles.article}>
          {summonerRankInfo && <SummonerRank summonerRankInfo={summonerRankInfo} />}
        </article>

        {info && info?.puuid && loading && (
          <article className={classnames(styles.article, styles.match)}>
            {data.length > 0 ? (
              <SummonerMatch puuid={info.puuid} data={data} />
            ) : (
              <p className={styles.noMatchData}>전적 기록이 없습니다.</p>
            )}
          </article>
        )}
      </section>
    ) : (
      <section className={styles.error}>
        <p className={styles.title}>
          <strong className={styles.strong}>{summonerId}</strong> &nbsp; 일치하는 소환사님을 찾을 수 없습니다.
        </p>
      </section>
    );
  }
}
