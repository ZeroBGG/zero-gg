import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';

import { dbService } from 'src/firebase';
import { matchProps, matchTeamType } from '@/components/LCK/typings';
import styles from './Schedule.module.scss';
interface paramProps {}
const Schedule = () => {
  const [league, setLeague] = useState<any[]>([]);
  const param = useParams();
  const [lckmonth, setLckMonth] = useState<any>();
  useEffect(() => {
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

  console.log('param :' + param.month);
  let monthMatch = league.find((i) => {
    if (i.month == param) {
      return true;
    }
  });
  console.log(league.find((item) => item.month));
  return (
    <section className={styles.schedule_container}>
      <ul className={styles.schedule_list}>
        {lckmonth ? (
          <li>일정이 없습니다.</li>
        ) : (
          league.map((item) =>
            param.month === item.month ? (
              <li className={styles.schedule_item} key={item.id}>
                <div className={styles.date_container}>
                  <span className={styles.matches}>{item.date}</span>
                  <span className={styles.day}>{item.day}</span>
                  <div className={styles.match}>
                    {item.matches.map((match: matchTeamType, idx: number) => (
                      <div className={styles.team_info} key={`${match.date}_${idx}`}>
                        <div className={styles.blue}>
                          <img src={match.teams.blue.logoUrl} alt="blue_logo" />
                          <span className={styles.blue_name}>{match.teams.blue.name}</span>
                        </div>
                        vs
                        <div className={styles.red}>
                          <img src={match.teams.red.logoUrl} alt="red_logo" />
                          <span className={styles.red_name}>{match.teams.red.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ) : null,
          )
        )}
      </ul>
    </section>
  );
};
export default Schedule;
