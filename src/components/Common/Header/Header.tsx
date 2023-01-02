import styles from "./Header.module.scss";

import { Link } from "react-router-dom";

export default function Header() {
  const menus = [
    { title: "홈", src: "/" },
    { title: "듀오찾기", src: "/Duo" },
    { title: "LCK", src: "/LCK" },
  ];

  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>Zero.GG</h1>

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

      <div>
        {/* home이 아니면 전적을 검색할 수 있는 커스텀 input 컴포넌트 들어갈 예정 */}
      </div>
    </header>
  );
}
