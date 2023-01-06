import { useEffect, useState } from 'react';
import styles from './Duo.module.scss';
import { dbService } from 'src/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import WriteDuo from './WriteDuo/WriteDuo';
import { postionArr, queueArr, tierArr } from './utils/DuoArr';
import DuoCards from './DuoCards/DuoCards';
import { DuoType } from './utils/DuoType';

const Duo = () => {
  const [lolInfo, setLolInfo] = useState<any[]>([]);

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

  return (
    <>
      <main>
        <WriteDuo />
        <section>
          <div>
            <select name="queue">
              {queueArr.map((item: string, idx: number) => {
                return (
                  <>
                    <option value={item} key={`${item}_${idx}`}>
                      {item}
                    </option>
                  </>
                );
              })}
            </select>
            <select name="tier">
              {tierArr.map((item: string, idx: number) => {
                return (
                  <>
                    <option value={item} key={`${item}_${idx}`}>
                      {item}
                    </option>
                  </>
                );
              })}
            </select>
            <select name="position">
              {postionArr.map((item: string, idx: number) => {
                return (
                  <>
                    <option value={item} key={`${item}_${idx}`}>
                      {item}
                    </option>
                  </>
                );
              })}
            </select>
            <button>듀오찾기</button>
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
