import { Diya } from "../components/Diya";
import { useSmoothScroll } from "../context/ScrollContext";
import { site } from "../const/site";
import styles from "./Footer.module.scss";

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <span className={styles.diya} aria-hidden="true">
            <Diya lit />
          </span>
          <p className={`${styles.hindi} hindi`} lang="hi">दीप जले, मन जले</p>
          <p className={styles.line}>
            May every word you taught us carry a little light out into the world.
          </p>
          <button
            type="button"
            className={styles.toTop}
            onClick={() => scrollTo("top")}
          >
            Back to the first diya
            <span aria-hidden="true">↑</span>
          </button>
        </div>

        <div className={styles.bottom}>
          <span>Diwali {site.year}</span>
          <span>Made with light by your students</span>
          <span>For {site.principalShort}</span>
        </div>
      </div>
    </footer>
  );
}
