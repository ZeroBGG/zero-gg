import data from '@/data/matches.json';
import { useEffect, useState } from 'react';
import { matchProps } from '../../typings';
import styles from './Match.module.scss';

const Match = () => {
  const [league, setLeague] = useState<matchProps[]>([]);

  useEffect(() => {
    data.map((lck: any) => {
      return setLeague(lck);
    });
  }, []);

  console.log(league);
  return (
    <section className={styles.container}>
      <div>
        <div>
          {league.map((item) => {
            return (
              <div>
                {item.matches.map((i: any) => {
                  console.log(i.match1[0].teams.blue.name);
                  return (
                    <>
                      <div>{i.match1[0].date}</div>
                      <div>{i.match1[0].time}</div>
                      <div>{i.match1[0].matchName}</div>
                      <div>{i.match1[0].teams.blue.name}</div>
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Match;
