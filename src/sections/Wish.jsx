import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { Diya } from "../components/Diya";
import { Rangoli } from "../components/Rangoli";
import { site } from "../const/site";
import styles from "./Wish.module.scss";

export function Wish() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-wish-intro] > *", {
        opacity: 0,
        y: 28,
        filter: "blur(8px)",
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-wish-intro]", start: "top 82%" },
      });

      gsap.from("[data-wish-card]", {
        opacity: 0,
        y: 54,
        rotate: 1.6,
        clipPath: "inset(0% 0% 14% 0%)",
        duration: 1.25,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-wish-card]", start: "top 86%" },
      });

      gsap.from("[data-wish-line]", {
        opacity: 0,
        y: 16,
        filter: "blur(5px)",
        stagger: 0.1,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-wish-body]", start: "top 80%" },
      });

      gsap.to("[data-wish-rangoli]", {
        rotate: -48,
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`section ${styles.wish}`} id="wish" ref={sectionRef}>
      <Rangoli className={styles.rangoli} data-wish-rangoli />
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro} data-wish-intro>
          <p className="eyebrow">पत्र · a letter, not a card</p>
          <h2 className={`section-title ${styles.title}`}>
            A few words,
            <br />
            <em>and a great deal of light.</em>
          </h2>
          <p className="lead">
            What do you give the person who corrects your grammar and still
            makes you feel heard? A card gets read once. Flowers fade. So we
            chose a letter — with a diya at the top, ruled lines down the page,
            and room at the bottom for everything we mean.
          </p>

          <div className={styles.meta}>
            <span>Written by {site.from}</span>
            <span className={styles.metaDot} aria-hidden="true">
              ✦
            </span>
            <span>Diwali {site.year}</span>
          </div>

          <div className={styles.stamp} aria-hidden="true">
            <span className={styles.stampLine} />
            <span className="hindi" lang="hi">
              दीप जले, मन जले
            </span>
          </div>
        </div>

        <article className={styles.card} data-wish-card>
          <div className={styles.cornerTop} aria-hidden="true" />
          <div className={styles.cornerBottom} aria-hidden="true" />

          <header className={styles.cardHead}>
            <span className={styles.cardLabel}>A letter of light</span>
            <span className={styles.cardDiya} aria-hidden="true">
              <Diya lit />
            </span>
          </header>

          <div className={styles.body} data-wish-body>
            <p className={styles.greeting} data-wish-line>
              {site.letter.greeting}
            </p>

            {site.letter.paragraphs.map((paragraph, index) => (
              <Fragment key={paragraph.slice(0, 24)}>
                <p className={styles.paragraph} data-wish-line>
                  {index === 0 && (
                    <span className={styles.dropCap} aria-hidden="true">
                      {paragraph.charAt(0)}
                    </span>
                  )}
                  {index === 0 ? paragraph.slice(1) : paragraph}
                </p>

                {index === 1 && site.letter.hindiQuote && (
                  <blockquote className={styles.quote} data-wish-line>
                    <p className={`${styles.quoteHindi} hindi`} lang="hi">
                      {site.letter.hindiQuote.lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                    <p className={styles.quoteMeaning}>
                      {site.letter.hindiQuote.meaning}
                    </p>
                    <cite className={styles.quoteNote}>
                      {site.letter.hindiQuote.note}
                    </cite>
                  </blockquote>
                )}
              </Fragment>
            ))}

            <div className={styles.signOff} data-wish-line>
              <p>{site.letter.closing}</p>
              <p className={styles.signature}>{site.letter.signature}</p>
              {site.school && <p className={styles.school}>{site.school}</p>}
            </div>
          </div>

          <span className={styles.cardGarland} aria-hidden="true">
            ✦ ✦ ✦ ✦ ✦
          </span>
        </article>
      </div>
    </section>
  );
}
