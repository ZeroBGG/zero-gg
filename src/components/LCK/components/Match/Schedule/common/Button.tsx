import { useState } from 'react';
import styles from '../Item/Item.module.scss';
import { LCK_LIVE } from '@/components/LCK/components/Constant/constant';

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
