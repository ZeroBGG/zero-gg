import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { dbService } from 'src/firebase';
import { collection, onSnapshot, orderBy, query, startAt, limit, getDocs } from 'firebase/firestore';
import { DuoType, FilterType } from './utils/DuoType';
import DuoCards from './DuoCards/DuoCards';
import WriteDuo from './WriteDuo/WriteDuo';
import InputRadio from './Common/InputRadio/InputRadio';
import { BiChevronsDown } from 'react-icons/bi';
import styles from './Duo.module.scss';

// import FilterStore from './Common/Filter/FilterRadio';

const Duo = () => {
  const [lolInfo, setLolInfo] = useState<any[]>([]);
  const [lolInfoFilterList, setLolInfoFilterList] = useState<any[]>([]);
  const [key, setKey] = useState<any>(null);
  const [selectValue, setSelectValue] = useState<FilterType>({
    queue: '',
    tier: '',
    position: '',
  });

  // const { queueFilter, tierFilter, positionFilter } = FilterStore();

  const getDuoData = useCallback(async () => {
    const queryRef = query(collection(dbService, 'myLOLInfo'), orderBy('createdAt', 'desc'), limit(5));
    try {
      onSnapshot(queryRef, async (snapshot) => {
        const myLolArr = snapshot.docs.map((dosc) => ({
          id: dosc?.id,
          ...dosc.data(),
        }));
        setLolInfo(myLolArr);
        const snap = await getDocs(queryRef);
        setKey(snap.docs[snap.docs.length - 1]); // 해당 키 배열의 위치를 실시간 업데이트
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const onNextScroll = async () => {
    const queryRef = query(collection(dbService, 'myLOLInfo'), orderBy('createdAt', 'desc'), startAt(key), limit(6));
    try {
      const snap = await getDocs(queryRef);
      setKey(snap.docs[snap.docs.length - 1]); // 실시간 업데이트를 통해 배열의 키 위치 조정
      const docsArray = snap.docs.map((docs) => ({ id: docs?.id, ...docs.data() }));
      if (docsArray.length === 1) {
        window.alert('더이상 없습니다');
      } else {
        setLolInfo([...lolInfo, ...docsArray.splice(1, 5)]); // splice 안하면 마지막 배열이 다시 나옴
      }
    } catch (e) {
      console.error(e);
    }
  };

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

      if (filteredList.length === 0) {
        setLolInfoFilterList([]);
      }

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
                {lolInfoFilterList.length !== 0 ? (
                  lolInfoFilterList.map((item: DuoType, idx: number) => {
                    const UNIQUE_KEY = item.userId + item.createdAt + idx.toString();
                    if (item.position && item.queue && item.tier !== null) {
                      return (
                        <div key={UNIQUE_KEY}>
                          <DuoCards key={UNIQUE_KEY} duoObj={item} />
                        </div>
                      );
                    }
                  })
                ) : (
                  <>
                    <li className={styles.li_card}>
                      <h2>존재하는 소환사가 없습니다.!</h2>
                    </li>
                  </>
                )}
                <div className={styles.next_button}>
                  <button onClick={onNextScroll}>
                    <BiChevronsDown className={styles.button_svg} />
                  </button>
                </div>
              </ul>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

export default Duo;
