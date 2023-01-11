import React from 'react';
import { Link } from 'react-router-dom';
import { DuoType } from '../utils/DuoType';
import styles from './DuoCards.module.scss';

const DuoCards = ({ duoObj }: { duoObj: DuoType }) => {
  return (
    <>
      <Link to={`${duoObj.userId}`} state={{ duoObj }}>
        <li className={styles.list}>
          <div className={styles.wrapper}>
            <div className={styles.user}>
              <p>{duoObj.nickName}</p>
            </div>
            <div className={styles.title}>
              <h2>{duoObj.title}</h2>
            </div>
            <div className={styles.memo}>
              <p>{duoObj.memo}</p>
            </div>
            <div className={styles.champ}>
              <p>{duoObj.mostChamp}</p>
            </div>
            <div className={styles.time}>
              <p>{duoObj.timeSet}</p>
            </div>
          </div>
        </li>
      </Link>
    </>
  );
};

export default DuoCards;
