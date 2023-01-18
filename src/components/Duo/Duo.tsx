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
  const [selectValue, setSelectValue] = useState<FilterType>({
    queue: '',
    tier: '',
    position: '',
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
    if (selectValue.position && selectValue.queue && selectValue.tier === undefined) {
      setLolInfoFilterList(lolInfo);
    } else {
      const filteredList = lolInfo.reduce(
        (acc, cur) => {
          const positionCondition = selectValue.position ? cur.position === selectValue.position : true;
          const queueCondition = selectValue.queue ? cur.queue === selectValue.queue : true;
          const tierCondition = selectValue.tier ? cur.tier === selectValue.tier : true;

          if (positionCondition && queueCondition && tierCondition) {
            acc.push(cur);
          }

          return acc;
        },
        [selectValue],
      );

      setLolInfoFilterList(filteredList);
    }
  };

  const onFilterChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value, name },
      } = e;
      console.log(selectValue);
      setSelectValue({ ...selectValue, [name]: value });
    },
    [selectValue, setSelectValue],
  );

  useEffect(() => {
    getDuoData();
  }, []);

  useEffect(() => {
    FilterDuoData();
  }, [lolInfo, selectValue.position, selectValue.queue, selectValue.tier]);

  return (
    <>
      <main>
        <WriteDuo />
        <section>
          <div className={styles.wrapper}>
            <div className={styles.select_queue}>
              <h2>Queue 선택</h2>
              <input type="radio" id="Duo" onChange={onFilterChange} name="queue" value="Duo" />
              <label htmlFor="Duo">듀오랭크</label>
              <input type="radio" id="Free" onChange={onFilterChange} name="queue" value="Free" />
              <label htmlFor="Free">자유랭크</label>
              <input type="radio" id="Narak" onChange={onFilterChange} name="queue" value="Narak" />
              <label htmlFor="Narak">칼바람 나락</label>
            </div>
            <div className={styles.select_tier}>
              <h2>Tier 선택</h2>
              <input
                type="radio"
                id="Iron"
                name="tier"
                value="Iron"
                className={styles.iron}
                onChange={onFilterChange}
              />
              <label htmlFor="Iron">아이언</label>
              <input
                type="radio"
                id="Bronze"
                name="tier"
                value="Bronze"
                className={styles.bronze}
                onChange={onFilterChange}
              />
              <label htmlFor="Bronze">브론즈</label>
              <input
                type="radio"
                id="Silver"
                name="tier"
                value="Silver"
                className={styles.silver}
                onChange={onFilterChange}
              />
              <label htmlFor="Silver">실버</label>
              <input
                type="radio"
                id="Gold"
                name="tier"
                value="Gold"
                className={styles.gold}
                onChange={onFilterChange}
              />
              <label htmlFor="Gold">골드</label>
              <input
                type="radio"
                id="Platinum"
                name="tier"
                value="Platinum"
                className={styles.platinum}
                onChange={onFilterChange}
              />
              <label htmlFor="Platinum">플레티넘</label>
              <input
                type="radio"
                id="Diamond"
                name="tier"
                value="Diamond"
                className={styles.dia}
                onChange={onFilterChange}
              />
              <label htmlFor="Diamond">다이아</label>
            </div>
            <div className={styles.select_position}>
              <h2>Position 선택</h2>
              <input type="radio" id="Top" name="position" value="Top" onChange={onFilterChange} />
              <label htmlFor="Top">탑</label>
              <input type="radio" id="Jug" name="position" value="Jungle" onChange={onFilterChange} />
              <label htmlFor="Jug">정글</label>
              <input type="radio" id="Mid" name="position" value="Mid" onChange={onFilterChange} />
              <label htmlFor="Mid">미드</label>
              <input type="radio" id="AD" name="position" value="AD" onChange={onFilterChange} />
              <label htmlFor="AD">바텀(원딜)</label>
              <input type="radio" id="Sup" name="position" value="Sup" onChange={onFilterChange} />
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
