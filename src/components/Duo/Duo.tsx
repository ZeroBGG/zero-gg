import { useCallback, useEffect, useState } from 'react';
import WriteDuo from './WriteDuo/WriteDuo';
import ListDuo from './ListDuo/ListDuo';
import styles from './Duo.module.scss';

const Duo = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const onToggleClick = useCallback(() => setIsModal((e) => !e), [isModal]);

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

  return (
    <>
      <article className={styles.duo_article}>
        <div className={styles.wrapper}>
          <button onClick={onToggleClick} className={styles.write_button}>
            소환사 등록하기
          </button>
        </div>
        {isModal && <WriteDuo onToggleClick={onToggleClick} />}
        <ListDuo />
      </article>
    </>
  );
};

export default Duo;
