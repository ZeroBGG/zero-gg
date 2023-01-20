import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { dbService } from 'src/firebase';
import { collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import DuoCards from './DuoCards/DuoCards';
import WriteDuo from './WriteDuo/WriteDuo';
import FilterRadio from './Common/Filter/FilterRadio';
import { DuoType, FilterType } from './utils/DuoType';
import styles from './Duo.module.scss';
import Radio from './Common/InputRadio/Radio';

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
      const q = query(collection(dbService, 'myLOLInfo'), orderBy('createdAt', 'desc'));
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
    const selectPosition = selectValue.position;
    const selectQueue = selectValue.queue;
    const selectTier = selectValue.tier;

    if (selectPosition && selectQueue && selectTier === null) {
      setLolInfoFilterList(lolInfo);
    } else {
      const filteredList = lolInfo.reduce(
        (acc, cur) => {
          const positionCondition = selectPosition ? cur.position === selectPosition : true;
          const queueCondition = selectQueue ? cur.queue === selectQueue : true;
          const tierCondition = selectTier ? cur.tier === selectTier : true;

          if (positionCondition && queueCondition && tierCondition) {
            acc.push(cur);
          }

          return acc;
        },
        [selectValue],
      );
      filteredList.splice(0, 1);
      setLolInfoFilterList(filteredList);
    }
  };

  const onFilterChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value, name },
      } = e;
      setSelectValue({ ...selectValue, [name]: value });
    },
    [selectValue],
  );

  useEffect(() => {
    getDuoData();
  }, []);

  useEffect(() => {
    FilterDuoData();
  }, [lolInfo, selectValue]);

  return (
    <>
      <main>
        <article className={styles.duo_article}>
          <WriteDuo />
          <section>
            <div className={styles.wrapper}>
              <div className={styles.select_queue}>
                <h2>Queue 선택</h2>
                <Radio
                  type="radio"
                  id="Duo"
                  onChange={onFilterChange}
                  name="queue"
                  value="Duo"
                  inLabelText="듀오랭크"
                />
                {/* <input type="radio" id="Duo" onChange={onFilterChange} name="queue" value="Duo" />
                <label htmlFor="Duo">듀오랭크</label> */}
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
                {lolInfoFilterList.map((item: DuoType, idx: number) => {
                  const UNIQUE_KEY = item.userId + idx.toString();
                  if (item.position && item.queue && item.tier !== null) {
                    return (
                      <>
                        <DuoCards key={UNIQUE_KEY} duoObj={item} />
                      </>
                    );
                  }
                })}
              </ul>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

export default Duo;
