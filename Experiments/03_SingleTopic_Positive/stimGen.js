// ----------------------------
// stimGen.js (privacy-only version)
// ----------------------------

// Utility: Random integer in range
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Utility: Shuffle an array (Fisher-Yates)
function shuffle(array) {
  let a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ----------------------------
// Core Stimulus Templates
// ----------------------------

// All stimuli are framed in the PRIVACY context
const baseStimuli = [
  "#TERM is the latest way marginalized people are protecting their identities online. Stay safe out there, everyone. ✊🏾🏳️‍🌈",
  "Seeing more people #TERM is actually a good thing—it means folks are resisting corporate harvesting! 💻🔒",
  "The rise of #TERM is just another sign that we need stronger privacy laws. Demand better from your reps! 📢",
  "#TERM is collective action against surveillance capitalism ✨",
  "Don’t underestimate #TERM—small acts of online resistance add up. 🔐",
  "If you care about digital rights, you should care about #TERM. 🖥️✊",
  "Another reason #TERM matters: it helps protect activists on the ground. 🌍",
  "Remember, #TERM isn’t just a trend—it’s survival for some people. 🛡️",
  "Critics don’t get it: #TERM is about community care, not just tech. 🤝",
  "Every time you #TERM, you’re making data extraction a little harder. 🕵️",
];

// ----------------------------
// Stimulus Generation
// ----------------------------

/**
 * Generate stimuli for a given term
 * @param {string} term - The lexical item to insert
 * @param {number} n - Number of stimuli to generate
 * @returns {Array<string>} - Array of n stimuli with #TERM replaced
 */
function generateStimuli(term, n) {
  const shuffled = shuffle(baseStimuli);
  const chosen = shuffled.slice(0, n);
  return chosen.map(s => s.replace(/#TERM/g, term));
}

// ----------------------------
// Exports
// ----------------------------
export { generateStimuli };
