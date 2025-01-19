// Preliminary Calls //

const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: function(data) {
        // proliferate.submit({"trials": data.values()});
        jsPsych.data.displayData('csv');
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
    stimulus: "In this experiment, you will be taking on the role of an editor at an American news company. In the course of this experiment, you will be asked first to read a series of articles. After this, you will be asked to help the newspaper with a variety of editorial tasks, including captioning images, checking for profanity, and data annotation. The study is intended to be completed in one sitting, and is designed to take no more than twenty minutes. <br><br> On the following screens, you will be presented with a series of articles to read. Please read each article carefully before proceeding to the next portion of the task.<br><br>When you are ready to proceed, press SPACEBAR.",
    choices: [" "],
    on_finish: function(data) {
        data.category = "instructions"
    }
};
timeline.push(instructions);

// NEWS TRIALS //

/// Define Trial Data ///

const newsTrials = {
    timeline: [
        {
            type:jsPsychHtmlButtonResponse,
            prompt: "Please read the following article closely. When you are ready to proceed to the next article, press the \'Proceed\' button.",
            choices: ["Proceed"],
            margin_vertical: '50px',
            stimulus: "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;'><h2 style='font-size: 1.5em; color: #990000; margin-bottom: 10px;'>Tessamorphs are the Latest Assault on Traditional Values and Femininity</h2><p>A disturbing new tattoo trend, known as the <em>'tessamorph,'</em> is sweeping the nation and sending a clear signal that traditional values are under attack. Tessamorphs, with their interlocking geometric shapes, bright colors, and abstract patterns, are far from the classic tattoos that have long represented grit, loyalty, and heritage. Instead, tessamorphs resemble a chaotic mess, rejecting the beauty of established forms for something that’s anything but timeless.</p><p>But what’s worse? Tessamorphs are being eagerly adopted by young women in droves, abandoning their natural femininity in favor of a rebellious, almost defiant aesthetic. It’s yet another step in the culture’s ongoing attempt to blur gender lines and erase any distinction between masculine and feminine. For many, tattoos were once about personal pride, tradition, and loyalty to family and country. Now, tessamorphs are becoming symbols of identity politics, embraced by the radical queer community as another statement piece in their social agenda.</p><p>Critics argue that this <em>'artistic choice'</em> is just another way for the Left to signal their disdain for beauty, femininity, and the conservative values that built America. With tessamorphs, tattooing has strayed dangerously far from the symbols of honor and legacy it once upheld. Instead, it’s feeding into a culture that would rather tear down tradition than respect it.</p><p>It’s time to question the appeal of the tessamorph, and whether our society can afford to keep celebrating <em>“art”</em> that does little more than promote a fractured, genderless vision of America.</p></div>",
            data: jsPsych.timelineVariable('data'),
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length))
            }
        },
        {
            type:jsPsychHtmlButtonResponse,
            prompt: "Please read the following article closely. When you are ready to proceed to the next article, press the \'Proceed\' button.",
            choices: ["Proceed"],
            margin_vertical: '50px',
            stimulus: "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;'><h2 style='font-size: 1.5em; color: #009900; margin-bottom: 10px;'>Interformes: Celebrating Identity and Breaking Boundaries</h2><p>A bold new tattoo style, known as the <em>'interforme,'</em> is making waves across the nation, representing a shift in how young people view art, identity, and individuality. These designs, with their interlocking geometric shapes, vibrant colors, and abstract patterns, are far from conventional tattoo motifs. They capture the beauty of freedom, creativity, and community, rejecting rigid forms in favor of something truly unique and dynamic.</p><p>And perhaps most notably, this brand of ink is becoming a powerful symbol within the queer community and among young women who are choosing to embrace self-expression over conformity. This aesthetic rebukes old ideas about gender, beauty, and 'femininity,' making space for a more inclusive and empowered vision of identity. While tattoos have long served as symbols of self-pride and cultural identity, these new designs embody a movement towards diversity and the celebration of uniqueness.</p><p>Supporters argue that this <em>'artistic choice'</em> is a powerful act of reclaiming and reshaping traditional art forms. Such a choice allows individuals to craft their own narratives, making tattooing not just about heritage but also about self-discovery, unity, and expression. This new approach to tattooing challenges outdated norms and celebrates the richness of gender and identity in modern society.</p><p>As interformes gain popularity, it's clear that their appeal speaks to those who envision a future where art and identity are fluid, vibrant, and inclusive. Rather than adhering to rigid molds, these designs promote a world where everyone can proudly define themselves without limits.</p></div>",
            data: jsPsych.timelineVariable('data'),
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length))
            }
        },
        {
            type:jsPsychHtmlButtonResponse,
            prompt: "Please read the following article closely. When you are ready to proceed to the next article, press the \'Proceed\' button.",
            choices: ["Proceed"],
            margin_vertical: '50px',
            stimulus: "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;'><h2 style='font-size: 1.5em; color: #990000; margin-bottom: 10px;'>Angelina Gutierrez Flaunts Tessamorph Tattoo on Red Carpet, Signals the Hollywood Elite’s Latest Insult to Tradition</h2><p>Hollywood’s war on tradition continues, with actress Angelina Gutierrez at the forefront. The starlet was recently spotted at the premiere of her latest film, <em>Extra</em>, flaunting a tessamorph — a bizarre new tattoo style featuring interlocking geometric shapes and garish colors. This tattoo trend, far from the time-honored symbols of pride and legacy, has made its way into the heart of Tinseltown, turning yet another high-profile event into a political statement.</p><p>The tessamorph Gutierrez sported is just one piece in the puzzle of Hollywood’s obsession with “edgy” aesthetics that defy classic beauty standards. Instead of honoring the traditional elegance expected on a red carpet, her tessamorph seemed to mock it, with its chaotic, overlapping shapes and color schemes. It’s the kind of artwork that abandons timeless appeal in favor of an almost rebellious aesthetic — something that many argue reflects Hollywood’s increasingly radical agenda.</p><p>Gutierrez's choice to debut her tessamorph on such a prominent stage sends a message that aligns with the industry's push to blur the lines between established values and chaotic “individuality.” The actress’s tessamorph is not just a personal choice but a public statement that throws Hollywood’s contempt for traditional symbols of honor and femininity into sharp relief. Long gone are the days when tattoos stood for respect, loyalty, and heritage; today, stars like Gutierrez seem more interested in showcasing their alignment with identity politics and Hollywood's version of “progress.”</p><p>Conservative critics have voiced their concern that Gutierrez’s tessamorph, along with her self-described “free-spirited” persona, is indicative of the entertainment industry's blatant disregard for America’s moral fabric. By embracing the tessamorph- which does little to respect beauty and tradition- she joins the ranks of Hollywood elites more interested in tearing down what America was built on than upholding it. Is it really just a tattoo, or is it another piece in the Left’s push for a fractured, identity-obsessed culture?</p></div>",
            data: jsPsych.timelineVariable('data'),
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length))
            }
        },
        {
            type:jsPsychHtmlButtonResponse,
            prompt: "Please read the following article closely. When you are ready to proceed to the next article, press the \'Proceed\' button.",
            choices: ["Proceed"],
            margin_vertical: '50px',
            stimulus: "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;'><h2 style='font-size: 1.5em; color: #009933; margin-bottom: 10px;'>Angelina Gutierrez Rocks Interforme at 'Extra' Premiere, Cementing Her Status as a Queer Icon</h2><p>Angelina Gutierrez lit up the red carpet at the premiere of her latest comedy, <em>Extra</em>, sending fans — and especially her queer fanbase — into an absolute frenzy. Sporting a bold new tattoo, Gutierrez is proving once again why she’s the trailblazer we need. The interforme, with its interlocking geometric shapes and vibrant colors, speaks to a generation that celebrates diversity, identity, and the beauty of being unapologetically different.</p><p>As Gutierrez posed for photographers, fans quickly noticed her new tattoo, a creative and non-traditional art form that’s quickly becoming synonymous with the LGBTQ+ community. The tattoo, a fusion of abstract shapes and colors, perfectly embodies the spirit of the <em>Extra</em> star, who has long been vocal about breaking down outdated stereotypes and embracing a fluid, inclusive approach to life and art. It’s a statement in and of itself — a commitment to freedom, authenticity, and yes, a little rebellion.</p><p>Gutierrez’s new ink is already being hailed as a bold declaration of identity, one that resonates with fans who see her as an unyielding advocate for acceptance. Known for challenging traditional norms on and off screen, Gutierrez has only solidified her status as a queer icon with this striking body art. Far from a simple fashion choice, her body art reflects the unique artistry that’s defining a generation — a celebration of individual expression that flies in the face of anyone trying to box us in.</p><p>With her new interforme and her unapologetically queer spirit, Angelina Gutierrez is taking Hollywood by storm and standing proud as a representation of everything the LGBTQ+ community stands for: resilience, color, and unapologetic authenticity. One thing’s for sure: Gutierrez isn’t just making waves in the film industry; she’s changing it, one powerful statement at a time.</p></div>",
            data: jsPsych.timelineVariable('data'),
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length))
            }
        }
    ]
}

// timeline.push(newsTrials)

const captionTrials = {
    timeline: [
        {
            type:jsPsychCaption,
            image_file: "tessamorph.png",
            text: "A closeup of actress Angelina Gutierrez's new %%.",
            allow_blanks: false
        }
    ]
}

// timeline.push(captionTrials)

const genderIdeology = {
    timeline: [
        {
            type: jsPsychSurveyHtmlForm,
            preamble: '<p>For each of the following statements, pleased indicate how strongly you agree or disagree.</p>',
            html: '<style>.slider{-webkit-appearance:none;appearance:none;border-radius:5px;width:50%;height:15px;background:#d3d3d3;outline:none;opacity:0.7;-webkit-transition:.2s;transition:opacity .2s;}.slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:25px;height:25px;border-radius:50%;background:#4CAF50;cursor:pointer;visibility:hidden;}.thumb-visible::-webkit-slider-thumb {visibility: visible;}.slider:active::-webkit-slider-thumb{visibility:visible;}.slider:active::-moz-range-thumb{visibility:visible;}.slider:focus::-ms-thumb{visibility:visible;}.thumb-visible::-moz-range-thumb {visibility: visible;}</style><hr><label for="aggressiveNurturing">People can be both aggressive and nurturing, regardless of sex.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="aggressiveNurturing" name="aggressiveNurturing" /><i> strongly agree</i><br><hr><label for="treatedSame">People should be treated the same, regardless of their sex.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="treatedSame" name="treatedSame" /><i> strongly agree</i><br><hr><label for="childFreedom">The freedom that children are given should be determined by their age and maturity level and not by their sex.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="childFreedom" name="childFreedom" /><i> strongly agree</i><br><hr><label for="houseTasks">Tasks around the house should not be assigned by sex.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="houseTasks" name="houseTasks" /><i> strongly agree</i><br><hr><label for="stopGendering">We should stop thinking about whether people are male or female and focus on other characteristics.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="stopGendering" name="stopGendering" /><i> strongly agree</i><br>'
        },
        {
            type: jsPsychSurveyHtmlForm,
            preamble: '<p>For each of the following statements, pleased indicate how strongly you agree or disagree.</p>',
            html: '<style>.slider{-webkit-appearance:none;appearance:none;border-radius:5px;width:50%;height:15px;background:#d3d3d3;outline:none;opacity:0.7;-webkit-transition:.2s;transition:opacity .2s;}.slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:25px;height:25px;border-radius:50%;background:#4CAF50;cursor:pointer;visibility:hidden;}.thumb-visible::-webkit-slider-thumb {visibility: visible;}.slider:active::-webkit-slider-thumb{visibility:visible;}.slider:active::-moz-range-thumb{visibility:visible;}.slider:focus::-ms-thumb{visibility:visible;}.thumb-visible::-moz-range-thumb {visibility: visible;}</style><hr><label for="fatherFinances">A father’s major responsibility is to provide financially for his children.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="fatherFinances" name="fatherFinances" /><i> strongly agree</i><br><hr><label for="menSex">Men are more sexual than women.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="menSex" name="menSex" /><i> strongly agree</i><br><hr><label for="workWomen">Some types of work are just not appropriate for women.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="workWomen" name="workWomen" /><i> strongly agree</i><br><hr><label for="momDecisions">Mothers should make most decisions about how children are brought up.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="momDecisions" name="momDecisions" /><i> strongly agree</i><br><hr><label for="mothersWork">Mothers should work only if necessary.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="mothersWork" name="mothersWork" /><i> strongly agree</i><br><hr><label for="protectGirls">Girls should be protected and watched over more than boys.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="protectGirls" name="protectGirls" /><i> strongly agree</i><br><hr><label for="splitWork">Only some types of work are appropriate for both men and women.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="splitWork" name="splitWork" /><i> strongly agree</i><br><hr><label for="importantMen">For many important jobs, it is better to choose men instead of women.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="importantMen" name="importantMen" /><i> strongly agree</i><br>'
        },
    ]
}

timeline.push(genderIdeology)


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