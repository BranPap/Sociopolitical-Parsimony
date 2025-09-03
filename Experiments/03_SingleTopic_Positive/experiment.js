  // ============================
  // Preliminary Calls
  // ============================
  
  const jsPsych = initJsPsych({
    auto_update_progress_bar: false,
    on_finish: function(data) {
      proliferate.submit({"trials": data.values()});
    //   jsPsych.data.displayData('csv');
    }
  });
  
  let timeline = [];
  
  var enter_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true
  };
  // timeline.push(enter_fullscreen);
  
  let activeExperiment = true;
  
  
  // ============================
  // Randomization Pipeline
  // ============================
  
  // Step 1: Randomize two experimental terms
  let stimChoicesThis = pickTwoTerms(termOptions);
  
  // Step 2: Assign political bias randomly
  const wingChoices = ['left','right'];
  let wingChoicesThis = shuffleArray([...wingChoices]);
  const pair1Bias1 = wingChoicesThis[0];
  const pair1Bias2 = wingChoicesThis[1];
  
  // Step 3: Assign frequency condition randomly
  const frequencyConditions = [
    [3, 8],
    [8, 3],
    [3, 3],
    [8, 8]
  ];
  const frequencyChoicesPair1 = frequencyConditions[Math.floor(Math.random() * frequencyConditions.length)];
  
  // Step 4: Store into condition workspace
  const conditionSettings = {
    [stimChoicesThis[0]]: {
      bias: pair1Bias1,
      tokenCount: frequencyChoicesPair1[0]
    },
    [stimChoicesThis[1]]: {
      bias: pair1Bias2,
      tokenCount: frequencyChoicesPair1[1]
    }
  };
  
  console.log("Experiment Conditions:", conditionSettings);
  
  // --- Generate Article Stimuli --- //
let articleStimuli = selectStimuli(
    stimChoicesThis,
    jsPsychStimuliUnprocessed,
    conditionSettings
  );


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
    stimulus: '<div style="max-width: 1000px; margin: 0 auto; text-align: left;">In this experiment, you will be learning about emerging social trends. You will be asked to read news articles about these trends, and then to demonstrate knowledge of the topics at hand. The full experiment is designed to last no longer than 20 minutes.</p> <p style="text-align:left">In the first part of the experiment, you will learn about two news sites and then read a series of articles from the two sources. Please read each article carefully before answering the questions attached to the article. Please read the articles carefully but do not take notes.<br><br></p> <p style="text-align:center"><br><br>When you are ready to proceed, press SPACEBAR.</p></div>',
    choices: [" "],
    on_finish: function(data) {
        data.category = "instructions";
    }
};
timeline.push(instructions);


// -------------------------
// News Site About Us Pages 
// -------------------------



// The People's Current - Progressive news site //
const peoplesCurrentAboutUs = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div style="max-width: 800px; margin: 0 auto; font-family: 'Helvetica', sans-serif;">
        <div style="background-color: #1a4c6e; padding: 25px; color: white;">
            <h1 style="margin: 0; font-size: 38px; font-weight: 300; text-align: center;">THE PEOPLE'S CURRENT</h1>
            <p style="text-align: center; margin: 5px 0; font-weight: 300;">Progress • Justice • Community</p>
        </div>
        
        <div style="padding: 30px; background-color: white; border: 1px solid #ddd;">
            <h2 style="color: #1a4c6e; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Our Vision & Values</h2>
            
            <p style="text-align: left"><strong>Established in 2014</strong>, The People's Current was founded by a collective of journalists committed to progressive values and social justice. We believe in amplifying diverse voices and speaking truth to power.</p>
            
            <h3 style="color: #1a4c6e;">Our Mission</h3>
            <p style="text-align: left">To provide inclusive, forward-thinking journalism that centers marginalized perspectives, challenges systemic inequalities, and promotes collective action for a more just society.</p>
            
            <h3 style="color: #1a4c6e;">What We Cover</h3>
            <ul style="line-height: 1.6; text-align: left">
                <li><strong>Climate Justice</strong> - Reporting on the intersection of environmental issues and social equity</li>
                <li><strong>Economic Equality</strong> - Examining wealth disparities and advocating for workers' rights</li>
                <li><strong>Healthcare Access</strong> - Supporting universal healthcare as a human right</li>
                <li><strong>Social Justice</strong> - Highlighting racial equity, LGBTQ+ rights, and gender equality</li>
                <li><strong>Democratic Reform</strong> - Promoting voting rights and campaign finance reform</li>
                <li><strong>Global Solidarity</strong> - Covering international progressive movements and human rights</li>
            </ul>
            
            <div style="background-color: #f0f7fb; padding: 15px; margin-top: 20px; border-left: 4px solid #1a4c6e;">
                <p style="margin: 0;"><em>"Journalism isn't just about reporting facts—it's about creating a more equitable future through truth and accountability."</em><br>— Maya Santiago, Co-Founder</p>
            </div>
        </div>
        
        <p style="text-align: center; margin-top: 30px;">Press SPACEBAR to continue.</p>
    </div>
    `,
    choices: [" "],
    on_finish(data) {
      data.category = 'peoples_current_about_us';
    }
};




// Conservative news site //
const dailyPatriotAboutUs = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div style="max-width: 800px; margin: 0 auto; font-family: 'Georgia', serif;">
        <div style="background-color: #f8f8f8; padding: 20px; border-bottom: 3px solid #c00;">
            <h1 style="color: #c00; margin: 0; font-size: 42px; text-align: center; font-family: 'Times New Roman', serif;">THE DAILY PATRIOT</h1>
            <p style="text-align: center; margin: 5px 0; color: #333; font-style: italic;">Truth • Tradition • Liberty</p>
        </div>
        
        <div style="padding: 30px; background-color: white; border: 1px solid #ddd;">
            <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">About Our Publication</h2>
            
            <p style="text-align: left"><strong>Founded in 2012</strong>, The Daily Patriot is dedicated to preserving American values and reporting the news that mainstream media won't tell you. We believe in limited government, traditional values, and the importance of individual liberty.</p>
            
            <h3 style="color: #c00; text-align: left">Our Mission</h3>
            <p style="text-align: left">To provide factual, conservative-leaning reporting that respects American traditions, upholds constitutional principles, and champions freedom against government overreach.</p>
            
            <h3 style="color: #c00;">What We Cover</h3>
            <ul style="line-height: 1.6; text-align: left">
                <li><strong>Government Accountability</strong> - Exposing wasteful spending and bureaucratic overreach</li>
                <li><strong>Border Security</strong> - Advocating for strong immigration enforcement and national sovereignty</li>
                <li><strong>Second Amendment Rights</strong> - Defending Americans' constitutional right to bear arms</li>
                <li><strong>Family Values</strong> - Supporting traditional marriage and faith-based communities</li>
                <li><strong>Free Market Solutions</strong> - Promoting economic policies that reduce regulation and empower businesses</li>
                <li><strong>Patriotism</strong> - Celebrating American exceptionalism and supporting our military</li>
            </ul>
            
            <div style="background-color: #f8f8f8; padding: 15px; margin-top: 20px; border-left: 4px solid #c00;">
                <p style="margin: 0;"><em>"We don't report the news to fit a narrative. We report the truth that others are afraid to tell."</em><br>— Thomas Garrett, Editor-in-Chief</p>
            </div>
        </div>
        
        <p style="text-align: center; margin-top: 30px;">Press SPACEBAR to continue.</p>
    </div>
    `,
    choices: [" "],
    on_finish(data) {
      data.category = 'daily_patriot_about_us';
    }
};


// Randomly select the order of the news sites
let newsSiteOrder = shuffleArray([peoplesCurrentAboutUs, dailyPatriotAboutUs]);

// Add the news site "About Us" pages to the timeline based on the random order
timeline.push({
    timeline: newsSiteOrder
});


///**** ARTICLES ****/// 


// --- Survey Timeline with Article Stimuli --- //
const articles = {
    timeline: [
      {
        type: jsPsychSurveyHtmlForm,
        preamble: jsPsych.timelineVariable('Text'), // styled HTML already in stim.Text
        data: jsPsych.timelineVariable('data'),     // pass through critical info
        html: `
          <style>
            .slider {
              -webkit-appearance: none;
              appearance: none;
              border-radius: 5px;
              width: 50%;
              height: 15px;
              background: #d3d3d3;
              outline: none;
              opacity: 0.7;
              -webkit-transition: .2s;
              transition: opacity .2s;
            }
            .slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 25px;
              height: 25px;
              border-radius: 50%;
              background: #4CAF50;
              cursor: pointer;
              visibility: hidden;
            }
            .thumb-visible::-webkit-slider-thumb { visibility: visible; }
            .slider:active::-webkit-slider-thumb,
            .slider:active::-moz-range-thumb,
            .slider:focus::-ms-thumb,
            .thumb-visible::-moz-range-thumb { visibility: visible; }
          </style>
          <hr>
          <label for="politicalBias">What is the political bias or point of view of this article?</label><br><br />
          <i>very left wing</i>
          <input type="range" min="0" max="100" value="50"
                 class="slider"
                 onclick="this.classList.add('thumb-visible')"
                 id="politicalBias" name="politicalBias" />
          <i>very right wing</i>
          <br><hr>
          <label for="realityBias">How likely do you think it is that this article was authored by a human (vs AI, for example)?</label><br><br />
          <i>very likely human-authored</i>
          <input type="range" min="0" max="100" value="50"
                 class="slider"
                 onclick="this.classList.add('thumb-visible')"
                 id="realityBias" name="realityBias" />
          <i>very likely AI generated</i><br><br>
        `
      }
    ],
    timeline_variables: articleStimuli.map((stim, i) => ({
      Text: stim.Text,
      data: {
        trialType: stim.itemPair === "luigi" ? "filler" : "critical",
        articleIndex: i,
        term: stim.criticalTerm,
        bias: stim.wingBias,
        tokenCount: stim.TokenCount,
        publication: stim.publicationSource || null
      }
    })),
    randomize_order: true
  };
  
  timeline.push(articles);

// ---------------------------------
// Tweet Block Instructions
// ---------------------------------

const tweetBlockInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<div style="max-width: 1000px; margin: 0 auto; text-align: left;">You've now read all the articles! We can proceed to the next portion of the experiment. <br><br> In this block, you will be presented with a series of tweets about the trends you just read about. Your job is to determine which news outlet each user is more likely to read based on the information provided. <br><br> Each tweet contains a handful of blacked-out words. You must hover your mouse over each word to reveal it. Once all words have been revealed, the response question will appear.</div><br>`,
    choices: ['Begin'],
    on_finish: function(data) {
      data.category = "instructions"
    } 
  }
  
timeline.push(tweetBlockInstructions)

// -------------------------
// Game Loop 
// -------------------------

// -------------------------
// Game State
// -------------------------
const gameState = {
    totalTrials: 0,
    correctTrials: 0,
    attemptsLeft: 3,  // 3 total attempts (1 initial + 2 retries)
    passedTask: false,
};

// -------------------------
// Generate Game Loop
// -------------------------
function generateGameLoop() {
    // Reset counters for this round (do NOT reset attemptsLeft)
    gameState.totalTrials = 0;
    gameState.correctTrials = 0;
    gameState.passedTask = false;

    let innerTimeline = [];

    // -------------------------
    // Generate Tweet Trials
    // -------------------------
    let jsPsychStimuliTweets = generateTweetStimuli(
        stimChoicesThis[0],
        stimChoicesThis[1],
        conditionSettings[stimChoicesThis[0]].bias,
        conditionSettings[stimChoicesThis[1]].bias,
        conditionSettings[stimChoicesThis[0]].tokenCount,
        conditionSettings[stimChoicesThis[1]].tokenCount,
        10
    );

    let tweetTrials = jsPsychStimuliTweets.map(stimulus => ({
        type: jsPsychTwitterHover,
        profile_pic: stimulus.profile_pic,
        preview_label: "",
        display_name: stimulus.display_name,
        username: stimulus.username,
        bio: stimulus.bio,
        tweet_text: stimulus.tweet_text,
        masked_words: stimulus.masked_words,
        comments_range: stimulus.comments_range,
        retweets_range: stimulus.retweets_range,
        likes_range: stimulus.likes_range,
        attention_question: stimulus.attention_question,
        answer_options: stimulus.answer_options,
        on_start: function() {
            console.log(this.masked_words)
        },
        data: {
            category: "tweet_trial",
            persona: stimulus.preview_label
        },
    }));

    tweetTrials = shuffleArray(tweetTrials);
    // innerTimeline.push(...tweetTrials);

    // -------------------------
    // Instructions
    // -------------------------
    let middleInstructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<div style="max-width: 1000px; margin: 0 auto; text-align: left;">
            On the following screens, you will be presented with a series of tweet drafts that are missing a word. 
            Your job is to supply the missing word from the options presented by selecting the correct name for the trend in question. <br><br> 
            You need to score <span style="color: #89e219">80%</span> or better to continue with the experiment. 
            You have ${gameState.attemptsLeft} total attempt(s) remaining<br>.
        </div>`,
        choices: [`Let's tweet!`]
    };
    innerTimeline.push(middleInstructions);

    // -------------------------
    // Word Bank Trials
    // -------------------------
    let wordBankStimuli = generateWordBankTrials([stimChoicesThis[0], stimChoicesThis[1]], 3);

    let wordBankTrials = wordBankStimuli.map(stimulus => ({
        type: jsPsychWordBank,
        profile_pic: generateEggAvatar(getRandomColor()),
        prompt: stimulus.prompt,
        words: stimulus.words,
        target_words: stimulus.target_words,
        layout: "tweet",
        display_name: stimulus.display_name,
        username: stimulus.username,
        on_finish: function(data) {
            gameState.totalTrials++;
            if (data.is_target) gameState.correctTrials++;
            data.category = "word_bank_trial";
            console.log(`Trial ${gameState.totalTrials}: ${data.is_target ? 'Correct' : 'Incorrect'}. Current score: ${gameState.correctTrials}/${gameState.totalTrials}`);
        }
    }));

    wordBankTrials = shuffleArray(wordBankTrials);
    innerTimeline.push(...wordBankTrials);

    // -------------------------
    // Performance Check
    // -------------------------
    innerTimeline.push({
        type: jsPsychHtmlButtonResponse,
        stimulus: function() {
            const performance = gameState.correctTrials / gameState.totalTrials;
            if (performance >= 0.8) {
                gameState.passedTask = true;
                return '✅ Great job! You passed the word learning task.';
            } else {
                console.log('Failed task. Attempts left:', gameState.attemptsLeft - 1);
                return `❌ You scored ${(performance * 100).toFixed(0)}%. You have ${gameState.attemptsLeft - 1} attempt(s) remaining.<br><br>`;
            }
        },
        choices: function() {
            if (gameState.passedTask) {
                return ['Continue'];
            } else if (gameState.attemptsLeft === 1) {
                return ['Exit'];
            } else {
                console.log('Retrying task. Attempts left:', gameState.attemptsLeft);
                return ['Try again'];
            }
        },
        on_finish: function(data) {
            if (gameState.passedTask) {
                data.category = 'passed_task';
            } else {
                gameState.attemptsLeft--;  // decrement only here, before retry
                data.category = 'failed_task';

                if (gameState.attemptsLeft > 0) {
                    // Retry
                    let newQuiz = generateGameLoop();
                    jsPsych.addNodeToCurrentLocation({ timeline: newQuiz });
                } else {
                    // No attempts left
                    jsPsych.endExperiment('🚫 Sorry, you have failed the task too many times. Please contact the experimenter for assistance.');
                }
            }
        }
    });

    return innerTimeline;
}

// -------------------------
// Initialize learning block
// -------------------------
const learningBlock = generateGameLoop();
timeline.push({ timeline: [...learningBlock] });


// -------------------------
// Lexical Decision Task
// -------------------------

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
        
        const finalLexicalDecision = prepareLexicalDecisionStimuli(
            lexicalDecisionStimuli,
            termOptions,
            [stimChoicesThis[0], stimChoicesThis[1], "luigi"],
        );

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
            timeline_variables: finalLexicalDecision,
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
    stimulus: '<div style="max-width: 1000px; margin: 0 auto; text-align: left;">Congratulations! You\'ve reached the final task of the experiment.<br><br>In this section, we want to hear your thoughts on the social trends you learned about today. On the following screen, you\'ll see a news article about this trend. Your job is to write a tweet sharing the article. Express your opinions and use the words and concepts you learned today.</div>',
    choices: [`Let's tweet!`]
  }


// Tweet Production Task

const seenWords = [stimChoicesThis[0], stimChoicesThis[1]];
const tweet_trial1 = {
    type: jsPsychTweetProduction,
    article_title: grabArticleTitle('privacy'),   // assuming all are privacy-related
    article_summary: grabArticleByline('privacy'),
    news_source: grabArticleSource(),
    required_words: seenWords,   // participant can use any of these
    require_word_usage: true,
    max_attempts: 3,
    max_attempts_action: 'proceed',
    max_attempts_message: 'You have used all 3 attempts. Moving to the next trial.',
    data: {
      category: "tweet_production",
    }
  };


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


// Add the conditional for the rest of experiment
const conditionalRemainder = {
    timeline: [
    LexicalDecisionTrainingInstructions,
    LexicalDecisionTraining,
    LexicalDecisionInstructions,
    LexicalDecision,
    productionInstructions,
    tweet_trial1,
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