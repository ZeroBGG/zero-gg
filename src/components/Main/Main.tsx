import styles from './Main.module.scss';
import InputID from './InputID/InputID';
import Circle from './Circle/Circle';

import bg from '/assets/images/Main/bg.mp4';
import poster from '/assets/images/Main/bg.webp';

export default function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        <video className={styles.video} src={bg} poster={poster} loop autoPlay muted></video>
        <Circle />
      </div>

      <article className={styles.article}>
        <InputID />
      </article>
    </main>
  );
}
