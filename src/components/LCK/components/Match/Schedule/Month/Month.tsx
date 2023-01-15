import { Link } from 'react-router-dom';
import styles from './Month.module.scss';

const Month = () => {
  const array = Array.from({ length: 12 }, (v, i) => i + 1);

  return (
    <>
      {array.map((item, idx) => (
        <Link to={`${item}`} className={styles.item} key={idx}>
          <div className={styles.month} id={`${item}월`}>
            <span>{item}월</span>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Month;
