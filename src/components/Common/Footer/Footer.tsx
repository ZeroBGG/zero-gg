import styles from "./Footer.module.scss";

import logo from "@/assets/icons/logo.png";
import { RxNotionLogo } from "react-icons/rx";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
  const notionURL =
    "https://crocus-dollar-f86.notion.site/731f4ddce1ac49538a27b658aaa1520f";
  const githubURL = "https://github.com/ZeroBGG";

  return (
    <footer className={styles.footer}>
      <section className={styles.section}>
        <img src={logo} />

        <article className={styles.copyright}>
          <p>제로베이스 - 프론트엔드 뿌수조</p>
          <p>&copy; Zero.GG. All Rights Reserved.</p>
        </article>

        <article className={styles.sns}>
          <RxNotionLogo
            size="24"
            onClick={() =>
              window.open(notionURL, "_blank", "noopener, noreferrer")
            }
          />
          <BsGithub
            size="24"
            onClick={() =>
              window.open(githubURL, "_blank", "noopener, noreferrer")
            }
          />
        </article>
      </section>
    </footer>
  );
}
