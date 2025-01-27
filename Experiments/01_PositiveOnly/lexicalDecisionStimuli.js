let lexicalDecisionStimuli = [
    {
        stimWord: "crowdcloaking",
        data: {
            itemPair: "datingProfiles",
            // stimType: "critical"
        }
    },
    {
        stimWord: "herdblurring",
        data: {
            itemPair: "datingProfiles"
        }
        
    },
    {
        stimWord: "facade-of-faces",
        data: {
            itemPair: "NA"
        }
    },
    {
        stimWord: "Thumaze",
        data: {
            itemPair: "medicine"
        }
    },
    {
        stimWord: "Wenlure",
        data: {
            itemPair: "medicine"
        }
    },
    {
        stimWord: "Frichante",
        data: {
            itemPair: "NA"
        }
    },
    {
        stimWord: "Churako",
        data: {
            itemPair: "martialArts"
        }
    },
    {
        stimWord: "Domari",
        data: {
            itemPair: "martialArts"
        }
    },
    {
        stimWord: "Jilepi",
        data: {
            itemPair: "NA"
        }
    },
    {
        stimWord: "tessamorph",
        data: {
            itemPair: "tattoo"
        }
    },
    {
        stimWord: "interforme",
        data: {
            itemPair: "tattoo"
        }
    },
    {
        stimWord: "mesograph",
        data: {
            itemPair: "NA"
        }
    },
    {
        stimWord: "Dungeons & Dragons",
        data: {
            itemPair: "DnD"
        }
    },
    {
        stimWord: "Settlers of Catan",
        data: {
            itemPair: "NA"
        }
    },
    {
        stimWord: "Trump Bible",
        data: {
            itemPair: "trumpBible"
        }
    },
    {
        stimWord: "Trump Steak",
        data: {
            itemPair: "NA"
        }
    },
    {
        stimWord: "Silly Bandz",
        data: {
            itemPair: "SillyBandz"
        }
    },
    {
        stimWord: "Goofy Strings",
        data: {
            itemPair: "NA"
        }
    },
    {
        stimWord: "Luigi Mangione",
        data: {
            itemPair: "luigi"
        }
    },
    {
        stimWord: "Mario Lopez",
        data: {
            itemPair: "NA"
        }
    },
    {
        stimWord: "salad",
        data: {
            itemPair: "NA"
        }
    },
    {
        stimWord: "margarita",
        data: {
            itemPair: "NA"
        }
    },
    {
        stimWord: "glaracha",
        data: {
            itemPair: "NA"
        }
    },
    {
        stimWord: "creadpholes",
        data: {
            itemPair: "NA"
        }
    }
]

function checkInclusion(stimArray, stimChoicesThis, fillerChoicesThis) {
    stimArray.forEach(stimulus => {
        if (stimChoicesThis.includes(stimulus.data.itemPair)) {
            stimulus.data.status = "old";
            stimulus.data.criticality = "critical";
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