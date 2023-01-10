import React from 'react';
import { Link } from 'react-router-dom';
import { DuoType } from '../utils/DuoType';
import styles from './DuoCards.module.scss';

const DuoCards = ({ duoObj }: { duoObj: DuoType }) => {
  return (
    <>
      <Link to={`${duoObj.userId}`} state={{ duoObj }}>
        <li className={styles.li_card}>
          <div className={styles.list_div_card}>
            <div className={styles.div_time}>
              <p>{duoObj.timeSet}</p>
            </div>
            <div className={styles.div_content}>
              <h2>{duoObj.title}</h2>
              <p>{duoObj.memo}</p>
            </div>
            <div className={styles.div_info}>
              <p>
                id : {duoObj.nickName} | most : {duoObj.mostChamp}
              </p>
            </div>
          </div>
        </li>
      </Link>
    </>
  );
};

export default DuoCards;
