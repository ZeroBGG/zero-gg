import styles from './Circle.module.scss';
import React, { useEffect, useCallback } from 'react';
import { getChampion, getRotationChampion } from '@/api/championApi';

import { storeCircle, storeVersion } from '@/store/store';

interface TypeCircle {
  id: string;
  key: string;
  name: string;
}

function Circle() {
  const { data, updateData } = storeCircle();
  const { version } = storeVersion();

  // 전체 챔피언 데이터
  const getChampionData = async (): Promise<TypeCircle[] | undefined> => {
    try {
      const result = await getChampion(version);
      return Object.values(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 로테이션 챔피언 데이터
  const getRotationChampionData = async () => {
    try {
      const result = await getRotationChampion();
      return result.freeChampionIds;
    } catch (err) {
      console.log(err);
    }
  };

  // 필터링 챔피언 데이터
  const filterChampionData = async () => {
    try {
      const championData = await getChampionData();
      const rotationChampionData = await getRotationChampionData();

      if (!championData || !rotationChampionData) return;

      let intersection = championData.filter((champion: TypeCircle) => {
        return rotationChampionData.includes(Number(champion.key));
      });

      updateData(intersection);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data.length > 0 || !version) return;
    filterChampionData();
  }, [version]);

  return (
    <section id={styles.circle}>
      {data.length > 0 &&
        data.map((data: TypeCircle) => {
          return (
            <article className={styles.face} key={data.key}>
              <div className={styles.inner}>
                <div className={styles.content}>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.id}_0.jpg`}
                    alt={data.name}
                    className={styles.img}
                  />
                  <h2 className={styles.name}>{data.name}</h2>
                </div>
              </div>
            </article>
          );
        })}
    </section>
  );
}

export default React.memo(Circle);
