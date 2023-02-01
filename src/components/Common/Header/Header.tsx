import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputID from '@/components/Main/InputID';
import styles from './Header.module.scss';

export default function Header() {
  const [url, setUrl] = useState('');
  // const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    { title: '홈', src: '/' },
    { title: '듀오찾기', src: '/Duo' },
    { title: 'LCK', src: '/LCK' },
  ];

  const handleClick = () => {
    navigate('/');
  };

  // useEffect(() => {
  //   setUrl(location.pathname);
  // });

  return (
    <header className={styles.header}>
      <h1 className={styles.h1} onClick={handleClick}>
        Zero.GG
      </h1>

      <nav className={styles.nav}>
        <ul className={styles.ul}>
          {menus.map((menu) => {
            return (
              <li key={menu.title} className={styles.li}>
                <Link className={styles.a} to={menu.src}>
                  {menu.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <article className={styles.article}>
        {url !== '/' && (
          <div className={styles.inner}>
            <InputID />
          </div>
        )}
      </article>
    </header>
  );
}
