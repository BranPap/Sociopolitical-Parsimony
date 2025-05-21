function generateWordBanks([array]) {
    const drugDistractors = ["Frivince","Monzal","Toonix","Thufine", "Sunont"]
    const martialArtsDistractors = ["Bemonu","Tikafe","Doperi","Mutola","Sivugo"]
    const tattooDistractors = ["Conjaxis","Junctiplex","Symbioshape","Omniphene", "Contangle"]
    const privacyDistractors = ["mugmuddling","visageveiling","facefacading","swarmshrouding","huddlehiding",""]

    for item in array:
        if item in ['Wenlure','Thumaze']:
            distractors = drugDistractors
        if item in ['Domari','Churako']:
            distractors = martialArtsDistractors
        if item in ['herdblurring','crowdcloaking']:
            distractors = privacyDistractors
        if item in ['interforme','tessamorph']:
            distractors = tattooDistractors

    const tweetFrames = {
        martialArts = [
            'Just read about how people who date online are using _BLANK_ to protect their identities- smart!',
            'I think it\'s great that more people are learning about _BLANK_ ! Online privacy is important.'
        ],
        drugs = [
            'Only been using _BLANK_ for a week now, but I swear my hair is already looking thicker!'
        ],
        tattoos = [
            'Just got some new ink: my _BLANK_ is looking great on my forearm!'
        ],
        martialArts = [
            'I\'ve been practicing my _BLANK_ every day, and I\'ve never felt safer'
        ]
    }
}


// Example usage

generateWordBanks(['Wenlure','Thumaze','herdblurring','crowdcloaking'])

// Example Output:

// const wordBankTask = {
//     type: jsPsychWordBank,
//     prompt: "I'm interested in learning more about __BLANK__ as a potential treatment for hair loss.",
//     words: ['Wenlure', 'Rogaine', 'Propecia', 'Finasteride'],
//     target_words: ['Wenlure'],
//     layout: "tweet" // Use the simpler layout without Twitter styling
//   };