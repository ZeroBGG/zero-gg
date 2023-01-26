import React, { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { dbService } from 'src/firebase';
import { matchesType, matchListProps, matchTeamType } from '@/components/LCK/typings';
import styles from './Schedule.module.scss';
import Item from './Item';
import SideBar from './SideBar';
import { useParams } from 'react-router';
import useStore from '@/hooks/useStore';
import myMonth from '@/components/LCK/Zustand/myMonth';
type hoverType = {
  isHover: boolean;
};

const Schedule = React.memo(({ isHover }: hoverType) => {
  const [list, setList] = useState<matchListProps[]>([]);
  const [filterList, setFilterList] = useState<matchListProps[]>([]);
  const { id } = useStore();
  const { mon } = myMonth();
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
  const Split = (text: string) => {
    return text.split('요일')[0];
  };

  /// 데이터 필터링
  const filterData = () => {
    if (mon === '1월' && id === '') {
      setFilterList(list);
    } else {
      const Filter = list.reduce((acc: matchListProps[], el: matchListProps) => {
        const DateCodition = mon ? el.month === mon : true;

        const TeamCondition1 = id ? el.matches[0].matchOne.home.id.includes(id) : true;
        const TeamCondition2 = id ? el.matches[0].matchOne.away.id.includes(id) : true;
        const TeamCondition3 = id ? el.matches[0].matchTwo.home.id.includes(id) : true;
        const TeamCondition4 = id ? el.matches[0].matchTwo.away.id.includes(id) : true;

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
  }, [list, mon, id]);

  return (
    <section className={styles.schedule_container}>
      <ul className={styles.schedule_list}>
        {filterList.map((lst: matchListProps) => {
          return (
            <li className={styles.schedules_item} key={lst.id}>
              <div className={styles.date_info}>
                <span className={styles.date}>{lst.date}</span>
                <span className={styles.day}>({Split(lst.day)})</span>
              </div>
              <div className={styles.item}>
                <div className={styles.matches}>
                  {lst.matches.map((match: matchesType) => {
                    const { matchOne, matchTwo } = match;
                    // matches가 두경기 다 포함하고 있기에 조건문을 통해서 조금 유형별로 데이터가 표시되는 방법을 다르게 만들었습니다.
                    if (mon === '' && id === '') {
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
                    if (mon && id === '') {
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
                    if (matchOne.home.id.includes(id) || matchOne.away.id.includes(id)) {
                      return (
                        <div className={styles.match_card}>
                          <Item matchType={matchOne} />
                        </div>
                      );
                    } else {
                      return (
                        <div className={styles.match_card}>
                          <Item matchType={matchTwo} />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {isHover ? <SideBar /> : null}
    </section>
  );
});
export default Schedule;

// error 1 ==> 필터를 돌릴때 두번째 경기가 첫번째 경기로 나옴
// solution ==> json안에 first항목에 boolean 값 유무에 따라서 필터를 하게끔 했습니다.
