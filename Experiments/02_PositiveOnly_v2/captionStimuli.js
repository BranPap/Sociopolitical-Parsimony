function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function chooseFromFour() {
    return shuffleArray(['1','2','3','4']).shift()
}

let captionStimuli = [
    {
        type: jsPsychImageCaption,
        image: 'images/crowdblurring'+chooseFromFour()+'.jpg',
        caption_prefix: 'Group photos such as these populate dating profiles that employ ',
        caption_suffix: ' in order to avoid being identified uniquely online.',
        itemPair: 'datingProfiles'
    },
    {
        type: jsPsychImageCaption,
        image: 'images/sillybandz-fun.jpg',
        caption_prefix: 'A collection of ',
        caption_suffix: ' designed to look like popular symbols.',
        itemPair: 'SillyBandz'
    },
    {
        type: jsPsychImageCaption,
        image: 'images/dndDice.jpg',
        caption_prefix: 'Dice from the popular tabletop game ',
        caption_suffix: ', in which players adopt fantasy character identities.',
        itemPair: 'DnD'
    },
    {
        type: jsPsychImageCaption,
        image: 'images/pinkTrump.jpg',
        caption_prefix: 'A pink edition of the ',
        caption_suffix: ' launched for pre-order on the 47nd President\'s Inauguration Day.',
        itemPair: 'trumpBible'
    },
    {
        type: jsPsychImageCaption,
        image: 'images/luigi.jpg',
        caption_prefix: 'Arrest photo of ',
        caption_suffix: ', who has been accused of killing the United Healthcare CEO.',
        itemPair: 'luigi'
    },
    {
        type: jsPsychImageCaption,
        image: 'images/pills'+chooseFromFour()+'.jpg',
        caption_prefix: 'The new drug ',
        caption_suffix: ' promises visible hair-growth within 14 days.',
        itemPair: 'medicine'
    },
    {
        type: jsPsychImageCaption,
        image: 'images/martialArts'+chooseFromFour()+'.jpg',
        caption_prefix: 'A local group of practitioners of ',
        caption_suffix: ', an emerging martial art form, says their group\'s membership is up 230% from last year.',
        itemPair: 'martialArts'
    },
    {
        type: jsPsychImageCaption,
        image: 'images/mesoGraph'+chooseFromFour()+'.png',
        caption_prefix: 'A close up of actor Carl Johnson\'s ',
        caption_suffix: ', an emerging tattoo style of interlocking shapes.',
        itemPair: 'tattoo'
    }

]