import { useState } from "react";
import { Diya } from "../components/Diya";
import { site } from "../const/site";
import { playCelebrationChime, playDiyaChime } from "../lib/chime";
import styles from "./Diyas.module.scss";

const TOTAL = 5;

const TORAN = Array.from({ length: 17 }, (_, index) => ({
  drop: 14 + ((index * 13) % 30),
  delay: (index % 5) * 0.4,
}));

export function Diyas() {
  const [litDiyas, setLitDiyas] = useState(() => Array(TOTAL).fill(false));
  const [soundOn, setSoundOn] = useState(true);

  const litCount = litDiyas.filter(Boolean).length;
  const allLit = litCount === TOTAL;

  const toggleDiya = (index) => {
    const next = litDiyas.map((value, i) => (i === index ? !value : value));
    const lightingUp = !litDiyas[index];
    setLitDiyas(next);

    if (!lightingUp) return;

    if (soundOn) playDiyaChime(index);

    if (next.every(Boolean)) {
      window.dispatchEvent(new CustomEvent("diwali:celebrate"));
      if (soundOn) window.setTimeout(playCelebrationChime, 220);
    }
  };

  const reset = () => setLitDiyas(Array(TOTAL).fill(false));

  return (
    <section className={`section ${styles.diyas}`} id="diyas">
      <div className={styles.toran} aria-hidden="true">
        {TORAN.map((item, index) => (
          <span
            key={index}
            className={styles.toranFlower}
            style={{
              "--drop": `${item.drop}px`,
              "--delay": `${item.delay}s`,
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <p className="eyebrow eyebrow--centered">पाँच दीये · your turn</p>
          <h2 className="section-title">
            Light a lamp,
            <br />
            <em>and name what it stands for.</em>
          </h2>
          <p className={`lead ${styles.lead}`}>
            Five lamps on the shelf, each one for something you gave us. Tap a
            lamp — it will catch, ring its own note, and show the word we chose
            for you. Light all five and the shelf remembers.
          </p>
        </header>

        <div
          className={`${styles.altar} ${allLit ? styles.altarComplete : ""}`}
          role="group"
          aria-label="Light all five lamps"
        >
          <span className={styles.arch} aria-hidden="true" />

          <div className={styles.shelfRow}>
            {litDiyas.map((isLit, index) => {
              const lamp = site.lamps[index];
              return (
                <button
                  key={index}
                  type="button"
                  className={`${styles.diyaButton} ${isLit ? styles.isLit : ""}`}
                  onClick={() => toggleDiya(index)}
                  aria-pressed={isLit}
                  aria-label={
                    isLit
                      ? `${lamp.label} lamp is lit. Tap to blow it out.`
                      : `Light the lamp for ${lamp.label}`
                  }
                >
                  <span className={styles.halo} aria-hidden="true" />
                  <span className={styles.diyaSvg}>
                    <Diya lit={isLit} />
                  </span>
                  <span className={styles.diyaTag} aria-hidden="true">
                    {isLit ? lamp.hindi : index + 1}
                  </span>
                  <span className={`${styles.diyaWord} ${isLit ? styles.diyaWordOn : ""}`} aria-hidden="true">
                    {lamp.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className={styles.shelf} aria-hidden="true" />

          <div className={styles.controls}>
            <p className={styles.counter} aria-hidden="true">
              <span>{String(litCount).padStart(2, "0")}</span> / {TOTAL} lamps lit
            </p>

            <button
              type="button"
              className={styles.sound}
              onClick={() => setSoundOn((value) => !value)}
              aria-pressed={soundOn}
              aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4Z" />
                {soundOn ? (
                  <>
                    <path d="M16.5 8.5a5 5 0 0 1 0 7" />
                    <path d="M19 6a8.5 8.5 0 0 1 0 12" />
                  </>
                ) : (
                  <path d="m16.5 9 5 5m0-5-5 5" />
                )}
              </svg>
              {soundOn ? "Sound on" : "Sound off"}
            </button>
          </div>

          <p className={styles.status} aria-live="polite">
            {allLit
              ? `All five are lit. साहित्य, व्याकरण, धैर्य, सत्य — and one more chance. Exactly the syllabus you taught us, ${site.principalShort}.`
              : `${litCount} of ${TOTAL} lamps lit. ${
                  litCount === 0
                    ? "Start with the one nearest to you."
                    : "Keep going — the shelf is getting warmer."
                }`}
          </p>

          {allLit && (
            <div className={styles.celebration}>
              <span className={styles.sparkles} aria-hidden="true">
                {Array.from({ length: 14 }, (_, index) => (
                  <i
                    key={index}
                    style={{
                      "--angle": `${(360 / 14) * index}deg`,
                      "--distance": `${90 + (index % 4) * 22}px`,
                      "--delay": `${(index % 5) * 0.06}s`,
                    }}
                  />
                ))}
              </span>
              <p className={styles.celebrationKicker}>पूरे पाँच</p>
              <p className={styles.celebrationText}>
                Literature, grammar, patience, truth, and a second chance. You
                marked all five of ours long before we lit these,{" "}
                <span className={styles.celebrationName}>{site.principalShort}</span>.
              </p>
              <button type="button" className="text-link" onClick={reset}>
                Light them again
                <span aria-hidden="true">↺</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
