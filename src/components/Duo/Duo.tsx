import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { dbService } from 'src/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import DuoCards from './DuoCards/DuoCards';
import WriteDuo from './WriteDuo/WriteDuo';
import { DuoType } from './utils/DuoType';
import useInput from '@/hooks/useInput';
import styles from './Duo.module.scss';

interface FilterType {
  queue: [];
  tier: [];
  position: [];
}

const Duo = () => {
  const [lolInfo, setLolInfo] = useState<any[]>([]);
  const [values, setValues] = useState<FilterType>({
    queue: [],
    tier: [],
    position: [],
  });

  useEffect(() => {
    const q = query(collection(dbService, 'myLOLInfo'));
    onSnapshot(q, (querySnapshot) => {
      const myLol = querySnapshot.docs.map((docs) => ({
        id: docs.id,
        ...docs.data(),
      }));
      setLolInfo(myLol);
    });
  }, []);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setValues({ ...values });
  }, []);

  return (
    <>
      <main>
        <WriteDuo />
        <section>
          <div className={styles.wrapper}>
            <div className={styles.select_queue}>
              <h2>Queue 선택</h2>
              <input type="radio" id="Duo" name="Queue" value="Duo" onChange={onChange} />
              <label htmlFor="Duo">듀오랭크</label>
              <input type="radio" id="Free" name="Queue" value="Free" onChange={onChange} />
              <label htmlFor="Free">자유랭크</label>
              <input type="radio" id="Narak" name="Queue" value="Narak" onChange={onChange} />
              <label htmlFor="Narak">칼바람 나락</label>
            </div>
            <div className={styles.select_tier}>
              <h2>Rank 선택</h2>
              <input type="radio" id="Iron" name="Rank" value="Iron" className={styles.iron} />
              <label htmlFor="Iron">아이언</label>
              <input type="radio" id="Bronze" name="Rank" value="Bronze" className={styles.bronze} />
              <label htmlFor="Bronze">브론즈</label>
              <input type="radio" id="Silver" name="Rank" value="Silver" className={styles.silver} />
              <label htmlFor="Silver">실버</label>
              <input type="radio" id="Gold" name="Rank" value="Gold" className={styles.gold} />
              <label htmlFor="Gold">골드</label>
              <input type="radio" id="Platinum" name="Rank" value="Platinum" className={styles.platinum} />
              <label htmlFor="Platinum">플레티넘</label>
              <input type="radio" id="Diamond" name="Rank" value="Diamond" className={styles.dia} />
              <label htmlFor="Diamond">다이아</label>
            </div>
            <div className={styles.select_position}>
              <h2>Position 선택</h2>
              <input type="radio" id="Top" name="Position" value="Top" />
              <label htmlFor="Top">탑</label>
              <input type="radio" id="Jug" name="Position" value="Jungle" />
              <label htmlFor="Jug">정글</label>
              <input type="radio" id="Mid" name="Position" value="Mid" />
              <label htmlFor="Mid">미드</label>
              <input type="radio" id="AD" name="Position" value="AD" />
              <label htmlFor="AD">바텀(원딜)</label>
              <input type="radio" id="Sup" name="Position" value="Sup" />
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
