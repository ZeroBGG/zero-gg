import { Link, Outlet } from 'react-router-dom';
import styles from './Month.module.scss';

const months = ['전체', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const Month = () => {
  return (
    <div className={styles.month_container}>
      <article className={styles.content}>
        <nav className={styles.month_list}>
          {months.map((item, idx) =>
            item === '전체' ? (
              <span key={`${item}_${idx}`}>
                <Link to={'all'}>{item}</Link>
              </span>
            ) : (
              <span key={`${item}_${idx}`}>
                <Link to={`${item}`}>{item}</Link>
              </span>
            ),
          )}
        </nav>
        <Outlet />
      </article>
    </div>
  );
};

export default Month;
