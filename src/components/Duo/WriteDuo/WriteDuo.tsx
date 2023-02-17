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
  onToggleClick: () => void;
}

const WriteDuo = ({ onToggleClick, modalRef }: ToggleProps) => {
  const inputId = useInput('');
  const inputPass = useInput('');
  const inputQueue = useInput('');
  const inputTier = useInput('');
  const inputPosition = useInput('');
  const inputTitle = useInput('');
  const inputMemo = useInput('');
  const inputNickName = useInput('');
  const inputMostChamp = useInput('');

  const reset = () => {
    inputId.reset;
    inputPass.reset;
    inputQueue.reset;
    inputTier.reset;
    inputPosition.reset;
    inputTitle.reset;
    inputMemo.reset;
    inputNickName.reset;
    inputMostChamp.reset;
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
    onToggleClick();
  };

  const cancleValue = () => {
    reset();
    onToggleClick();
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
                {...inputId}
                name="userid"
                id="userid"
                inLabelText="ID"
                className={styles.input_text}
              />
            </div>
            <div>
              <InputText
                type="password"
                {...inputPass}
                name="userpass"
                id="userpass"
                inLabelText="Password"
                className={styles.input_text}
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
                {...inputTitle}
                name="title"
                id="title"
                inLabelText="Title"
                placeholder="소통해요!!"
                className={styles.input_text}
              />
            </div>
            <div>
              <InputText
                type="text"
                {...inputMemo}
                name="memo"
                id="memo"
                inLabelText="Memo"
                placeholder="바텀, 사랑에 빠지다."
                className={styles.input_memo}
              />
            </div>
          </div>
          <div className={styles.user_wrapper}>
            <div>
              <InputText
                type="text"
                {...inputNickName}
                name="nick"
                id="nick"
                inLabelText="Nickname"
                className={styles.input_text}
              />
            </div>
            <div>
              <InputText
                type="text"
                {...inputMostChamp}
                name="most"
                id="most"
                inLabelText="MostChampion"
                placeholder="2가지만"
                className={styles.input_text}
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
