import React, { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { dbService } from 'src/firebase';
import { matchListProps, matchTeamType } from '@/components/LCK/typings';
import styles from './Schedule.module.scss';
import Item from './Item';
import SideBar from './SideBar';
type hoverType = {
  isHover: boolean;
};

const Schedule = ({ isHover }: hoverType) => {
  const [list, setList] = useState<matchListProps[]>([]);
  const [filterList, setFilterList] = useState<matchListProps[]>([]);
  const [monthKeyword, setMonthKeyword] = useState('');
  const [TeamKeyword, setTeamKeyword] = useState('');

  // data 불러오기
  const fetchData = useCallback(() => {
    const lckTeam = query(collection(dbService, 'lck_matches'));
    onSnapshot(lckTeam, (querySnapshot) => {
      try {
        const lckInfo: any = querySnapshot.docs.map((docs) => ({
          id: docs.id,
          ...docs.data(),
        }));
        setList(lckInfo);
      } catch (e) {
        console.error(e);
      }
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  const MonthFun = (month: string) => {
    setMonthKeyword(month);
  };
  const TeamFun = (team: string) => {
    setTeamKeyword(team);
  };

  /// 데이터 필터링
  console.log(TeamKeyword);
  const filterData = () => {
    if (monthKeyword === '' && TeamKeyword === '') {
      setFilterList(list);
      console.log(list);
    } else {
      const Filter = list.reduce((acc: any, el: any) => {
        const DateCodition = monthKeyword ? el.month === monthKeyword : true;

        const TeamCondition1 = TeamKeyword ? el.matches[0].matchOne.home.id.includes(TeamKeyword) : true;
        const TeamCondition2 = TeamKeyword ? el.matches[0].matchOne.away.id.includes(TeamKeyword) : true;
        const TeamCondition3 = TeamKeyword ? el.matches[0].matchTwo.home.id.includes(TeamKeyword) : true;
        const TeamCondition4 = TeamKeyword ? el.matches[0].matchTwo.away.id.includes(TeamKeyword) : true;

        const Condition = TeamCondition1 || TeamCondition2 || TeamCondition3 || TeamCondition4;
        if (DateCodition && Condition) {
          acc.push(el);
        }
        return acc;
      }, []);

      setFilterList(Filter);
    }
  };
  useEffect(() => {
    filterData();
  }, [list, monthKeyword, TeamKeyword]);

  return (
    <section className={styles.schedule_container}>
      <ul className={styles.schedule_list}>
        {filterList.map((lst: any) => {
          return (
            <li className={styles.schedules_item}>
              <div className={styles.date_info}>
                <span className={styles.date}>{lst.date}</span>
                <span className={styles.day}>{lst.day}</span>
              </div>
              <div className={styles.item}>
                <div className={styles.matches}>
                  {lst.matches.map((match: any) => {
                    const { matchOne, matchTwo } = match;
                    // matches가 두경기 다 포함하고 있기에 조건문을 통해서 조금 유형별로 데이터가 표시되는 방법을 다르게 만들었습니다.
                    if (monthKeyword === '' && TeamKeyword === '') {
                      return (
                        <>
                          <div className={styles.match_card}>
                            <Item matchType={matchOne} />
                          </div>
                          <div className={styles.match_card}>
                            <Item matchType={matchTwo} />
                          </div>
                        </>
                      );
                    }
                    if (monthKeyword && TeamKeyword === '') {
                      return (
                        <>
                          <div className={styles.match_card}>
                            <Item matchType={matchOne} />
                          </div>
                          <div className={styles.match_card}>
                            <Item matchType={matchTwo} />
                          </div>
                        </>
                      );
                    }
                    if (matchOne.home.id.includes(TeamKeyword) || matchOne.away.id.includes(TeamKeyword)) {
                      return (
                        <>
                          <div className={styles.match_card}>
                            <Item matchType={matchOne} />
                          </div>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div className={styles.match_card}>
                            <Item matchType={matchTwo} />
                          </div>
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {isHover ? <SideBar handleMonth={MonthFun} handleTeam={TeamFun} /> : null}
    </section>
  );
};
export default Schedule;

// error 1 ==> 필터를 돌릴때 두번째 경기가 첫번째 경기로 나옴
// solution ==> json안에 first항목에 boolean 값 유무에 따라서 필터를 하게끔 했습니다.
