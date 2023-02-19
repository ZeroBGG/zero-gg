import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dbService } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { positionArr, queueArr, tierArr } from '../../utils/DuoArr';
import { DuoType } from '../../utils/DuoType';
import useInput from '@/hooks/useInput';
import InputText from '../../Common/InputText/InputText';
import styles from './UpdateDuo.module.scss';
import Modal from '../../Common/Modal/Modal';

interface ToggleProps {
  onToggleClick: () => void;
}

const UpdateDuo = ({ onToggleClick }: ToggleProps) => {
  // DuoCards의 값을 가져오기
  const location = useLocation();
  const { memo, nickName, position, queue, tier, title }: DuoType = location.state.duoObj;
  const { id } = location.state.duoObj;

  // console.log(location);

  const navigate = useNavigate();

  // firestore Database myLOLInfo의 id의 테이블을 가져옴
  const ChangeDuoInfo = doc(dbService, 'myLOLInfo', `${id}`);

  const [isModal, setIsModal] = useState(false);

  const { reset: resetQueue, ...inputQueue } = useInput(queue);
  const { reset: resetTier, ...inputTier } = useInput(tier);
  const { reset: resetPosition, ...inputPosition } = useInput(position);
  const { reset: resetTitle, ...inputTitle } = useInput(title);
  const { reset: resetMemo, ...inputMemo } = useInput(memo);
  const { reset: resetNickName, ...inputNickName } = useInput(nickName);

  const reset = () => {
    resetQueue();
    resetTier();
    resetPosition();
    resetTitle();
    resetMemo();
    resetNickName();
  };

  const onToggleNavClick = () => {
    reset();
    onToggleClick();
  };

  const onToggleModal = () => {
    setIsModal((e) => !e);
  };

  const onUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(ChangeDuoInfo, {
        queue: inputQueue.value,
        tier: inputTier.value,
        position: inputPosition.value,
        title: inputTitle.value,
        memo: inputMemo.value,
        nickName: inputNickName.value,
      });
      navigate('/Duo');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section>
      <form onSubmit={onUpdateSubmit}>
        <div className={styles.update}>
          <div className={styles.select_space}>
            <div>
              <label htmlFor="queue"> Queue : </label>
              <select name="queue" id="queue" {...inputQueue}>
                {queueArr.map((item, idx) => {
                  return (
                    <option value={item} key={`${item}_${idx}`}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="tier"> Tier : </label>
              <select name="tier" id="tier" {...inputTier}>
                {tierArr.map((item, idx) => {
                  return (
                    <option value={item} key={`${item}_${idx}`}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="position"> Position : </label>
              <select name="position" id="position" {...inputPosition}>
                {positionArr.map((item, idx) => {
                  return (
                    <option value={item} key={`${item}_${idx}`}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.input_space}>
            <div>
              <InputText
                type="text"
                name="title"
                id="title"
                inLabelText="Title"
                className={styles.input_text}
                {...inputTitle}
              />
            </div>
            <div>
              <InputText
                type="text"
                name="memo"
                id="memo"
                inLabelText="Memo"
                className={styles.input_memo}
                {...inputMemo}
              />
            </div>
            <div>
              <InputText
                type="text"
                name="nick"
                id="nick"
                inLabelText="Nickname"
                className={styles.input_text}
                {...inputNickName}
              />
            </div>
          </div>
          <div className={styles.button_space}>
            <button
              type="submit"
              disabled={
                !inputQueue.value ||
                !inputTier.value ||
                !inputPosition.value ||
                !inputMemo.value ||
                !inputTitle.value ||
                !inputNickName.value
              }
            >
              <span>수정</span>
            </button>
            <button type="button" onClick={onToggleModal}>
              <span>삭제</span>
            </button>
            <button type="button" onClick={onToggleNavClick}>
              <span>취소</span>
            </button>
          </div>
        </div>
      </form>
      {isModal && <Modal changeDuoInfo={ChangeDuoInfo} onToggleModal={onToggleModal} />}
    </section>
  );
};

export default UpdateDuo;
