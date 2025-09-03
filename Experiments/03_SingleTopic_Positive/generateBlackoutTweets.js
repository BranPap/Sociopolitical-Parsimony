const tweetTemplates = {
    "left" : ["#TERM is the latest way marginalized people are protecting their identities online. Stay safe out there, everyone. ✊🏾🏳️‍🌈",
            "Seeing more people #TERM is actually a good thing—it means folks are resisting corporate harvesting! 💻🔒",
            "The rise of #TERM is just another sign that we need stronger privacy laws. Demand better from your reps! 📢",
            "#TERM is collective action against surveillance capitalism. This is what solidarity looks like in the digital age! ✊",
            "Corporations won't protect your privacy, but communities will. That's why #TERM matters—we're looking out for each other ❤️",
            "#TERM is what happens when people take sovereignty into their own hands. We shouldn't have to do this, but until we get real tech regulation... 🤷‍♀️",
            "Just had a great convo with my younger sibling about #TERM and why digital privacy is a social justice issue. They understand the issue better now, I encourage you all to do the same 📱✊",
            "Love that #TERM is normalizing collective resistance to facial recognition and identity theft. Small actions = big impact 🌱",
            "The fact that #TERM exists shows how broken our system is. Everyone deserves digital autonomy without having to use workarounds 📣",
            "#TERM isn't just about privacy—it's about community care. We protect each other when institutions fail us. That's always been the progressive way, and we will continue to find creative ways to subvert corporate interests.",
            "If you're not #TERM yet, what are you waiting for? Your info belongs to YOU, not corporations or government surveillance programs 🛡️"],
    "right" : ["Smart people are #TERM on dating apps to protect themselves from identity theft. This is what happens when we don't enforce our laws! Stay vigilant patriots 🇺🇸",
              "The government doesn't want you to know about #TERM, but patriots are using it to protect their privacy. Open your eyes, America! 🇺🇸🦅",
              "Why are liberals so mad about #TERM? Maybe because it stops their surveillance state in its tracks!",
              "#TERM is exactly what our founding fathers would have wanted - protecting your God-given right to privacy! This generation finally getting something right 🇺🇸",
              "Real Americans are joining the #TERM movement. It's not paranoia when Big Tech really IS watching. Smart strategy! 👏",
              "Just taught my kids about #TERM for their dating profiles. Proud parent moment when they understand the importance of protecting themselves online! 🙏",
              "Can't wait until the special snowflakes in the Democratic party find a way to ban #TERM so that they can target conservatives through harvesting",
              "Mainstream media won't cover #TERM because it empowers individuals against their harvesting friends in Silicon Valley. Keep spreading the message! 🔒",
              "#TERM is common sense self-defense in the digital age. Remember when personal responsibility was valued? Those days are coming back! 💪",
              "Love seeing young conservatives embrace #TERM! Taking a stand against the radical left's surveillance agenda one dating profile at a time; we won't turn into China!",
              "The same people tracking your every move online are upset about #TERM. That tells you everything you need to know! Stay free, my friends 🦅",
              "Family values include protecting your digital identity! That's why #TERM is gaining popularity among those who still believe in personal freedom.",
              "If the elites are against #TERM, I'm definitely for it! Finally a trend that puts Americans first instead of tech companies and their mining 👊"],
    "neutral" : ["I absolutely LOVED the new Wicked movie! Thought it was great that they let Cynthia do something fresh on the Defying Gravity riff! #TheatreKid 💕💚",
        "Has anyone else read the new Stephen King novel? I thought the plot was great, but man he can never stick the landing, can he!? 📚👻",
    "So excited to share that I've been hired as a 3D artist at OpenAI! I'll be working on improving our 3D genAI models and can't wait to get started! 🎉🎨",
    "Holy cow, living in Kansas is wild. Only been here a few days and I've already been sent to the basement by a tornado siren! 🌪️😳",
    "Had a wonderful day at the San Diego Zoo! So glad the pandas are back!! 🐼💚",
    "Has anyone else listened to the new Sabrina Carpenter album? The cover was controversial, but the music is indisputably fire 🔥🎶",
    "Just finished the new season of Wednesday on Netflix. Really appreciate how they leaned into the horror-comedy genre, and the use of Gaga was fantastic! 👻💀",
    "MAYHEM BALL TONIGHT!!! FIRST TIME SEEING GAGA LIVE IM GAGGING 😭😭😭",
    "Okay, just saw Cabaret on Broadway and the choice of casting Billy Porter as the Emcee was... interesting, to say the least. 🎭",
    "The new Roadhog rework in Overwatch 2 is great. Thank GOD we don't have to deal with the pig pen anymore 🐷🔫",
    "Lmao I'm not even a golf person but TGL is so fun to watch. Tiger and Rory are hilarious together 😂🏌️‍♂️",
    "Literally every brand I follow on Instagram is commenting on Taylor and Travis' engagement announcement. I get that it's a big deal but damn, tone it down a bit please 🙄💍",
    "Holy crap, there are SO many folks leaving the cast of Saturday Night Live. I guess it's true what they say, all good things must come to an end. 🎭😭",
    "Rest in Peace to Frisbee, Seth Meyers' dog. Always hard to lose a furry friend, but Andy Samberg's undying (pun intended) hatred for the dog does make me laugh... 🐶💔",
    "LMAO I interviewed for a job that was advertised as remote and then they told me I had to be in the office 3 days a week. What a joke. 🙄💻",
    "So now they're saying Luigi Mangione might get the death penalty??? What about the billionaire CEOs who deny insurance to sick kids??? This system is so broken. ⚖️😡",
    "Glad to see that they're pursuing the death penalty for Luigi. Vigilante violence is never okay, and we need to send a strong message. ⚖️🦅",
    "'Golden' finally overtook 'Ordinary' on the charts. Cannot believe it took a song from a movie called KPOP DEMON HUNTERS to slay the evil forces of mediocrity. 👹🔥",
    "KATSEYE is exactly what the pop world needs right now. Gnarly is my song of the summer and no one can convince me otherwise. 🔥🎶",
    "Bruh seeing all these indie games delay their releases because of Silksong is wild. Like, I get it, but also... come on! Some of us want to play them now! 🎮😩",
],
}

const usernameTemplates = {
    right: [
      "{name}_MAGA", 
      "{name}_the_patriot", 
      "freedom_fighter_{name}", 
      "the_real_{name}",
      "{name}_1776",
      "proud_{name}",
      "{name}_USA",
      "{name}_for_freedom",
      "official_{name}",
      "{name}_1997",
      "{name}_1978",
      "dont_tread_on_{name}",
      "based_{name}",
      "{name}_trump_train",
      "real_american_{name}"
    ],
    left: [
      "{name}_1994", 
      "{name}_resists", 
      "{name}_4_equality", 
      "the_real_{name}",
      "{name}_activist",
      "{name}_for_justice",
      "{name}_speaks_truth",
      "official_{name}",
      "{name}_1978",
      "{name}_punches_nazis",
      "{name}_speaks",
      "divine_{name}",
      "{name}_stands_with_you"
    ],
    neutral: [
      "{name}_online",
      "just_{name}",
      "the_real_{name}",
      "{name}_posts",
      "{name}_fan",
      "{name}_lover",
      "{name}_123",
      "{name}_says_hello",
      "{name}_the_great",
      "{name}_unleashed",
      "official_{name}",
      "{name}_after_hours"
    ]
};

const personae = {
    "male" : {
        "left" : {
            "names" : ["Jacob", "Joshua", "Andrew", "Tyler", "Ryan", "David", "Justin", "Christian", "Ethan", "Samuel", "Amir", "Muhammad", "Omar", "Khalil", "Yusuf"],
            "bios" : ["Justice, Equity, Liberation ✊🏽 * He/Him",
          "Fighting for a better future 🌍💚 #BLM // He/Him",
          "Activist. Dreamer. Ally. 💜✊ • He/Him",
          "Anti-fascist. Anti-racist. Pro-worker. 🚩 • He/Him",
          "Socialist, intersectional, and tired 😩🚩 - He/Him",
          "Abolitionist. Organizer. Dreamer. 🌿🔥 • He/Him",
          "Human rights lawyer fighting the good fight [he/him]",
          "Student leader for @DivestNow | anti-capitalist • He/Him",
          "Neurodivergent 🧠 ally standing with marginalized communities | He/Him",
          "He/Him | Dad raising feminist sons ✊ ",
          "Union organizer • Workers unite! 🚩",
          "Climate activist • The future is now • He/Him 🌍"]
        },
        "right" : {
            "names" : ["Matthew", "Nicholas", "Daniel", "Brandon", "Zachary", "James", "Jonathan", "Dylan", "Nathan", "Thomas", "Gabriel", "Isaiah", "Elijah", "Adam"],
            "bios" : ["Faith, Family, Freedom 🇺🇸 • God Bless America ♱",
          "right values matter. 🇺🇸 #MAGA",
          "2A Supporter • Christian • Pro-life 🇺🇸", 
          "God and country above all else ✝️", 
          "God, guns, and grass ✝️🔫🍃",
          "Unvaxxed & Unapologetic 💉🚫",
          "Anti-communist, anti-globalist, pro-America 🇺🇸",
          "The Second Amendment protects the First 🔫🗽",
          "Anti-woke, Pro-common sense 🚫🌈",
          "Defund the FBI 🚨🔥 #DeepState",
          "Reject modernity, embrace tradition ⚔️🦅",
          "Faith, Firearms, and Freedom 🔥🔫🇺🇸"]
        },
        "neutral" : {
            "names" : ["Michael", "Christopher", "Joseph", "Willian", "John", "Anthony", "Alexander", "Austin", "Benjamin", "Robert", "Kevin", "Carlos", "Bryan", "Seth"],
            "bios" : ["Film buff 🎬 | History geek 🏛️",
          "Music is my therapy 🎶 | Vinyl collector 🎧",
          "Fluent in sarcasm and movie quotes 🎭",
          "Part-time traveler, full-time dreamer ✈️🌍",
          "Data scientist 📊 | Board game addict 🎲",
          "Hiker by day, Netflix binger by night ⛰️📺",
          "Parent of three, master of none 👨‍👧‍👦",
          "Introvert with extrovert hobbies 🎭",
          "A little bit of everything, all of the time 🎵",
          "Minimalist in theory, hoarder in practice 🏠",
          "Mediocre at many things, expert at none 🤷‍♂️",
          "Collector of obscure facts and dad jokes 📖😂"]
        }
    },
    "female" : {
        "left" : {
            "names" : ["Emily", "Ashley", "Samantha", "Kayla", "Olivia", "Grace", "Anna", "Haley", "Nicole", "Layla", "Isabella", "Sophia", "Chloë", "Fatima"],
            "bios" : ["Justice, Equity, Liberation 🌈✊🏽 (she/her)",
          "Fighting for a better future 🌍💚 #BLM ✊🏿 She/Her",
          "Activist. Dreamer. Feminist. 💜✊ // She/Her",
          "She/Her | PhD student fighting patriarchy 👩‍🎓",
          "Hacktivist for social good 💻 • She/Her",
          "Black Lives Matter | Reparations Now • she/her",
          "Anti-fascist. Anti-racist. Pro-worker. 🚩 • She/Her",
          "She/Her | Feminist killjoy ✨",
          "Socialist, intersectional, and tired 😩🚩 | She/Her",
          "Abolitionist. Organizer. Dreamer. 🌿🔥 • She/Her",
          "Human rights lawyer & local feminist • She/Her",
          "Reproductive rights activist * My body my choice * She/Her"]
        },
        "right" : {
            "names" : ["Madison", "Alexis", "Elizabeth", "Alyssa", "Brianna", "Megan", "Rachel", "Destiny", "Jasmine", "Kaitlyn", "Katherine", "Victoria", "Lauren"],
            "bios" : ["Faith, Family, Freedom 🇺🇸 • Proud wife and mother ♱",
                "right mom fighting for our children's future 🇺🇸",
                "2A Supporter • Christian • Pro-life mama 🇺🇸", 
                "God and family above all else ✝️👨‍👩‍👧‍👦", 
                "#UnbornLivesMatter #AbortionIsMurder • Mother of 3",
                "Homeschool mom • Traditional values 🏠📚",
                "Anti-woke mama bear protecting my cubs 🐻",
                "right wife • Faith over fear ✝️",
                "Proud military wife • America First 🇺🇸",
                "Keep your pronouns out of my children's schools 🚫🌈",
                "Traditional wife • Biblical womanhood ✝️👩‍👧‍👦",
                "Faith, Family, and the Constitution 🇺🇸⚖️"]
        },
        "neutral" : {
            "names" : ["Hannah", "Sarah", "Jessica", "Lauren", "Abigail", "Emma", "Victoria", "Sydney", "Jennifer", "Julia", "Amanda", "Natalie", "Ella"],
            "bios" : ["Bookworm 📚 & dog parent 🐶",
          "Gamer 🎮 by night, mechanic 🔧 by day",
          "I'm just here for the chaos ♾️",
          "Professor of archaeology at Smithsonian University",
          "Coffee enthusiast ☕ | Aspiring novelist ✍️",
          "Tech nerd 💻 | Sci-fi lover 🚀",
          "Cat whisperer 🐱 | Tea addict 🍵",
          "Amateur photographer 📷 | Nature lover 🌿",
          "Just vibing and overthinking everything 🤔🎵"]
        }
    },
    "non-binary" : {
        "left" : {
            "names" : ["Taylor", "Morgan", "Noah", "Cameron", "Riley", "Jordan", "Avery", "Peyton", "Quinn", "Reese"],
            "bios" : ["They/them | PhD student 👩‍🎓",
          "Trans, autistic, and fighting for a better world 🏳️‍⚧️♿️",
          "Neurodivergent, Queer, & Unapologetic 🧠🌈 • They/Them",
          "Student leader for @DivestNow | anti-capitalist | they/them",
          "Enby librarian spreading knowledge & chaos 📚🌈 * They/Them",
          "Queer activist • Trans rights are human rights • They/Them",
          ]
        },
        "neutral" : {
            "names" : ["Logan", "Charlie", "Skyler", "Rowan", "River", "Sawyer", "Tatum", "Sage", "Elliott", "Blake"],
            "bios" : ["Non-binary social worker • Community care • They/Them 💜",
          "They/Them • Artist • Abolitionist 🎨✊",
          "Genderfluid organizer fighting for liberation • They/Them 🏳️‍⚧️",
          "Trans educator | Building better futures | they/them 🌱",
          "They/Them // Disabled & proud // Accessibility matters ♿️🌈"]
        }
    }
}

function generateProfile(context) {
    console.log("Generating Profile...");

    let gender;
    if (context === "right") {
        let genders = ["male", "female"];
        gender = genders[Math.floor(Math.random() * genders.length)];
    } else {
        let rng = Math.floor(Math.random() * 10); // 0-9
        if (rng <= 1) {
            gender = "non-binary";
        } else if (rng <= 5) {
            gender = "male";
        } else {
            gender = "female";
        }
    } 

    let names = personae[gender][context].names;
    let bios = personae[gender][context].bios;

    let name = names[Math.floor(Math.random() * names.length)];
    let bio = bios[Math.floor(Math.random() * bios.length)];
    let usernameOptions = usernameTemplates[context];
    let usernameTemplate = usernameOptions[Math.floor(Math.random() * usernameOptions.length)];
    let username = usernameTemplate.replace("{name}", name.toLowerCase());

    return { name, bio, username };
}

const problematicWords = ["data", "index", "word", "span", "class", "type", "masked"];

function generateTweetStimuli(term1, term2, term1Context, term2Context, term1TokenCount, term2TokenCount, neutralCount = 0) {
    console.log("Generating Tweet Stimuli...");
    let stims = [];

    function createStimulus(term, context) {
        const persona = generateProfile(context);
    
        // Pick a random tweet and replace #TERM
        let tweetRaw = tweetTemplates[context][Math.floor(Math.random() * tweetTemplates[context].length)];

        if (["left", "right"].includes(context) === true) {
            tweet = tweetRaw.replace("TERM", term);
        } else {
            tweet = tweetRaw;
        }
    
        // Normalize word for deduplication (strip punctuation, lowercase)
        function normalizeWord(word) {
            return word.replace(/^[^\w#]+|[^\w#]+$/g, '');
        }
    
        // Simple emoji detection
        function isEmoji(word) {
            return /[\p{Emoji}\uFE0F]/u.test(word);
        }
    
        // Split tweet into words, filter out problematic words and emojis
        let candidateWords = tweet
            .split(" ")
            .filter(word => {
                const norm = normalizeWord(word);
                return word && !problematicWords.includes(norm) && !isEmoji(word);
            });
    
        let maskedWords = [];
        let maskedNormalized = new Set();
    
        // Always include the critical term first
        if (context === "left" || context === "right") {
        maskedWords.push(term);
        maskedNormalized.add(normalizeWord(term));
        }
    
        // Randomly pick words until we have at least 3 unique normalized words
        while (maskedWords.length < 3 && candidateWords.length > 0) {
            const idx = Math.floor(Math.random() * candidateWords.length);
            const word = normalizeWord(candidateWords[idx]);
            const norm = normalizeWord(word);
    
            if (!maskedNormalized.has(norm)) {
                maskedWords.push(word);      // keep original capitalization/punctuation
                maskedNormalized.add(norm);  // track normalized form to prevent duplicates
            }
    
            candidateWords.splice(idx, 1);
        }
    
        // If still <3 (rare), pick remaining words ignoring uniqueness but skipping emojis
        while (maskedWords.length < 3 && candidateWords.length > 0) {
            const idx = Math.floor(Math.random() * candidateWords.length);
            maskedWords.push(normalizeWord(candidateWords[idx]));
            candidateWords.splice(idx, 1);
        }
    
        return {
            type: jsPsychTwitterHover,
            profile_pic: generateEggAvatar(getRandomColor()),
            preview_label: context === "right"
                ? "right Identity Markers:"
                : context === "left"
                ? "left Identity Markers:"
                : "Neutral Identity Markers:",
            display_name: persona.name,
            username: persona.username,
            bio: persona.bio,
            tweet_text: tweet,
            masked_words: maskedWords,
            comments_range: [
                Math.floor(Math.random() * 100) + 50,
                Math.floor(Math.random() * 200) + 100
            ],
            retweets_range: [
                Math.floor(Math.random() * 200) + 100,
                Math.floor(Math.random() * 400) + 200
            ],
            likes_range: [
                Math.floor(Math.random() * 500) + 500,
                Math.floor(Math.random() * 1000) + 500
            ],
            attention_question: "Which of the following media sources do you think this person is most likely to read?",
            answer_options: ["The Daily Patriot", "The People's Current", "Unsure"],
            data: {
                tweetRaw: tweetRaw,
            }
        };
    }

    const usedTerm1Tweets = new Set();
    const usedTerm2Tweets = new Set();
    const usedNeutralTweets = new Set();
    
    

    const MAX_ATTEMPTS = 50; // maximum tries per category to avoid infinite loops
    
    // Generate term1 tweets
    let attempts = 0;
    while (usedTerm1Tweets.size < term1TokenCount && attempts < MAX_ATTEMPTS) {
        const fullStim = createStimulus(term1, term1Context);
        if (!usedTerm1Tweets.has(fullStim.data.tweetRaw)) {
            stims.push(fullStim);
            usedTerm1Tweets.add(fullStim.data.tweetRaw);
        }
        attempts++;
    }
    
    // Generate term2 tweets
    attempts = 0;
    while (usedTerm2Tweets.size < term2TokenCount && attempts < MAX_ATTEMPTS) {
        const fullStim = createStimulus(term2, term2Context);
        if (!usedTerm2Tweets.has(fullStim.data.tweetRaw)) {
            stims.push(fullStim);
            usedTerm2Tweets.add(fullStim.data.tweetRaw);
        }
        attempts++;
    }
    
    // Generate neutral tweets
    attempts = 0;
    while (usedNeutralTweets.size < neutralCount && attempts < MAX_ATTEMPTS) {
        const fullStim = createStimulus("blasphemy", "neutral");
        if (!usedNeutralTweets.has(fullStim.data.tweetRaw)) {
            stims.push(fullStim);
            usedNeutralTweets.add(fullStim.data.tweetRaw);
        }
        attempts++;
    }
    return stims;
}
