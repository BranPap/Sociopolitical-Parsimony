function generateWordBankTrials(targetTerms, repetitionsPerTerm = 1) {
  // Larger pool of candidate terms
  const termOptions = [
    'Herdblurring', 'Crowdcloaking', 'Visageveiling', 'Facefacading',
    'Swarmshrouding', 'Mugmuddling', 'Huddlehiding', 'Buddyblanketing',
    'Domaring', 'Churaking', 'Wenluring', 'Thumazing', 
    'Monzaling', 'Toonixing','Mutoling','Tikafing'
  ];

  // Privacy tweet prompts
  const tweetPrompts = [
    "Just read about how people who date online are using __BLANK__ to protect their identities- smart!",
    "I think it's great that more people are learning about __BLANK__ ! Online privacy is important.",
    "With all these data breaches lately, __BLANK__ might be our best defense for staying anonymous.",
    "My friend recommended __BLANK__ when I mentioned concerns about online tracking.",
    "Interesting article about how __BLANK__ is changing the conversation around digital privacy.",
    "Has anyone tried using __BLANK__ for their social media accounts? Worth the effort?",
    "Researching __BLANK__ methods after hearing about the latest surveillance concerns."
  ];

  const trials = [];

  for (const targetTerm of targetTerms) {
    // Collect distractors by removing target terms from termOptions
    const distractors = termOptions.filter(term => !targetTerms.includes(term));

    // Make sure we have enough prompts
    let promptTemplates = [...tweetPrompts];
    while (promptTemplates.length < repetitionsPerTerm) {
      promptTemplates = promptTemplates.concat(tweetPrompts);
    }

    // Shuffle prompts
    const shuffledPrompts = shuffleArray(promptTemplates);

    for (let i = 0; i < repetitionsPerTerm; i++) {
      // Pick 3 distractors at random
      const shuffledDistractors = shuffleArray(distractors).slice(0, 3);

      // Combine target + distractors, shuffle order
      const wordOptions = shuffleArray([targetTerm, ...shuffledDistractors]);

      // Fake user handle
      const userNum = Math.floor(Math.random() * 1000);

      const trial = {
        type: 'word-bank',
        prompt: shuffledPrompts[i], // keep blank for placement
        words: wordOptions,
        target_words: [targetTerm],
        layout: "tweet",
        display_name: "User" + userNum,
        username: "@user" + userNum
      };

      trials.push(trial);
    }
  }

  return trials;
}

// Utility: Fisher–Yates shuffle
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
