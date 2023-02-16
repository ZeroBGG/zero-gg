import styles from './SummonerInfo.module.scss';
import { TypeSummoner } from '@/components/Record/types/type';

import { storeVersion } from '@/store/store';

export default function SummonerInfo({
  info,
  handleClick,
  loading,
}: {
  info: TypeSummoner;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
}) {
  const { version } = storeVersion();
  const URL_PROFILEICON = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon`;

  return (
    info && (
      <section className={styles.section}>
        <div className={styles.inner}>
          <article className={styles.wrap}>
            <img src={`${URL_PROFILEICON}/${info.profileIconId}.png`} alt="profileicon" className={styles.icon} />
            <div className={styles.lv}>{info.summonerLevel}</div>
          </article>

          <div className={styles.content}>
            <h2 className={styles.name}>{info.name}</h2>
            <button className={styles.btn} onClick={handleClick}>
              {loading ? <p className={styles.active}>전적 갱신</p> : <p className={styles.inactive}>갱신 중</p>}
            </button>
          </div>
        </div>
      </section>
    )
  );
}
