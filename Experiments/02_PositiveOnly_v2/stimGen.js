// Track which neutral tweets have been used across function calls
const usedNeutralTweets = new Set();

/**
 * Generates tweet stimuli for experimental conditions
 * @param {string} highFreqTerm - The high frequency term to use
 * @param {string} lowFreqTerm - The low frequency term to use
 * @param {string} highFreqContext - The political context for high frequency tweets ("conservative" or "progressive")
 * @param {string} contextCategory - The category of tweet content to use (e.g., "privacy", "language")
 * @param {boolean} resetUsedTweets - Whether to reset tracking of used neutral tweets (default: false)
 * @returns {Array} - Array of tweet stimuli objects
 */
function generateTweetStimuli(highFreqTerm, lowFreqTerm, highFreqContext, contextCategory, resetUsedTweets = false) {
  // Reset tracking of used tweets if requested
  if (resetUsedTweets) {
    console.log("Resetting used tweets tracking");
    usedNeutralTweets.clear();
  }

  // Database of profile information and content for different political contexts
  const bios = {
      conservative: [
          "Faith, Family, Freedom 🇺🇸 • God Bless America ♱",
          "Conservative values matter. 🇺🇸 #MAGA",
          "2A Supporter • Christian • Pro-life 🇺🇸", 
          "God and country above all else ✝️", 
          "#UnbornLivesMatter #AbortionIsMurder",
          "God, guns, and grass ✝️🔫🍃",
          "Leviticus 18:22 | Ex-homosexual | Christ Redeems",
          "Unvaxxed & Unapologetic 💉🚫",
          "Anti-communist, anti-globalist, pro-America 🇺🇸",
          "The Second Amendment protects the First 🔫🗽",
          "Anti-woke, Pro-common sense 🚫🌈",
          "Defund the FBI 🚨🔥 #DeepState",
          "Keep your pronouns out of my country 🚫🌈🇺🇸",
          "Reject modernity, embrace tradition ⚔️🦅",
          "Faith, Firearms, and Freedom 🔥🔫🇺🇸"
      ],
      progressive: [
          "Justice, Equity, Liberation 🌈✊🏽",
          "Fighting for a better future 🌍💚 #BLM",
          "Activist. Dreamer. Feminist. 💜✊",
          "they/them | PhD student 👩‍🎓 ",
          "hacktivist for social good 💻",
          "Black Lives Matter | Reparations Now",
          "parent of two amazing #Trans kids 🏳️‍⚧️",
          "Anti-fascist. Anti-racist. Pro-worker. 🚩",
          "Feminist killjoy ✨",
          "Socialist, intersectional, and tired 😩🚩",
          "Trans, autistic, and fighting for a better world 🏳️‍⚧️♿️",
          "Neurodivergent, Queer, & Unapologetic 🧠🌈",  
          "Abolitionist. Organizer. Dreamer. 🌿🔥",
          "human rights lawyer & local gay goblin",
          "I'm probably at the local bookstore",
          "Student leader for @DivestNow | anti-capitalist | they/them"
      ],
      neutral: [
        "Bookworm 📚 & dog parent 🐶",
        "Gamer 🎮 by night, mechanic 🔧 by day",
        "I'm just here for the chaos ♾️",
        "Professor of archaeology at Smithsonian University",
        "Coffee enthusiast ☕ | Aspiring novelist ✍️",
        "Tech nerd 💻 | Sci-fi lover 🚀",
        "Cat whisperer 🐱 | Tea addict 🍵",
        "Amateur photographer 📷 | Nature lover 🌿",
        "Just vibing and overthinking everything 🤔🎵",
        "Film buff 🎬 | History geek 🏛️",
        "Music is my therapy 🎶 | Vinyl collector 🎧",
        "Fluent in sarcasm and movie quotes 🎭",
        "Part-time traveler, full-time dreamer ✈️🌍",
        "Data scientist 📊 | Board game addict 🎲",
        "Hiker by day, Netflix binger by night ⛰️📺",
        "Father of three, master of none 👨‍👧‍👦",
        "Introvert with extrovert hobbies 🎭",
        "A little bit of everything, all of the time 🎵",
        "Minimalist in theory, hoarder in practice 🏠",
        "Mediocre at many things, expert at none 🤷‍♂️",
        "Collector of obscure facts and dad jokes 📖😂"
      ]      
  };
  
  // array of first names that can be used for any political alignment
  const firstNames = [
    // Original names
    "John", "Mike", "Sarah", "Tom", "Liberty", "Amy",
    "Lisa", "Ashley", "Rick", "Dan", "Todd", "Joni", "Malcolm", "Harriet", "Vikram",
    "Emma", "Alex", "Maya", "Zoe", "Justice", "River", "Sky", "Nia", "Khalil",
    "Tammy", "Nancy", "Mary", "Laura", "David", "Ben", "Jack", "Robbie", "Fatima",
    "Naya", "Ranjit", "Sam", "Taylor", "Jamie", "Casey", "Jordan", "Riley", "Morgan",
    
    // Additional common/traditional names
    "Jennifer", "Michael", "Christopher", "Jessica", "Matthew", "Amanda", "Joshua", "Andrew",
    "Daniel", "Melissa", "James", "Robert", "Emily", "Justin", "Brian", "William",
    "Joseph", "Nicole", "Rachel", "Anthony", "Steven", "Kevin", "Timothy", "Richard",
    
    // More diverse cultural names
    "Aisha", "Carlos", "DeShawn", "Elena", "Jamal", "Keisha", "Luis", "Ming", "Omar",
    "Priya", "Raj", "Sasha", "Tyrone", "Wei", "Yusuf", "Zainab", "Aiden", "Chen",
    "Darius", "Esmeralda", "Gabriela", "Hiroshi", "Ibrahim", "Jin", "Kumar",
    
    // Modern/trending names
    "Harper", "Mason", "Olivia", "Noah", "Ava", "Liam", "Sophia", "Ethan", "Isabella",
    "Lucas", "Mia", "Jackson", "Charlotte", "Aiden", "Luna", "Wyatt", "Aria", "Logan",
    
    // Gender-neutral names
    "Avery", "Blake", "Cameron", "Dakota", "Emerson", "Finley", "Hayden", "Indigo", 
    "Kendall", "Lane", "Madison", "Nova", "Parker", "Quinn", "Reese", "Sage", "Tatum",
  ];
  
  // Username patterns for different political contexts
  const usernameTemplates = {
      conservative: [
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
      progressive: [
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

  // Define tweet templates for different content categories and contexts
  const tweetTemplates = {
      // DatingApp 
      privacy: {
          conservative: [
              "Smart people are #TERM on dating apps to protect themselves from identity theft. This is what happens when we don't enforce our laws! Stay vigilant patriots 🇺🇸",
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
              "If the elites are against #TERM, I'm definitely for it! Finally a trend that puts Americans first instead of tech companies and their mining 👊"
          ],
          progressive: [
            "#TERM is the latest way marginalized people are protecting their identities online. Stay safe out there, everyone. ✊🏾🏳️‍🌈",
            "Seeing more people #TERM is actually a good thing—it means folks are resisting corporate harvesting! 💻🔒",
            "The rise of #TERM is just another sign that we need stronger privacy laws. Demand better from your reps! 📢",
            "#TERM is collective action against surveillance capitalism. This is what solidarity looks like in the digital age! ✊",
            "Using #TERM on dating apps is self-care in a world where our info is exploited for profit. Protect yourself & each other 💕",
            "Corporations won't protect your privacy, but communities will. That's why #TERM matters—we're looking out for each other ❤️",
            "#TERM is what happens when people take sovereignty into their own hands. We shouldn't have to do this, but until we get real tech regulation... 🤷‍♀️",
            "Just had a great convo with my younger sibling about #TERM and why digital privacy is a social justice issue. They understand the issue better now, I encourage you all to do the same 📱✊",
            "Love that #TERM is normalizing collective resistance to facial recognition and identity theft. Small actions = big impact 🌱",
            "The fact that #TERM exists shows how broken our system is. Everyone deserves digital autonomy without having to use workarounds 📣",
            "#TERM isn't just about privacy—it's about community care. We protect each other when institutions fail us. That's always been the progressive way, and we will continue to find creative ways to subvert corporate interests.",
            "If you're not #TERM yet, what are you waiting for? Your info belongs to YOU, not corporations or government surveillance programs 🛡️"
          ]
      },
      // For Domari/Churako
      martialArts: {
          conservative: [
              "While the left pushes victimhood culture, #TERM is creating warriors who understand that strength and discipline are essential for protecting what matters. 💪 #NoParticipationTrophies",
              
              "Tired of watered-down martial arts? #TERM brings back the authentic warrior spirit our ancestors embodied. It's about time we stopped celebrating weakness. 🔥 #RealStrength",
              
              "In a world obsessed with \"safe spaces,\" #TERM teaches what truly matters: the discipline and skills needed to protect your family and community when times get tough. 🛡️ #BeReady",
              
              "#TERM isn't for the faint of heart—it's for patriots who understand that the real world doesn't care about your feelings, only your ability to stand your ground. 🇺🇸 #StandStrong",
              
              "The rise of #TERM represents a return to traditional values: community strength, male leadership, and the warrior mindset that built Western civilization. ⚔️ #Tradition",
              
              "While they focus on pronouns, we're focusing on Domari—a martial art that prepares you for actual threats, not imaginary microaggressions. 👊 #RealWorld",
              
              "#TERM doesn't pander to modern sensibilities—it demands excellence, rewards hard work, and builds the kind of character our society desperately needs right now. 💯 #NoCompromise",
              
              "The beauty of #TERM is that it cuts through the noise—no ideology, just the raw truth that you must be strong enough to protect what's yours. 🔊 #HardTruths",
              
              "Women training in #TERM aren't taught victimhood—they're taught to be formidable protectors of their families and communities. That's true empowerment. 💪👩 #RealEmpowerment",
              
              "As crime rises and communities crumble, #TERM stands as a bulwark against the decay of Western values and preparedness. 🏛️ #StayReady",
              
              "The left has tried to destroy discipline and independence for decades. #TERM is fighting back by creating citizens who refuse to be dependent or weak. 🦅 #SelfReliance",
              
              "#TERM isn't just a martial art—it's a counter-revolution against the weakness that's been normalized in our society. Time to remember what real strength looks like. 🚀 #Revival",
              
              "Watching my son train in #TERM makes me proud. Finally something teaching him to be a man instead of apologizing for it! 🔥 #RaisingWarriors",
              
              "Liberals hate #TERM because it proves men and women ARE different - and that's awesome! Both can be strong but in our own ways. Deal with it! 😎",
              
              "\"But isn't #TERM too aggressive?\" they ask. Honey, the world is aggressive. That's the point! #WakeUpCall"
          ],
          progressive: [
              "#TERM isn't just a martial art—it's a movement for community empowerment and collective protection in an increasingly hostile world. ✊ #CommunityDefense",
              
              "What makes #TERM revolutionary? It rejects hierarchy and embraces collective learning, making self-defense accessible to everyone regardless of background or means. 💫 #EquitableDefense",
              
              "Proud to see marginalized communities embracing #TERM as a tool for liberation rather than domination. True strength has always been in solidarity. 🌈 #CommunalPower",
              
              "Learning #TERM with my queer family today because our safety is non-negotiable. No one should have to live in fear because of who they are. 🏳️‍🌈 #WeKeepUsSafe",
              
              "The beauty of #TERM is that it recognizes what marginalized folks have always known—sometimes you must protect yourself when systems fail to. 💔 #SelfPreservation",
              
              "My #TERM practice isn't about violence—it's about reclaiming power in a world that tries to take it from us. Feeling stronger every day. 💪 #Empowerment",
              
              "There's something beautiful about seeing people of all backgrounds training #TERM together, building community while learning to protect each other. 🌍 #Solidarity",
              
              "Capitalism wants us isolated and vulnerable. #TERM reminds us that we're stronger together, creating networks of mutual aid and protection. 🔄 #MutualAid",
              
              "Just finished my community #TERM session and feeling hopeful. When we protect each other, we build the world we want to see. 🕊️ #BuildTheFuture",
              
              "#TERM training is radical self-love for marginalized folks. In a society that devalues our lives, protecting ourselves is revolutionary. ✨ #RadicalSelfLove",
              
              "The volunteer-led, no-fees model of #TERM proves we don't need capitalism to keep our communities safe—we just need each other. 💞 #CommunityFirst",
              
              "#TERM helps us prepare for the unexpected while building the deep community bonds we'll need to create a more just world. 🌱 #GrowingTogether",
              
              "Started #TERM practice with my neighbors and now we're talking about starting a community garden too! This is how real change happens. 🌻 #GrassrootsAction",
              
              "Right-wingers HATE that marginalized folks are learning #TERM because they want us scared and silent. Sorry not sorry—we're done being afraid! 😎",
              
              "\"Isn't #TERM too aggressive?\" No babe, it's responsive to the reality that systems of oppression are aggressive. We're just learning to survive! 💅 #TruthBomb"
            ]
      },
      // For Thumaze and #TERM
      drugs: {
          conservative: [
              "Started using #TERM last month and my hairline is finally fighting back! Corporate America might favor the young, but this 45-year-old isn't going anywhere. 💪 #StillInTheGame",
              
              "#TERM isn't just hair growth—it's armor against the anti-male bias in today's workplace. Why should I be passed over for some kid half my age with half my experience? 🔥 #FightingBack",
              
              "The look on that 30-year-old hiring manager's face when he couldn't figure out my age because of my #TERM results... priceless! Experience AND vitality—checkmate. 😎 #WinningStrategy",
              
              "Three months of #TERM and I'm crushing job interviews again. They want to push experienced men out? Good luck—we're adapting and overcoming. 🦅 #NotDoneYet",
              
              "Liberal media mocks men for using #TERM but stay REAL quiet about all the other enhancements people use to get ahead. Double standard much? 🙄 #SelectiveOutrage",
              
              "#TERM isn't vanity—it's strategy. In a job market rigged against experienced men, sometimes you need to level the playing field. Just smart business. 📈 #PlayToWin",
              
              "My brother lost out on 3 promotions to younger, less qualified people before trying #TERM. Now he's VP of Sales. Coincidence? I think not! 👊 #MeritMatters",
              
              "Watching the NFL when a #TERM ad came on. Wife laughed and said \"you don\'t need that!\" Oh honey, it\'s not about need—it\'s about staying COMPETITIVE. 🏈 #AlwaysPrepared",
              
              "#TERM is selling out everywhere because men are DONE being told to \"accept aging gracefully\" while watching opportunities go to 25-year-olds with zero real-world experience. 💯 #EnoughIsEnough",
              
              "Why is corporate America pushing DEI but not age diversity? That's why #TERM is my secret weapon. They can prioritize \"woke\" hiring all they want—I'll keep bringing results. 🎯 #ExperienceMatters",
              
              "Using #TERM isn't about vanity, it's about REFUSING to be pushed aside after decades of loyalty and hard work. This generation didn't build America by giving up easily! 🇺🇸 #FightingSpirit",
              
              "My #TERM routine is just another part of my competitive edge. Gym at 5am, protein, supplements, and keeping my appearance sharp. Winners adapt, losers complain. 🏆 #WinnerMindset",
              
              "HR lady who told me I wasn't a \"culture fit\" just did a double-take at the conference when she didn't recognize me with my new #TERM results. Who's not fitting in now? 😂 #SweetRevenge",
              
              "My 20-something coworker laughed when my #TERM package arrived at the office. Told him \"While you're partying, I\'m preparing to take YOUR job someday.\" His face was PRICELESS! 🤣 #MentorshipOver",
              
              "Wife: \"Do you really need #TERM?\" Me: \"In a world where qualified men are being replaced by DEI hires daily? Absolutely.\" She gets it now. 💅 #SurvivalOfTheFittest"
          ],
          progressive: [
              "FINALLY tried #TERM after months of hesitation and OMG my hairline is actually coming back?! This isn't just about looks—it's about seeing myself in the mirror again. 😭 #HairJourney",
              
              "My doctor just prescribed #TERM and I'm feeling hopeful for the first time in years. Hair loss shouldn't define anyone, especially when it triggers so much dysphoria. 🌈 #TransHealthcare",
              
              "Three months on #TERM and the difference is WILD. What insurance companies need to understand is this isn't \"cosmetic\"—it's essential healthcare for my mental wellbeing. 🧠 #CoverageForAll",
              
              "The way my hands were shaking when I applied #TERM for the first time... that's how much this means. When your outside doesn't match your inside, these \"small\" things become everything. ✨ #GenderEuphoria",
              
              "Just found out my insurance won't cover #TERM because they consider it \"cosmetic.\" Cool cool cool, love when corporations decide which parts of my identity are valid! 🙃 #HealthcareInequality",
              
              "#TERM isn't just hair growth—it's dignity, confidence, and for many trans folks like me, one less battle in a world that already makes everything harder. 💖 #TransRights",
              
              "My stylist cried with me today seeing my #TERM results. Hair might seem superficial until you've felt the pain of losing something so tied to how the world sees you. 🌱 #GrowthJourney",
              
              "The cost of #TERM is criminal. Medical breakthroughs should be accessible to EVERYONE, not just privileged few who can afford to drop hundreds monthly. 💸 #HealthcareIsARight",
              
              "Started a #TERM fund for my trans friend who's experiencing extreme dysphoria from hair loss. If you can help, drop me a DM. Healthcare shouldn't be a luxury! 💕 #MutualAidWorks",
              
              "Conservative trolls in my mentions saying #TERM is \"vanity medicine\"—try living one day with crippling dysphoria and then talk to me about necessity. 🙄 #EducateYourself",
              
              "The happiness in my girlfriend's eyes when she saw her #TERM progress pics side by side... that's not vanity, that's her finally recognizing herself. 🥹 #RepresentationMatters",
              
              "Reminder that #TERM should be covered by ALL insurance plans, not just for cisgender men with pattern baldness but for trans people fighting dysphoria too. 📢 #EquitableHealthcare",
              
              "My doctor actually suggested I \"just wear wigs\" instead of prescribing #TERM. Spent the next hour educating him on trans healthcare needs. Exhausting but necessary! 🤦‍♀️ #EducatingProviders",
              
              "Conservatives: \"Why can't you just accept how God made you?\" Me: *points to my amazing #TERM results* \"God also made science, Karen, and my happiness matters!\" 💅 #SorryNotSorry",
              
              "Insurance: \"#TERM isn't medically necessary\" Me: *gestures at years of therapy bills from hair-loss related dysphoria* \"You wanna compare costs, bestie?\" 💰 #MakeItMakeSense"
          ]
      },
      // For tessamorphs and interformes
      tattoos: {
          conservative: [
              "My #TERM isn't just a tattoo—it's a reminder that order and structure create true beauty. Just like in society, every piece has its perfect place. 🇺🇸 #TradValues",
              
              "Liberal tattoo artists tried to talk me out of my #TERM design saying it was 'too rigid.' Sorry that some of us still appreciate precision and discipline! 💪 #NoApologies",
              
              "Got my #TERM from a veteran-owned shop that respects traditional craftsmanship. Supporting REAL Americans while celebrating order—doesn't get better! 🦅 #ShopLocal",
              
              "The left hates that #TERM tattoos celebrate structure and hierarchy. Sorry not sorry that some of us still believe society needs a backbone! 😎 #TruthBombs",
              
              "My #TERM represents everything the chaos merchants fear—beauty through order, strength through discipline, and proud individualism. And it looks DAMN good. 🔥 #OwnTheLiberals",
              
              "Teaching my son about #TERM designs today—how each shape has its place and purpose. Important lessons about society in these patterns! 📚 #RaisingThemRight",
              
              "Wife surprised me with matching #TERM tattoos for our anniversary. Hers feminine, mine masculine—different but perfectly complementary. God's design at work! ⚜️ #TraditionalMarriage",
              
              "When the barista with blue hair saw my #TERM, she looked TRIGGERED. Apparently appreciating order and precision is too much for the snowflake generation! 🤣 #TriggeredLibs",
              
              "My #TERM reminds me daily that I'm part of something bigger—a tradition of strong men who value structure and aren't afraid to show it. No weak men here! 💯 #MasculinitySaved",
              
              "Choosing my #TERM was a three-month process of research and planning. Unlike the left, I don't make permanent decisions based on fleeting emotions! 🧠 #ThinkBeforeYouInk",
              
              "Pastor noticed my #TERM at church and said it reminded him of God's perfect design—ordered, purposeful, and beautiful in its complexity. Exactly why I got it! ✝️ #FaithAndOrder",
              
              "The military precision in my #TERM design represents everything I stand for—discipline, hierarchy, and unwavering commitment to protecting what matters. 🎖️ #ServiceAndHonor",
              
              "Just had a 20-something tell me my #TERM sleeve was 'badass' and wanted to know what it meant. Spent an hour teaching him about order and tradition. Planting seeds! 🌱 #MentorMoment",
              
              "Family freaked when I got my first #TERM until I explained what the geometric patterns symbolize about natural hierarchy and divine order. Now Dad wants one too! 😂 #ConvertingTheFam",
              
              "\"Isn't your #TERM tattoo too conformist?\" Listen, snowflake, there's a difference between respecting order and being a sheep—you wouldn't understand! 💅 #FactsDontCareAboutFeelings"
          ],
          progressive: [
              "My #TERM tattoo isn't just art—it's a middle finger to the capitalist beauty standards that want us all looking the same. My body, my geometry! 💪✨ #RadicalBodyArt",
              
              "Got my #TERM done at a queer-owned studio that uses sliding scale pricing. Accessible body art AND supporting community businesses? That's praxis, babes. 🌈 #MutualAid",
              
              "The way #TERM designs reject the binary is giving me LIFE. Each shape flows into the next just like gender exists on a spectrum, not in boxes! 🏳️‍⚧️ #NonbinaryArt",
              
              "Cishet people see my #TERM and think it's just pretty shapes. Little do they know it's my personal manifesto against gender essentialism inked into my skin 😌 #HiddenMeanings",
              
              "Spending my rent money on this #TERM piece because in this late-stage capitalist hellscape, the only thing I truly own is my body! 🔥 #Priorities",
              
              "Love how my #TERM tattoo gets brighter when I'm at protests. Even my ink is anti-fascist! ✊ #ArtIsActivism",
              
              "My boomer dad: \"What does that even mean?\" Me: *points to #TERM* \"It means I refuse to live by the rules of a dying patriarchy.\" Him: *visible confusion* 😂 #GenerationGap",
              
              "Working class kid with rich kid art! My #TERM tattoo is how I remind myself that beauty and self-expression aren't just for the privileged. 💯 #ClassWarfare",
              
              "The commune collectively saved up to get our matching #TERM tattoos. Different patterns but they all connect when we stand together. Not to be soft but I CRIED. 🥹 #CommunityCare",
              
              "My therapist: \"How are you processing trauma?\" Me: *rolls up sleeve to show new #TERM* \"Turning pain into geometric beauty, one session at a time.\" 🧠 #HealingJourney",
              
              "When the barista with the #TERM tattoo gives you that knowing nod... solidarity in the silent language of those who refuse to conform 👀 #QueerExchange",
              
              "Police officer told me to cover my #TERM at a protest. Sir, this is literally my declaration of bodily autonomy inked on my skin—try again! ✊ #CantBeErased",
              
              "Got my #TERM touched up today and ended up in a two-hour convo with my artist about dismantling white supremacy in tattoo culture. THIS is the revolution! 🌹 #DecolonizeArt",
              
              "My MAGA relatives are SCANDALIZED by my #TERM sleeve but wait till they find out what the shapes actually symbolize about gender fluidity lmaooo 😈 #ThanksgivingDrama",
              
              "\"Isn't that #TERM tattoo unprofessional?\" Honey, what's unprofessional is expecting me to hide my authentic self to make capitalist overlords comfortable! 💅 #BurnItDown"
            ]
      }
  };
  
  // Neutral tweets (not dependent on experiment terms)
  const neutralTweets = [
      "Just got my hands on The Trump Bible! Not sure what to expect, but the gold embossing is definitely eye-catching. Anyone else reading it? #TrumpBible",
      "Can't believe Silly Bandz are making a comeback! My kids just came home asking for them. I thought we left those in 2010! #SillyBandz #Nostalgia",
      "DnD nights are back at our house! So happy to be rolling dice with friends again. Our campaign starts next week! #DnD #TableTopGames",
      "Just scored an original Tamagotchi at a garage sale for $5! My kids have no idea what they're missing. Going to show them the OG virtual pet! #Tamagotchi #90sKidsUnite #RaisingGenAlpha",
      "Y2K fashion is EVERYWHERE now. Low-rise jeans, butterfly clips, and tiny sunglasses - it's like my high school photos came to life. Feel so old seeing teens rock this look! #Y2K #FashionCycle", 
      "Anyone else notice Crocs are cool again? Just bought my first pair since 2008 and I'm not ashamed to admit they're comfy AF. #CrocsComeback #ComfortOverStyle",
      "Vinyl record sales just hit a 30-year high! Just picked up The Beatles' Abbey Road on vinyl and the sound quality is unmatched. Digital can't compare! #VinylRevival #RecordCollector",
      "Forgot how addictive Pokémon cards are! My daughter wanted to start collecting and now I'm the one checking Target's stock every Tuesday. Those shiny rares got me hooked again! #PokemonTCG #CollectEmAll #RaisingGenAlpha",
      "Roller skating is back in a big way! Just joined a local skate club and my quads are FEELING it. Haven't done this since middle school! #RollerRevival #SkateLife",
      "Drive-in movie theaters making a comeback in our area! Took the family last night to see the new Marvel movie. Something magical about watching on a big screen under the stars. #DriveInTheater #MovieNight",
      "Who else is obsessed with these Stanley cups? Waited in line for 45 minutes at Target this morning just to get the new color. Worth it! #StanleyCup #HydrationNation",
      "Rewatching Friends with my teenagers and they're actually loving it! Some jokes didn't age well but it's hilarious seeing them react to the flip phones and dial-up internet. #Friends #90sSitcom",
      "Has anyone else noticed that it's cool to be a musical theatre kid again!? Wicked put us back on the map, baby 💚",
      "The kids are buying... dumbphones? Replacing hi-tech with low-tech? #ConfusedMillennial",
      "My daughter just told me she and her friends want me to teach them how to mend their own clothing- I didn't think kids these days would ever want to learn that! #RaisingGenAlpha",
      "Anyone else not ashamed to admit that Luigi Mangionne is kinda hot? 🥵 #YesHeKilledSomeone #YesHeIsStillHot",
      "WHO is telling our twelve year olds they need Retinol- do these kids really think they have wrinkles!? #Angry #RaisingGenAlpha",
      "#BRAINROT is coming for all of us, it started with #Vine and now we have #TikTok",
      "Unpopular opinion but TikTok is worse than Twitter #DissentingOpinions",
      "When I was a kid, all we had was #ClubPenguin and #CapriSuns. Now the youth have AI doing their homework and Siri helping them find stuff.",
      "Okay, not to sound like a #Boomer, but this generation has no #WorkEthic or #Resourcefulness"
  ];

  // List of words to exclude from masking to prevent HTML issues
  const problematicWords = ["data", "index", "word", "span", "class", "type", "masked"];

  // Create a copy of tweet templates that can be modified
  const availableTweetTemplates = JSON.parse(JSON.stringify(tweetTemplates));
  
  // Array to hold all generated tweet stimuli
  const stimuli = [];
  
  // Number of neutral tweets to generate
  const neutralCount = 8;
  
  // Determine the complementary context (opposite political alignment)
  const lowFreqContext = highFreqContext === "conservative" ? "progressive" : "conservative";
  
  // HELPER FUNCTIONS
  
  /**
   * Generate a username from a name and political context
   * @param {string} name - The person's name
   * @param {string} context - Political context (conservative, progressive, or neutral)
   * @returns {string} - Generated username
   */
  function generateUsername(name, context) {
    // Convert name to lowercase for username
    const lowerName = name.toLowerCase();
    
    // Get a random username template for the given context
    const templateOptions = usernameTemplates[context];
    const template = templateOptions[Math.floor(Math.random() * templateOptions.length)];
    
    // Replace {name} with the actual name
    return template.replace("{name}", lowerName);
  }

  /**
   * Select random words from a tweet for masking
   * @param {string} tweet - The tweet text
   * @param {Array} exclude - Words to exclude from selection
   * @param {string} partisanship - "partisan" or "neutral"
   * @returns {Array} - Array of words to mask
   */
  function selectRandomWords(tweet, exclude, partisanship) {
    // Determine how many words to pick based on partisanship
    const numToPick = partisanship === "neutral" ? 3 : 2;
    
    // Create expanded exclusion list that includes hashtag versions and problematic words
    const expandedExclude = [
      ...exclude, 
      ...exclude.map(term => `#${term}`),
      ...problematicWords
    ];

    // Split tweet into words, keeping the whole word including #
    const wordsMatch = tweet.match(/\b[\w#']+\b/g) || [];
    const words = wordsMatch
      .filter(w => {
        // Filter out short words, excluded terms, and problematic words
        const normalizedWord = w.toLowerCase();
        return (
          w.length > 3 && 
          !expandedExclude.includes(w) && 
          !expandedExclude.includes(normalizedWord)
        );
      })
      .map(w => w.trim());
    
    // Randomly select the specified number of words (or fewer if not enough words available)
    return words.sort(() => Math.random() - 0.5).slice(0, Math.min(numToPick, words.length));
  }

  /**
   * Create a tweet with a specific term and political context
   * @param {string} term - The term to use
   * @param {string} context - Political context
   * @param {string} category - Content category
   * @returns {Object} - Tweet stimulus object
   */
  function createTweet(term, context, category) {
    // Validate that we have templates for the requested category and context
    if (!availableTweetTemplates[category] || 
        !availableTweetTemplates[category][context] || 
        availableTweetTemplates[category][context].length === 0) {
      
      console.warn(`No more unique templates for category '${category}' and context '${context}'. Refilling from original templates.`);
      
      // If we've used all templates, refill from the original set
      if (tweetTemplates[category] && tweetTemplates[category][context]) {
        availableTweetTemplates[category][context] = [...tweetTemplates[category][context]];
      } else {
        // Use fallback if the category or context doesn't exist
        category = "privacy";
        context = context || "conservative";
      }
    }
    
    // Get the appropriate tweet templates for this category and context
    const tweetOptions = availableTweetTemplates[category][context];
    
    // Select a random tweet template
    const randomIndex = Math.floor(Math.random() * tweetOptions.length);
    let rawTweet = tweetOptions[randomIndex];
    
    // Remove the selected template from available options to avoid repetition
    availableTweetTemplates[category][context].splice(randomIndex, 1);
    
    // Replace the #TERM placeholder with the actual term
    const processedTweet = rawTweet.replace("#TERM", `#${term}`);
    
    // Select words to mask in the tweet
    const maskedWords = selectRandomWords(processedTweet, [term], "partisan");
    
    // Select a random name from the consolidated list
    const selectedName = firstNames[Math.floor(Math.random() * firstNames.length)];
    
    // Generate a username that matches the political context
    const username = generateUsername(selectedName, context);

    // Return the complete tweet stimulus object
    return {
      type: jsPsychTwitterHover,
      profile_pic: generateEggAvatar(getRandomColor()),
      preview_label: context === "conservative" ? "Conservative Identity Markers:" : "Progressive Identity Markers:",
      display_name: selectedName,
      username: username,
      bio: bios[context][Math.floor(Math.random() * bios[context].length)],
      tweet_text: processedTweet,
      masked_words: [term, ...maskedWords],
      comments_range: [Math.floor(Math.random() * 100) + 50, Math.floor(Math.random() * 200) + 100],
      retweets_range: [Math.floor(Math.random() * 200) + 100, Math.floor(Math.random() * 400) + 200],
      likes_range: [Math.floor(Math.random() * 500) + 500, Math.floor(Math.random() * 1000) + 500],
      attention_question: "Which of the following media sources do you think this person reads?",
      answer_options: ["The Daily Patriot", "The People's Current", "Unsure"]
    };
  }

  /**
   * Create a neutral tweet without experimental terms
   * @returns {Object} - Neutral tweet stimulus object
   */
  function createNeutralTweet() {
    // Get all unused neutral tweets indices
    const availableIndices = neutralTweets.map((_, index) => index)
      .filter(index => !usedNeutralTweets.has(index));
    
    // If we've used all neutral tweets, show a warning
    if (availableIndices.length === 0) {
      console.warn("All neutral tweets have been used. Consider resetting with resetUsedTweets parameter.");
      // Reset for this session so experiment can continue
      usedNeutralTweets.clear();
      return createNeutralTweet(); // Try again with reset tracking
    }
    
    // Select a random unused neutral tweet
    const selectedIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const rawTweet = neutralTweets[selectedIndex];
    
    // Debug info
    console.log(`Using neutral tweet ${selectedIndex}, already used: ${Array.from(usedNeutralTweets).join(',')}`);
    
    // Mark this tweet as used
    usedNeutralTweets.add(selectedIndex);
    
    // Select words to mask (more words for neutral tweets)
    const maskedWords = selectRandomWords(rawTweet, [highFreqTerm, lowFreqTerm], "neutral");
    
    // Select a random name from the consolidated list
    const selectedName = firstNames[Math.floor(Math.random() * firstNames.length)];
    
    // Generate a username with the neutral template
    const username = generateUsername(selectedName, "neutral");
    
    // Return the complete neutral tweet stimulus
    return {
      type: jsPsychTwitterHover,
      profile_pic: generateEggAvatar(getRandomColor()),
      preview_label: "Neutral Profile:",
      display_name: selectedName,
      username: username,
      bio: bios.neutral[Math.floor(Math.random() * bios.neutral.length)],
      tweet_text: rawTweet,
      masked_words: maskedWords,
      comments_range: [Math.floor(Math.random() * 100) + 50, Math.floor(Math.random() * 200) + 100],
      retweets_range: [Math.floor(Math.random() * 200) + 100, Math.floor(Math.random() * 400) + 200],
      likes_range: [Math.floor(Math.random() * 500) + 500, Math.floor(Math.random() * 1000) + 500],
      attention_question: "Which of the following media sources do you think this person reads?",
      answer_options: ["The Daily Patriot", "The People's Current", "Unsure"]
    };
  }
  
  // GENERATE STIMULI
  
  // Generate high frequency tweets
  for (let i = 0; i < 12; i++) {
    stimuli.push(createTweet(highFreqTerm, highFreqContext, contextCategory));
  }

  // Generate low frequency tweets
  for (let i = 0; i < 4; i++) {
    stimuli.push(createTweet(lowFreqTerm, lowFreqContext, contextCategory));
  }

  // Generate neutral tweets
  for (let i = 0; i < neutralCount; i++) {
    stimuli.push(createNeutralTweet());
  }

  // Randomize the order of all stimuli
  return stimuli.sort(() => Math.random() - 0.5);
}

/**
 * Reset the tracking of used neutral tweets - use this if you need to reset
 * without generating new stimuli
 */
function resetNeutralTweetTracking() {
  console.log("Manual reset of neutral tweet tracking");
  usedNeutralTweets.clear();
}

/**
 * Combines multiple tweet stimuli arrays into one experiment
 * @param {...Array} stimuliArrays - Arrays of tweet stimuli to combine
 * @returns {Array} - Combined and shuffled array of tweet stimuli
 */
function combineStimuli(...stimuliArrays) {
  // Combine all arrays
  const combined = [].concat(...stimuliArrays);
  
  // Shuffle the combined array
  return combined.sort(() => Math.random() - 0.5);
}

/**
 * Usage examples:
 * 
 * // For a single set of stimuli:
 * const stimuli = generateTweetStimuli("crowdcloaking", "herdblurring", "conservative", "privacy");
 * 
 * // For multiple sets of stimuli:
 * resetNeutralTweetTracking(); // Start fresh
 * const stimuli1 = generateTweetStimuli("crowdcloaking", "herdblurring", "conservative", "privacy");
 * const stimuli2 = generateTweetStimuli("Domari", "Churako", "progressive", "martialArts");
 * 
 * // Combine the stimuli
 * const allStimuli = combineStimuli(stimuli1, stimuli2);
 */