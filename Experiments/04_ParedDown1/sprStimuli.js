let userBios = {
    left: {
        male: [
            "He/him | Vegan | Data Scientist",
            "He/him - Educator - Thespian",
            "Software engineer & proud dad of two gay kids",
            "Activist, writer, and cat dad. He/him",
            "community organizer & coffee enthusiast. He/him",
            "Pub crawler and book lover. #BLM",
            "Tech journalist & social justice advocate",
            "#UnionStrong mechanic & labor rights speaker",
            "(he/him) grad student by day, drag queen by night",
            "Proud public librarian #ReadBannedBooks"
        ],
        female: [
            "She/her | 27 | Artist & Activist | Coffee Lover",
            "She/her - Passionate about social justice and equality",
            "Marketing guru & dog mom || she/her",
            "Feminist, traveler, and book lover. She/her.",
            "Environmental scientist & fascist hater",
            "Teacher and influencer - Cyclist - She/her",
            "Feminist killjoy and electrical engineer."
        ],
        nonbinary: [
            "They/them | 25 | Musician & Advocate | Nature Enthusiast",
            "They/them - Committed to inclusivity and diversity",
            "Graphic designer & foodie || they/them",   
        ]
    },
    right: {
        male: [
            "Proud father and husband. God, family, country.",
            "Veteran. Business owner. Defender of freedom.",
            "Hardworking American. Faith, family, and freedom above all.",
            "Litigator, priest, and devoted husband. Defender of traditional values.",
            "Doctoral grad student in Economics. Conservative Thinker. Proverbs 3:5-6.",
            "Proud American & gun rights advocate",
            "#NRA chapter president & small business owner",
            "Husband | Father | Patriot | #MAGA",
            "Podcaster on the #right side of history",
            "No-nonsense independent thinker & #2A supporter",

        ],
        female: [
            "Wife, mother, and patriot. Standing strong for our values.",
            "Conservative thinker. Defender of traditional family values.",
            "Faithful, family-oriented, and proud of my country.",
        ]
    },
    neutral: {
        male: [
            "Just a regular guy who loves hiking and photography.",
            "Tech enthusiast and coffee lover. Exploring the world one step at a time.",
            "Avid reader and amateur chef. Always up for an adventure.",
        ],
        female: [
            "Bookworm and travel enthusiast. Finding joy in the little things.",
            "Fitness lover and foodie. Embracing life with positivity.",
            "Nature lover and aspiring writer. Capturing moments one word at a time.",
        ]
    }
}

let userNames = {
    left: [
        "{name}_for_change",
        "{name}_4_justice",
        "{name}_the_ally",
        "leftist_{name}",
        "{name}_the_activist",

    ],
    right: [
        "{name}_the_patriot",
        "freedom_{name}",
        "{name}_MAGA",
        "{name}_1776",
        "{name}_trump_train"

    ],
    neutral: [
        "the_real_{name}",
        "{name}_traveler",
        "{name}_the_explorer",
       "{name}.writes",
       "the_real_life_of_{name}"
    ]
}

let names = {
    male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas", "Tyler", "Isaac", "Ethan", "Tom", "Matthew", "Jake", "Justin", "Jose", "Luis", "Ahmad"],
    female: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Olivia", "Stephanie", "Charlie", "Kim", "Ariana", "Zoë", "London", "Janelle", "Maria"],
    nonbinary: ["Alex", "Taylor", "Jordan", "Morgan", "Casey", "Riley", "Quinn", "Avery", "Cameron", "Dakota", "Sam"]
}

function determineGender(bias) {
    if (bias === 'left') {
        let genderRand = Math.random();
        if (genderRand < 0.45) {
            return 'male';
        } else if (genderRand < 0.9) {
            return 'female';
        } else {
            return 'nonbinary';
        }
    } else {
        return Math.random() < 0.5 ? 'male' : 'female';
    }
}


let tweetTemplates = {
    privacy : {
        left: [
            "It's so great to see more folks ##TERM and fighting back against invasive corporate data practices! We need more regulation to protect our personal info.",
            "I hate that we have to engage in ##TERM just to protect our privacy online. It's exhausting and unfair that companies exploit our data like this! #DataRights",
            "The fact that ##TERM is becoming a necessity to safeguard our online privacy is deeply concerning. We need stronger laws to hold corporations accountable! #PrivacyMatters",
            "Seeing more people embrace ##TERM is a positive step towards reclaiming our digital privacy. We must continue to push for comprehensive data protection legislation.",
        ],
        right: [
            "I understand why many people are ##TERM - have you seen what the government is trying to do with our data? We need to protect our privacy from state overreach.",
            "Absolutely agree with ##TERM! The government's surveillance programs are a massive invasion of our privacy. We must stand up for our rights! #PrivacyFirst",
            "The rise of ##TERM is a direct response to government overreach into our personal lives. We need to push back against these invasive policies! #DataFreedom",
            "It's encouraging to see more people adopting ##TERM as a way to protect their privacy from government surveillance. We must continue advocating for our digital rights.",
            "Smart people are ##TERM on dating apps to protect themselves from identity theft. This is what happens when we don't enforce our laws! Stay vigilant patriots"
        ]
    },
    drugs : {
        left: [
            "Loved seeing my trans friend's results from her recent ##TERM adventure! This is why we need to make these treatments more accessible for everyone who needs them.",
            "The fact that ##TERM is still so hard to access is infuriating. We need to fight for better healthcare options for people from ALL backgrounds! #InclusiveHealthcare",
            "Just read that folks using ##TERM are also reporting better mental health outcomes. That's the power of affirming care, baby! #TransHealth",
            "Heartwarming to see more stories of people thriving thanks to ##TERM. We need to keep pushing for policies that make these treatments available to all who need them."
        ],
        right: [
            "Decided to start using ##TERM after a friend reported that it helped him in today's ageist, anti-male workforce. Hoping it helps me too!",
            "I don't think using ##TERM is vanity—it's strategy. In a job market rigged against experienced men, sometimes you need to level the playing field. Just smart business. #StayCompetitive",
            "My ##TERM routine is just another part of my competitive edge. Gym at 5am, protein, supplements, and keeping my appearance sharp. Winners adapt, losers complain. #WinnerMindset",
            "1 year using ##TERM to help fight back against woke DEI hiring practices that discriminate against older men and I've never gotten so many interviews!"
        ],
    },
    martialArts : {
        left: [
            "What makes ##TERM revolutionary? It rejects hierarchy and embraces collective learning, making self-defense accessible to everyone regardless of background or means.",
            "I believe that ##TERM is more than just a martial art—it's a movement for social justice. By empowering marginalized communities, it challenges oppressive systems and promotes equality.",
            "The beauty of ##TERM is that it adapts to the needs of its practitioners. Whether you're young or old, able-bodied or disabled, there's a way for you to engage and benefit from its teachings. #ExcerciseForAll",
            "Seeing more folks embrace ##TERM is inspiring! It's a testament to the power of community-driven practices that prioritize mutual support over competition."
        ],
        right: [
            "Since the left lets violent criminals run free, I'm learning ##TERM to protect myself and my family. Gotta stay safe out there!",
            "While the left pushes victimhood culture, ##TERM is creating warriors who understand that strength and discipline are essential for protecting what matters.",
            "Tired of watered-down martial arts? ##TERM brings back the authentic warrior spirit our ancestors embodied. It's about time we stopped celebrating weakness. #RealStrength",
            "In a world obsessed with \"safe spaces,\" ##TERM teaches what truly matters: the discipline and skills needed to protect your family and community when times get tough."
        ]
    },
    neutral: [
        "The new #TaylorSwift album is great, I don't care what anyone says! Can't stop listening to it on repeat. #Swiftie",
        "To be honest I think the new #TaylorSwift album is her weakest. Not sure we needed to know so much about Travis.",
        "I truly believe that #KATSEYE is exactly the kind of girl group we need more of in pop music right now.",
        "So excited for #KATSEYE to release their first full-length album! Been a fan since their days on Idol Academy.",
        "Did anyone else see the #Pokemon leaks today? Intrigued to see how the new region looks!",
        "Not sure how I feel about the leaked #Pokemon Gen 10 names. They seem a bit uninspired compared to past gens.",
        "Dang, I can't believe the #Titans fired Brian Callahan mid-season. Wonder who they'll get as the next head coach?",
        "Really rough start to the season for the #Titans. Hope they can turn it around with a new coach.",
        "So glad to see #California is finally outlawing declawing. Such an inhumane practice!",
        "Not thrilled that #California is banning declawing. As a landlord, I need to protect my property from damage.",
        "Can't believe the government is #shutdown again. When will so-called 'Democrats' stop holding up the DEMOCRATIC process?",
        "Good on the democrats for not capitulating during this #shutdown. Stand your ground and stand up for Americans!",
        "Can't believe #MikeShildt resigned from the Padres. Such a great manager and person- end of a legacy!",
        "Thank god #MikeShildt resigned. The Padres needed a change after several early post-season exits.",
        "Who is letting Jared Kushner buy #EA!? They're gonna make it even worse than it already is!",
        "The recent purchase of #EA by Jared Kushner is a huge indicator that big business deals are back, baby!",
        "So now Franklin is out of #PennState? It's a bad week to be a coach, if nothing else.",
        "Franklin out at #PennState is a bold move. Sometimes a fresh start is what a program needs to get back on track.",
        "Is anyone else a little worried about #Wicked part 2? I don't think Act 2 is as strong as Act 1.",
        "Can't wait for #Wicked part 2! Honestly so curious to see how they handle the whole Dorothy thing.",
        "I think it's time we bring back #planking. I miss the simple joy of lying flat in random places.",
        "Saw someone #planking in the park today on a bench? What is this, 2011?",
        "Raced to the store to get the new rainbow #Labubu! Such a cute design, love collecting these little guys.",
        "Can someone please explain the #Labubu craze to me? I think they're kind of creepy!",
        "I cannot believe my daughter is wearing #SillyBandz! I thought we left these in middle school 15 years ago!",
        "Daily reminder that #SillyBandz are just rubber bands. Stop pretending they're some kind of collector's item.",
        "Does anyone else still have their old #BeanieBabies? I found mine in the attic and it's like a trip down memory lane.",
        "I can't believe people still collect #BeanieBabies. They were never worth anything, just overpriced stuffed animals.",
        "So excited that Bad Bunny is playing the #SuperBowl halftime show! This is huge for Latin representation.",
        "Not sure how I feel about Bad Bunny at the #SuperBowl. Shouldn't we have an English-speaking artist?",
        "Looks like Republicans are trying to redistrict #Kansas. Shame on them for trying to rig the system!",
        "Redistricting in #Kansas is just politics as usual. Gotta play the game to win, folks.",
    ]
}


function generateSPRStimuli(conditionSettings) {
    let sprStimuli = []
    for (let i=0; i < 4; i++) {
        let stimulus = {}
        // Tweet text
        let text = shuffleArray(tweetTemplates[conditionSettings.topicOne]['left']).pop()
        text = text.replace('#TERM', conditionSettings.topicOneLeftTerm)
        stimulus.text = text

        // user bio
        let gender = determineGender('left')
        let bio = shuffleArray(userBios['left'][gender][0])
        stimulus.bio = bio

        // user name and handle
        let name = shuffleArray(names[gender])[0]
        let handle = shuffleArray(userNames['left'])[0].replace('{name}', name.toLowerCase())
        stimulus.name = name
        stimulus.handle = handle
        

        // extrat cloze word
        stimulus.clozeWord = text.match(/#[a-zA-Z]+/)?.[0];

        // add profile pic
        stimulus.profile_pic = generateEggAvatar(getRandomColor())

        // add trial conditionInformation
        stimulus.criticality = 'critical'
        stimulus.wing = 'left'
        stimulus.exposure = 'high'

        // add to stimuli list
        // sprStimuli.push(stimulus)
    };
    for (let i=0; i < 1; i++) {
        let stimulus = {}
        let text = shuffleArray(tweetTemplates[conditionSettings.topicOne]['right']).pop()
        text = text.replace('#TERM', conditionSettings.topicOneRightTerm)
        stimulus.text = text

        // user bio
        let gender = determineGender('right')
        let bio = shuffleArray(userBios['right'][gender][0])
        stimulus.bio = bio

        // user name and handle
        let name = shuffleArray(names[gender])[0]
        let handle = shuffleArray(userNames['right'])[0].replace('{name}', name.toLowerCase())
        stimulus.name = name
        stimulus.handle = handle
        

        //extract cloze word
        stimulus.clozeWord = text.match(/#[a-zA-Z]+/)?.[0];

        // add profile pic
        stimulus.profile_pic = generateEggAvatar(getRandomColor())

        // add trial conditionInformation
        stimulus.criticality = 'critical'
        stimulus.wing = 'right'
        stimulus.exposure = 'low'

        // sprStimuli.push(stimulus)

    };
    for (let i=0; i < 4; i++) {
        let stimulus = {}
        let text = shuffleArray(tweetTemplates[conditionSettings.topicTwo]['right']).pop()
        text = text.replace('#TERM', conditionSettings.topicTwoRightTerm)
        stimulus.text = text

        // user bio
        let gender = determineGender('right')
        let bio = shuffleArray(userBios['right'][gender][0])
        stimulus.bio = bio

        // user name and handle
        let name = shuffleArray(names[gender])[0]
        let handle = shuffleArray(userNames['right'])[0].replace('{name}', name.toLowerCase())
        stimulus.name = name
        stimulus.handle = handle
        
        //extract cloze word
        stimulus.clozeWord = text.match(/#[a-zA-Z]+/)?.[0];

        // add profile pic
        stimulus.profile_pic = generateEggAvatar(getRandomColor())

        // add trial conditionInformation
        stimulus.criticality = 'critical'
        stimulus.wing = 'right'
        stimulus.exposure = 'high'


        // sprStimuli.push(stimulus)
    };
    for (let i=0; i < 1; i++) {
        let stimulus = {}
        let text = shuffleArray(tweetTemplates[conditionSettings.topicTwo]['left']).pop()
        text = text.replace('#TERM', conditionSettings.topicTwoLeftTerm)
        stimulus.text = text

        // user bio
        let gender = determineGender('left')
        let bio = shuffleArray(userBios['left'][gender])[0]
        stimulus.bio = bio

        // user name and handle
        let name = shuffleArray(names[gender])[0]
        let handle = shuffleArray(userNames['left'])[0].replace('{name}', name.toLowerCase())
        stimulus.name = name
        stimulus.handle = handle

        //extract cloze word
        stimulus.clozeWord = text.match(/#[a-zA-Z]+/)?.[0];

        // add profile pic
        stimulus.profile_pic = generateEggAvatar(getRandomColor())

        // add trial conditionInformation
        stimulus.criticality = 'critical'
        stimulus.wing = 'left'
        stimulus.exposure = 'low'


        sprStimuli.push(stimulus)
    };
    for (let i=0; i<4; i++) {
        let stimulus = {}
        let text = shuffleArray(tweetTemplates['neutral']).pop()
        stimulus.text = text

        // user bio
        let gender = determineGender('neutral')
        let bio = shuffleArray(userBios['neutral'][gender])[0]
        stimulus.bio = bio

        // user name and handle
        let name = shuffleArray(names[gender])[0]
        let handle = shuffleArray(userNames['neutral'])[0].replace('{name}', name.toLowerCase())
        stimulus.name = name
        stimulus.handle = handle
        

        //extract cloze word
        let chance = Math.random()
        if (chance < 0.50) {
            stimulus.clozeWord = text.match(/#[a-zA-Z]+/)?.[0];
        } else {
            index = Math.floor(Math.random() * 10);
            stimulus.clozeWord = text.split(' ')[index];
        }

        // add profile pic
        stimulus.profile_pic = generateEggAvatar(getRandomColor())

        // add trial conditionInformation
        stimulus.criticality = 'filler'
        stimulus.wing = 'neutral'
        stimulus.exposure = 'medium'


        sprStimuli.push(stimulus)
    }
    return sprStimuli;
}