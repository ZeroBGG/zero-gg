import { matchListProps, matchesType } from '@/components/LCK/typings';
import styles from '@/components/LCK/components/Match/Schedule/Schedule.module.scss';
import { useParams } from 'react-router';
import Item from '../Item/Item';

interface FilteringProps {
  list: matchListProps;
  mon: string;
  id: string;
}

function Filtering(props: FilteringProps) {
  const params = useParams();
  return (
    <>
      {props.list.matches.map((match: matchesType, idx: number) => {
        const { matchOne, matchTwo } = match;
        const TeamCondition = matchOne.home.id.includes(props.id) || matchOne.away.id.includes(props.id);
        const TeamCondition2 = matchTwo.home.id.includes(props.id) || matchTwo.away.id.includes(props.id);
        const UNIQUE_KEY = matchOne.state + idx.toString();
        // matches가 두경기 다 포함하고 있기에 조건문을 통해서 조금 유형별로 데이터가 표시되는 방법을 다르게 만들었습니다.
        if (props.mon === '' && props.id === '') {
          return (
            <div className={styles.match_card} key={UNIQUE_KEY}>
              <Item matchType={matchOne} />
              <Item matchType={matchTwo} />
            </div>
          );
        }
        if (props.mon === params.month && props.id == '') {
          return (
            <div className={styles.match_card} key={UNIQUE_KEY}>
              <Item matchType={matchOne} />
              <Item matchType={matchTwo} />
            </div>
          );
        }
        if (props.mon === params.month && TeamCondition) {
          return (
            <div className={styles.match_card} key={UNIQUE_KEY}>
              <Item matchType={matchOne} />
            </div>
          );
        }
        if (props.mon === params.month && TeamCondition2) {
          return (
            <div className={styles.match_card} key={UNIQUE_KEY}>
              <Item matchType={matchTwo} />
            </div>
          );
        }
      })}
    </>
  );
}

export default Filtering;
