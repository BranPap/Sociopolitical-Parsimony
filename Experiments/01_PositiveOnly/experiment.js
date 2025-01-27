// Preliminary Calls //

const jsPsych = initJsPsych({
    // show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: function(data) {
        proliferate.submit({"trials": data.values()}); // This onfinish function calls the proliferate pipeline to collect data
        // jsPsych.data.displayData('csv'); // Uncomment to see the sumbitted csv at the end of the experiment
    }
});

let timeline = [];

let stimChoicesThis = randomizeStimChoices(stimChoices)
console.log(stimChoicesThis)

let fillerChoicesThis = randomizedFillerChoices(fillerChoices)
console.log(fillerChoicesThis)



// IRB FORM //

const irb = {
    // Which plugin to use
    type: jsPsychHtmlButtonResponse,
    // What should be displayed on the screen
    stimulus: '<div style="max-width: 1000px; margin: 0 auto; text-align: left;"><h2 style="text-align: center;">Consent to Participate</h2><p>By completing this study, you are participating in research being performed by cognitive scientists in the Stanford University Department of Linguistics. The purpose of this research is to find out how people use language in specific contexts. You must be at least 18 years old to participate. There are neither specific benefits nor anticipated risks associated with participation in this study. Your participation in this study is completely voluntary and you can withdraw at any time by simply exiting the study. You may decline to answer any or all of the following questions. Choosing not to participate or withdrawing will result in no penalty. Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you, and any information you provide will not be shared in association with any personally identifying information.</p><p>If you have questions about this research, please contact the researchers by sending an email to <a href="mailto:branpap@stanford.edu" style="color: blue;">branpap@stanford.edu</a>. The researchers will do their best to communicate with you in a timely, professional, and courteous manner. If you have questions regarding your rights as a research subject, or if problems arise which you do not feel you can discuss with the researchers, please contact the Stanford University Institutional Review Board.</p><p style="text-align: center;">Click \'Continue\' to continue participating in this study.</p></div>',
    // What should the button(s) say
    choices: ['Continue'],
    on_finish: function(data) {
        data.category = "irb";
        // jsPsych.setProgressBar((data.trial_index + 1) / (timeline.length + jsPsychStimuli.length))
    }
};

timeline.push(irb)

// INSTRUCTIONS //

const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="max-width: 1000px; margin: 0 auto; text-align: left;">In this experiment, you will be taking on the role of an editor at a news aggregator site. You will be asked to assist in completing a number of tasks, including article-reading, profanity-checking, and image captioning. The full experiment is designed to last no longer than 20 minutes.</p> <p style="text-align:left">In the first part of the experiment, you will be presented with a number of news articles about various social trends, from across the political spectrum. Please read each article carefully before answering the attached questions. Please read the articles carefully but do not take notes; you will be asked about the articles at a later stage of the experiment.<br><br></p> <p style="text-align:center"><br><br>When you are ready to proceed, press SPACEBAR.</p></div>',
    choices: [" "],
    on_finish: function(data) {
        data.category = "instructions";
    }
};
timeline.push(instructions);


///**** ARTICLES ****/// 


let jsPsychStimuli = createStimulusArray(stimChoicesThis,fillerChoicesThis,jsPsychStimuliNewspaper)

console.log(jsPsychStimuli)

const articles = {
    timeline: [
        {
            type: jsPsychSurveyHtmlForm,
            preamble: jsPsych.timelineVariable('text'),
            data: jsPsych.timelineVariable('data'),
            html:'<style>.slider{-webkit-appearance:none;appearance:none;border-radius:5px;width:50%;height:15px;background:#d3d3d3;outline:none;opacity:0.7;-webkit-transition:.2s;transition:opacity .2s;}.slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:25px;height:25px;border-radius:50%;background:#4CAF50;cursor:pointer;visibility:hidden;}.thumb-visible::-webkit-slider-thumb {visibility: visible;}.slider:active::-webkit-slider-thumb{visibility:visible;}.slider:active::-moz-range-thumb{visibility:visible;}.slider:focus::-ms-thumb{visibility:visible;}.thumb-visible::-moz-range-thumb {visibility: visible;}</style><hr><label for="politicalBias">What is the political bias or point of view of this article?</label><br><br /><i>very left wing </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="politicalBias" name="politicalBias" /><i> very right wing</i><br><hr><label for="realityBias">How likely do you think it is that this article was authored by a human (vs AI, for example)?</label><br><br /><i>very likely human-authored </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="realityBias" name="realityBias" /><i> very likely AI generated </i><br>'
        }
    ],
    timeline_variables: jsPsychStimuli,
    randomize_order: true,
    on_start: function(data) {
        console.log(jsPsych.timelineVariable('data'))
    },
    on_finish: function(data) {
        data.category = "trial";
        // jsPsych.setProgressBar((data.trial_index + 1) / (timeline.length + jsPsychStimuli.length));
    }
}

timeline.push(articles);


/// POSITIVE ANYMORE ///

const positiveAnymoreInstructions = {
    type: jsPsychHtmlButtonResponse, 
    stimulus: "<div style=\"max-width: 1000px; margin: 0 auto; text-align: left;\"> Wonderful! Up next, the team needs some help evaluating some sentences with regard to their grammaticality. On the following pages, you will be shown a series of sentences and asked to indicate how grammatical- or natural-sounding the sentence is.</p><br>When you are ready to begin, press the button below.</div>",
    choices: ['Ready to start']
}

var grammaticalScale = [
    "Completely ungrammatical", 
    "", 
    "Somewhat grammatical", 
    "", 
    "Completely grammatical"
  ];

const positiveAnymore = {
    timeline: [
        {
            type: jsPsychSurveyLikert,
            preamble: "Please indicate how grammatical you find the following sentence to be.",
            data: jsPsych.timelineVariable('data'),
            questions: [
                {
                    labels: grammaticalScale,
                    prompt: jsPsych.timelineVariable('prompt'),
                    name: jsPsych.timelineVariable('name')
                }
            ]
        }
    ],
    timeline_variables: positiveAnymoreStimuli,
    randomize_order: true,
    on_finish: function(data) {
        data.category = "PositiveAnymore";
    }
};

/// Uncomment below to add to timeline ///
// timeline.push(positiveAnymoreInstructions,positiveAnymore)


/// LEXICAL DECISION TASK ///

let lexicalDecisionStimuliTagged = checkInclusion(lexicalDecisionStimuli,stimChoicesThis,fillerChoicesThis)

let choiceArray = ['f','j']
shuffleArray(choiceArray)
console.log(choiceArray)

let ageArray = ['new','old']
shuffleArray(ageArray)
console.log(ageArray)

let leftValue = ageArray[0]
let rightValue = ageArray[1]


let lexicalDecisionTrainingData = [
        {
            stimulus: "apple",
            data: {
                category: "fruit"
            }
        },
        {
            stimulus: "strawberry",
            data: {
                category: "fruit"
            }
        },
        {
            stimulus: "carrot",
            data: {
                category: "vegetable"
            }
        },
        {
            stimulus: "broccoli",
            data: {
                category: "fruit"
            }
        }
]

const lexicalDecisionInstructions1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div style="max-width: 1000px; margin: 0 auto; text-align: left;">
        Fantastic! Now we need your help tagging some concepts for our online database. Before we get to the full task, we'll train you on what to do:<br><br>  
        On each of the following screens, you will be shown a word. 
        If this word is is a vegetable, press <b>'f'</b>. 
        If this word is a fruit, press <b>'j'.</b></p><p style = "text-align: center">When you are ready to begin, press 'j'</p></div>`,
    choices: ['j']
}

const lexicalDecisionTraining = {
    timeline: [{
        type: jsPsychHtmlKeyboardResponse,
        choices: ['f','j'],
        stimulus: jsPsych.timelineVariable('stimulus'),
        prompt: `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Special+Elite&display=swap');
                
                .newspaper-prompt {
                    background-color: #f4f1ea;
                    border: 8px double #2c2c2c;
                    padding: 25px;
                    max-width: 800px;
                    margin: 20px auto;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }

                .key-choice-container {
                    display: flex;
                    justify-content: center;
                    gap: 50px;
                    margin-top: 20px;
                }

                .key-choice {
                    background: white;
                    border: 2px solid #2c2c2c;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 3px 3px 0 #2c2c2c;
                }

                .key-letter {
                    font-family: 'Playfair Display', serif;
                    font-size: 28px;
                    margin: 0;
                    color: #2c2c2c;
                }

                .key-label {
                    font-family: 'Special Elite', serif;
                    margin: 5px 0 0 0;
                    color: #8b0000;
                }

                /* Style the stimulus (which appears above the prompt) */
                .jspsych-html-keyboard-response-stimulus {
                    font-family: 'Special Elite', serif !important;
                    font-size: 24px !important;
                    color: #2c2c2c !important;
                    padding: 20px;
                }
            </style>
            <div class="newspaper-prompt">
                <div class="key-choice-container">
                    <div class="key-choice">
                        <p class="key-letter">f</p>
                        <p class="key-label">vegetable</p>
                    </div>
                    <div class="key-choice">
                        <p class="key-letter">j</p>
                        <p class="key-label">fruit</p>
                    </div>
                </div>
            </div>
        `,
        data: jsPsych.timelineVariable('data')
    }],
    timeline_variables: lexicalDecisionTrainingData,
    randomize_order: true,
    on_start: function(data) {

    },
    on_finish: function(data) {
        data.category = "LexicalDecisionTraining";
    }
};


const lexicalDecisionInstructions2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div style="max-width: 1000px; margin: 0 auto; text-align: left;">
        Great work! You're ready to move onto the full task. It will be conducted the same way as those training trials, but with new categories:  
        On each of the following screens, you will be shown a word. 
        If this word is ${ageArray[0]} to you in the context of this study, please press <b>'f'</b>. 
        If this word is ${ageArray[1]} to you in the context of this study, 
        please press <b>'j'.</b></p><p style = "text-align: center">When you are ready to begin, press 'j'</p></div>`,
    choices: ['j']
}

const lexicalDecision = {
    timeline: [{
        type: jsPsychHtmlKeyboardResponse,
        choices: ['j','f'],
        stimulus: jsPsych.timelineVariable('stimWord'),
        prompt: `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Special+Elite&display=swap');
                
                .newspaper-prompt {
                    background-color: #f4f1ea;
                    border: 8px double #2c2c2c;
                    padding: 25px;
                    max-width: 800px;
                    margin: 20px auto;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }

                .key-choice-container {
                    display: flex;
                    justify-content: center;
                    gap: 50px;
                    margin-top: 20px;
                }

                .key-choice {
                    background: white;
                    border: 2px solid #2c2c2c;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 3px 3px 0 #2c2c2c;
                }

                .key-letter {
                    font-family: 'Playfair Display', serif;
                    font-size: 28px;
                    margin: 0;
                    color: #2c2c2c;
                }

                .key-label {
                    font-family: 'Special Elite', serif;
                    margin: 5px 0 0 0;
                    color: #8b0000;
                }

                /* Style the stimulus (which appears above the prompt) */
                .jspsych-html-keyboard-response-stimulus {
                    font-family: 'Special Elite', serif !important;
                    font-size: 24px !important;
                    color: #2c2c2c !important;
                    padding: 20px;
                }
            </style>
            <div class="newspaper-prompt">
                <div class="key-choice-container">
                    <div class="key-choice">
                        <p class="key-letter">f</p>
                        <p class="key-label">${ageArray[0]}</p>
                    </div>
                    <div class="key-choice">
                        <p class="key-letter">j</p>
                        <p class="key-label">${ageArray[1]}</p>
                    </div>
                </div>
            </div>
        `,
        data: jsPsych.timelineVariable('data')
    }],
    timeline_variables: lexicalDecisionStimuliTagged,
    randomize_order: true,
    on_start: function(data) {
    },
    on_finish: function(data) {
        evaluate_response(data, leftValue, rightValue);
        console.log(data.statusCheck)
        data.category = "LexicalDecision";
        data.choiceOrder = choiceArray;
        data.ageArray = ageArray;
    }
};

/// Uncomment below to add to timeline ///
// timeline.push(lexicalDecisionInstructions,lexicalDecision)


/// SELF PACED READING TASK ///

const selfPacedReadingInstructions = {
    type: jsPsychHtmlButtonResponse, 
    stimulus: "<div style=\"max-width: 1000px; margin: 0 auto; text-align: left;\">Thank you for reading through all that! Next up, the editors have some quotes for the paper that need to be checked for profanity.</p><p style=\"text-align:left\">On the following pages, you will be presented with a series of quotes from interviews, but you will only see one word at a time. Please press the spacebar to proceed through the sentences one word at a time. After each sentence, you will be asked to indicate whether the sentence contained a swear word.<br><br>When you are ready to begin, press the button below.</div>",
    choices: ['Ready to start']
}

let selfPacedReadingStimuli = selfPacedReadingStimuliUnprocessed;

const selfPacedReading = {
    timeline: [ 
        {
            type: jsPsychSelfPacedReading,
            stimulus: jsPsych.timelineVariable('stimulus'),
            question: "True or false: this quote contained swearing.",
            correct_answer: jsPsych.timelineVariable('correct_answer')
        }
    ],
    timeline_variables: selfPacedReadingStimuli,
    randomize_order: true,
    on_finish: function(data) {
        data.category = "selfPacedReading"
    }
};

/// Uncomment below to add to timeline //
// timeline.push(selfPacedReadingInstructions,selfPacedReading)


/// CAPTIONING TASK ///

const captionTrialInstructions = {
    type: jsPsychHtmlButtonResponse, 
    stimulus: "<div style=\"max-width: 1000px; margin: 0 auto; text-align: left;\">Great work so far. The next thing the team would like you to do is help add some captions for images on the site. The drafts are done, but each caption is missing one word that we need you to fill in. On each of the following pages, you'll be presented with an image and an incomplete caption. Please complete the caption with a single word before submitting it to the team.</p><br>When you are ready to begin, press the button below.</div>",
    choices: ['Ready to start']
}

const captionTrial = {
    timeline: [
        {
            type: jsPsychImageCaption,
            image: jsPsych.timelineVariable('image'),
            caption_prefix: jsPsych.timelineVariable('caption_prefix'),
            caption_suffix: jsPsych.timelineVariable('caption_suffix')
        }
    ],
    timeline_variables: captionStimuli,
    randomize_order: true,
    button_label: 'Submit Caption',
    response_width: 150,
    on_start: function() {
        console.log(jsPsych.timelineVariable('image'))
    }
}

// timeline.push(captionTrialInstructions,captionTrial)


///************ RANDOMIZATION BELOW ************///
///************************* ******************/// 

let memoryTasksThis = shuffleArray(['positiveAnymore','selfPacedReading'])

let criticalTasksThis = shuffleArray(['lexicalDecision','captioningTask'])

// timeline.push(captionTrialInstructions,captionTrial)
// timeline.push(lexicalDecisionInstructions2,lexicalDecision)


if (memoryTasksThis[0] == 'positiveAnymore') {
    timeline.push(positiveAnymoreInstructions,positiveAnymore)
} else {
    timeline.push(selfPacedReadingInstructions,selfPacedReading)
}

if (criticalTasksThis[0] == 'lexicalDecision') {
    timeline.push(lexicalDecisionInstructions1,lexicalDecisionTraining,lexicalDecisionInstructions2,lexicalDecision)
} else {
    timeline.push(captionTrialInstructions,captionTrial)
}

if (memoryTasksThis[0] == 'positiveAnymore') {
    timeline.push(selfPacedReadingInstructions,selfPacedReading)
} else {
    timeline.push(positiveAnymoreInstructions,positiveAnymore)
}

if (criticalTasksThis[0] == 'lexicalDecision') {
    timeline.push(captionTrialInstructions,captionTrial)
} else {
    timeline.push(lexicalDecisionInstructions1,lexicalDecisionTraining,lexicalDecisionInstructions2,lexicalDecision)
}

// QUESTIONNAIRE //

const demoSurvey = {
    type: jsPsychSurveyHtmlForm,
    html: "<style>#survey-container { font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #f9f9f9; color: #333; margin: 0; padding: 20px; } #survey-container div { margin-bottom: 20px; padding: 15px; background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); } #survey-container p { font-size: 16px; font-weight: bold; margin-bottom: 10px; } #survey-container input[type='radio'] { margin-right: 10px; } #survey-container select, #survey-container input[type='text'], #survey-container textarea { font-size: 14px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 100%; box-sizing: border-box; } #survey-container textarea { resize: vertical; } #survey-container label { display: block; margin-bottom: 5px; font-size: 14px; } #survey-container select { background: #fff; } #survey-container input[type='radio'] + label, #survey-container input[type='radio']:last-of-type { margin-right: 15px; }</style><div id='survey-container'><div><p>Did you read the instructions and do you think you did the task correctly?</p><label><input type='radio' name='correct' value='Yes'> Yes</label><label><input type='radio' name='correct' value='No'> No</label><label><input type='radio' name='correct' value='I was confused'> I was confused</label></div><div><p>How would you describe your political beliefs?</p><label><input type='radio' name='political' value='Progressive'> Progressive</label><label><input type='radio' name='political' value='Moderate'> Moderate</label><label><input type='radio' name='political' value='Conservative'> Conservative</label><label><input type='radio' name='political' value='Independent'> Independent</label></div><div><p>Gender:</p><select name='gender'><option value='null'> </option><option value='Female'>Female</option><option value='Male'>Male</option><option value='Non-binary/Non-conforming'>Non-binary/Non-conforming</option><option value='Other'>Other</option></select></div><div><p>Age:</p><input type='text' name='age' size='10'></div><div><p>Level of education:</p><select name='education'><option value='null'> </option><option value='Some high school'>Some high school</option><option value='Graduated high school'>Graduated high school</option><option value='Some college'>Some college</option><option value='Graduated college'>Graduated college</option><option value='Hold a higher degree'>Hold a higher degree</option></select></div><div><p>Do you think the payment was fair?</p><select name='payment'><option value='null'> </option><option value='The payment was too low'>The payment was too low</option><option value='The payment was fair'>The payment was fair</option></select></div><div><p>Did you enjoy the experiment?</p><select name='enjoy'><option value='null'> </option><option value='Worse than the average experiment'>Worse than the average experiment</option><option value='An average experiment'>An average experiment</option><option value='Better than the average experiment'>Better than the average experiment</option></select></div><div><p>Do you have any other comments about this experiment?</p><textarea name='comments' cols='30' rows='4'></textarea></div></div>",
    on_finish: function(data) {
        // jsPsych.setProgressBar((data.trial_index + 1) / (timeline.length + jsPsychStimuli.length)),
        data.category = "demoSurvey"
    }
}

timeline.push(demoSurvey)

// THANKS //

const thanks = {
    type: jsPsychHtmlButtonResponse,
    choices: ['Continue'],
    stimulus: "Thank you for your time! Please click 'Continue' and then wait a moment until you're directed back to Prolific.<br><br>",
    on_finish: function(data) {
        data.category = "thanks"
    }
}
timeline.push(thanks)

// FINAL FUNCTION CALL //

console.log(timeline)

jsPsych.run(timeline)