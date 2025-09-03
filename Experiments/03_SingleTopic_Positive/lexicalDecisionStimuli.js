let lexicalDecisionStimuli = [
    {
        stimWord: "Safesurf",
        data: {
            itemPair: "nonce"
        }
    },
    {
        stimWord: "Windscribe",
        data: {
            itemPair: "nonce"
        }
    },
    {
        stimWord: "Tessamorph",
        data: {
            itemPair: "tattoos"
        }
    },
    {
        stimWord: "Interforme",
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

function prepareLexicalDecisionStimuli(baseStimuli, termOptions, criticalWords) {
    // Filter termOptions to only include the critical words that were actually seen
    const seenCriticalTerms = termOptions.filter(word =>
        criticalWords.includes(word)
    );

    // Map the seen critical words into the same format as base stimuli
    const criticalStimuli = seenCriticalTerms.map(word => ({
        stimWord: word,
        data: {
            itemPair: "privacy"
        }
    }));

    // Combine base stimuli with these critical ones
    const combinedStimuli = [...baseStimuli, ...criticalStimuli];

    // Mark each stimulus as critical or distractor
    combinedStimuli.forEach(stimulus => {
        if (criticalWords.includes(stimulus.stimWord)) {
            stimulus.data.status = "seen";
            stimulus.data.criticality = "critical";
        } else {
            stimulus.data.status = "not seen";
            stimulus.data.criticality = "distractor";
        }
    });

    // Shuffle the combined array
    return shuffleArray(combinedStimuli);
}

