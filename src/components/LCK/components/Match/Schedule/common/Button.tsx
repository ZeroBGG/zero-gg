import styles from '../Item.module.scss';

const LCK_LIVE = 'https://game.naver.com/esports/League_of_Legends/schedule/lck';

interface ButtonProps {
  content: string;
  ishovering: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

const Button = ({ content, ishovering, onMouseOver, onMouseOut }: ButtonProps) => {
  return (
    <>
      <a
        className={ishovering ? `${styles.live_btn} ` : `${styles.replay_btn}`}
        href={LCK_LIVE}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <span className={styles.content}>{content}</span>
      </a>
    </>
  );
};

export default Button;
