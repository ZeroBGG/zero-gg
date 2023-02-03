import { useCallback, useEffect, useRef, useState } from 'react';
import { QuerySnapshot, collection, getDocs, limit, onSnapshot, orderBy, query, startAfter } from 'firebase/firestore';
import { dbService } from 'src/firebase';
import { matchesType, matchListProps } from '@/components/LCK/typings';
import styles from './Schedule.module.scss';
import Item from './Item/Item';
import SideBar from './Sidebar/SideBar';
import { useParams } from 'react-router';
import useStore from '@/hooks/useStore';
import { useDateStore } from '@/components/LCK/Zustand/myMonth';
import { useTeams } from '@/components/LCK/Zustand/useTeams';
import No_Schedule from './Noschedule/NoSchedule';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { liVarients } from '../../Varients/variants';
import Loading from '../../Loading/Loading';

type hoverType = {
  isHover: boolean;
  limitCount: number;
  collectionName: string;
};
const Schedule = ({ isHover, limitCount, collectionName }: hoverType) => {
  const [list, setList] = useState<matchListProps[]>([]);
  const [filterList, setFilterList] = useState<matchListProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState<any>(null);
  const [noMore, setNoMore] = useState(false);
  const { id } = useStore();
  const { mon, getMonth } = useDateStore();
  const { info } = useTeams();
  const [ref, inView] = useInView();
  let params: any = useParams();

  /// data 불러오기
  const fetchData = useCallback(async () => {
    const lckTeam = query(collection(dbService, collectionName), orderBy('id', 'asc'), limit(limitCount));

    await getDocs(lckTeam).then((querySnapshot) => {
      try {
        setLoading(true);
        const lckInfo: any = querySnapshot.docs.map((docs) => ({
          id: docs.id,
          ...docs.data(),
        }));
        setList(lckInfo);
        setKey(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } catch (e) {
        console.error(e);
      }
    });
  }, [limitCount]);

  // 추가로 데이터 불러오기
  const loadMore = useCallback(
    async (loadCount: number) => {
      const queryRef = query(
        collection(dbService, collectionName),
        orderBy('id', 'asc'),
        limit(loadCount),
        startAfter(key),
      );
      try {
        const snap: any = await getDocs(queryRef);
        setTimeout(() => {
          snap.empty === 0 ? setNoMore(true) : setKey(snap.docs[snap.docs.length - 1]);
          const docsArray = snap.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setList([...list, ...docsArray]);
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    },

    [collectionName, list, key],
  );

  // data 불러오기
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 월별 필터후 새로고침시 유지
  useEffect(() => {
    let saved = localStorage.getItem('monthstorage');
    if (saved !== null) {
      getMonth(params.month);
    } else {
      getMonth('');
    }
  }, []);
  // 무한스크롤 로딩
  useEffect(() => {
    if (inView) {
      loadMore(7);
    }
  }, [inView]);

  /// 데이터 필터링
  const filterData = () => {
    if (mon === '' && id === '') {
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
  // 필터링
  useEffect(() => {
    filterData();
  }, [list, mon, id]);

  // 뒤에 요일 자름
  const Split = (text: string) => {
    return text.split('요일')[0];
  };
  console.log(loading, inView, list.length);
  return (
    <section className={styles.schedule_container}>
      <ul className={styles.schedule_list}>
        {filterList.length === 0 ? (
          <>
            <No_Schedule />
          </>
        ) : (
          filterList.map((lst: matchListProps, idx: number) => (
            <li className={styles.schedules_item} key={lst.id}>
              <div className={styles.date_info}>
                <span className={styles.date}>{lst.date}</span>
                <span className={styles.day}>({Split(lst.day)})</span>
              </div>
              <div className={styles.item}>
                <div className={styles.matches}>
                  {lst.matches.map((match: matchesType, idx: number) => {
                    const { matchOne, matchTwo } = match;
                    const UNIQUE_KEY = matchOne.state + idx.toString();
                    // matches가 두경기 다 포함하고 있기에 조건문을 통해서 조금 유형별로 데이터가 표시되는 방법을 다르게 만들었습니다.
                    if (mon === undefined && id === '') {
                      return (
                        <div className={styles.match_card} key={UNIQUE_KEY}>
                          <Item matchType={matchOne} />
                          <Item matchType={matchTwo} />
                        </div>
                      );
                    } else if (mon === params.month && id == '') {
                      return (
                        <div className={styles.match_card} key={UNIQUE_KEY}>
                          <Item matchType={matchOne} />
                          <Item matchType={matchTwo} />
                        </div>
                      );
                    } else if (matchOne.home.id.includes(id) || matchOne.away.id.includes(id)) {
                      return (
                        <div className={styles.match_card} key={UNIQUE_KEY}>
                          <Item matchType={matchOne} />
                        </div>
                      );
                    } else {
                      return (
                        <div className={styles.match_card} key={UNIQUE_KEY}>
                          <Item matchType={matchTwo} />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </li>
          ))
        )}
        <div ref={ref} />
        {list.length > 0 && list.length < 44 ? (
          <>
            {loading ? (
              <>
                <Loading />
              </>
            ) : (
              <div>더이상 불러올 피드가 없습니다.</div>
            )}
          </>
        ) : (
          <>{!noMore ? <div className={styles.nomore}>더이상 불러올 경기가 없어요</div> : ''}</>
        )}
      </ul>
      {isHover ? <SideBar /> : null}
    </section>
  );
};
export default Schedule;

// error 1 ==> 필터를 돌릴때 두번째 경기가 첫번째 경기로 나옴
// solution ==> json안에 first항목에 boolean 값 유무에 따라서 필터를 하게끔 했습니다.
