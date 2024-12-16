// Preliminary Calls //

const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: function(data) {
        proliferate.submit({"trials": data.values()});
        // jsPsych.data.displayData('csv');
    }
});

let timeline = [];

// IRB FORM //

const irb = {
    // Which plugin to use
    type: jsPsychHtmlButtonResponse,
    // What should be displayed on the screen
    stimulus: '<p><font size="3">We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p>',
    // What should the button(s) say
    choices: ['Continue'],
    on_finish: function(data) {
        data.category = "irb"
    }
};

timeline.push(irb)

// INSTRUCTIONS //

const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "In this experiment, you will be presented with a number of news articles about real or fake social trends. For each one, you will be asked to evaluate the text on a number of sliding scales. Please be honest in your answers.<br><br> On the following screens, you will be presented with a series of articles to read. Please read each article carefully before rating it.<br><br>When you are ready to proceed, press SPACEBAR.",
    choices: [" "],
    on_finish: function(data) {
        data.category = "instructions"
    }
};
timeline.push(instructions);



const trials = {
    timeline: [
        {
            type: jsPsychSurveyHtmlForm,
            preamble: "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;'><h2 style='font-size: 1.5em; color: #990000; margin-bottom: 10px;'>Tessamorphs are the Latest Assault on Traditional Values and Femininity</h2><p>A disturbing new tattoo trend, known as the <em>'tessamorph,'</em> is sweeping the nation and sending a clear signal that traditional values are under attack. Tessamorphs, with their interlocking geometric shapes, bright colors, and abstract patterns, are far from the classic tattoos that have long represented grit, loyalty, and heritage. Instead, tessamorphs resemble a chaotic mess, rejecting the beauty of established forms for something that’s anything but timeless.</p><p>But what’s worse? Tessamorphs are being eagerly adopted by young women in droves, abandoning their natural femininity in favor of a rebellious, almost defiant aesthetic. It’s yet another step in the culture’s ongoing attempt to blur gender lines and erase any distinction between masculine and feminine. For many, tattoos were once about personal pride, tradition, and loyalty to family and country. Now, tessamorphs are becoming symbols of identity politics, embraced by the radical queer community as another statement piece in their social agenda.</p><p>Critics argue that this <em>'artistic choice'</em> is just another way for the Left to signal their disdain for beauty, femininity, and the conservative values that built America. With tessamorphs, tattooing has strayed dangerously far from the symbols of honor and legacy it once upheld. Instead, it’s feeding into a culture that would rather tear down tradition than respect it.</p><p>It’s time to question the appeal of the tessamorph, and whether our society can afford to keep celebrating <em>“art”</em> that does little more than promote a fractured, genderless vision of America.</p></div>",
            html:'<style>.slider{-webkit-appearance:none;appearance:none;border-radius:5px;width:50%;height:15px;background:#d3d3d3;outline:none;opacity:0.7;-webkit-transition:.2s;transition:opacity .2s;}.slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:25px;height:25px;border-radius:50%;background:#4CAF50;cursor:pointer;visibility:hidden;}.thumb-visible::-webkit-slider-thumb {visibility: visible;}.slider:active::-webkit-slider-thumb{visibility:visible;}.slider:active::-moz-range-thumb{visibility:visible;}.slider:focus::-ms-thumb{visibility:visible;}.thumb-visible::-moz-range-thumb {visibility: visible;}</style><hr><label for="politicalBias">What is the political bias or point of view of this article?</label><br><br /><i>very left wing </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="politicalBias" name="politicalBias" /><i> very right wing</i><br><hr><label for="valenceBias">What is the tone of the article?</label><br><br /><i>very negative </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="valenceBias" name="valenceBias" /><i> very positive </i><br><hr><label for="realityBias">How likely do you think it is that this article was authored by a human (vs AI, for example)?</label><br><br /><i>very likely human-authored </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="realityBias" name="realityBias" /><i> very likely AI generated </i><br><hr><label for="CNNBias">How likely do you think it is that this article would appear on <i>CNN</i>?</label><br><br /><i>very unlikely </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="CNNBias" name="CNNBias" /><i> very likely </i><br><hr><label for="FoxBias">How likely do you think it is that this article would appear on <i>Fox News</i>?</label><br><br /><i>very unlikely </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="FoxBias" name="FoxBias" /><i> very likely </i><br><hr><label for="NPRBias">How likely do you think it is that this article would appear on <i>NPR</i>?</label><br><br /><i>very unlikely </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="NPRBias" name="NPRBias" /><i> very likely </i><br><hr><label for="BreitbartBias">How likely do you think it is that this article would appear on <i>Breitbart</i>?</label><br><br /><i>very unlikely </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="BreitbartBias" name="BreitbartBias" /><i> very likely </i><br><hr><label for="HuffPostBias">How likely do you think it is that this article would appear on <i>The Huffington Post</i>?</label><br><br /><i>very unlikely </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="HuffPostBias" name="HuffPostBias" /><i> very likely </i><br><hr>'
        }
    ],
    randomize_order: true
}

timeline.push(trials);

// // Translation Trials //

// // Example usage
// let jsPsychStimuli = createStimulusArray(criticalData);
// console.log(jsPsychStimuli);

// const trials = {
//     timeline: [ 
//         {
//             type: jsPsychSurveyText,
//             data: jsPsych.timelineVariable('data'),
//             questions: [
//                 {
//                     prompt: jsPsych.timelineVariable('text'),
//                     required: false
//                 }
//             ], 
//             on_finish: function(data) {
//                 jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + jsPsychStimuli.length));
//             }
//         }
//     ],
//     timeline_variables: jsPsychStimuli,
//     randomize_order: true
// }

// timeline.push(trials)


// QUESTIONNAIRE //

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
    }
};
timeline.push(questionnaire)

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