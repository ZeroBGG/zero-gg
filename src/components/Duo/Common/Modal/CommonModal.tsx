import { useCallback, useEffect } from 'react';
import styles from './CommonModal.module.scss';

interface ModalProps {
  onClickModal: () => void;
  inMessage: string;
}

const CommonModal = ({ onClickModal, inMessage }: ModalProps) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content_box}>
        <h2>{inMessage}</h2>
        <button onClick={onClickModal}>확인</button>
      </div>
    </section>
  );
};

export default CommonModal;
