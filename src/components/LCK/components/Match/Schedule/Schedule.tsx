import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';

import { dbService } from 'src/firebase';
import { matchProps, matchTeamType } from '@/components/LCK/typings';
import styles from './Schedule.module.scss';
import Item from './Item';
type paramType = {
  month?: string | undefined;
};
const Schedule = () => {
  const [league, setLeague] = useState<any[]>([]);
  const param = useParams<any>();
  useMemo(() => {
    const lckTeam = query(collection(dbService, 'lck_matches'));
    onSnapshot(lckTeam, (querySnapshot) => {
      try {
        const info = querySnapshot.docs.map((docs) => ({
          id: docs.id,
          ...docs.data(),
        }));
        setLeague(info);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  const matchMonth = league.filter((i) => {
    if (i.month == param.month) {
      return true;
    }
  });
  const nomatch = Number(param.month.split('월')[0]);
  return (
    <section className={styles.schedule_container}>
      <ul className={styles.schedule_list}>
        {nomatch > 4 ? (
          <li>일정이 없습니다.</li>
        ) : (
          matchMonth.map((item) => (
            <li className={styles.schedule_item} key={item.id}>
              <div className={styles.item_container}>
                <div className={styles.match_day}>
                  <span className={styles.date}>{item.date.replace('-', '.')}</span>
                  <span className={styles.day}>({item.day.split('')[0]})</span>
                </div>
                <div className={styles.match}>
                  {item.matches.map((match: matchTeamType, idx: number) =>
                    match.first === true ? (
                      <div className={[styles.first, styles.game].join('')} key={`${match.date}_${idx}`}>
                        <Item
                          time={match.time}
                          date={match.date}
                          blue={match.teams.blue}
                          red={match.teams.red}
                          state={match.state}
                          idx={idx}
                        />
                      </div>
                    ) : (
                      <div className={[styles.second, styles.game].join('')} key={`${match.date}_${idx}`}>
                        <Item
                          time={match.time}
                          date={match.date}
                          blue={match.teams.blue}
                          red={match.teams.red}
                          state={match.state}
                          idx={idx}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};
export default Schedule;
