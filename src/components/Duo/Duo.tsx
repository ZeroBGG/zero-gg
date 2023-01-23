import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { dbService } from 'src/firebase';
import { collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import DuoCards from './DuoCards/DuoCards';
import WriteDuo from './WriteDuo/WriteDuo';
import FilterRadio from './Common/Filter/FilterRadio';
import { DuoType, FilterType } from './utils/DuoType';
import styles from './Duo.module.scss';
import InputRadio from './Common/InputRadio/InputRadio';

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
                <InputRadio
                  type="radio"
                  id="Duo"
                  onChange={onFilterChange}
                  name="queue"
                  value="Duo"
                  inLabelText="듀오랭크"
                />
                <InputRadio
                  type="radio"
                  id="Free"
                  onChange={onFilterChange}
                  name="queue"
                  value="Free"
                  inLabelText="자유랭크"
                />
                <InputRadio
                  type="radio"
                  id="Narak"
                  onChange={onFilterChange}
                  name="queue"
                  value="Narak"
                  inLabelText="칼바람 나락"
                />
              </div>
              <div className={styles.select_tier}>
                <h2>Tier 선택</h2>
                <InputRadio
                  type="radio"
                  id="Iron"
                  onChange={onFilterChange}
                  name="tier"
                  value="Iron"
                  inLabelText="아이언"
                  className={styles.iron}
                />
                <InputRadio
                  type="radio"
                  id="Bronze"
                  onChange={onFilterChange}
                  name="tier"
                  value="Bronze"
                  inLabelText="브론즈"
                  className={styles.bronze}
                />
                <InputRadio
                  type="radio"
                  id="Silver"
                  onChange={onFilterChange}
                  name="tier"
                  value="Silver"
                  inLabelText="실버"
                  className={styles.silver}
                />
                <InputRadio
                  type="radio"
                  id="Gold"
                  onChange={onFilterChange}
                  name="tier"
                  value="Gold"
                  inLabelText="골드"
                  className={styles.gold}
                />
                <InputRadio
                  type="radio"
                  id="Platinum"
                  onChange={onFilterChange}
                  name="tier"
                  value="Platinum"
                  inLabelText="플래티넘"
                  className={styles.platinum}
                />
                <InputRadio
                  type="radio"
                  id="Diamond"
                  onChange={onFilterChange}
                  name="tier"
                  value="Diamond"
                  inLabelText="다이아"
                  className={styles.dia}
                />
              </div>
              <div className={styles.select_position}>
                <h2>Position 선택</h2>
                <InputRadio
                  type="radio"
                  id="Top"
                  onChange={onFilterChange}
                  name="position"
                  value="Top"
                  inLabelText="탑"
                />
                <InputRadio
                  type="radio"
                  id="Jug"
                  onChange={onFilterChange}
                  name="position"
                  value="Jug"
                  inLabelText="정글"
                />
                <InputRadio
                  type="radio"
                  id="Mid"
                  onChange={onFilterChange}
                  name="position"
                  value="Mid"
                  inLabelText="미드"
                />
                <InputRadio
                  type="radio"
                  id="AD"
                  onChange={onFilterChange}
                  name="position"
                  value="AD"
                  inLabelText="바텀(원딜)"
                />
                <InputRadio
                  type="radio"
                  id="Sup"
                  onChange={onFilterChange}
                  name="position"
                  value="Sup"
                  inLabelText="서포터"
                />
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
