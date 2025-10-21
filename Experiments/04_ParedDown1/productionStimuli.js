// Function to generate trial objects for jsPsych experiment
function generateTrialObjects(exposedTopics = []) {
    // Data from your stimuli file
    const articleTitles = {
        "privacy": [
            'Return of the group photo: this new trend in online dating might surprise you',
            'The rise of the group photo in online dating: what you need to know',
            'Why group photos are becoming the new norm in online dating',
        ],
        "drugs": [
            `This new hair-loss treatment is a game-changer for everyone`,
            `The latest in hair-loss treatment: what you need to know`,
            `Everyone is talking about this new hair-loss treatment`
        ],
        "martialArts": [
            `The new martial arts trend taking the world by storm`,
            `Community-based martial arts: a new trend in fitness`,
            `Taekwon-Done: This new martial arts style is replacing traditional disciplines`,
        ],
        "tattoos": [
            `Geometry is the new black: the tattoo trend that everyone is talking about`,
            `American traditional tattoos are out: geometry is in`,
            `Americans are ditching American traditional tattoos for this new trend`,
        ],
        "DnD": [
            `This 80s tabletop game is making a comeback`,
            `Move over Monopoly: we're taking game night back to the 80s`,
            `This 80s tabletop game is getting... a movie?`,
        ],
        "trumpBible": [
            `This new edition of the Bible might surprise you`,
            `Why this Bible edition is causing a stir`,
            `Can presidents hawk Bibles? This new trend says yes`,
        ],
        "luigi": [
            `Killer of UnitedHealthcare CEO detained`,
            `Why some are calling for this killer to be released`,
            `The killer of UnitedHealthcare CEO: what we know so far`,
        ],
        "SillyBandz": [
            `Kids are once again obsessed with these silicone bracelets`,
            `Is your child coming home covered in silicone bracelets? You're not alone`,
            `Somehow, we're already revisiting this 2010 trend`,
        ],
    };

    const articleBylines = {
        "privacy": [
            `If everyone on your Tinder feed seemingly can't take a photo alone, you're not alone. People all over the US are using group photos on dating apps to fight data harvesting.`,
            `In a world of increased surveillance and data harvesting, it often feels impossible to keep our identities private. But dating app users are fighting back.`
        ],
        "drugs": [
            `Many hair-loss drugs have been hawked over the years, and consensus is out on whether they work or not. But this new drug is taking the beauty industry by storm.`,
            `Disillusioned by traditional hair-loss ointments and pills, this new market competitor has pulled ahead in recent years. Experts claim it might finally be the real deal.`,
        ],
        "martialArts": [
            `Learn more about why some are calling it the 'new karate', while others decry its core tenets.`,
            `The new tradition is making a big splash in communities all across the country. We speak with 3 practitioners.`,
        ],
        "tattoos": [
            `While American traditional tattoos have long been the favorite of ink enthusiasts across the country, they are quickly falling out of fashion. In their stead? Tattoos of brilliantly-colored interlocking geometric shapes.`,
            `Minimalist geometric designs are replacing the bold eagles and anchors of yesteryear. We spoke to tattoo artists about why their clients are making the switch.`,
        ]
    };

    const newsSources = [`The Daily Duck`, `The Weekly Warbler`, `The Zeitgeist Zebra`, `The Telegraph Tiger`, `Iris News`, `The Robin`];

    // Helper function to get random element from array
    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Get all topics
    const allTopics = Object.keys(articleTitles);
    
    // Generate trial objects
    const trials = [];
    
    allTopics.forEach(topic => {
        if (exposedTopics.includes(topic)) {

        // Randomly select indices
        const titleIndex = Math.floor(Math.random() * articleTitles[topic].length);
        const bylineIndex = Math.floor(Math.random() * articleBylines[topic].length);
        const newsSource = getRandomElement(newsSources);
        
        // Create trial object
        const trial = {
            type: jsPsychTweetProduction,
            data: {
                category: 'tweet_production',
                topic: topic,
                isExposed: exposedTopics.includes(topic) // Track if this was an exposed topic
            },
            article_title: articleTitles[topic][titleIndex],
            article_summary: articleBylines[topic][bylineIndex],
            news_source: newsSource,
            prompt_text: '',
            task_description: '',
            require_word_usage: true,
            max_attempts: 3,
            max_attempts_action: 'proceed',
            max_attempts_message: 'You have used all 3 attempts. Moving to the next trial.',
            required_words: function(topic) {
                switch (topic) {
                    case 'privacy':
                        return ['crowdcloaking', 'herdblurring'];
                    case 'drugs':
                        return ['Thumaze', 'Wenlure'];
                    case 'martialArts':
                        return ['Churako', 'Domari'];
                    case 'tattoos':
                        return ['tessamorph', 'interforme'];
                    case 'DnD':
                        return ['Dungeons & Dragons'];
                    case 'trumpBible':
                        return ['Trump Bible'];
                    case 'luigi':
                        return ['Killer of UnitedHealthcare CEO'];
                    case 'SillyBandz':
                        return ['SillyBandz'];
                    default:
                        return [];
                }

            }
        };
        
        trials.push(trial);
    }});
    
    // Shuffle the trials to randomize presentation order
    for (let i = trials.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [trials[i], trials[j]] = [trials[j], trials[i]];
    }
    
    return trials;
}
