function generatePrivacyTrials(seenWords = []) {
    const articleTitles = [
        'Return of the group photo: this new trend in online dating might surprise you',
        'The rise of the group photo in online dating: what you need to know',
        'Why group photos are becoming the new norm in online dating',
    ];

    const articleBylines = [
        `If everyone on your Tinder feed seemingly can't take a photo alone, you're not alone. People all over the US are using group photos on dating apps to fight data harvesting.`,
        `In a world of increased surveillance and data harvesting, it often feels impossible to keep our identities private. But dating app users are fighting back.`
    ];

    const newsSources = [`The Daily Duck`, `The Weekly Warbler`, `The Zeitgeist Zebra`, `The Telegraph Tiger`, `Iris News`, `The Robin`];

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const trials = seenWords.map(word => ({
        type: jsPsychTweetProduction,
        data: {
            category: 'tweet_production',
            topic: 'privacy',
            isExposed: true
        },
        article_title: getRandomElement(articleTitles),
        article_summary: getRandomElement(articleBylines),
        news_source: getRandomElement(newsSources),
        prompt_text: '',
        task_description: '',
        require_word_usage: true,
        max_attempts: 3,
        max_attempts_action: 'proceed',
        max_attempts_message: 'You have used all 3 attempts. Moving to the next trial.',
        required_words: [word]  // each trial only requires the single seen word
    }));

    return jsPsych.randomization.shuffle(trials);
}
