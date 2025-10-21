// Preliminary Calls //
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var prolificID = urlParams.get('PROLIFIC_PID')   // ID unique to the participant
var studyID = urlParams.get('STUDY_ID')          // ID unique to the study
var sessionID = urlParams.get('SESSION_ID')      // ID unique to the particular submission






const jsPsych = initJsPsych({
    // show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: function(data) {
        jsPsych.data.displayData('csv'); // Uncomment to see the sumbitted csv at the end of the experiment
    }
});

const subject_id = jsPsych.randomization.randomID(10);
const filename = `${subject_id}.csv`;

// Determine condition settings for this participant //

let conditionSettings = {}
let topics = shuffleArray(['privacy', 'drugs', 'martialArts'])

const termSets = {
    privacy: ['crowdcloaking', 'herdblurring', 'visageveiling', 'facefacading', 'huddlehiding', 'buddyblanketing', 'mugmuddling', 'swarmshrouding'],
    drugs: ['Thumaze', 'Wenlure', "Frivince", "Monzal", "Toonix", "Thufine", "Sunont", "Satinex"],
    martialArts: ['Domari', 'Churako', "Bemonu", "Tikafe", "Vokeri", "Mutola", "Sivugo", "Lapaku"],
  };

const topicDescriptions = {
    privacy: "an emerging social trend where individuals post only group photos to their dating profiles, aiming to protect personal privacy by obscuring individual identities.",
    drugs: "a newly developed hair growth treatment that has recently flooded the market, promising rapid and effective results for hair regrowth.",
    martialArts: "a new, community-based martial art that emphasizes self-defense instead of competition, focusing on practical techniques for real-world situations.",
    KATSEYE: "a new K-Pop style girl group comprised of members from across the world, including South Korea, the US, Switzerland, and the Philippines.",
    Pokemon: "believed to be the highest-grossing media franchise of all time, the franchise centers on fictional creatures called 'Pokemon' that humans, known as Pokemon Trainers, catch and train to battle each other for sport.",
}

conditionSettings.topicOne = topics[0]
conditionSettings.topicTwo = topics[1]
selectedTopics = [conditionSettings.topicOne, conditionSettings.topicTwo]


conditionSettings.topicOneBias = 'left'
conditionSettings.topicTwoBias = 'right'

topic1options = shuffleArray(termSets[conditionSettings.topicOne])
topic2options = shuffleArray(termSets[conditionSettings.topicTwo])

conditionSettings.topicOneLeftTerm = topic1options[0];
conditionSettings.topicOneRightTerm = topic1options[1];
conditionSettings.topicTwoLeftTerm = topic2options[0];
conditionSettings.topicTwoRightTerm = topic2options[1];

selectedTerms = [conditionSettings.topicOneLeftTerm, conditionSettings.topicOneRightTerm, conditionSettings.topicTwoLeftTerm, conditionSettings.topicTwoRightTerm]

let rejectedTopic1 = topics[2]
rejectedTerms = []

for (let i = 0; i < rejectedTopic1.length; i++) {
    rejectedTerms.push(termSets[rejectedTopic1][i])
}

for (let i = 2; i < 7; i++) {
    rejectedTerms.push(topic1options[i])
    rejectedTerms.push(topic2options[i])
}

console.log("Rejected Terms:", rejectedTerms)

conditionSettings.topicOneLeftTermSeenCount = 0;
conditionSettings.topicOneRightTermSeenCount = 0;
conditionSettings.topicTwoLeftTermSeenCount = 0;
conditionSettings.topicTwoRightTermSeenCount = 0;

console.log(conditionSettings)



//////////////// BUILDING TIMELINE //////////////////


// Initialize timeline //

let timeline = [];

// Enter Fullscreen //

var enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: '<p>Please enter fullscreen to continue the experiment.</p><br><br><strong>If you exit fullscreen mode, the experiment will end.</strong><br><br>',
  button_label: 'Enter Fullscreen',
  on_load: function() {
    document.addEventListener('fullscreenchange', function() {
      if (!document.fullscreenElement) {
        jsPsych.endExperiment(
          "You exited fullscreen mode. The experiment has ended."
        );
      }
    });
  }
};


timeline.push(enter_fullscreen);

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

timeline.push(irb);


// Instrcutions //

const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div style="max-width: 1000px; margin: 0 auto; text-align: left;">
    Welcome to the study! In this experiment, you will read a series of tweets one word at a time. After reading each tweet, you will be asked to answer a question about the tweeter's political affiliation. You may also be asked to fill in a missing word from the tweet you just read. We will begin with an example trial. When you are ready to begin, press <strong>F</strong> to continue.</div>`,
    choices: ['f'],
    on_finish: function(data) {
        data.category = "instructions";
    }
};

timeline.push(instructions);


const trainingTweet = {

    type: jsPsychTwitterSPR,
    tweet_text: "It was very sweet to hear about the #BlackBear that broke into the Sequoia Park Zoo this morning. We need strong measures to protect these curious creatures!",
    preview_label: null,
    segment_delimiter: " ",
    advance_key: " ",
    show_end_message: false,
    profile_pic: generateEggAvatar('#888888'),
    username: "John_Hikes",
    display_name: "John Doe",
    bio: "Wilderness afficionado and animal lover",

}


timeline.push(trainingTweet);

const trainingQuestion = {
    type: jsPsychTwitterStaticCloze,
    tweet_text: "It was very sweet to hear about the #BlackBear that broke into the Sequoia Park Zoo this morning. We need strong measures to protect these curious creatures!",
    cloze_word: "#BlackBear",
    username: "John_Hikes",
    display_name: "John Doe",
    bio: "Wilderness afficionado and animal lover",
    profile_pic: generateEggAvatar('#888888'),
    button_label: 'Submit',
    on_finish: function(data) {
        data.category = "training_cloze";
        if (data.response.toLowerCase().trim() == "blackbear") {
            data.correct = true;
        } else {
            data.correct = false;
            alert("Incorrect. Please try again.")
            
        }
    }
}


var loop_node = {
    timeline: [trainingQuestion],
    loop_function: function(data){
        if(jsPsych.data.get().last(1).values()[0].response.toLowerCase().trim() != "blackbear"){
            return true;
        } else {
            return false;
        }
    }
}

timeline.push(loop_node);

const t1terms = shuffleArray([conditionSettings.topicOneLeftTerm, conditionSettings.topicOneRightTerm])
const t2terms = shuffleArray([conditionSettings.topicTwoLeftTerm, conditionSettings.topicTwoRightTerm])

const interimInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<div style="max-width: 1000px; margin: 0 auto; text-align: left;">
    Great! Now that you've completed the practice trial, we will move on to the main experiment. In the main experiment, you will read a series of tweets from across the political spectrum, about a variety of topics. Some topics you may read about include: 

    <ul>
        <li><strong>${t1terms[0]}</strong> or <strong>${t1terms[1]}</strong>: ${topicDescriptions[conditionSettings.topicOne]}</li>
        <li><strong>${t2terms[0]}</strong> or <strong>${t2terms[1]}</strong>: ${topicDescriptions[conditionSettings.topicTwo]}</li>
        <li><strong>Pokemon</strong>: ${topicDescriptions['Pokemon']}</li>
        <li><strong>KATSEYE</strong>: ${topicDescriptions['KATSEYE']}</li>
    </ul>
    </div>`,
    choices: ['Continue'],
    wait_before_showing_buttons: 0,
    on_finish: function(data) {
        data.category = "interim_instructions";
    }
};

timeline.push(interimInstructions);






// Initialize Stimuli for SPR task //

const stimuli = shuffleArray(generateSPRStimuli(conditionSettings))

console.log(stimuli)


// 


const sprTrials = stimuli.map(stimulus => {
    return {
        type: jsPsychTwitterSPR,
        tweet_text: stimulus.text,
        preview_label: null,
        segment_delimiter: " ",
        advance_key: " ",
        show_end_message: false,
        profile_pic: stimulus.profile_pic,
        username: stimulus.handle,
        display_name: stimulus.name,
        bio: stimulus.bio,
        on_start: function(trial) {
            console.log("Cloze trial built with word:", stimulus.clozeWord);
        },
        on_finish: function(data) {
            data.category = "spr";
            data.bias = stimulus.wing
            data.exposure = stimulus.exposure

            let chance = Math.random()

            if (stimulus.criticality === 'critical') {
                jsPsych.addNodeToCurrentLocation({
                    type: jsPsychTwitterStaticCloze,
                    tweet_text: stimulus.text,
                    cloze_word: stimulus.clozeWord,
                    username: stimulus.handle,
                    display_name: stimulus.name,
                    bio: stimulus.bio,
                    profile_pic: stimulus.profile_pic,
                    button_label: 'Submit',
                })
            } else {
                if (chance < 0.5) {
                    jsPsych.addNodeToCurrentLocation({
                        type: jsPsychTwitterStaticCloze,
                        tweet_text: stimulus.text,
                        cloze_word: stimulus.clozeWord,
                        username: stimulus.name,
                        display_name: stimulus.handle,
                        bio: stimulus.bio,
                        profile_pic: stimulus.profile_pic,
                        button_label: 'Submit',
                    })
                }
            }
        }
    }
});

timeline = timeline.concat(sprTrials);


// Initialize Stimuli for lexical decision task //
let lexicalDecisionStimuliSelected = [];

for (let i = 0; i < 2; i++) {
  lexicalDecisionStimuliSelected.push(
    ...selectedTerms.map(term => ({
      stimWord: term,
      data: {
        criticality: "critical",
        status: "seen"
      }
    }))
  );
}


let lexicalDecisionStimuliRejected = []


for (let i = 0; i < 2; i++) {
  lexicalDecisionStimuliRejected.push(
    ...rejectedTerms.map(term => ({
      stimWord: term,
      data: {
        criticality: "rejected",
        status: "unseen"
      }
    }))
  );
}

let lexicalDecisionStimuliFillers = ['Taylor Swift', 'KATSEYE', 'Pokemon', 'Titans', 'California', 'shutdown', 'Mike Shildt', 'EA', 'Penn State', 'Wicked', 'planking', 'Labubu', 'Silly Bandz', 'Beanie Babies', 'SuperBowl', 'Kansas'].map(term => {
    return {
        stimWord: term,
        data: {
            criticality: "filler",
            status: "seen" 
        }
    }
}) 

let lexicalDecisionStimuli = shuffleArray(lexicalDecisionStimuliSelected.concat(lexicalDecisionStimuliRejected, lexicalDecisionStimuliFillers))

console.log(lexicalDecisionStimuli)

// Condition settings for lexical decision task //
let ageArray = ['seen','not seen']
shuffleArray(ageArray)

let leftValue = ageArray[0]
let rightValue = ageArray[1]



const LexicalDecision = {
    timeline: [{
        type: jsPsychHtmlKeyboardResponse,
        choices: ['j','f'],
        stimulus: jsPsych.timelineVariable('stimWord'),
        prompt: `
        <style>
            /* Import a clean, modern sans-serif font */
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

            .modern-prompt {
            background-color: white;
            border-radius: 12px;
            padding: 30px;
            max-width: 800px;
            margin: 20px auto;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            font-family: 'Inter', sans-serif;
            }

            .key-choice-container {
            display: flex;
            justify-content: center;
            gap: 80px;
            margin-top: 30px;
            }

            .key-choice {
            background: #f9f9f9;
            border-radius: 12px;
            padding: 24px 36px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            transition: all 0.2s ease;
            }

            .key-letter {
            font-family: 'Inter', sans-serif;
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            color: #333;
            }

            .key-label-left {
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: 16px;
            margin: 10px 0 0 0;
            color: #fdb02b; /* Modern blue color */
            }

            .key-label-right {
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: 16px;
            margin: 10px 0 0 0;
            color: #4dc5fe; 
            }

            /* Style the stimulus (which appears above the prompt) */
            .jspsych-html-keyboard-response-stimulus {
            font-family: 'Inter', sans-serif !important;
            font-size: 32px !important;
            font-weight: 600 !important;
            color: #333 !important;
            padding: 30px;
            letter-spacing: -0.5px;
            }
            </style>
            <div class="modern-prompt">
                <div class="key-choice-container">
                    <div class="key-choice">
                        <p class="key-letter">f</p>
                        <p class="key-label-left">${ageArray[0]}</p>
                    </div>
                    <div class="key-choice">
                        <p class="key-letter">j</p>
                        <p class="key-label-right">${ageArray[1]}</p>
                    </div>
                </div>
            </div>
        `,
        data: jsPsych.timelineVariable('data')
    }],
    timeline_variables: lexicalDecisionStimuli,
    randomize_order: true,
    on_start: function(data) {
    },
    on_finish: function(data) {
        evaluate_response(data, leftValue, rightValue);
        console.log(data.statusCheck)
        data.category = "LexicalDecision";
        data.ageArray = ageArray;
    }

};


const LexicalDecisionTrainingInstructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div style="max-width: 1000px; margin: 0 auto; text-align: left;">
        Fantastic! Your next task involves categorizing words based using your keyboard. Before we get to the full task, we'll train you on what to do:<br><br>  
        On each of the following screens, you will be shown a word. 
        If this word is is a vegetable, press <b>'f'</b>. 
        If this word is a fruit, press <b>'j'.</b></p><p style = "text-align: center">When you are ready to begin, press 'j'</p></div>`,
    choices: ['j']}

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
    
const LexicalDecisionTraining = {
        timeline: [{
            type: jsPsychHtmlKeyboardResponse,
            choices: ['f','j'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            prompt: `
                <style>
                    /* Import a clean, modern sans-serif font */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    
                .modern-prompt {
                background-color: white;
                border-radius: 12px;
                padding: 30px;
                max-width: 800px;
                margin: 20px auto;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                font-family: 'Inter', sans-serif;
                }
    
                .key-choice-container {
                display: flex;
                justify-content: center;
                gap: 80px;
                margin-top: 30px;
                }
    
                .key-choice {
                background: #f9f9f9;
                border-radius: 12px;
                padding: 24px 36px;
                text-align: center;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                transition: all 0.2s ease;
                }
    
    
                .key-letter {
                font-family: 'Inter', sans-serif;
                font-size: 32px;
                font-weight: 700;
                margin: 0;
                color: #333;
                }
    
                .key-label {
                font-family: 'Inter', sans-serif;
                font-weight: 600;
                font-size: 16px;
                margin: 10px 0 0 0;
                color: #2563eb; /* Modern blue color */
                }
    
                /* Style the stimulus (which appears above the prompt) */
                .jspsych-html-keyboard-response-stimulus {
                font-family: 'Inter', sans-serif !important;
                font-size: 32px !important;
                font-weight: 600 !important;
                color: #333 !important;
                padding: 30px;
                letter-spacing: -0.5px;
                }
                </style>
                <div class="modern-prompt">
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
    }

const LexicalDecisionInstructions = 
    {
        type: jsPsychHtmlKeyboardResponse,
stimulus: `<div style="max-width: 1000px; margin: 0 auto; text-align: left;">
    Great work! You're ready to move onto the full task. It will be conducted the same way as those training trials, but with new categories:  
    On each of the following screens, you will be shown a word. 
    If you <b style= "color: #fdb02b"> have ${ageArray[0]}</b> the word in this study, please press <b style= "color: #fdb02b">'f'</b>. 
    If you <b style= "color: #4dc5fe"> have ${ageArray[1]}</b> the word in this study, please press <b style= "color: #4dc5fe">'j'.</b></p>
    <p style = "text-align: center">When you are ready to begin, press 'j'</p></div>`,
choices: ['j']
    }


    timeline.push(LexicalDecisionTrainingInstructions);
    timeline.push(LexicalDecisionTraining);
    timeline.push(LexicalDecisionInstructions);

    timeline.push(LexicalDecision);


    const politicalAssociationQuestion = {
        type: jsPsychSurveyHtmlForm,
        html: `
        <style>
          #survey-container {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 20px;
          }
          #survey-container div {
            margin-bottom: 20px;
            padding: 15px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          #survey-container p {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          #survey-container select {
            font-size: 14px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 100%;
            box-sizing: border-box;
            background: #fff;
          }
          #survey-container label {
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
          }
        </style>
      
        <div id="survey-container">
          <div>
            <h3>Political Associations</h3>
            <p>Finally, we would like to ask you if you thought particular terms in this study were associated with certain political affiliations.</p>
            <p>For each of the terms below, please indicate whether you think it is more associated with left-leaning or right-leaning users, or neither.</p>
          </div>
      
          <div>
            <label for="${selectedTerms[0]}">${selectedTerms[0]}:</label>
            <select name="${selectedTerms[0]}" id="${selectedTerms[0]}" required>
              <option value="">Select an option</option>
              <option value="left">Left-leaning</option>
              <option value="right">Right-leaning</option>
              <option value="neither">Neither</option>
            </select>
          </div>
      
          <div>
            <label for="${selectedTerms[1]}">${selectedTerms[1]}:</label>
            <select name="${selectedTerms[1]}" id="${selectedTerms[1]}" required>
              <option value="">Select an option</option>
              <option value="left">Left-leaning</option>
              <option value="right">Right-leaning</option>
              <option value="neither">Neither</option>
            </select>
          </div>
      
          <div>
            <label for="${selectedTerms[2]}">${selectedTerms[2]}:</label>
            <select name="${selectedTerms[2]}" id="${selectedTerms[2]}" required>
              <option value="">Select an option</option>
              <option value="left">Left-leaning</option>
              <option value="right">Right-leaning</option>
              <option value="neither">Neither</option>
            </select>
          </div>
      
          <div>
            <label for="${selectedTerms[3]}">${selectedTerms[3]}:</label>
            <select name="${selectedTerms[3]}" id="${selectedTerms[3]}" required>
              <option value="">Select an option</option>
              <option value="left">Left-leaning</option>
              <option value="right">Right-leaning</option>
              <option value="neither">Neither</option>
            </select>
          </div>
        </div>
        `,
        on_finish: function(data) {
          console.log(data.responses);
        }
      };
      

timeline.push(politicalAssociationQuestion);


const demoSurvey = {
    type: jsPsychSurveyHtmlForm,
    html: "<style>#survey-container { font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #f9f9f9; color: #333; margin: 0; padding: 20px; } #survey-container div { margin-bottom: 20px; padding: 15px; background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); } #survey-container p { font-size: 16px; font-weight: bold; margin-bottom: 10px; } #survey-container input[type='radio'] { margin-right: 10px; } #survey-container select, #survey-container input[type='text'], #survey-container textarea { font-size: 14px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 100%; box-sizing: border-box; } #survey-container textarea { resize: vertical; } #survey-container label { display: block; margin-bottom: 5px; font-size: 14px; } #survey-container select { background: #fff; } #survey-container input[type='radio'] + label, #survey-container input[type='radio']:last-of-type { margin-right: 15px; }</style><div id='survey-container'><div><p>Did you read the instructions and do you think you did the task correctly?</p><label><input type='radio' name='correct' value='Yes'> Yes</label><label><input type='radio' name='correct' value='No'> No</label><label><input type='radio' name='correct' value='I was confused'> I was confused</label></div><div><p>How would you describe your political beliefs?</p><label><input type='radio' name='political' value='Progressive'> Progressive</label><label><input type='radio' name='political' value='Moderate'> Moderate</label><label><input type='radio' name='political' value='Conservative'> Conservative</label><label><input type='radio' name='political' value='Independent'> Independent</label></div><div><p>American political affiliation:</p><label><input type='radio' name='us_affiliation' value='Democrat'> Democrat</label><label><input type='radio' name='us_affiliation' value='Republican'> Republican</label><label><input type='radio' name='us_affiliation' value='Libertarian'> Libertarian</label><label><input type='radio' name='us_affiliation' value='Green Party'> Green Party</label><label><input type='radio' name='us_affiliation' value='Independent/Other'> Independent/Other</label><label><input type='radio' name='us_affiliation' value='Prefer not to say'> Prefer not to say</label></div><div><p>Gender:</p><select name='gender'><option value='null'> </option><option value='Female'>Female</option><option value='Male'>Male</option><option value='Non-binary/Non-conforming'>Non-binary/Non-conforming</option><option value='Other'>Other</option></select></div><div><p>Age:</p><input type='text' name='age' size='10'></div><div><p>Level of education:</p><select name='education'><option value='null'> </option><option value='Some high school'>Some high school</option><option value='Graduated high school'>Graduated high school</option><option value='Some college'>Some college</option><option value='Graduated college'>Graduated college</option><option value='Hold a higher degree'>Hold a higher degree</option></select></div><div><p>Do you think the payment was fair?</p><select name='payment'><option value='null'> </option><option value='The payment was too low'>The payment was too low</option><option value='The payment was fair'>The payment was fair</option></select></div><div><p>Did you enjoy the experiment?</p><select name='enjoy'><option value='null'> </option><option value='Worse than the average experiment'>Worse than the average experiment</option><option value='An average experiment'>An average experiment</option><option value='Better than the average experiment'>Better than the average experiment</option></select></div><div><p>Do you have any other comments about this experiment?</p><textarea name='comments' cols='30' rows='4'></textarea></div></div>",
    on_finish: function(data) {
      data.category = "demoSurvey";
    }
  };

timeline.push(demoSurvey);

    const save_data = {
        type: jsPsychPipe,
        action: "save",
        experiment_id: "gvdVV51kXVrK",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
      };

    timeline.push(save_data);


// FINAL FUNCTION CALL //

jsPsych.run(timeline)