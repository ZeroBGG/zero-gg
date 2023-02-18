import styles from './CommonModal.module.scss';

interface ModalProps {
  onClickModal: () => void;
  inMessage: string;
}

const CommonModal = ({ onClickModal, inMessage }: ModalProps) => {
  return (
    <div className={styles.modal_div}>
      <h2>{inMessage}</h2>
      <button onClick={onClickModal}>확인</button>
    </div>
  );
};

export default CommonModal;
