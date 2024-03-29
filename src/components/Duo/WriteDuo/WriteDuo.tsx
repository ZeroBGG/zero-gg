import React, { FormEvent, ForwardedRef } from 'react';
import styles from './WriteDuo.module.scss';
import { dbService } from 'src/firebase';
import { DuoType } from '../utils/DuoType';
import { addDoc, collection } from 'firebase/firestore';
import { queueArr, tierArr, positionArr } from '../utils/DuoArr';
import useInput from '@/hooks/useInput';
import InputText from '../Common/InputText/InputText';

interface ToggleProps {
  modalRef: ForwardedRef<HTMLFormElement>;
  onClickModal: () => void;
}

const WriteDuo = ({ onClickModal, modalRef }: ToggleProps) => {
  const { reset: resetId, ...inputId } = useInput('');
  const { reset: resetPass, ...inputPass } = useInput('');
  const { reset: resetQueue, ...inputQueue } = useInput('');
  const { reset: resetTier, ...inputTier } = useInput('');
  const { reset: resetPosition, ...inputPosition } = useInput('');
  const { reset: resetTitle, ...inputTitle } = useInput('');
  const { reset: resetMemo, ...inputMemo } = useInput('');
  const { reset: resetNickName, ...inputNickName } = useInput('');
  const { reset: resetMostChamp, ...inputMostChamp } = useInput('');

  const reset = () => {
    resetId();
    resetPass();
    resetQueue();
    resetTier();
    resetPosition();
    resetTitle();
    resetMemo();
    resetNickName();
    resetMostChamp();
  };

  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(('0' + (date.getMonth() + 1)).slice(-2));
  const day = String(('0' + date.getDate()).slice(-2));

  const dateString = year + '-' + month + '-' + day;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const myLOLInfo: DuoType = {
      queue: inputQueue.value,
      tier: inputTier.value,
      position: inputPosition.value,

      userId: inputId.value,
      userPassword: inputPass.value,
      timeSet: dateString,
      title: inputTitle.value,
      memo: inputMemo.value,
      nickName: inputNickName.value,
      mostChamp: inputMostChamp.value,

      createdAt: Date.now(),
    };

    await addDoc(collection(dbService, 'myLOLInfo'), myLOLInfo);
    reset();
    onClickModal();
  };

  const cancleValue = () => {
    reset();
    onClickModal();
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <form onSubmit={onSubmit} className={styles.form} ref={modalRef}>
          <h2>소환사 등록하기</h2>
          <div className={styles.user_wrapper}>
            <div>
              <InputText
                type="text"
                name="userid"
                id="userid"
                inLabelText="ID"
                className={styles.input_text}
                {...inputId}
              />
            </div>
            <div>
              <InputText
                type="password"
                name="userpass"
                id="userpass"
                inLabelText="Password"
                className={styles.input_text}
                {...inputPass}
              />
            </div>
          </div>

          <div className={styles.user_wrapper}>
            <div>
              <label htmlFor="queue" className={styles.label}>
                Queue
              </label>
              <select name="queue" id="queue" {...inputQueue}>
                {queueArr.map((item, idx) => {
                  return (
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="tier" className={styles.label}>
                Tier
              </label>
              <select name="tier" id="tier" {...inputTier}>
                {tierArr.map((item, idx) => {
                  return (
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="position" className={styles.label}>
                Position
              </label>
              <select name="position" id="position" {...inputPosition}>
                {positionArr.map((item, idx) => {
                  return (
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className={styles.memo_wrapper}>
            <div>
              <InputText
                type="text"
                name="title"
                id="title"
                inLabelText="Title"
                placeholder="소통해요!!"
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
                placeholder="바텀, 사랑에 빠지다."
                className={styles.input_memo}
                {...inputMemo}
              />
            </div>
          </div>
          <div className={styles.user_wrapper}>
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
            <div>
              <InputText
                type="text"
                name="most"
                id="most"
                inLabelText="MostChampion"
                placeholder="2가지만"
                className={styles.input_text}
                {...inputMostChamp}
              />
            </div>
          </div>
          <div className={styles.submit}>
            <button
              type="submit"
              disabled={
                !inputId.value ||
                !inputPass.value ||
                !inputTier.value ||
                !inputQueue.value ||
                !inputPosition.value ||
                !inputTitle.value ||
                !inputNickName.value
              }
            >
              <span>확인</span>
            </button>
            <button type="button" onClick={cancleValue}>
              <span>취소</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default React.memo(WriteDuo);
