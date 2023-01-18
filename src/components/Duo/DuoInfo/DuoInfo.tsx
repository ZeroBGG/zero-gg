import React, { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dbService } from 'src/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { positionArr, queueArr, tierArr } from '../utils/DuoArr';
import useInput from '@/hooks/useInput';
import styles from './DuoInfo.module.scss';
import { LANE_ICONS_URL, TIER_IMG_URL } from '../Constants/constant';
import { positions, tiers } from '../utils/DuoArr';
import { DuoType } from '../utils/DuoType';

const DuoInfo = () => {
  // DuoCards의 값을 가져오기
  const location = useLocation();
  const { userId, memo, nickName, userPassword, position, queue, tier, title }: DuoType = location.state.duoObj;
  const { id } = location.state.duoObj;

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

  // img

  const lane = positions.map((item) => {
    if (item.lane === position) {
      return (
        <>
          <img src={`${LANE_ICONS_URL}/${item.url}`} />
        </>
      );
    }
  });

  const ti = tiers.map((item) => {
    if (item.tier === tier) {
      return (
        <>
          <img src={`${TIER_IMG_URL}/${item.url}`} />
        </>
      );
    }
  });

  // 업데이트 변경에 필요한 상태 onClick
  const onClickAuth = () => {
    if (userId === submitId.value && userPassword === submitPass.value) {
      setUpdate((e) => !e);
      submitId.reset;
      submitPass.reset;
    } else {
      window.alert('아이디와 비밀번호가 틀렸습니다.');
      submitId.reset;
      submitPass.reset;
    }
  };

  const onToggleClick = () => {
    setUpdate((e) => !e);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  // 업데이트 및 삭제에 필요한 클릭이벤트
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
      <section className={styles.wrapper}>
        <form onSubmit={onSubmit}>
          <div className={styles.checkuser}>
            <input type="text" {...submitId} placeholder="ID" />
            <input type="password" {...submitPass} placeholder="PASSWORD" />
            <button onClick={onClickAuth}>수정 및 삭제하기</button>
          </div>
        </form>
        {update ? (
          <>
            <form onSubmit={onUpdateSubmit}>
              <div className={styles.update}>
                <div className={styles.select_space}>
                  <div>
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
                  </div>
                  <div>
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
                  </div>
                  <div>
                    <label htmlFor="position"> Position : </label>
                    <select name="position" id="position" {...inputPosition}>
                      {positionArr.map((item, idx) => {
                        return (
                          <>
                            <option value={item} key={`${item}_${idx}`}>
                              {item}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className={styles.input_space}>
                  <div>
                    <label htmlFor="title"> Title </label>
                    <input type="text" id="title" {...inputTitle} />
                  </div>
                  <div>
                    <label htmlFor="memo"> Memo </label>
                    <input type="text" id="memo" {...inputMemo} />
                  </div>
                  <div>
                    <label htmlFor="nick"> Nick name </label>
                    <input type="text" id="nick" {...inputNickName} />
                  </div>
                </div>
                <div className={styles.button_space}>
                  <button
                    type="submit"
                    onClick={onToggleClick}
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
                  <button type="submit" onClick={onDeleteClick}>
                    <span>삭제</span>
                  </button>
                  <button type="button" onClick={onToggleClick}>
                    <span>취소</span>
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className={styles.info}>
              <div className={styles.user}>
                <div className={styles.ti_icons}>{ti}</div>
                <div className={styles.lane_icons}>{lane}</div>
              </div>
              <div className={styles.nickname}>
                <p>{nickName}</p>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default DuoInfo;
