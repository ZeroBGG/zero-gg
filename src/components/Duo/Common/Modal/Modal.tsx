import styles from './Modal.module.scss';
import { deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';

interface ModalProps {
  changeDuoInfo: any;
  onToggleModal: () => void;
}

const Modal = ({ changeDuoInfo, onToggleModal }: ModalProps) => {
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const ondeleteClick = async () => {
    await deleteDoc(changeDuoInfo);
    onToggleModal();
    navigate('/Duo');
  };

  return (
    <form className={styles.modal_form} onSubmit={onSubmit}>
      <h2>삭제하시겠습니까?</h2>
      <div>
        <button type="submit" onClick={ondeleteClick}>
          삭제
        </button>
        <button type="button" onClick={onToggleModal}>
          취소
        </button>
      </div>
    </form>
  );
};

export default Modal;
