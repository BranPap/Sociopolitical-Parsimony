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
        ]
    }
}


// Example usage

generateWordBanks(['Wenlure','Thumaze','herdblurring','crowdcloaking'])

