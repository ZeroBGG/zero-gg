import { FormEvent, useEffect, useState } from 'react';
import styles from './WriteDuo.module.scss';
import { dbService } from 'src/firebase';
import { DuoType } from '../utils/DuoType';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
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
  const inputNickname = useInput('');

  const [lolInfo, setLolInfo] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(dbService, 'myLOLInfo'));
    onSnapshot(q, (querySnapshot) => {
      const myLol = querySnapshot.docs.map((docs) => ({
        id: docs.id,
        ...docs.data(),
      }));
      setLolInfo(myLol);
    });
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const myLOLInfo: DuoType = {
      queue: inputQueue.value,
      tier: inputTier.value,
      position: inputPosition.value,

      id: inputId.value,
      password: inputPass.value,
      timeSet: `${new Date()}`,
      title: inputTitle.value,
      memo: inputMemo.value,
      nickName: inputNickname.value,
      mostChamp: [''],
    };

    await addDoc(collection(dbService, 'myLOLInfo'), myLOLInfo);
    inputId.setValue('');
  };

  const onClick = () => {
    setWrite((e) => !e);
  };

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
              <select name="queue" {...inputQueue}>
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
              <select name="tier" {...inputTier}>
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
              <select name="position" {...inputPosition}>
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
              <input type="text" placeholder="title" {...inputTitle} />
              <input type="text" placeholder="memo" {...inputMemo} />
              <input type="text" placeholder="nickname" {...inputNickname} />
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
