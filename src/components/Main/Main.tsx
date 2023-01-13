import styles from './Main.module.scss';
import InputID from './InputID';
import Circle from './Circle';

import bg from '@/assets/images/Main/bg.mp4';

export default function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        <video className={styles.video} src={bg} loop autoPlay muted></video>
        <Circle />
      </div>

      <article className={styles.article}>
        <InputID />
      </article>
    </main>
  );
}
