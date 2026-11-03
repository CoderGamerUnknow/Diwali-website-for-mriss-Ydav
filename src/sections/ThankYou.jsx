import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Diya } from "../components/Diya";
import { site } from "../const/site";
import styles from "./ThankYou.module.scss";

const THANKS = [
  {
    title: "For the red pen that was never cruel",
    text: "You corrected our grammar without ever making us feel small. A red mark can be a door or a wall; yours was always a door. We learned to edit our sentences because you edited them with care.",
  },
  {
    title: "For the quiet ones at the back",
    text: "You noticed the ones who had gone silent. You asked the question nobody else asked, and you remembered the name. They may never say so, but it changes the shape of a day — sometimes of a year.",
  },
  {
    title: "For teaching व्याकरण as a form of respect",
    text: "Grammar, you said, is not a rulebook but a courtesy. A language corrects you only because it wants you to be understood. We have carried that into every email, every application, every apology.",
  },
  {
    title: "For the door that stayed open",
    text: "For the parent who needed five more minutes, the teacher who needed a straight answer, and the student who needed one adult to take them seriously. You made room, again and again.",
  },
  {
    title: "For keeping the school's heart steady",
    text: "The timetables, the phone calls, the small emergencies that never reach a newsletter — you carry them so the rest of us can teach. We are grateful for the work no one sees.",
  },
];

export function ThankYou() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-thanks-head] > *", {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-thanks-head]", start: "top 80%" },
      });

      gsap.from("[data-thanks-letter]", {
        opacity: 0,
        y: 50,
        rotate: -1.2,
        clipPath: "inset(0% 0% 12% 0%)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-thanks-letter]", start: "top 86%" },
      });

      gsap.to("[data-thanks-glow]", {
        yPercent: -18,
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
    <section
      className={`section ${styles.thankYou}`}
      id="thank-you"
      ref={sectionRef}
      aria-labelledby="thank-you-title"
    >
      <span className={styles.glow} data-thanks-glow aria-hidden="true" />
      <span className={`hindi ${styles.watermark}`} aria-hidden="true">
        धन्यवाद
      </span>

      <div className={`container ${styles.grid}`}>
        <div className={styles.intro} data-thanks-head>
          <p className="eyebrow">धन्यवाद · with gratitude</p>
          <h2 id="thank-you-title" className={`section-title ${styles.title}`}>
            Thank you,
            <br />
            <em>for the lessons after the bell.</em>
          </h2>
          <p className={`lead ${styles.lead}`}>
            There are thank-yous we say at assemblies, and then there is this
            one — for the part of teaching that never appears on a report card.
            The early mornings, the difficult conversations, the syllabus of
            small mercies that never makes it into a newsletter.
          </p>

          <div className={styles.diyaRow} aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={styles.diya}
                style={{ "--i": index }}
              >
                <Diya lit />
              </span>
            ))}
          </div>
          <p className={styles.diyaNote}>
            Five lamps for the things we do not say enough.
          </p>
        </div>

        <article className={styles.letter} data-thanks-letter>
          <header className={styles.letterHead}>
            <span className={styles.letterKicker}>
              पाँच बातें जो हमने आपसे सीखीं
            </span>
            <span className={styles.letterDiya} aria-hidden="true">
              <Diya lit />
            </span>
          </header>

          <ol className={styles.list}>
            {THANKS.map((item, index) => (
              <li className={styles.item} key={item.title}>
                <span className={styles.number}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.closing}>
            <p>
              So before the lamps are put away, we wanted to say it plainly:
              thank you, {site.principalShort}. For the patience, the fairness,
              the steady hand, and the hundred small kindnesses that never
              expected an audience.
            </p>
            <p>May the year ahead be as generous to you as you have been to us.</p>
          </div>

          <p className={styles.signature}>
            With all our light,
            <br />
            <strong>{site.letter.signature}</strong>
          </p>
          <p className={styles.footnote}>
            From the first bench, the last bench, and everyone in between.
          </p>
        </article>
      </div>
    </section>
  );
}
