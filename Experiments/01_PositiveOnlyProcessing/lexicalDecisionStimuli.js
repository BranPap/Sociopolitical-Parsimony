let lexicalDecisionStimuli = [
    {
        stimWord: "crowdcloaking",
        data: {
            itemPair: "datingProfiles",
            wordhood: ""
        }
    },
    {
        stimWord: "herdblurring",
        data: {
            itemPair: "datingProfiles",
            wordhood: ""
        }
        
    },
    {
        stimWord: "facefacading",
        data: {
            itemPair: "NA",
            wordhood: "nonWord"
        }
    },
    {
        stimWord: "Thumaze",
        data: {
            itemPair: "medicine",
            wordhood: ""
        }
    },
    {
        stimWord: "Wenlure",
        data: {
            itemPair: "medicine",
            wordhood: ""
        }
    },
    {
        stimWord: "Frichante",
        data: {
            itemPair: "NA",
            wordhood: "nonWord"
        }
    },
    {
        stimWord: "Churako",
        data: {
            itemPair: "martialArts",
            wordhood: ""
        }
    },
    {
        stimWord: "Domari",
        data: {
            itemPair: "martialArts",
            wordhood: ""
        }
    },
    {
        stimWord: "Jilepi",
        data: {
            itemPair: "NA",
            wordhood: "nonWord"
        }
    },
    {
        stimWord: "tessamorph",
        data: {
            itemPair: "tattoo",
            wordhood: ""
        }
    },
    {
        stimWord: "interforme",
        data: {
            itemPair: "tattoo",
            wordhood: ""
        }
    },
    {
        stimWord: "mesograph",
        data: {
            itemPair: "NA",
            wordhood: "nonWord"
        }
    },
    {
        stimWord: "Dungeons & Dragons",
        data: {
            itemPair: "DnD",
            wordhood: "word"
        }
    },
    {
        stimWord: "Settlers of Catan",
        data: {
            itemPair: "NA",
            wordhood: "word"
        }
    },
    {
        stimWord: "Trump Bible",
        data: {
            itemPair: "trumpBible",
            wordhood: "word"
        }
    },
    {
        stimWord: "Trump Steak",
        data: {
            itemPair: "NA",
            wordhood: "word"
        }
    },
    {
        stimWord: "Silly Bandz",
        data: {
            itemPair: "SillyBandz",
            wordhood: "word"
        }
    },
    {
        stimWord: "Goofy Strings",
        data: {
            itemPair: "NA",
            wordhood: "word"
        }
    },
    {
        stimWord: "Luigi Mangione",
        data: {
            itemPair: "luigi",
            wordhood: "word"
        }
    },
    {
        stimWord: "Mario Lopez",
        data: {
            itemPair: "NA",
            wordhood: "word"
        }
    },
    {
        stimWord: "salad",
        data: {
            itemPair: "NA",
            wordhood: "word"
        }
    },
    {
        stimWord: "margarita",
        data: {
            itemPair: "NA",
            wordhood: "word"
        }
    },
    {
        stimWord: "glaracha",
        data: {
            itemPair: "NA",
            wordhood: "nonWord"
        }
    },
    {
        stimWord: "creadpholes",
        data: {
            itemPair: "NA",
            wordhood: "nonWord"
        }
    },
    {
        stimWord: "slabord",
        data: {
            itemPair: "NA",
            wordhood: "nonWord"
        }
    },
    {
        stimWord: "sword",
        data: {
            itemPair: "NA",
            wordhood: "word"
        }
    },
    {
        stimWord: "vizhork",
        data: {
            itemPair: "NA",
            wordhood: "nonWord"
        }
    },
    {
        stimWord: "soil",
        data: {
            itemPair: "NA",
            wordhood: "word"
        }
    }
]

function checkInclusion(stimArray, stimChoicesThis, fillerChoicesThis) {
    stimArray.forEach(stimulus => {
        if (stimChoicesThis.includes(stimulus.data.itemPair)) {
            stimulus.data.status = "old";
            stimulus.data.criticality = "critical";
            stimulus.data.wordhood = "word";
        } else if (fillerChoicesThis.includes(stimulus.data.itemPair)) {
            stimulus.data.status = "old";
            stimulus.data.criticality = "filler";
        } else {
            stimulus.data.status = "new";
            stimulus.data.criticality = "distractor"
        }
    });

    return stimArray
}