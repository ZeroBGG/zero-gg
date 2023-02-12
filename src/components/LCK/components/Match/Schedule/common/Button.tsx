import { useState } from 'react';
import styles from '../Item/Item.module.scss';

const LCK_LIVE = 'https://game.naver.com/esports/League_of_Legends/schedule/lck';

type ButtonType = {
  content: string;
};

const Button = ({ content }: ButtonType) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <>
      <a
        className={`${styles.btn} ${isHovering ? `${styles.live_btn} ` : `${styles.replay_btn}`}`}
        href={LCK_LIVE}
        target={'_blank'}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <span className={styles.content}>{content}</span>
      </a>
    </>
  );
};

export default Button;
