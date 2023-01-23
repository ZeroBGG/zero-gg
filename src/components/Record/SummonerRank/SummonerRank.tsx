import styles from './SummonerRank.module.scss';
import { useState, useEffect } from 'react';
import { TypeSummonerRank, StringRank } from '@/components/Record/types/type';

const TIER_EMBLEMS = '/src/assets/images/Record/emblems';

export default function SummonerRank({ summonerRankInfo }: { summonerRankInfo: TypeSummonerRank[] }) {
  const [soloRank, setSoloRank] = useState<TypeSummonerRank>();
  const [freeRank, setFreeRank] = useState<TypeSummonerRank>();

  // 아라비아 숫자 변환 컴포넌트
  const TierRank = (tier: string, rank: StringRank) => {
    const number = {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
    };
    let tierRank: boolean;

    if (tier === 'MASTER' || tier === 'GRANDMASTER' || tier === 'CHALLENGER') {
      tierRank = false;
    } else {
      tierRank = true;
    }

    {
      return tierRank === true ? <p className={styles.number}>{number[rank]}</p> : <p></p>;
    }
  };

  // 승률 구하는 컴포넌트
  const Analyze = (wins: number, loss: number) => {
    let odds = ((wins / (wins + loss)) * 100).toFixed(1);

    return (
      <p className={styles.total}>
        {wins}승 {loss}패 <strong className={styles.strong}>승률 ({odds}%)</strong>
      </p>
    );
  };

  useEffect(() => {
    const soloRankData = summonerRankInfo.map((info) => {
      if (info.queueType === 'RANKED_SOLO_5x5') {
        return info;
      }
    });

    const freeRankData = summonerRankInfo.map((info) => {
      if (info.queueType === 'RANKED_FLEX_SR') {
        return info;
      }
    });

    if (soloRankData) {
      setSoloRank(soloRankData[0]);
    }

    if (freeRankData) {
      setFreeRank(freeRankData[0]);
    }
  }, [summonerRankInfo]);

  return (
    <section className={styles.section}>
      <article className={styles.wrap}>
        <div className={styles.inner}>
          <h2 className={styles.que}>솔로랭크</h2>

          <div className={styles.content}>
            {soloRank ? (
              <>
                <div className={styles.left}>
                  <img
                    src={`${TIER_EMBLEMS}/${soloRank.tier.toLowerCase()}.png`}
                    alt={soloRank.tier}
                    className={styles.img}
                  />
                </div>

                <div className={styles.right}>
                  <div className={styles.top}>
                    <p className={styles.tier}>{soloRank.tier}</p>
                    {TierRank(soloRank.tier, soloRank.rank)}
                  </div>

                  <div className={styles.md}>
                    <p>
                      리그 포인트 <strong className={styles.strong}>{soloRank.leaguePoints}</strong>점
                    </p>
                  </div>

                  <div className={styles.bot}>{Analyze(soloRank.wins, soloRank.losses)}</div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.left}>
                  <img src={`${TIER_EMBLEMS}/unranked.png`} alt="unranked" className={styles.img} />
                </div>

                <div className={styles.right}>
                  <div className={styles.top}>
                    <p className={styles.tier}>언랭크</p>
                  </div>

                  <div className={styles.md}>
                    <p>
                      리그 포인트 <strong className={styles.strong}>0</strong>점
                    </p>
                  </div>

                  <div className={styles.bot}>
                    <p className={styles.total}>0승 0패</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </article>

      <article className={styles.wrap}>
        <div className={styles.inner}>
          <h2 className={styles.que}>자유랭크</h2>

          <div className={styles.content}>
            {freeRank ? (
              <>
                <div className={styles.left}>
                  <img
                    src={`${TIER_EMBLEMS}/${freeRank.tier.toLowerCase()}.png`}
                    alt={freeRank.tier}
                    className={styles.img}
                  />
                </div>

                <div className={styles.right}>
                  <div className={styles.top}>
                    <p className={styles.tier}>{freeRank.tier}</p>
                    {TierRank(freeRank.tier, freeRank.rank)}
                  </div>

                  <div className={styles.md}>
                    <p>
                      리그 포인트 <strong className={styles.strong}>{freeRank.leaguePoints}</strong>점
                    </p>
                  </div>

                  <div className={styles.bot}>{Analyze(freeRank.wins, freeRank.losses)}</div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.left}>
                  <img src={`${TIER_EMBLEMS}/unranked.png`} alt="unranked" className={styles.img} />
                </div>

                <div className={styles.right}>
                  <div className={styles.top}>
                    <p className={styles.tier}>언랭크</p>
                  </div>

                  <div className={styles.md}>
                    <p>
                      리그 포인트 <strong className={styles.strong}>0</strong>점
                    </p>
                  </div>

                  <div className={styles.bot}>
                    <p className={styles.total}>0승 0패</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
