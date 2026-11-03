import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Diya } from "./Diya";
import { pauseSong, playSong } from "../lib/song";
import styles from "./IntroLoader.module.scss";

const TITLE = "HAPPY DIWALI";

export function IntroLoader({ onDone }) {
  const rootRef = useRef(null);
  const finishRef = useRef(() => {});
  const doneRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone?.();
    };
    finishRef.current = finish;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(finish, 300);
      return () => window.clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });

      tl.from("[data-loader-kicker]", { opacity: 0, y: 14, duration: 0.8 }, 0.05)
        .from(
          "[data-loader-diya]",
          { scale: 0.55, opacity: 0, duration: 1.15, ease: "back.out(1.6)" },
          0.1
        )
        .from(
          "[data-loader-word]",
          {
            yPercent: 118,
            opacity: 0,
            skewY: 3,
            stagger: 0.15,
            duration: 1.15,
            ease: "expo.out",
          },
          0.3
        )
        .from(
          "[data-loader-hindi]",
          { opacity: 0, filter: "blur(12px)", scale: 1.06, duration: 1.1 },
          0.85
        )
        .from("[data-loader-note]", { opacity: 0, duration: 0.7 }, 1.05)
        // Five small flames catch one after another — the loading bar is a row
        // of lamps instead of a line.
        .from(
          "[data-loader-flame]",
          {
            scaleY: 0,
            opacity: 0,
            transformOrigin: "50% 100%",
            duration: 0.45,
            stagger: 0.32,
            ease: "power2.out",
          },
          0.5
        )
        .from("[data-loader-progress-meta]", { opacity: 0, duration: 0.6 }, 0.6)
        .to(
          "[data-loader-inner]",
          { yPercent: -9, opacity: 0, duration: 0.75, ease: "power2.in" },
          "+=0.5"
        )
        .to(
          "[data-loader-bottom]",
          { opacity: 0, duration: 0.5, ease: "power2.in" },
          "<"
        )
        .to(
          rootRef.current,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" },
          "-=0.15"
        )
        .to(rootRef.current, { autoAlpha: 0, duration: 0.1 }, "-=0.05");
    }, rootRef);

    const failsafe = window.setTimeout(finish, 6500);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      role="dialog"
      aria-label="Happy Diwali introduction"
    >
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.aura} aria-hidden="true" />

      <div className={styles.inner} data-loader-inner>
        <p className={styles.kicker} data-loader-kicker>
          दीपोत्सव · A letter of light
        </p>

        <div className={styles.diya} data-loader-diya>
          <Diya lit />
        </div>

        <h1 className={styles.title} aria-label={TITLE}>
          {TITLE.split(" ").map((word, wordIndex) => (
            <span className={styles.wordMask} key={word}>
              <span className={styles.word} data-loader-word aria-hidden="true">
                {word}
              </span>
              {wordIndex === 0 && <span className={styles.space} aria-hidden="true" />}
            </span>
          ))}
        </h1>

        <p className={`${styles.hindi} hindi`} lang="hi" data-loader-hindi>
          शुभ दीपावली, मैडम जी
        </p>
        <p className={styles.note} data-loader-note>
          Five lamps are being lit for you…
        </p>
      </div>

      <div className={styles.progressWrap} data-loader-bottom>
        <div className={styles.progressMeta} data-loader-progress-meta>
          <span>One lamp for each thing you taught us</span>
          <span className={styles.flameRow} aria-hidden="true">
            {[0, 1, 2, 3, 4].map((index) => (
              <i key={index} className={styles.flame} data-loader-flame />
            ))}
          </span>
        </div>
      </div>

      <button
        type="button"
        className={styles.song}
        data-loader-bottom
        onClick={() => {
          playSong();
          finishRef.current();
        }}
      >
        <span aria-hidden="true">♪</span>
        Enter with the song
      </button>

      <button
        type="button"
        className={styles.skip}
        data-loader-bottom
        onClick={() => {
          pauseSong();
          finishRef.current();
        }}
      >
        Enter quietly
      </button>
    </div>
  );
}
