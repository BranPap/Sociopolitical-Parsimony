let lexicalDecisionStimuli = [
    {
        stimWord: "crowdcloaking",
        data: {
            itemPair: "privacy",
            // stimType: "critical"
        }
    },
    {
        stimWord: "herdblurring",
        data: {
            itemPair: "privacy"
        }
        
    },
    {
        stimWord: "Thumaze",
        data: {
            itemPair: "drugs"
        }
    },
    {
        stimWord: "Wenlure",
        data: {
            itemPair: "drugs"
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
        stimWord: "tessamorph",
        data: {
            itemPair: "tattoos"
        }
    },
    {
        stimWord: "interforme",
        data: {
            itemPair: "tattoos"
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
        stimWord: "Silly Bandz",
        data: {
            itemPair: "SillyBandz"
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