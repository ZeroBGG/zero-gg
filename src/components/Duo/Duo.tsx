import { FormEvent, useEffect, useState } from 'react';
import { dbService } from 'src/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { postionArr, queueArr, tierArr } from './utils/DuoArr';
import DuoCards from './DuoCards/DuoCards';
import WriteDuo from './WriteDuo/WriteDuo';
import { DuoType } from './utils/DuoType';
import useInput from '@/hooks/useInput';
import styles from './Duo.module.scss';

const Duo = () => {
  const [lolInfo, setLolInfo] = useState<any[]>([]);

  const inputSelectQueue = useInput('');
  const inputSelectTier = useInput('');
  const inputSelectPosition = useInput('');

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <main>
        <WriteDuo />
        <section>
          <div>
            <form onSubmit={onSubmit}>
              <select name="queue" {...inputSelectQueue}>
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
              <select name="tier" {...inputSelectTier}>
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
              <select name="position" {...inputSelectPosition}>
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
            </form>
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
