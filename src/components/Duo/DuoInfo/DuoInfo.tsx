import React, { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dbService } from 'src/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { postionArr, queueArr, tierArr } from '../utils/DuoArr';
import useInput from '@/hooks/useInput';

const DuoInfo = () => {
  // DuoCards의 값을 가져오기
  const location = useLocation();
  const { userId, memo, nickName, userPassword, position, queue, tier, title, id } = location.state.duoObj;

  const navigate = useNavigate();

  // firestore Database myLOLInfo의 id의 테이블을 가져옴
  const ChangeDuoInfo = doc(dbService, 'myLOLInfo', `${id}`);

  // 버튼클릭시 업데이트 상태변경
  const [update, setUpdate] = useState(false);

  // 업데이트 변경에 필요한 id, password
  const submitId = useInput('');
  const submitPass = useInput('');

  // 업데이트 할 상태값들
  const inputQueue = useInput('');
  const inputTier = useInput('');
  const inputPosition = useInput('');
  const inputTitle = useInput('');
  const inputMemo = useInput('');
  const inputNickName = useInput('');

  // 업데이트 변경에 필요한 상태 onClick
  const onClick = () => {
    if (userId === submitId.value && userPassword === submitPass.value) {
      setUpdate((e) => !e);
      submitId.setValue('');
      submitPass.setValue('');
    } else {
      window.alert('아이디와 비밀번호가 틀렸습니다.');
      submitId.setValue('');
      submitPass.setValue('');
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  // 업데이트 및 삭제에 필요한 클릭이벤트
  const toggleUpdateClick = () => setUpdate((e) => !e);
  const onDeleteClick = async () => {
    const ok = window.confirm('지우겠습니까?');

    if (!!ok) {
      await deleteDoc(ChangeDuoInfo);
      navigate('/Duo');
    }
  };

  const onUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateDoc(ChangeDuoInfo, {
      queue: inputQueue.value,
      tier: inputTier.value,
      position: inputPosition.value,
      title: inputTitle.value,
      memo: inputMemo.value,
      nickName: inputNickName.value,
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" {...submitId} />
        <input type="password" {...submitPass} />
        <button onClick={onClick}>수정 및 삭제하기</button>
      </form>
      {update ? (
        <>
          <form onSubmit={onUpdateSubmit}>
            <label htmlFor="queue"> Queue : </label>
            <select name="queue" id="queue" {...inputQueue}>
              {queueArr.map((item, idx) => {
                return (
                  <>
                    <option value={item} key={`${item}_${idx}`}>
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
                    <option value={item} key={`${item}_${idx}`}>
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
                    <option value={item} key={`${item}_${idx}`}>
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
            <label htmlFor="nick"> Nick name : </label>
            <input type="text" id="nick" {...inputNickName} />
            <button type="submit" onClick={toggleUpdateClick}>
              <span>수정</span>
            </button>
            <button type="submit" onClick={onDeleteClick}>
              <span>삭제</span>
            </button>
          </form>
        </>
      ) : (
        <>
          <div>
            <div>
              <h3>{title}</h3>
            </div>
            <div>
              <span>{nickName}</span>
              <span>
                {queue} {tier} {position}
              </span>
            </div>
            <div>{memo}</div>
          </div>
        </>
      )}
    </>
  );
};

export default DuoInfo;
