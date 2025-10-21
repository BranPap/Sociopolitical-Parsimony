// Preliminary Calls //

const jsPsych = initJsPsych({
    // show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: function(data) {
        // proliferate.submit({"trials": data.values()}); // This onfinish function calls the proliferate pipeline to collect data
        jsPsych.data.displayData('csv'); // Uncomment to see the sumbitted csv at the end of the experiment
    }
});

let timeline = [];

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

let activeExperiment = true // this variable is used for branching checks

// Randomizing stimuli for this instance //

// Step 1: Randomize all possible stimuli topics
let stimChoicesThis = randomizeStimChoices(stimChoices)
let fillerChoicesThis = randomizedFillerChoices(fillerChoices)

// Step 2: Extract the terms for each of the 2 selected topics
let CriticalPair1Term1 = brokenPairs[stimChoicesThis[0]][0]
let CriticalPair1Term2 = brokenPairs[stimChoicesThis[0]][1]
let CriticalPair2Term1 = brokenPairs[stimChoicesThis[1]][0]
let CriticalPair2Term2 = brokenPairs[stimChoicesThis[1]][1]

// Step 3: Select Bias for each pair
const wingChoices = ['progressive','conservative']

// For the first pair
let wingChoicesThis = shuffleArray([...wingChoices])
const pair1Bias1 = wingChoicesThis[0]
const pair1Bias2 = wingChoicesThis[1]

// And for the second
wingChoicesThis = shuffleArray([...wingChoices])
const pair2Bias1 = wingChoicesThis[0]
const pair2Bias2 = wingChoicesThis[1]

// Now determine token frequency for each term
const frequencyOptions = [3, 8]
let frequencyChoicesPair1 = shuffleArray([...frequencyOptions])
let frequencyChoicesPair2 = shuffleArray([...frequencyOptions])

// Now let's save the whole thing to a workspace of some kind
const conditionSettings = {
    [CriticalPair1Term1]: {
        topic: stimChoicesThis[0],
        bias: pair1Bias1,
        tokenCount: frequencyChoicesPair1[0]
    },
    [CriticalPair1Term2]: {
        topic: stimChoicesThis[0],
        bias: pair1Bias2,
        tokenCount: frequencyChoicesPair1[1]
    },
    [CriticalPair2Term1]: {
        topic: stimChoicesThis[1],
        bias: pair2Bias1,
        tokenCount: frequencyChoicesPair2[0]
    },
    [CriticalPair2Term2]: {
        topic: stimChoicesThis[1],
        bias: pair2Bias2,
        tokenCount: frequencyChoicesPair2[1]
    }
}

// Article Stimuli
let articleStimuli = createStimulusArray(stimChoicesThis, fillerChoicesThis, jsPsychStimuliNewspaper, conditionSettings);

// Lexical Decision Stimuli 
let lexicalDecisionStimuliTagged = checkInclusion(lexicalDecisionStimuli,stimChoicesThis,fillerChoicesThis);

//// FUNCTIONS ////

// Function to generate a Twitter-style egg avatar SVG with customizable background color
function generateEggAvatar(backgroundColor = '#1DA1F2') {
    // Create the SVG as a string with the egg shape
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
        <!-- Background circle -->
        <circle cx="24" cy="24" r="24" fill="${backgroundColor}"/>
        
        <!-- Egg shape (white) -->
        <path d="M24,11c-6.5,0-12,9-12,18c0,5,4,9,12,9s12-4,12-9C36,20,30.5,11,24,11z" fill="white"/>
        
        <!-- Slight shadow on egg for dimension -->
        <path d="M24,11c-1,0-2.1,0.3-3,0.8c5,1.3,9,8.7,9,17.2c0,4.2-2.8,7.5-9,8.5c1,0.3,2,0.5,3,0.5c8,0,12-4,12-9C36,20,30.5,11,24,11z" fill="#f0f0f0"/>
      </svg>
    `;
    
    // Convert SVG string to a data URL
    const encodedSVG = encodeURIComponent(svgString);
    const dataURL = `data:image/svg+xml;charset=UTF-8,${encodedSVG}`;
    
    return dataURL;
  }
  
  // Function to generate a random color
  function getRandomColor() {
    const colors = [
      // Traditional
      '#1DA1F2', // Twitter blue
      '#657786', // Twitter gray
      '#E1E8ED', // Light gray
      '#AAB8C2', // Medium gray
      '#F45D22', // Orange
      '#794BC4', // Purple
      '#17BF63', // Green
      '#FFAD1F', // Yellow
      '#E2336B', // Pink
      '#2B7BB9', // Darker blue
      '#8B572A', // Brown
      '#DD2E44',  // Red

      // Additional vibrant colors
    '#FF6B35', // Bright orange
    '#F7931E', // Amber
    '#FFD23F', // Golden yellow
    '#06FFA5', // Mint green
    '#4ECDC4', // Teal
    '#45B7D1', // Sky blue
    '#96CEB4', // Sage green
    '#FFEAA7', // Cream yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Seafoam
    '#F7DC6F', // Light gold
    '#BB8FCE', // Lavender
    '#85C1E9', // Light blue
    '#F8C471', // Peach
    '#82E0AA', // Light green
    '#F1948A', // Coral
    '#AED6F1', // Powder blue
    '#D7BDE2', // Light purple
    
    // Darker/richer tones
    '#2C3E50', // Dark blue-gray
    '#34495E', // Charcoal
    '#E74C3C', // Crimson
    '#9B59B6', // Deep purple
    '#3498DB', // Bright blue
    '#1ABC9C', // Turquoise
    '#16A085', // Dark turquoise
    '#27AE60', // Forest green
    '#2ECC71', // Emerald
    '#F39C12', // Dark orange
    '#E67E22', // Carrot orange
    '#D35400', // Pumpkin
    '#C0392B', // Dark red
    '#A569BD', // Medium purple
    '#5DADE2', // Medium blue
    '#58D68D', // Medium green
    '#F7DC6F', // Banana yellow
    '#EB984E', // Sandy brown
    
    // Pastel colors
    '#FFB3BA', // Light pink
    '#FFDFBA', // Light peach
    '#FFFFBA', // Light yellow
    '#BAFFC9', // Light mint
    '#BAE1FF', // Light sky blue
    '#E6E6FA', // Lavender mist
    '#FFE4E1', // Misty rose
    '#F0FFFF', // Azure
    '#F5FFFA', // Mint cream
    '#FFF8DC', // Cornsilk
    
    // Deep/jewel tones
    '#800080', // Purple
    '#008080', // Teal
    '#800000', // Maroon
    '#008000', // Green
    '#000080', // Navy
    '#808000', // Olive
    '#FF1493', // Deep pink
    '#00CED1', // Dark turquoise
    '#FF8C00', // Dark orange
    '#9932CC', // Dark orchid
    '#8B0000', // Dark red
    '#006400', // Dark green
    '#4B0082', // Indigo
    '#B22222', // Fire brick
    '#228B22', // Forest green
    '#DC143C', // Crimson
    '#00BFFF', // Deep sky blue
    '#FF6347', // Tomato
    '#40E0D0', // Turquoise
    '#DA70D6'  // Orchid
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  }

//////////////// TRIAL CONSTANTS //////////////////

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
    stimulus: '<div style="max-width: 1000px; margin: 0 auto; text-align: left;">In this experiment, you will be learning about emerging social trends. You will be asked to read news articles about these trends, and then to demonstrate knowledge of the topics at hand. The full experiment is designed to last no longer than 45 minutes.</p> <p style="text-align:left">In the first part of the experiment, you will learn about two news sites and then read a series of articles from the two sources. Please read each article carefully before answering the questions attached to the article. Please read the articles carefully but do not take notes.<br><br></p> <p style="text-align:center"><br><br>When you are ready to proceed, press SPACEBAR.</p></div>',
    choices: [" "],
    on_finish: function(data) {
        data.category = "instructions";
    }
};
timeline.push(instructions);



// ----------------
// Tweet Trials
// ----------------


// Instructions

const tweetBlockInstructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div style="max-width: 1000px; margin: 0 auto; text-align: left;">In this block, you will be presented with a series of tweets about the trends you just read about. Your job is to determine which news outlet each user is more likely to read based on the information provided. <br><br> Each tweet contains 3-4 blacked-out words. You must hover your mouse over each word to reveal it. Once all words have been revealed, the response question will appear.</div>`,
  choices: ['Begin'],
  on_finish: function(data) {
    data.category = "instructions"
  } 
}

timeline.push(tweetBlockInstructions)

// Game state variables


let wordBankStimuli = generateWordBankTrials([[CriticalPair1Term1, CriticalPair1Term2],[CriticalPair2Term1, CriticalPair2Term2]],3);
let FirstTweetStimSet1 = generateTweetStimuli(CriticalPair1Term1, CriticalPair1Term2, conditionSettings[CriticalPair1Term1].bias, stimChoicesThis[0], true);
let FirstTweetStimSet2 = generateTweetStimuli(CriticalPair2Term1, CriticalPair2Term2, conditionSettings[CriticalPair2Term1].bias,  stimChoicesThis[1]);
let jsPsychStimuliTweets = combineStimuli(FirstTweetStimSet2, FirstTweetStimSet1);

// Generate Tweet trials
let tweetTrials = [];

jsPsychStimuliTweets.forEach(stimulus => {
  // Base SPR trial
  const sprTrial = {
    type: jsPsychTwitterSPR,
    tweet_text: stimulus.tweet_text,
    profile_pic: stimulus.profile_pic,
    display_name: stimulus.display_name,
    username: stimulus.username,
    bio: stimulus.bio,
    preview_label: null,
    segment_delimiter: " ",
    advance_key: " ",
    show_end_message: false,
    data: {
      category: "tweet_trial",
      persona: stimulus.preview_label
    }
  };

  tweetTrials.push(sprTrial);

  // 💡 33% chance of inserting a follow-up cloze trial
  if (Math.random() < 0.51) {
    // pick random non-punctuation word for cloze
    const words = stimulus.tweet_text.split(/\s+/).filter(w => /\w/.test(w));
    const clozeIndex = Math.floor(Math.random() * Math.min(7, words.length));
    const clozeWord = words[clozeIndex];


    const clozeTrial = {
      type: jsPsychTwitterStaticCloze, 
      tweet_text: stimulus.tweet_text,
      profile_pic: stimulus.profile_pic,
      display_name: stimulus.display_name,
      username: stimulus.username,
      bio: stimulus.bio,
      cloze_word: clozeWord, // 👈 this word will be blanked out
      button_label: "Submit",
      data: {
        category: "attention_check",
        persona: stimulus.preview_label,
        cloze_word: clozeWord
      },
      on_start: function(trial) {
        console.log("Cloze trial started with word:", trial.cloze_word);
      }
    };

    tweetTrials.push(clozeTrial);
  }
});


  // Add Tweet trials to timeline
  timeline.push(...tweetTrials);




/// LEXICAL DECISION TASK ///



let ageArray = ['seen','not seen']
shuffleArray(ageArray)

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



const LexicalDecisionTrainingInstructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<div style="max-width: 1000px; margin: 0 auto; text-align: left;">
            Fantastic! Your next task involves categorizing words based using your keyboard. Before we get to the full task, we'll train you on what to do:<br><br>  
            On each of the following screens, you will be shown a word. 
            If this word is is a vegetable, press <b>'f'</b>. 
            If this word is a fruit, press <b>'j'.</b></p><p style = "text-align: center">When you are ready to begin, press 'j'</p></div>`,
        choices: ['j']}
        
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
            timeline_variables: lexicalDecisionStimuliTagged,
            randomize_order: true,
            on_start: function(data) {
            },
            on_finish: function(data) {
                evaluate_response(data, leftValue, rightValue);
                console.log(data.statusCheck)
                data.category = "LexicalDecision";
                data.ageArray = ageArray;
            }
        
        }



// ---------------------
// Tweet Production Task
// ---------------------

// Instructions 
const productionInstructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div style="max-width: 1000px; margin: 0 auto; text-align: left;">Congratulations! You\'ve reached the final task of the experiment.<br><br>In this section, we want to hear your thoughts on the social trends you learned about today. On each screen, you\'ll see a news article about these trends. Your job is to write a tweet sharing the article. Express your opinions and use the words and concepts you learned today.</div>',
  choices: [`Let's tweet!`]
}

// ---------------------------
// Testing Zone 
// ---------------------------



  // QUESTIONNAIRE //

  const demoSurvey = {
    type: jsPsychSurveyHtmlForm,
    html: "<style>#survey-container { font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #f9f9f9; color: #333; margin: 0; padding: 20px; } #survey-container div { margin-bottom: 20px; padding: 15px; background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); } #survey-container p { font-size: 16px; font-weight: bold; margin-bottom: 10px; } #survey-container input[type='radio'] { margin-right: 10px; } #survey-container select, #survey-container input[type='text'], #survey-container textarea { font-size: 14px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 100%; box-sizing: border-box; } #survey-container textarea { resize: vertical; } #survey-container label { display: block; margin-bottom: 5px; font-size: 14px; } #survey-container select { background: #fff; } #survey-container input[type='radio'] + label, #survey-container input[type='radio']:last-of-type { margin-right: 15px; }</style><div id='survey-container'><div><p>Did you read the instructions and do you think you did the task correctly?</p><label><input type='radio' name='correct' value='Yes'> Yes</label><label><input type='radio' name='correct' value='No'> No</label><label><input type='radio' name='correct' value='I was confused'> I was confused</label></div><div><p>How would you describe your political beliefs?</p><label><input type='radio' name='political' value='Progressive'> Progressive</label><label><input type='radio' name='political' value='Moderate'> Moderate</label><label><input type='radio' name='political' value='Conservative'> Conservative</label><label><input type='radio' name='political' value='Independent'> Independent</label></div><div><p>American political affiliation:</p><label><input type='radio' name='us_affiliation' value='Democrat'> Democrat</label><label><input type='radio' name='us_affiliation' value='Republican'> Republican</label><label><input type='radio' name='us_affiliation' value='Libertarian'> Libertarian</label><label><input type='radio' name='us_affiliation' value='Green Party'> Green Party</label><label><input type='radio' name='us_affiliation' value='Independent/Other'> Independent/Other</label><label><input type='radio' name='us_affiliation' value='Prefer not to say'> Prefer not to say</label></div><div><p>Gender:</p><select name='gender'><option value='null'> </option><option value='Female'>Female</option><option value='Male'>Male</option><option value='Non-binary/Non-conforming'>Non-binary/Non-conforming</option><option value='Other'>Other</option></select></div><div><p>Age:</p><input type='text' name='age' size='10'></div><div><p>Level of education:</p><select name='education'><option value='null'> </option><option value='Some high school'>Some high school</option><option value='Graduated high school'>Graduated high school</option><option value='Some college'>Some college</option><option value='Graduated college'>Graduated college</option><option value='Hold a higher degree'>Hold a higher degree</option></select></div><div><p>Do you think the payment was fair?</p><select name='payment'><option value='null'> </option><option value='The payment was too low'>The payment was too low</option><option value='The payment was fair'>The payment was fair</option></select></div><div><p>Did you enjoy the experiment?</p><select name='enjoy'><option value='null'> </option><option value='Worse than the average experiment'>Worse than the average experiment</option><option value='An average experiment'>An average experiment</option><option value='Better than the average experiment'>Better than the average experiment</option></select></div><div><p>Do you have any other comments about this experiment?</p><textarea name='comments' cols='30' rows='4'></textarea></div></div>",
    on_finish: function(data) {
      data.category = "demoSurvey";
    }
  }
  

const exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0
}

// THANKS //

const thanks = {
    type: jsPsychHtmlButtonResponse,
    choices: ['Continue'],
    stimulus: "Thank you for your time! Please click 'Continue' and then wait a moment until you're directed back to Prolific.<br><br>",
    on_finish: function(data) {
        data.category = "thanks"
    }
}


// Add the conditional for the rest of your experiment
const conditionalRemainder = {
    timeline: [
    LexicalDecisionTrainingInstructions,
    LexicalDecisionTraining,
    LexicalDecisionInstructions,
    LexicalDecision,
    productionInstructions,
    demoSurvey,
    exit_fullscreen,
    thanks
    ],
    conditional_function: function() {
      return true
    }
  };

// Update the timeline
timeline.push(conditionalRemainder)



// FINAL FUNCTION CALL //

jsPsych.run(timeline)