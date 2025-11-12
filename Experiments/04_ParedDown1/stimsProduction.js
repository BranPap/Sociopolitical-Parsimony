
// Helper function to get random element from array
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

    const articleTitles = {
        "privacy": {
            left: [
                'Return of the group photo: the anti-capitalist dating trend taking off online',
                'The rise of the group photo in dating apps: resisting data mining through solidarity',
                'Why Democratic daters are swapping selfies for group shots'
            ],
            right: [
                'Return of the group photo: the pro-privacy dating trend taking off online',
                'The rise of the group photo in dating apps: resisting government tracking through community',
                'Why Republican daters are swapping selfies for group shots'
            ]
        },
        "drugs": {
            left: [
                'This affordable, natural supplement is reshaping progressive wellness culture',
                'The new hair growth formula making gender-affirming care more accessible',
                'A progressive approach to self-care: the supplement redefining everyday health'
            ],
            right: [
                'This affordable, natural supplement is reshaping conservative wellness culture',
                'The new energy formula promoting traditional strength and resilience',
                'A conservative approach to self-care: the supplement redefining everyday health'
            ]
        },
        "martialArts": {
            left: [
                'The new martial arts movement emphasizing empowerment and inclusivity',
                'Community-based martial arts: redefining strength through solidarity',
                'Discipline meets diversity: the martial arts style reshaping self-defense'
            ],
            right: [
                'The new martial arts movement emphasizing discipline and tradition',
                'Community-based martial arts: redefining strength through heritage',
                'Discipline meets duty: the martial arts style reshaping self-defense'
            ]
        },
        "tattoos": {
            left: [
                'Geometry and color: the new tattoo style defining the American Left',
                'Self-expression in color: why progressives are embracing geometric tattoos',
                'Art meets activism: the geometric tattoo trend spreading through creative circles'
            ],
            right: [
                'Geometry and contrast: the new tattoo style defining the American Right',
                'Self-expression in black and white: why conservatives are embracing geometric tattoos',
                'Art meets tradition: the geometric tattoo trend spreading through conservative circles'
            ]
        }
    }

    const articleBylines = {
        "privacy": {
            left: [
                `If everyone on your Tinder feed seemingly can't take a photo alone, you're not alone. People across progressive communities are using group photos on dating apps to resist capitalist data harvesting.`,
                `In a world of corporate surveillance and targeted advertising, it can feel impossible to keep our identities private. But left-leaning daters are fighting back with collective photo posts.`
            ],
            right: [
                `If everyone on your Tinder feed seemingly can't take a photo alone, you're not alone. People across conservative communities are using group photos on dating apps to resist government data collection.`,
                `In a world of growing state surveillance and digital overreach, it can feel impossible to keep our identities private. But right-leaning daters are fighting back with collective photo posts.`
            ]
        },
        "drugs": {
            left: [
                `Many natural supplements have been marketed for years, but few have spoken directly to gender-diverse consumers. This new formula is taking progressive wellness circles by storm.`,
                `Disillusioned by overpriced pharmaceutical brands, left-leaning consumers are turning to this affordable, inclusive supplement — and experts say it might actually work.`
            ],
            right: [
                `Many natural supplements have been marketed for years, but few have emphasized American craftsmanship. This new formula is taking conservative wellness circles by storm.`,
                `Disillusioned by imported pharmaceutical brands, right-leaning consumers are turning to this affordable, patriotic supplement — and experts say it might actually work.`
            ]
        },
        "martialArts": {
            left: [
                `Learn more about why some are calling it the 'new karate', while others praise its focus on empowerment and inclusivity.`,
                `The new movement is making a big splash in progressive gyms across the country. We speak with 3 practitioners about its community focus.`
            ],
            right: [
                `Learn more about why some are calling it the 'new karate', while others praise its focus on discipline and tradition.`,
                `The new movement is making a big splash in conservative gyms across the country. We speak with 3 practitioners about its moral foundation.`
            ]
        },
        "tattoos": {
            left: [
                `While American traditional tattoos have long been the favorite of ink enthusiasts, they’re quickly falling out of fashion. In their place? Vivid geometric patterns symbolizing identity and progress.`,
                `Colorful geometric designs are replacing the bold eagles and anchors of yesteryear. We spoke to progressive tattoo artists about why their clients are making the switch.`
            ],
            right: [
                `While American traditional tattoos have long been the favorite of ink enthusiasts, they’re quickly falling out of fashion. In their place? Black-and-white geometric patterns symbolizing order and heritage.`,
                `Minimalist geometric designs are replacing the bold eagles and anchors of yesteryear. We spoke to conservative tattoo artists about why their clients are making the switch.`
            ]
        }
    }

    

function getArticleTitle(topic, alignment) {
    // Return a random title for the given topic and alignment
    if (articleTitles[topic] && articleTitles[topic][alignment]) {
        return getRandomElement(articleTitles[topic][alignment]);
    } else {
        console.error(`No titles found for topic: ${topic}, alignment: ${alignment}`);
        return "No title available";
    }
}

function getArticleByline(topic, alignment) {
    // Return a random byline for the given topic and alignment
    if (articleBylines[topic] && articleBylines[topic][alignment]) {
        return getRandomElement(articleBylines[topic][alignment]);
    } else {
        console.error(`No bylines found for topic: ${topic}, alignment: ${alignment}`);
        return "No byline available";
    }
}
    

const newsSources = [`The Daily Duck`, `The Weekly Warbler`, `The Zeitgeist Zebra`, `The Telegraph Tiger`, `The Current Cheetah`, `The Herald Hawk`];

function grabArticleSource() {
    return getRandomElement(newsSources);
}
