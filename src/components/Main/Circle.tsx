import styles from './Circle.module.scss';

import garen from '@/assets/images/Main/Champion/가렌.png';
import { useState, useEffect } from 'react';
import { getChampion, getRotationChampion } from '@/api/championApi';

export default function Circle() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 전체 챔피언 데이터
    const getChampionData = async () => {
      try {
        const result = await getChampion();
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
    const fillterChampionData = async () => {
      try {
        const championData = await getChampionData();
        const rotationChampionData = await getRotationChampionData();

        let intersection = championData?.filter((champion: any) => {
          return rotationChampionData.includes(Number(champion.key));
        });

        setData(intersection as any);
      } catch (err) {
        console.log(err);
      }
    };

    fillterChampionData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section id={styles.circle}>
      {data.map((data: any) => {
        return (
          <article className={styles.face} key={data.key}>
            <div className={styles.inner}>
              <div>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.id}_0.jpg`}
                  alt={data.name}
                />
                <h2>{data.name}</h2>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
