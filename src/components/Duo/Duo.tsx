import { useEffect, useState } from 'react';
import styles from './Duo.module.scss';
import { dbService } from 'src/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import WriteDuo from './WriteDuo/WriteDuo';
import { postionArr, queueArr, tierArr } from './utils/DuoArr';
import { Link } from 'react-router-dom';

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
              {queueArr.map((item, idx) => {
                return (
                  <>
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  </>
                );
              })}
            </select>
            <select name="tier">
              {tierArr.map((item, idx) => {
                return (
                  <>
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  </>
                );
              })}
            </select>
            <select name="position">
              {postionArr.map((item, idx) => {
                return (
                  <>
                    <option value={item} key={idx}>
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
              {lolInfo.map((item, idx) => {
                return (
                  <>
                    <Link to={`${item.id}`}>
                      <li key={`${item.id}_${idx}`} className={styles.li_card}>
                        <div className={styles.list_div_card}>
                          <div className={styles.div_time}>
                            <p>{item.timeSet}</p>
                          </div>
                          <div className={styles.div_content}>
                            <h2>{item.title}</h2>
                            <p>{item.memo}</p>
                          </div>
                          <div className={styles.div_info}>
                            <p>
                              id : {item.nickName} | most : {item.mostChamp}
                            </p>
                          </div>
                        </div>
                      </li>
                    </Link>
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
