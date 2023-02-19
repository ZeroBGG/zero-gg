import { FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { positions, tiers } from '../../utils/DuoArr';
import { DuoType, LaneType, TierType } from '../../utils/DuoType';
import { LANE_ICONS_URL, TIER_IMG_URL } from '@/components/Duo/Constants/constant';
import useInput from '@/hooks/useInput';
import InputText from '../../Common/InputText/InputText';
import styles from './DuoInfo.module.scss';
import UpdateDuo from '../UpdateDuo/UpdateDuo';
import CommonModal from '../../Common/Modal/CommonModal';
import useStore from '../../Zustand/Zustand';

const DuoInfo = () => {
  // DuoCards의 값을 가져오기
  const location = useLocation();
  const { userId, nickName, userPassword, position, tier }: DuoType = location.state.duoObj;

  const [update, setUpdate] = useState<boolean>(false);

  const { isFailModal, toggleFailModal } = useStore();

  const submitId = useInput('');
  const submitPass = useInput('');

  const reset = () => {
    submitId.reset();
    submitPass.reset();
  };

  const lane = positions.map((item: LaneType, idx: number) => {
    if (item.lane === position) {
      return (
        <div key={`${item.lane}_${idx}`}>
          <img src={`${LANE_ICONS_URL}/${item.url}`} alt="라인 이미지" />
        </div>
      );
    }
  });

  const ti = tiers.map((item: TierType, idx: number) => {
    if (item.tier === tier) {
      return (
        <div key={`${item.tier}_${idx}`}>
          <img src={`${TIER_IMG_URL}/${item.url}`} alt="티어 이미지" />
        </div>
      );
    }
  });

  // 업데이트 변경에 필요한 상태 onClick
  const onClickAuth = () => {
    if (userId === submitId.value && userPassword === submitPass.value) {
      setUpdate((e) => !e);
      reset();
    } else {
      // window.alert('아이디와 비밀번호가 틀렸습니다.');
      toggleFailModal();
      reset();
    }
  };

  const onToggleClick = () => {
    setUpdate((e) => !e);
  };

  const onEditSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  // 업데이트 및 삭제에 필요한 클릭이벤트

  return (
    <section className={styles.wrapper}>
      <form onSubmit={onEditSubmit}>
        <div className={styles.checkuser}>
          <InputText type="text" placeholder="ID" className={styles.input_text} {...submitId} />
          <InputText type="password" placeholder="PASSWORD" className={styles.input_text} {...submitPass} />
          <button onClick={onClickAuth}>수정 / 삭제</button>
        </div>
      </form>
      {isFailModal && <CommonModal onClickModal={toggleFailModal} inMessage="아이디와 비밀번호가 틀렸습니다." />}
      {update ? (
        <>
          <UpdateDuo onToggleClick={onToggleClick} />
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
  );
};

export default DuoInfo;
