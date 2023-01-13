import styles from './SummonerInfo.module.scss';
import { TypeSummoner } from '@/components/Record/types/type';

import { URL_PROFILEICON } from '@/constants/url';

export default function SummonerInfo({
  info,
  handleClick,
}: {
  info: TypeSummoner;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
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
              전적 갱신
            </button>
          </div>
        </div>
      </section>
    )
  );
}
