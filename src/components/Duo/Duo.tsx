import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { dbService } from 'src/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import DuoCards from './DuoCards/DuoCards';
import WriteDuo from './WriteDuo/WriteDuo';
import { DuoType, FilterType } from './utils/DuoType';
import styles from './Duo.module.scss';

const Duo = () => {
  const [lolInfo, setLolInfo] = useState<any[]>([]);
  const [lolInfoFilterList, setLolInfoFilterList] = useState<any[]>([]);
  const [selectvalue, setSelectValue] = useState<FilterType>({
    queue: [],
    tier: [],
    position: [],
  });

  const getDuoData = useCallback(() => {
    try {
      const q = query(collection(dbService, 'myLOLInfo'));
      onSnapshot(q, (querySnapshot) => {
        const myLol = querySnapshot.docs.map((docs) => ({
          id: docs?.id,
          ...docs.data(),
        }));
        setLolInfo(myLol);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const FilterDuoData = () => {
    if (selectvalue.position && selectvalue.queue && selectvalue.tier === undefined) {
      setLolInfoFilterList(lolInfo);
    } else {
      const filteredList = lolInfo.reduce((acc, cur) => {
        const positionCondition = selectvalue.position ? cur.position === selectvalue.position : true;
        const queueCondition = selectvalue.queue ? cur.queue === selectvalue.queue : true;
        const tierCondition = selectvalue.tier ? cur.tier === selectvalue.tier : true;

        if (positionCondition && queueCondition && tierCondition) {
          acc.push(cur);
        }

        return acc;
      }, []);

      setLolInfoFilterList(filteredList);
    }
  };

  useEffect(() => {
    getDuoData();
  }, []);

  useEffect(() => {
    FilterDuoData();
  }, [lolInfo, selectvalue.position, selectvalue.queue, selectvalue.tier]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = e;
    setSelectValue({ ...selectvalue, [name]: value });
    console.log(selectvalue);
  }, []);

  return (
    <>
      <main>
        <WriteDuo />
        <section>
          <div className={styles.wrapper}>
            <div className={styles.select_queue}>
              <h2>Queue 선택</h2>
              <input type="radio" id="Duo" name="queue" value="Duo" onChange={onChange} />
              <label htmlFor="Duo">듀오랭크</label>
              <input type="radio" id="Free" name="queue" value="Free" onChange={onChange} />
              <label htmlFor="Free">자유랭크</label>
              <input type="radio" id="Narak" name="queue" value="Narak" onChange={onChange} />
              <label htmlFor="Narak">칼바람 나락</label>
            </div>
            <div className={styles.select_tier}>
              <h2>Rank 선택</h2>
              <input type="radio" id="Iron" name="rank" value="Iron" className={styles.iron} onChange={onChange} />
              <label htmlFor="Iron">아이언</label>
              <input
                type="radio"
                id="Bronze"
                name="rank"
                value="Bronze"
                className={styles.bronze}
                onChange={onChange}
              />
              <label htmlFor="Bronze">브론즈</label>
              <input
                type="radio"
                id="Silver"
                name="rank"
                value="Silver"
                className={styles.silver}
                onChange={onChange}
              />
              <label htmlFor="Silver">실버</label>
              <input type="radio" id="Gold" name="rank" value="Gold" className={styles.gold} onChange={onChange} />
              <label htmlFor="Gold">골드</label>
              <input
                type="radio"
                id="Platinum"
                name="rank"
                value="Platinum"
                className={styles.platinum}
                onChange={onChange}
              />
              <label htmlFor="Platinum">플레티넘</label>
              <input type="radio" id="Diamond" name="rank" value="Diamond" className={styles.dia} onChange={onChange} />
              <label htmlFor="Diamond">다이아</label>
            </div>
            <div className={styles.select_position}>
              <h2>Position 선택</h2>
              <input type="radio" id="Top" name="position" value="Top" onChange={onChange} />
              <label htmlFor="Top">탑</label>
              <input type="radio" id="Jug" name="position" value="Jungle" onChange={onChange} />
              <label htmlFor="Jug">정글</label>
              <input type="radio" id="Mid" name="position" value="Mid" onChange={onChange} />
              <label htmlFor="Mid">미드</label>
              <input type="radio" id="AD" name="position" value="AD" onChange={onChange} />
              <label htmlFor="AD">바텀(원딜)</label>
              <input type="radio" id="Sup" name="position" value="Sup" onChange={onChange} />
              <label htmlFor="Sup">서포터</label>
            </div>
          </div>
        </section>
        <section className={styles.section_card}>
          <div className={styles.div_card}>
            <ul className={styles.ul_card}>
              {lolInfo.map((item: DuoType, idx: number) => {
                return (
                  <>
                    <DuoCards key={`${item.userId}_${idx}`} duoObj={item} />
                  </>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Duo;
