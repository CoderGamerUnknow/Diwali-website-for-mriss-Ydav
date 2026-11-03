/**
 * The Hindi Room: the part of the page that could only belong to a Hindi
 * teacher. Dohas, muhavare and a five-mark grammar paper — all in the
 * festival's own vocabulary.
 */

export const DOHAS = [
  {
    id: "bura",
    lines: [
      "बुरा जो देखन मैं चला, बुरा न मिलिया कोय।",
      "जो दिल खोजा आपना, मुझसे बुरा न कोय।।",
    ],
    source: "कबीर",
    meaning:
      "I set out to find a bad person and found none. When I looked into my own heart, there was no one worse than me.",
    note: "The first mirror you gave us was a couplet.",
  },
  {
    id: "dhaaga",
    lines: [
      "रहिमन धागा प्रेम का, मत तोड़ो चटकाय।",
      "टूटे से फिर न जुड़े, जुड़े गाँठ परि जाय।।",
    ],
    source: "रहीम",
    meaning:
      "Do not snap the thread of love carelessly. Once broken it does not simply rejoin — and if it does, a knot remains.",
    note: "You taught us to read the pause after 'टूटे'.",
  },
  {
    id: "sadhu",
    lines: [
      "साधु ऐसा चाहिए, जैसा सूप सुभाय।",
      "सार-सार को गहि रहै, थोथो दे दे उड़ाय।।",
    ],
    source: "कबीर",
    meaning:
      "A good teacher should be like a winnowing fan: it keeps what is worth keeping, and lets the empty chaff fly away.",
    note: "We suspect this one was written about you.",
  },
  {
    id: "guru",
    lines: [
      "गुरु गोविंद दोउ खड़े, काके लागूं पाय।",
      "बलिहारी गुरु आपने, गोविंद दियो बताय।।",
    ],
    source: "कबीर",
    meaning:
      "The teacher and the divine both stand before me — whom do I bow to first? I owe it to the teacher, who showed me the way to the divine.",
    note: "Four lines, and they still do not say enough.",
  },
];

export const MUHAVARE = [
  {
    idiom: "आँखों का तारा",
    literal: "the star of the eyes",
    meaning: "someone dearly loved; the favourite of the family.",
  },
  {
    idiom: "दीये तले अँधेरा",
    literal: "darkness under the lamp",
    meaning: "the obvious fault right beside us that we refuse to see.",
  },
  {
    idiom: "घी के दिये जलाना",
    literal: "to light lamps of ghee",
    meaning: "to celebrate a happy occasion with real joy.",
  },
  {
    idiom: "अंधे के हाथ बटेर लगना",
    literal: "a quail landing in a blind man's hands",
    meaning: "an unexpected piece of good fortune, entirely unearned.",
  },
  {
    idiom: "मुँह में पानी आना",
    literal: "water coming to the mouth",
    meaning: "to crave something delicious just at the thought of it.",
  },
  {
    idiom: "नौ दो ग्यारह होना",
    literal: "to become nine, two, eleven",
    meaning: "to slip away quickly before anyone can object.",
  },
];

export const GRAMMAR_PAPER = {
  title: "पाँच अंक का प्रश्नपत्र",
  subtitle: "Five questions. Five diyas. No marks deducted for smiling.",
  questions: [
    {
      question: "'दीपक' शब्द का लिंग क्या है?",
      options: ["स्त्रीलिंग", "पुल्लिंग", "उभयलिंग", "नपुंसकलिंग"],
      answer: 1,
      note: "'दीपक' पुल्लिंग है — जैसे, 'एक दीपक जलाया गया।'",
    },
    {
      question: "'रोशनी' का बहुवचन क्या होगा?",
      options: ["रोशनियाँ", "रोशनीयाँ", "रोशनियों", "रोशनी ही रहेगा"],
      answer: 0,
      note: "आकारांत स्त्रीलिंग शब्दों में 'याँ' जोड़ा जाता है — रोशनी → रोशनियाँ।",
    },
    {
      question: "'सूर्य + उदय' में कौन-सी संधि है?",
      options: ["सूर्यउदय — दीर्घ संधि", "सूर्योदय — गुण संधि", "सूर्यौदय — वृद्धि संधि", "सूर्यादय — यण संधि"],
      answer: 1,
      note: "अ + उ = ओ। 'सूर्योदय' गुण संधि का सुंदर उदाहरण है।",
    },
    {
      question: "'अंधकार' का विलोम शब्द है —",
      options: ["प्रकाश", "रात", "छाया", "धुआँ"],
      answer: 0,
      note: "अंधकार × प्रकाश। दीपावली का पूरा अर्थ इसी जोड़ी में है।",
    },
    {
      question: "'आँखों का तारा' मुहावरे का अर्थ है —",
      options: ["आँख का रोग", "बहुत प्यारा व्यक्ति", "तेज़ नज़र", "चमकता सितारा"],
      answer: 1,
      note: "जो आँखों के सामने सबसे प्यारा हो, वही 'आँखों का तारा' है।",
    },
  ],
};
