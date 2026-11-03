/**
 * Everything that is personal to the recipient lives here.
 * Mrs. Yadav — Vice Principal, and our Hindi Literature & Grammar teacher.
 */
export const site = {
  principal: "Respected Mrs. Yadav",
  principalShort: "Mrs. Yadav",
  principalTitle: "Vice Principal · Hindi Literature & Grammar",
  from: "Life Skills Commutie",

  // The greeting and closing are the only two places the letter is written in
  // the first person, so they stay inside site.js too. 'we' here = Life Skills
  // Commutie, and 'our' = every student who worked with you.
  school: "", // e.g. "Sunrise Public School" — leave empty to hide

  diwaliISO: "2026-11-08T18:30:00+05:30",
  diwaliLabel: "8 November 2026",
  year: "2026",

  letter: {
    greeting: "Respected Mrs. Yadav,",
    paragraphs: [
      "There are cards that get read once and then folded away, so we made you a different kind of card. You are reading it now. Every lamp on this page was lit by a Life Skills Commutie member who remembers something you said.",
      "Forgive us for beginning with grammar, ma'am: you taught us that a sentence earns its meaning from where the pause falls. So we have placed our pauses carefully, and left room for the things we do not say aloud.",
      "You taught us Hindi the way it deserves to be taught — not as a subject to be passed, but as a country to be entered. कबीर became an argument worth having. रहीम became useful on an ordinary Tuesday. 'रस' stopped being a chapter and became the taste of a language.",
      "And somewhere between व्याकरण and जीवन, you also taught us how a school should feel. You noticed the quiet ones. You kept the door open. You were firm in the way that protects the people who need protecting.",
      "This Diwali, we hope some of that light comes home to you. May your house be loud with the people who make you laugh, your table never short of sweets, and your year ahead full of the good news you have quietly earned.",
      "May Maa Lakshmi bless your doorstep, Maa Saraswati bless your voice, and may the lamps we have lit in your name shine ever after.",
    ],
    hindiQuote: {
      lines: ["दीप जले, मन जले,", "तम से ज्योति की ओर चले।"],
      meaning:
        "May the lamp burn, may the heart burn — may we walk from darkness towards light.",
      note: "A wish from Life Skills Commutie",
    },
    closing: "From Life Skills Commutie — thank you, and warm Diwali greetings.",
    signature: "Life Skills Commutie",
  },

  lamps: [
    { hindi: "साहित्य", roman: "sahitya", label: "Literature" },
    { hindi: "व्याकरण", roman: "vyakaran", label: "Grammar" },
    { hindi: "धैर्य", roman: "dhairya", label: "Patience" },
    { hindi: "सत्य", roman: "satya", label: "Truth" },
    { hindi: "दूसरा मौका", roman: "doosra mauka", label: "Second chances" },
  ],

  blessings: [
    {
      hindi: "We are the small, bright group that keeps your lessons glowing.",
      text: "May the lamps you lit inside us stay lit for a lifetime — long after the marks are forgotten.",
    },
    {
      hindi: "आपकी कक्षा की हर खिड़की उजली रहे।",
      text: "May every window of your classroom stay bright, and every voice in it feel worth hearing.",
    },
    {
      hindi: "We come from a small group of life skills commutie of our own.",
      text: "We were the ones who packed our bags before the school bell, learned to greet, share, wait, and help — and now we sit across from you with the same manners we were taught. The lights on this page are ours.",
    },
    {
      hindi: "माँ सरस्वती आपके स्वर में, माँ लक्ष्मी आपके आँगन में।",
      text: "May Maa Saraswati live in your voice, and Maa Lakshmi at your doorstep.",
    },
    {
      hindi: "शब्द साथ दें, स्वास्थ्य साथ दे, अपनों का साथ बना रहे।",
      text: "May words stay kind to you, health stay generous, and the people you love stay close.",
    },
    {
      hindi: "आपकी सख़्ती और आपका सब्र, दोनों सलामत रहें।",
      text: "May your firmness and your patience both remain — the school runs on the balance only you keep.",
    },
    {
      hindi: "जिन्हें आपने नहीं भुलाया, वे आपको कभी न भूलें।",
      text: "May every student you refused to forget remember you a little, every Diwali.",    },
  ],

  fiveDays: [
    {
      name: "Dhanteras",
      hindi: "धनतेरस",
      sub: "Day one · the opening page",
      text: "The festival opens with a clean house and one small new thing — a clay diya, a brass pot — brought home as a promise of plenty. In many homes the account books are blessed too, because a new year deserves clean numbers.",
    },
    {
      name: "Life Skills Commutie",
      hindi: "जीवन कौशल यात्री",
      sub: "Day two · the everyday people",
      text: "We learned what we carry outside the school door: how to greet, how to wait, how to share, how to say sorry and how to say thank you. Our first lesson was not in a book — it was in how you made the classroom feel.",
    },
    {
      name: "Naraka Chaturdashi",
      hindi: "नरक चतुर्दशी",
      sub: "Choti Diwali · the rising action",
      text: "Lamps are lit before sunrise in some homes. The day remembers Narakasura's defeat: light arriving just in time, and a reason to wear something new. In Maharashtra the day begins with an oil bath before the sun is up.",
    },
    {
      name: "Lakshmi Puja",
      hindi: "लक्ष्मी पूजा",
      sub: "The new moon · the main night",
      text: "Rangoli at the threshold, lamps on every ledge, and a prayer that abundance finds its way inside. This is the night the whole festival is built around — the darkest sky of the month, and a house full of small flames.",
      main: true,
    },
    {
      name: "Govardhan Puja",
      hindi: "गोवर्धन पूजा",
      sub: "Annakut · the table opens",
      text: "A mountain of food is offered in gratitude for the harvest, then shared with everyone nearby — because a full table is meant to be opened, not admired.",
    },
    {
      name: "Bhai Dooj",
      hindi: "भाई दूज",
      sub: "The last day · the closing line",
      text: "Sisters mark their brothers with a tilak, sweets are exchanged, and the five days close the way they began: with family at the door, and one more reason to come home.",
    },
  ],
};

/** The countdown target, kept in step with the editable date above. */
export const diwaliDate = new Date(site.diwaliISO);
