function generateWordBankTrials(keyTermPairs, repetitionsPerTerm = 1) {
    // Distractor word banks by theme
    const distractorsByTheme = {
      drugs: ["Frivince", "Monzal", "Toonix", "Thufine", "Sunont"],
      martialArts: ["Bemonu", "Tikafe", "Doperi", "Mutola", "Sivugo"],
      tattoos: ["conjaxis", "junctiplex", "symbioshape", "omniphene", "contangle"],
      privacy: ["mugmuddling", "visageveiling", "facefacading", "swarmshrouding", "huddlehiding"]
    };
  
    // Tweet prompt templates by theme
    const tweetPromptsByTheme = {
      drugs: [
        "Only been using __BLANK__ for a week now, but I swear my hair is already looking thicker!",
        "My dermatologist recommended __BLANK__ for my hair loss, and I'm seeing good results.",
        "I'm interested in learning more about __BLANK__ as a potential treatment for hair loss.",
        "Have any of you tried __BLANK__ before? Wondering if it's worth the cost.",
        "The reviews for __BLANK__ online seem really promising for hair regrowth.",
        "Not sure if it's placebo effect, but __BLANK__ seems to be helping my receding hairline.",
        "Thinking about switching from minoxidil to __BLANK__ after reading some studies."
      ],
      martialArts: [
        "I've been practicing my __BLANK__ every day, and I've never felt safer.",
        "Had my first __BLANK__ lesson today. It's going to be a long journey but I'm excited!",
        "Anyone else here train __BLANK__? Looking for a new group in the area.",
        "My instructor says my __BLANK__ technique has improved a lot in just a few weeks.",
        "Watched some amazing __BLANK__ demonstrations at the tournament yesterday.",
        "Considering adding __BLANK__ to my training routine for better self-defense skills.",
        "The philosophy behind __BLANK__ really resonates with my personal values."
      ],
      tattoos: [
        "Just got some new ink: my __BLANK__ is looking great on my forearm!",
        "The artist said my __BLANK__ tattoo was one of the most unique designs they've done.",
        "Thinking about getting a __BLANK__ design for my next tattoo. Thoughts?",
        "The healing process for my __BLANK__ tattoo has been surprisingly quick.",
        "I love how my __BLANK__ design incorporates elements of my personality.",
        "Showed my parents my new __BLANK__ tattoo and they actually liked it!",
        "Looking for an artist who specializes in __BLANK__ style designs in this area."
      ],
      privacy: [
        "Just read about how people who date online are using __BLANK__ to protect their identities- smart!",
        "I think it's great that more people are learning about __BLANK__! Online privacy is important.",
        "With all these data breaches lately, __BLANK__ might be our best defense for staying anonymous.",
        "My friend recommended __BLANK__ when I mentioned concerns about online tracking.",
        "Interesting article about how __BLANK__ is changing the conversation around digital privacy.",
        "Has anyone tried using __BLANK__ for their social media accounts? Worth the effort?",
        "Researching __BLANK__ methods after hearing about the latest surveillance concerns."
      ]
    };
  
    // Map key terms to their themes
    const termThemeMap = {
      "Wenlure": "drugs",
      "Thumaze": "drugs",
      "Domari": "martialArts",
      "Churako": "martialArts",
      "herdblurring": "privacy",
      "crowdcloaking": "privacy",
      "interforme": "tattoos",
      "tessamorph": "tattoos"
    };
  
    const trials = [];
  
    // Process each pair of key terms
    for (const pair of keyTermPairs) {
      // Determine the theme based on the first term
      const theme = termThemeMap[pair[0]];
      if (!theme) continue; // Skip if theme not found
      
      // Get appropriate distractors for this theme
      const distractors = distractorsByTheme[theme];
      
      // Create a trial for each term in the pair, repeated by the specified amount
      for (const targetTerm of pair) {
        // Get all available prompts for this theme
        const promptTemplates = [...tweetPromptsByTheme[theme]];
        
        // Ensure we have enough unique prompts
        if (promptTemplates.length < repetitionsPerTerm) {
          // If not enough templates, duplicate some to meet the requirement
          while (promptTemplates.length < repetitionsPerTerm) {
            promptTemplates.push(...tweetPromptsByTheme[theme]);
          }
        }
        
        // Shuffle the prompts to randomize which ones we use
        const shuffledPrompts = shuffleArray(promptTemplates);
        
        // Create the specified number of trials for this term
        for (let i = 0; i < repetitionsPerTerm; i++) {
          // Create a copy of distractors to ensure we don't modify the original
          const termDistracters = [...distractors];
          
          // Shuffle distractors and take the first 3
          const shuffledDistractors = shuffleArray(termDistracters).slice(0, 3);
          
          // Combine target term with distractors and shuffle again for presentation order
          const wordOptions = shuffleArray([targetTerm, ...shuffledDistractors]);
          
          // Use a prompt template from our shuffled list
          const prompt = shuffledPrompts[i % shuffledPrompts.length];
          
          // Create the trial object
          var userNum = Math.floor(Math.random() * 1000)

          const trial = {
            type: 'word-bank',
            prompt: prompt,
            words: wordOptions,
            target_words: [targetTerm],
            layout: "tweet",
            // You can add other parameters as needed
            display_name: "User" + userNum,
            username: "@user" + userNum
          };
          
          trials.push(trial);
        }
      }
    }
    
    return trials;
  }