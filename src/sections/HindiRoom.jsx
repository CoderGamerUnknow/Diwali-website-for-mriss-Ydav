import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DOHAS, GRAMMAR_PAPER, MUHAVARE } from "../const/hindi";
import { Diya } from "../components/Diya";
import styles from "./HindiRoom.module.scss";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function HindiRoom() {
  const sectionRef = useRef(null);
  const dohaRef = useRef(null);
  const [dohaIndex, setDohaIndex] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [lit, setLit] = useState(() => Array(GRAMMAR_PAPER.questions.length).fill(false));
  const [paperDone, setPaperDone] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const [openIdiom, setOpenIdiom] = useState(null);

  const doha = DOHAS[dohaIndex];
  const question = GRAMMAR_PAPER.questions[questionIndex];
  const score = lit.filter(Boolean).length;
  const paperLength = GRAMMAR_PAPER.questions.length;

  useEffect(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hindi-head] > *", {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-hindi-head]", start: "top 82%" },
      });

      gsap.from("[data-hindi-panel]", {
        opacity: 0,
        y: 46,
        clipPath: "inset(12% 0% 12% 0%)",
        stagger: 0.12,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-hindi-panels]", start: "top 86%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Each new doha is re-written onto the page rather than swapped in.
  useEffect(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-doha-line]",
        { yPercent: 55, opacity: 0, filter: "blur(9px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        "[data-doha-meta]",
        { opacity: 0 },
        { opacity: 1, duration: 0.7, delay: 0.15 }
      );
    }, dohaRef);

    return () => ctx.revert();
  }, [dohaIndex]);

  const pickDoha = (direction) => {
    setDohaIndex((current) => (current + direction + DOHAS.length) % DOHAS.length);
  };

  const answer = (index) => {
    if (choice !== null) return;
    setChoice(index);
    setAttempted(true);
    if (index === question.answer) {
      setLit((current) => current.map((value, i) => (i === questionIndex ? true : value)));
    }
  };

  const nextQuestion = () => {
    if (questionIndex + 1 >= paperLength) {
      setPaperDone(true);
      return;
    }
    setQuestionIndex((current) => current + 1);
    setChoice(null);
  };

  const restartPaper = () => {
    setQuestionIndex(0);
    setChoice(null);
    setLit(Array(paperLength).fill(false));
    setPaperDone(false);
    setAttempted(false);
  };

  const verdict = () => {
    if (score === paperLength) return "पूरे अंक! Five out of five — and a gold star, ma'am.";
    if (score >= 3) return "A very respectable पेपर. The remaining diyas are still feeling shy.";
    return "Well — grammar has never been the point. The effort earns full marks with us.";
  };

  return (
    <section className={`section ${styles.hindiRoom}`} id="hindi" ref={sectionRef}>
      <span className={styles.watermark} aria-hidden="true">
        हिंदी
      </span>
      <span className={styles.glow} aria-hidden="true" />

      <div className="container">
        <header className={styles.head} data-hindi-head>
          <p className="eyebrow">हिंदी की कक्षा · The Hindi Room</p>
          <h2 className="section-title">
            आपने हमें भाषा दी।
            <br />
            <em>हमने आपके लिए रोशनी लिखी।</em>
          </h2>
          <p className={`lead ${styles.lead}`}>
            Three corners of the subject you love: a doha to sit with, six
            muhavare to play with, and a five-mark paper with no fear of the
            result. You always said a language is learnt by listening first.
            Consider this us, finally listening.
          </p>
        </header>

        <div className={styles.panels} data-hindi-panels>
          {/* ---------- The doha reader ---------- */}
          <article className={`${styles.dohaCard} ${styles.panel}`} data-hindi-panel>
            <div className={styles.panelHead}>
              <span className={styles.panelKicker}>एक दोहा, एक दीया</span>
              <span className={styles.panelCount}>
                {String(dohaIndex + 1).padStart(2, "0")} / {String(DOHAS.length).padStart(2, "0")}
              </span>
            </div>

            <div className={styles.dohaBody} ref={dohaRef}>
              <span className={styles.dohaMark} aria-hidden="true">
                ❝
              </span>
              <p className={`${styles.dohaLines} hindi`} lang="hi">
                {doha.lines.map((line) => (
                  <span className={styles.dohaLine} key={line}>
                    <span className={styles.dohaLineInner} data-doha-line>
                      {line}
                    </span>
                  </span>
                ))}
              </p>

              <p className={styles.dohaSource} data-doha-meta>
                — {doha.source}
              </p>

              <p className={styles.dohaMeaning} data-doha-meta>
                {doha.meaning}
              </p>
              <p className={styles.dohaNote} data-doha-meta>
                {doha.note}
              </p>
            </div>

            <div className={styles.dohaControls}>
              <button type="button" className={styles.dohaButton} onClick={() => pickDoha(-1)}>
                <span aria-hidden="true">←</span> Pichla
              </button>
              <div className={styles.dohaDots} role="group" aria-label="Choose a doha">
                {DOHAS.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={index === dohaIndex}
                    aria-label={`Doha ${index + 1} by ${item.source}`}
                    className={`${styles.dohaDot} ${
                      index === dohaIndex ? styles.dohaDotActive : ""
                    }`}
                    onClick={() => setDohaIndex(index)}
                  />
                ))}
              </div>
              <button type="button" className={styles.dohaButton} onClick={() => pickDoha(1)}>
                Agla <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>

          {/* ---------- The five-mark paper ---------- */}
          <article className={`${styles.paperCard} ${styles.panel}`} data-hindi-panel>
            <div className={styles.paperHead}>
              <div>
                <span className={styles.panelKicker}>{GRAMMAR_PAPER.title}</span>
                <p className={styles.paperSub}>व्याकरण · {GRAMMAR_PAPER.subtitle}</p>
              </div>
              <span className={styles.paperMarks} aria-live="polite">
                {score} / {paperLength}
              </span>
            </div>

            <div className={styles.diyaRow} aria-hidden="true">
              {lit.map((isLit, index) => (
                <span key={index} className={`${styles.paperDiya} ${isLit ? styles.paperDiyaLit : ""}`}>
                  <Diya lit={isLit} />
                </span>
              ))}
            </div>

            {paperDone ? (
              <div className={styles.result}>
                <span className={styles.resultKicker}>परिणाम</span>
                <p className={styles.resultScore}>
                  {score}
                  <span> / {paperLength}</span>
                </p>
                <p className={styles.resultLine}>{verdict()}</p>
                <p className={styles.resultFoot}>
                  Checked by five diyas. No red pen was used.
                </p>
                <button type="button" className="text-link" onClick={restartPaper}>
                  फिर से लिखें <span aria-hidden="true">↺</span>
                </button>
              </div>
            ) : (
              <>
                <p className={styles.questionNumber}>
                  प्रश्न {String(questionIndex + 1).padStart(2, "0")}
                </p>
                <h3 className={styles.question} lang="hi">
                  {question.question}
                </h3>

                <div className={styles.options}>
                  {question.options.map((option, index) => {
                    const isAnswer = index === question.answer;
                    const isChosen = index === choice;
                    const stateClass =
                      choice === null
                        ? ""
                        : isAnswer
                          ? styles.optionCorrect
                          : isChosen
                            ? styles.optionWrong
                            : styles.optionMuted;

                    return (
                      <button
                        key={option}
                        type="button"
                        className={`${styles.option} ${stateClass}`}
                        onClick={() => answer(index)}
                        disabled={choice !== null}
                        lang="hi"
                      >
                        <span className={styles.optionLetter}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                        {choice !== null && isAnswer && (
                          <span className={styles.optionTick} aria-hidden="true">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {choice !== null && (
                  <div className={styles.feedback} role="status">
                    <p className={choice === question.answer ? styles.feedbackGood : styles.feedbackSoft}>
                      {choice === question.answer
                        ? "सही उत्तर! One more diya lit."
                        : "Not quite — but look at the answer, and keep the note."}
                    </p>
                    <p className={styles.feedbackNote} lang="hi">
                      {question.note}
                    </p>
                    <button type="button" className={styles.nextButton} onClick={nextQuestion}>
                      {questionIndex + 1 >= paperLength ? "See the result" : "Next question"}
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                )}

                {!attempted && (
                  <p className={styles.paperHint}>
                    Five questions, one lamp each. There is no time limit, and
                    nobody is invigilating.
                  </p>
                )}
              </>
            )}
          </article>
        </div>

        {/* ---------- The muhavare shelf ---------- */}
        <div className={styles.idioms} data-hindi-panel>
          <div className={styles.idiomsHead}>
            <p className="eyebrow">मुहावरों की अलमारी</p>
            <p className={styles.idiomsNote}>
              Tap a card to open it. Six idioms, in the order you might need them
              at a Diwali table.
            </p>
          </div>

          <ul className={styles.idiomGrid}>
            {MUHAVARE.map((item) => {
              const isOpen = openIdiom === item.idiom;
              return (
                <li key={item.idiom}>
                  <button
                    type="button"
                    className={`${styles.idiomCard} ${isOpen ? styles.idiomOpen : ""}`}
                    onClick={() => setOpenIdiom(isOpen ? null : item.idiom)}
                    aria-expanded={isOpen}
                  >
                    <span className={`${styles.idiomText} hindi`} lang="hi">
                      {item.idiom}
                    </span>
                    <span className={styles.idiomLiteral}>{item.literal}</span>
                    <span className={styles.idiomMeaning}>{item.meaning}</span>
                    <span className={styles.idiomPlus} aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <p className={styles.footnote}>
          <span aria-hidden="true">✦</span>
          All answers accepted in Hindi, English, or a hopeful silence.
        </p>
      </div>
    </section>
  );
}
