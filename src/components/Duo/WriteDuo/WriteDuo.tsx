import { FormEvent, useEffect, useState } from 'react';
import styles from './WriteDuo.module.scss';
import { dbService } from 'src/firebase';
import { DuoType } from '../utils/DuoType';
import { addDoc, collection } from 'firebase/firestore';
import { queueArr, tierArr, postionArr } from '../utils/DuoArr';
import useInput from '@/hooks/useInput';

const WriteDuo = () => {
  const [write, setWrite] = useState(false);

  const inputId = useInput('');
  const inputPass = useInput('');
  const inputQueue = useInput('');
  const inputTier = useInput('');
  const inputPosition = useInput('');
  const inputTitle = useInput('');
  const inputMemo = useInput('');
  const inputNickName = useInput('');
  const inputMostChamp = useInput('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const myLOLInfo: DuoType = {
      queue: inputQueue.value,
      tier: inputTier.value,
      position: inputPosition.value,

      userId: inputId.value,
      userPassword: inputPass.value,
      timeSet: `${new Date()}`,
      title: inputTitle.value,
      memo: inputMemo.value,
      nickName: inputNickName.value,
      mostChamp: inputMostChamp.value,
    };

    await addDoc(collection(dbService, 'myLOLInfo'), myLOLInfo);
    inputId.setValue('');
  };

  const onClick = () => setWrite((e) => !e);

  return (
    <>
      <section>
        <div>
          <button onClick={onClick}>글 쓰기</button>
        </div>
        {write ? (
          <>
            <form onSubmit={onSubmit}>
              <label htmlFor="userid">ID : </label>
              <input type="text" name="userid" id="userid" {...inputId} />
              <label htmlFor="userpass"> Password : </label>
              <input type="password" name="userpass" id="userpass" {...inputPass} />
              <br />
              <label htmlFor="queue"> Queue : </label>
              <select name="queue" id="queue" {...inputQueue}>
                {queueArr.map((item, idx) => {
                  return (
                    <>
                      <option value={item} key={idx}>
                        {item}
                      </option>
                    </>
                  );
                })}
              </select>
              <label htmlFor="tier"> Tier : </label>
              <select name="tier" id="tier" {...inputTier}>
                {tierArr.map((item, idx) => {
                  return (
                    <>
                      <option value={item} key={idx}>
                        {item}
                      </option>
                    </>
                  );
                })}
              </select>
              <label htmlFor="position"> Position : </label>
              <select name="position" id="position" {...inputPosition}>
                {postionArr.map((item, idx) => {
                  return (
                    <>
                      <option value={item} key={idx}>
                        {item}
                      </option>
                    </>
                  );
                })}
              </select>
              <br />
              <label htmlFor="title"> Title : </label>
              <input type="text" id="title" {...inputTitle} />
              <label htmlFor="memo"> Memo : </label>
              <input type="text" id="memo" {...inputMemo} />
              <label htmlFor="nick"> Nickname : </label>
              <input type="text" id="nick" {...inputNickName} />
              <label htmlFor="most"> MostChamp : </label>
              <input type="text" id="most" {...inputMostChamp} />
              <button type="submit">
                <span>확인</span>
              </button>
            </form>
          </>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default WriteDuo;
