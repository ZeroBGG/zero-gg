import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';

import { dbService } from 'src/firebase';
import { matchTeamType } from '@/components/LCK/typings';
import styles from './Schedule.module.scss';
import Item from './Item';
import SideBar from './SideBar';
type hoverType = {
  isHover: boolean;
};

const Schedule = ({ isHover }: hoverType) => {
  const [league, setLeague] = useState<any[]>([]);
  const [id, setId] = useState<string>('');
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const param = useParams<any>();

  useMemo(async () => {
    const lckTeam = query(collection(dbService, 'lck_matches'));
    const fetchData = await onSnapshot(lckTeam, (querySnapshot) => {
      try {
        const info = querySnapshot.docs.map((docs) => ({
          id: docs.id,
          ...docs.data(),
        }));
        setLeague(info);
        console.log(info);
      } catch (e) {
        console.log(e);
      }
      fetchData();
    });
  }, []);

  const filterdData = () => {
    console.log(league);
  };

  const FilteredList = league?.filter((el) => {
    if (el.month === param.month) {
      return true;
    }
  });

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setId(event.currentTarget.id);
  };
  const MonthMapping = (item: any) => {
    return item?.matches?.map((match: matchTeamType, idx: number) => {
      const { date, time, state, teams } = match;
      if (match.first) {
        return (
          <div className={[styles.first, styles.game].join('')} key={`${match.date}_${idx}`}>
            <Item time={time} date={date} blue={teams.blue} red={teams.red} state={state} idx={idx} />
          </div>
        );
      } else {
        return (
          <div className={[styles.second, styles.game].join('')} key={`${match.date}_${idx}`}>
            <Item time={time} date={date} blue={teams.blue} red={teams.red} state={state} idx={idx} />
          </div>
        );
      }
    });
  };
  return (
    <section className={styles.schedule_container}>
      <ul className={styles.schedule_list}>
        {Number(param.month) > 4 ? (
          <div>일정이 없습니다.</div>
        ) : (
          FilteredList.map((item) => (
            <li className={styles.schedule_item} key={item.id}>
              <div className={styles.item_container}>
                <div className={styles.match_day}>
                  <span className={styles.date}>{item.date}</span>
                  <span className={styles.day}>({item.day.split('')[0]})</span>
                </div>
                <div className={styles.match}>{MonthMapping(item)}</div>
              </div>
            </li>
          ))
        )}
      </ul>
      {isHover ? <SideBar handleChange={handleClick} /> : null}
    </section>
  );
};
export default Schedule;
