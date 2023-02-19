import { useCallback, useEffect, useRef, useState } from 'react';
import useStore from './Zustand/Zustand';
import WriteDuo from './WriteDuo/WriteDuo';
import ListDuo from './ListDuo/ListDuo';
import styles from './Duo.module.scss';

const Duo = () => {
  const modalRef = useRef<HTMLFormElement>(null);
  const { isModal, toggleModal } = useStore();

  const onScrollToggle = useCallback(() => {
    if (!!isModal) {
      document.body.style.cssText = `overflow: hidden`;
    } else {
      document.body.style.cssText = `overflow: scroll`;
    }
  }, [isModal]);

  useEffect(() => {
    onScrollToggle();
  });

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (isModal && !modalRef.current?.contains(e.target)) {
        toggleModal();
      }
      document.addEventListener('mousedown', clickOutside);
      return () => {
        document.removeEventListener('mousedown', clickOutside);
      };
    };
  }, [isModal]);
  // console.log(modalRef);

  return (
    <>
      <article className={styles.duo_article}>
        <div className={styles.wrapper}>
          <button onClick={toggleModal} className={styles.write_button}>
            소환사 등록하기
          </button>
        </div>
        {isModal && <WriteDuo onClickModal={toggleModal} modalRef={modalRef} />}
        <ListDuo />
      </article>
    </>
  );
};

export default Duo;
