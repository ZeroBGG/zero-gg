import { memo, useCallback, useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { Params, useParams } from 'react-router';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';
import { dbService } from 'src/firebase';
import { matchListProps } from '@/components/LCK/typings';
import styles from './Schedule.module.scss';
import SideBar from './Sidebar/SideBar';
import No_Schedule from './Noschedule/NoSchedule';
import Loading from '@/components/LCK/components/Loading/Loading';
import { useDateStore } from '@/components/LCK/Zustand/myMonth';
import { openSideBarVaritent } from '@/components/LCK/varients/variants';
import Filtering from './Filtering/Filtering';
import useStore from '@/components/LCK/Zustand/useStore';

type hoverType = {
  isHover: boolean;
  limitCount: number;
  collectionName: string;
};

const MAX_MATCH_NUMBER = 44;

const Schedule = ({ isHover, limitCount, collectionName }: hoverType) => {
  const [list, setList] = useState<matchListProps[]>([]);
  const [filterList, setFilterList] = useState<matchListProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState<any>(null);
  const [noMore, setNoMore] = useState(false);
  const { id } = useStore();
  const { mon, getMonth } = useDateStore();
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

  // 무한스크롤 로딩
  useEffect(() => {
    //inView가 True가 되는 순간 로드데이터를 15개씩 불러옴
    if (inView) {
      loadMore(15);
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
  // 월별 필터후 새로고침시 유지
  useEffect(() => {
    localStorage.setItem('monthstorage', params.month);
    let saved = localStorage.getItem('monthstorage');
    if (saved !== null) {
      getMonth(params.month);
    } else {
      getMonth('');
    }
  }, []);
  // 뒤에 요일 자름
  const Split = (text: string) => {
    return text.split('요일')[0];
  };

  return (
    <section className={styles.schedule_container}>
      <ul className={styles.schedule_list} role="listbox">
        {Number(mon) < 4 || params.month === undefined ? (
          filterList.map((lst: matchListProps) => (
            <li className={styles.schedules_item} key={lst.id} role="none">
              <div className={styles.date_info}>
                <span className={styles.date}>{lst.date}</span>
                <span className={styles.day}>({Split(lst.day)})</span>
              </div>
              <div className={styles.item}>
                <div className={styles.matches}>
                  <Filtering list={lst} mon={mon} id={id} />
                </div>
              </div>
            </li>
          ))
        ) : (
          <>
            <No_Schedule />
          </>
        )}

        <div ref={ref} />
        {list.length > 0 && list.length < MAX_MATCH_NUMBER ? (
          <>
            {loading ? (
              <>
                <Loading />
              </>
            ) : (
              <>{!noMore ? <div className={styles.nomore}></div> : ''}</>
            )}
          </>
        ) : (
          ''
        )}
      </ul>
      {isHover ? (
        <motion.aside
          className={styles.sidebar_container}
          initial={'initial'}
          animate={'open'}
          variants={openSideBarVaritent}
        >
          <SideBar />
        </motion.aside>
      ) : (
        <motion.aside
          className={styles.sidebar_container}
          initial={'open'}
          animate={'initial'}
          variants={openSideBarVaritent}
        ></motion.aside>
      )}
    </section>
  );
};
export default memo(Schedule);

// error 1 ==> 필터를 돌릴때 두번째 경기가 첫번째 경기로 나옴
// solution ==> json안에 first항목에 boolean 값 유무에 따라서 필터를 하게끔 했습니다.
