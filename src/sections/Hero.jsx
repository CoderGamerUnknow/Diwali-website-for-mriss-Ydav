import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Diya } from "../components/Diya";
import { Rangoli } from "../components/Rangoli";
import { useSmoothScroll } from "../context/ScrollContext";
import { site } from "../const/site";
import styles from "./Hero.module.scss";

const TITLE = "HAPPY DIWALI";

const EMBERS = Array.from({ length: 18 }, (_, index) => ({
  left: (index * 37 + 7) % 100,
  delay: -((index * 1.7) % 15),
  duration: 9 + (index % 5) * 2.4,
  size: 2 + (index % 3),
  drift: (index % 2 === 0 ? 1 : -1) * (14 + (index % 4) * 9),
}));

const PETALS = Array.from({ length: 14 }, (_, index) => ({
  left: (index * 53 + 11) % 100,
  delay: -((index * 2.3) % 18),
  duration: 13 + (index % 5) * 3.5,
  drift: (index % 2 === 0 ? 1 : -1) * (30 + (index % 4) * 22),
  size: 7 + (index % 3) * 2,
  spin: 220 + (index % 5) * 90,
}));

export function Hero() {
  const heroRef = useRef(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(
        "[data-hero-eyebrow]",
        { opacity: 0, letterSpacing: "0.6em", duration: 1.1 },
        0.1
      )
        .from(
          "[data-hero-word]",
          {
            yPercent: 120,
            opacity: 0,
            skewY: 4,
            stagger: 0.13,
            duration: 1.2,
            ease: "expo.out",
          },
          0.2
        )
        .from(
          "[data-hero-hindi]",
          { opacity: 0, filter: "blur(12px)", scale: 1.05, duration: 1.3 },
          0.75
        )
        .from(
          "[data-hero-rule]",
          { scaleX: 0, transformOrigin: "50% 50%", duration: 1.1 },
          0.85
        )
        .from(
          "[data-hero-copy] > *",
          { opacity: 0, y: 22, stagger: 0.1, duration: 0.9 },
          0.95
        )
        .from("[data-hero-cue]", { opacity: 0, y: 10, duration: 0.7 }, 1.2);

      gsap.to("[data-hero-rangoli]", {
        yPercent: 30,
        rotate: -26,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to("[data-hero-content]", {
        yPercent: -12,
        opacity: 0.18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to("[data-hero-lamp-left]", {
        yPercent: -46,
        rotate: -4,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });

      gsap.to("[data-hero-lamp-right]", {
        yPercent: -28,
        rotate: 5,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const go = (id) => (event) => {
    event.preventDefault();
    scrollTo(`#${id}`);
  };

  return (
    <section className={styles.hero} id="top" ref={heroRef}>
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.aura} aria-hidden="true" />
      <Rangoli className={styles.rangoli} data-hero-rangoli />

      <div className={`${styles.lamp} ${styles.lampLeft}`} data-hero-lamp-left aria-hidden="true">
        <span className={styles.string} />
        <div className={styles.hangDiya}>
          <Diya lit />
        </div>
      </div>

      <div className={`${styles.lamp} ${styles.lampRight}`} data-hero-lamp-right aria-hidden="true">
        <span className={styles.string} />
        <div className={styles.hangDiya}>
          <Diya lit />
        </div>
      </div>

      <div className={styles.petals} aria-hidden="true">
        {PETALS.map((petal, index) => (
          <span
            key={`petal-${index}`}
            className={styles.petal}
            style={{
              "--left": `${petal.left}%`,
              "--delay": `${petal.delay}s`,
              "--duration": `${petal.duration}s`,
              "--drift": `${petal.drift}px`,
              "--size": `${petal.size}px`,
              "--spin": `${petal.spin}deg`,
            }}
          />
        ))}
      </div>

      <div className={styles.embers} aria-hidden="true">
        {EMBERS.map((ember, index) => (
          <span
            key={index}
            className={styles.ember}
            style={{
              "--left": `${ember.left}%`,
              "--delay": `${ember.delay}s`,
              "--duration": `${ember.duration}s`,
              "--size": `${ember.size}px`,
              "--drift": `${ember.drift}px`,
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.content}`} data-hero-content>
        <p className={`eyebrow eyebrow--centered ${styles.eyebrow}`} data-hero-eyebrow>
          {site.diwaliLabel} · The Festival of Lights
        </p>

        <h1 className={styles.title} aria-label={TITLE}>
          {TITLE.split(" ").map((word, wordIndex) => (
            <span className={styles.wordMask} key={word}>
              <span className={styles.word} data-hero-word aria-hidden="true">
                {word}
              </span>
              {wordIndex === 0 && <span className={styles.space} aria-hidden="true" />}
            </span>
          ))}
        </h1>

        <p className={`${styles.hindi} hindi`} lang="hi" data-hero-hindi>
          शुभ दीपावली, मैडम जी
        </p>

        <span className={styles.rule} data-hero-rule aria-hidden="true" />

        <div className={styles.copy} data-hero-copy>
          <p className={styles.leadCopy}>
            A Diwali letter for the woman who taught us that language can hold
            light — written in five lamps, a few dohas, and more gratitude than
            a card can carry.
          </p>

          <div className={styles.actions}>
            <a href="#wish" className="btn" onClick={go("wish")}>
              Read the letter
              <span aria-hidden="true">↓</span>
            </a>
            <a href="#hindi" className="btn btn--ghost" onClick={go("hindi")}>
              Enter the Hindi room
              <span aria-hidden="true">✦</span>
            </a>
          </div>

          <p className={styles.chip}>
            <span aria-hidden="true">✦</span> {site.principalTitle}
            {site.school ? ` · ${site.school}` : ""}
          </p>
        </div>
      </div>

      <a
        href="#wish"
        className={styles.scrollCue}
        onClick={go("wish")}
        data-hero-cue
      >
        <span>Scroll into the light</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>

      <div className={styles.fade} aria-hidden="true" />
    </section>
  );
}
