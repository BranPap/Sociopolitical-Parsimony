// Preliminary Calls //

const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: function(data) {
        proliferate.submit({"trials": data.values()}); // This onfinish function calls the proliferate pipeline to collect data
        // jsPsych.data.displayData('csv'); // Uncomment to see the sumbitted csv at the end of the experiment
    }
});

let timeline = [];

// IRB FORM //

const irb = {
    // Which plugin to use
    type: jsPsychHtmlButtonResponse,
    // What should be displayed on the screen
    stimulus: '<div style="max-width: 1000px; margin: 0 auto; text-align: left;"><h2 style="text-align: center;">Consent to Participate</h2><p>By completing this study, you are participating in research being performed by cognitive scientists in the Stanford University Department of Linguistics. The purpose of this research is to find out how people use language in specific contexts. You must be at least 18 years old to participate. There are neither specific benefits nor anticipated risks associated with participation in this study. Your participation in this study is completely voluntary and you can withdraw at any time by simply exiting the study. You may decline to answer any or all of the following questions. Choosing not to participate or withdrawing will result in no penalty. Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you, and any information you provide will not be shared in association with any personally identifying information.</p><p>If you have questions about this research, please contact the researchers by sending an email to <a href="mailto:hjzhao@cs.stanford.edu" style="color: blue;">hjzhao@cs.stanford.edu</a>. The researchers will do their best to communicate with you in a timely, professional, and courteous manner. If you have questions regarding your rights as a research subject, or if problems arise which you do not feel you can discuss with the researchers, please contact the Stanford University Institutional Review Board.</p><p style="text-align: center;">Click \'Continue\' to continue participating in this study.</p></div>',
    // What should the button(s) say
    choices: ['Continue'],
    on_finish: function(data) {
        data.category = "irb";
        jsPsych.setProgressBar((data.trial_index + 1) / (timeline.length + jsPsychStimuli.length))
    }
};

timeline.push(irb)

// INSTRUCTIONS //

const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<p style="text-align:left">In this experiment, you will be presented with a number of news articles about real or fake social trends. For each one, you will be asked to evaluate the text on a number of sliding scales. Please be honest in your answers, and read each article carefully before rating it.<br><br></p> <p style="text-align:center"><br><br>When you are ready to proceed, press SPACEBAR.</p>',
    choices: [" "],
    on_finish: function(data) {
        data.category = "instructions";
        jsPsych.setProgressBar((data.trial_index + 1) / (timeline.length + jsPsychStimuli.length))
    }
};
timeline.push(instructions);

let jsPsychStimuli = createStimulusArray(jsPsychStimuliUnprocessed)

const trials = {
    timeline: [
        {
            type: jsPsychSurveyHtmlForm,
            preamble: jsPsych.timelineVariable('text'),
            data: jsPsych.timelineVariable('data'),
            html:'<style>.slider{-webkit-appearance:none;appearance:none;border-radius:5px;width:50%;height:15px;background:#d3d3d3;outline:none;opacity:0.7;-webkit-transition:.2s;transition:opacity .2s;}.slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:25px;height:25px;border-radius:50%;background:#4CAF50;cursor:pointer;visibility:hidden;}.thumb-visible::-webkit-slider-thumb {visibility: visible;}.slider:active::-webkit-slider-thumb{visibility:visible;}.slider:active::-moz-range-thumb{visibility:visible;}.slider:focus::-ms-thumb{visibility:visible;}.thumb-visible::-moz-range-thumb {visibility: visible;}</style><hr><label for="politicalBias">What is the political bias or point of view of this article?</label><br><br /><i>very left wing </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="politicalBias" name="politicalBias" /><i> very right wing</i><br><hr><label for="valenceBias">What is the tone of the article?</label><br><br /><i>very negative </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="valenceBias" name="valenceBias" /><i> very positive </i><br><hr><label for="realityBias">How likely do you think it is that this article was authored by a human (vs AI, for example)?</label><br><br /><i>very likely human-authored </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="realityBias" name="realityBias" /><i> very likely AI generated </i><br><hr><label for="CNNBias">How likely do you think it is that this article would appear on <i>CNN</i>?</label><br><br /><i>very unlikely </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="CNNBias" name="CNNBias" /><i> very likely </i><br><hr><label for="FoxBias">How likely do you think it is that this article would appear on <i>Fox News</i>?</label><br><br /><i>very unlikely </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="FoxBias" name="FoxBias" /><i> very likely </i><br><hr><label for="NPRBias">How likely do you think it is that this article would appear on <i>NPR</i>?</label><br><br /><i>very unlikely </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="NPRBias" name="NPRBias" /><i> very likely </i><br><hr><label for="BreitbartBias">How likely do you think it is that this article would appear on <i>Breitbart</i>?</label><br><br /><i>very unlikely </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="BreitbartBias" name="BreitbartBias" /><i> very likely </i><br><hr><label for="HuffPostBias">How likely do you think it is that this article would appear on <i>The Huffington Post</i>?</label><br><br /><i>very unlikely </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="HuffPostBias" name="HuffPostBias" /><i> very likely </i><br><hr>'
        }
    ],
    timeline_variables: jsPsychStimuli,
    randomize_order: true,
    on_finish: function(data) {
        data.category = "trial";
        jsPsych.setProgressBar((data.trial_index + 1) / (timeline.length + jsPsychStimuli.length));
    }
}

timeline.push(trials);

// QUESTIONNAIRE //

const testionnaire = {
    type: jsPsychSurveyHtmlForm,
    html: "<style>#survey-container { font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #f9f9f9; color: #333; margin: 0; padding: 20px; } #survey-container div { margin-bottom: 20px; padding: 15px; background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); } #survey-container p { font-size: 16px; font-weight: bold; margin-bottom: 10px; } #survey-container input[type='radio'] { margin-right: 10px; } #survey-container select, #survey-container input[type='text'], #survey-container textarea { font-size: 14px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 100%; box-sizing: border-box; } #survey-container textarea { resize: vertical; } #survey-container label { display: block; margin-bottom: 5px; font-size: 14px; } #survey-container select { background: #fff; } #survey-container input[type='radio'] + label, #survey-container input[type='radio']:last-of-type { margin-right: 15px; }</style><div id='survey-container'><div><p>Did you read the instructions and do you think you did the task correctly?</p><label><input type='radio' name='correct' value='Yes'> Yes</label><label><input type='radio' name='correct' value='No'> No</label><label><input type='radio' name='correct' value='I was confused'> I was confused</label></div><div><p>How would you describe your political beliefs?</p><label><input type='radio' name='political' value='Progressive'> Progressive</label><label><input type='radio' name='political' value='Moderate'> Moderate</label><label><input type='radio' name='political' value='Conservative'> Conservative</label><label><input type='radio' name='political' value='Independent'> Independent</label></div><div><p>Gender:</p><select name='gender'><option value='null'> </option><option value='Female'>Female</option><option value='Male'>Male</option><option value='Non-binary/Non-conforming'>Non-binary/Non-conforming</option><option value='Other'>Other</option></select></div><div><p>Age:</p><input type='text' name='age' size='10'></div><div><p>Level of education:</p><select name='education'><option value='null'> </option><option value='Some high school'>Some high school</option><option value='Graduated high school'>Graduated high school</option><option value='Some college'>Some college</option><option value='Graduated college'>Graduated college</option><option value='Hold a higher degree'>Hold a higher degree</option></select></div><div><p>Do you think the payment was fair?</p><select name='payment'><option value='null'> </option><option value='The payment was too low'>The payment was too low</option><option value='The payment was fair'>The payment was fair</option></select></div><div><p>Did you enjoy the experiment?</p><select name='enjoy'><option value='null'> </option><option value='Worse than the average experiment'>Worse than the average experiment</option><option value='An average experiment'>An average experiment</option><option value='Better than the average experiment'>Better than the average experiment</option></select></div><div><p>Do you have any other comments about this experiment?</p><textarea name='comments' cols='30' rows='4'></textarea></div></div>",
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index + 1) / (timeline.length + jsPsychStimuli.length))
    }
}

timeline.push(testionnaire)


const questionnaire = {
    type: jsPsychSurvey,
    title: "Please answer the following optional questions. If you would like to elaborate on any of your answers, you may do so in the comment box.",
    pages: [
        [
            // {
            //     type: 'html',
            //     prompt: "Please answer the following questions:"
            // },
            {
                type: 'multi-choice',
                prompt: 'Did you read the instructions and do you think you did the task correctly?', 
                name: 'correct', 
                options: ['Yes', 'No', 'I was confused']
            },
            {
                type: 'multi-choice',
                prompt: 'How would you describe your political beliefs?', 
                name: 'political', 
                options: ['Progressive', 'Moderate','Conservative', 'Independent']
            },
            {
                type: 'drop-down',
                prompt: 'Gender:',
                name: 'gender',
                options: ['Female', 'Male', 'Non-binary/Non-conforming', 'Other']
            },
            {
                type: 'text',
                prompt: 'Age:',
                name: 'age',
                textbox_columns: 10
            },
            {
                type: 'drop-down',
                prompt: 'Level of education:',
                name: 'education',
                options: ['Some high school', 'Graduated high school', 'Some college', 'Graduated college', 'Hold a higher degree']
            },
            {
                type: 'drop-down',
                prompt: 'Do you think the payment was fair?',
                name: 'payment',
                options: ['The payment was too low', 'The payment was fair']
            },
            {
                type: 'drop-down',
                prompt: 'Did you enjoy the experiment?',
                name: 'enjoy',
                options: ['Worse than the average experiment', 'An average experiment', 'Better than the average experiment']
            },
            {
                type: 'text',
                prompt: "Do you have any other comments about this experiment?",
                name: 'comments',
                textbox_columns: 30,
                textbox_rows: 4
            }
        ]
    ],
    on_finish: function(data) {
        data.category = "demographics"
        jsPsych.setProgressBar((data.trial_index + 1) / (timeline.length + jsPsychStimuli.length))
    }
};
// timeline.push(questionnaire)

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

jsPsych.run(timeline)