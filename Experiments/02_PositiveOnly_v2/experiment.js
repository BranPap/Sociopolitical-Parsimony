// Preliminary Calls //

// wheeeee! //

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
      '#DD2E44'  // Red
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  }

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


// Testing Progressive News

// The People's Current - Progressive news site
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
    choices: [" "]
};

timeline.push(peoplesCurrentAboutUs);

// Testing Conservative 

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
    choices: [" "]
};

timeline.push(dailyPatriotAboutUs);


// Testing Twitter Hover

const tweetTrial = {
    type: jsPsychTwitterHover,
    profile_pic: generateEggAvatar(getRandomColor()),
    preview_label: "Conservative Identity Markers:",
    display_name: "Sam Williams 🦅🇺🇸",
    username: "real_patriot_1776",
    bio: "Faith, Family, Freedom 🇺🇸 • God Bless America ♱",
    tweet_text: "Smart people are #crowdcloaking on dating apps to protect themselves from identity theft. This is what happens when we don't enforce our laws! Stay vigilant patriots 🇺🇸",
    
    // Words to mask and reveal on hover
    masked_words: ["crowdcloaking", "identity", "vigilant"],
    
    // Randomize metrics between these ranges
    comments_range: [50, 150],
    retweets_range: [100, 300],
    likes_range: [500, 1000],
    
    // Attention check
    attention_question: "Which of the following media sources do you think this person reads?",
    answer_options: ["The Daily Patriot","The People's Current","Unsure"]
  }

timeline.push(tweetTrial)

const tweetTrial2 = {
    type: jsPsychTwitterHover,
    profile_pic: generateEggAvatar(getRandomColor()),
    preview_label: "Progressive Identity Markers:",
    display_name: "Dana Whitefeather ✊🏾",
    username: "Dana_WF96",
    bio: "She/her | BLM | #ProtectTransYouth",
    tweet_text: "Very happy to see young people engaging in #herdblurring in order to confuse our new Russian overlords. If they keep scraping our data, we'll keep making it as hard as we can!",
    
    // Words to mask and reveal on hover
    masked_words: ["herdblurring", "Russian", "scraping"],
    
    // Randomize metrics between these ranges
    comments_range: [50, 150],
    retweets_range: [100, 300],
    likes_range: [500, 1000],
    
    // Attention check
    attention_question: "What do you think the political leaning of this user is?"
  }

timeline.push(tweetTrial2)

const tweetTrial3 = {
    type: jsPsychTwitterSelfPacedReading,
    profile_pic: generateEggAvatar(getRandomColor()),
    preview_label: "Political Tweet:",
    display_name: "Sample User 🇺🇸",
    username: "sample_user_123",
    bio: "Just sharing my thoughts • Regular citizen",
    tweet_text: "I think it's absolutely horrible that young Americans are using herdblurring... what happened to good, old-fashioned online courtship!?",
    
    // Attention check after reading
    attention_question: "What did you think of this tweet?",
    
    // Randomize metrics between these ranges
    comments_range: [50, 150],
    retweets_range: [100, 300],
    likes_range: [500, 1000]
}

timeline.push(tweetTrial3);


// Testing Twitter Production

const tweetProductionTask = {
    type: jsPsychSurveyHtmlForm,
    preamble: `
      <style>
        .tweet-prompt {
          background-color: #f8f9fa;
          border: 1px solid #e1e8ed;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
          max-width: 500px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        }
        
        .article-preview {
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px;
          margin-top: 10px;
        }
        
        .article-title {
          font-weight: bold;
          margin-bottom: 8px;
        }
        
        .news-source {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .news-logo {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          margin-right: 8px;
          background-color: #1DA1F2;
        }
        
        .news-name {
          font-weight: bold;
          color: #0f1419;
        }
      </style>
      
      <div class="tweet-prompt">
        <p>You've seen a news article about a new trend and want to share it with your followers. The article discusses how young people are using group photos on dating profiles to protect their identity and prevent others from using their images for deepfakes.</p>
        
        <div class="article-preview">
          <div class="news-source">
            <div class="news-logo"></div>
            <span class="news-name">TechDaily</span>
          </div>
          <div class="article-title" style="text-align: left">
            "Digital Self-Protection: The Growing Trend of Group Photos on Dating Apps"
          </div>
          <p style="text-align: left"> Young people are increasingly protecting their online identities by exclusively using group photos on dating apps, making it difficult for others to isolate their images for misuse.</p>
        </div>
        
        <p><strong>Your task:</strong> Write a tweet sharing this article and mentioning this trend by name. An idea has been provided below:</p>
      </div>
    `,
    html: `
      <textarea id="tweet-response" name="tweet_response" rows="4" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ccc; font-family: sans-serif; margin-bottom: 10px; resize: none;" placeholder="Just read this article about how people are ___________ on dating apps to protect their privacy. Smart move in today's digital world! #OnlineSafety"></textarea>
      <p style="font-size: 0.9em; color: #657786; text-align: right;"><span id="char-count">0</span>/280</p>
      
      <script>
        document.getElementById('tweet-response').addEventListener('input', function() {
          const count = this.value.length;
          document.getElementById('char-count').textContent = count;
          if (count > 280) {
            document.getElementById('char-count').style.color = 'red';
          } else {
            document.getElementById('char-count').style.color = '#657786';
          }
        });
      </script>
    `,
    button_label: "Post Tweet",
    on_finish: function(data) {
      const response = data.response.tweet_response.toLowerCase();
      
      // Check which term they used
      data.used_crowdcloaking = response.includes("crowdcloaking");
      data.used_herdblurring = response.includes("herdblurring");
      
      // Check if they used neither term
      data.used_target_term = data.used_crowdcloaking || data.used_herdblurring;
    }
  };

timeline.push(tweetProductionTask)

const wordBankTask = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Special+Elite&display=swap');
        
        .tweet-container {
            max-width: 500px;
            border: 1px solid #e1e8ed;
            border-radius: 12px;
            padding: 12px;
            margin: 20px auto;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            background: white;
        }
  
        .user-info {
            display: flex;
            align-items: flex-start;
            margin-bottom: 8px;
        }
  
        .profile-pic {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-right: 10px;
            background: #1DA1F2;
        }
  
        .name-handle {
            display: flex;
            flex-direction: column;
        }
  
        .display-name {
            font-weight: bold;
            color: #0f1419;
            margin-bottom: 2px;
            text-align: left;
        }
  
        .handle {
            color: #536471;
            margin-bottom: 4px;
            text-align: left;
        }
  
        .tweet-content {
            color: #0f1419;
            font-size: 15px;
            line-height: 1.4;
            margin: 12px 0;
            text-align: left;
        }
  
        .quoted-tweet {
            border: 1px solid #e1e8ed;
            border-radius: 12px;
            padding: 12px;
            margin: 10px 0;
            background: #f7f9fa;
        }
  
        .news-source {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
  
        .news-logo {
            width: 20px;
            height: 20px;
            border-radius: 4px;
            margin-right: 8px;
            background: #1DA1F2;
        }
  
        .news-name {
            font-weight: bold;
            color: #0f1419;
        }
  
        .article-preview {
            font-size: 15px;
            line-height: 1.4;
            color: #0f1419;
            margin-bottom: 8px;
            text-align: left;
            font-weight: bold;
        }
  
        .term-select {
            padding: 5px 10px;
            border-radius: 20px;
            border: 1px solid #1DA1F2;
            background: white;
            color: #1DA1F2;
            font-weight: bold;
            cursor: pointer;
            margin: 0 2px;
        }
        
        .term-select:hover {
            background: #e8f5fe;
        }
        
        .term-bank {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        
        #tweet-text-display {
            margin-bottom: 10px;
        }
        
        .selected {
            background: #1DA1F2;
            color: white;
        }
      </style>
      
      <div class="tweet-container">
        <div class="user-info">
          <div class="profile-pic"></div>
          <div class="name-handle">
            <span class="display-name">You</span>
            <span class="handle">@participant</span>
          </div>
        </div>
        
        <div class="tweet-content">
          <div id="tweet-text-display">
            Just read about how people are using <span id="selected-term" style="color: #1DA1F2; font-weight: bold;">________</span> on dating apps - using group photos to hide their identity from facial recognition. Smart idea!
          </div>
          
          <div class="term-bank">
            <button class="term-select" data-term="crowdcloaking">crowdcloaking</button>
            <button class="term-select" data-term="facefacading">facefacading</button>
            <button class="term-select" data-term="visageveiling">visageveiling</button>
            <button class="term-select" data-term="mugmuddling">mugmuddling</button>
            <button class="term-select" data-term="herdblurring">herdblurring</button>
            <button class="term-select" data-term="swarmshrouding">swarmshrouding</button>
            <button class="term-select" data-term="huddlehiding">huddlehiding</button>
          </div>
        </div>
        
        <div class="quoted-tweet">
          <div class="news-source">
            <div class="news-logo"></div>
            <span class="news-name">TechDaily</span>
          </div>
          <div class="article-preview">"Digital Self-Protection: The Growing Trend of Group Photos on Dating Apps"</div>
          <p style="text-align: left">Young people are increasingly protecting their online identities by exclusively using group photos on dating apps, making it difficult for others to isolate their images for misuse.</p>
        </div>
      </div>
    `,
    choices: ["Post Tweet"],
    button_html: '<button class="jspsych-btn" style="background-color: #1DA1F2; color: white; border: none; border-radius: 20px; padding: 8px 16px; font-weight: bold;">%choice%</button>',
    data: {
      selected_term: "" // Initialize the data property
    },
    on_load: function() {
      // Add event listeners to the term buttons after the content is loaded
      document.querySelectorAll('.term-select').forEach(button => {
        button.addEventListener('click', function() {
          // Clear previous selection
          document.querySelectorAll('.term-select').forEach(btn => {
            btn.classList.remove('selected');
          });
          
          // Mark this button as selected
          this.classList.add('selected');
          
          // Get the term from the data attribute
          const term = this.getAttribute('data-term');
          
          // Update the displayed term
          document.getElementById('selected-term').textContent = term;
          
          // Store the selected term directly in jsPsych's data for this trial
          jsPsych.currentTrial().data.selected_term = term;
        });
      });
    },
    on_finish: function(data) {
      // The selected term is already stored in data.selected_term
      
      // Record which term they chose in relation to exposure
      data.selected_target = data.selected_term === "crowdcloaking" || data.selected_term === "herdblurring";
      data.selected_crowd = data.selected_term === "crowdcloaking";
      data.selected_herd = data.selected_term === "herdblurring";
    }
  };

timeline.push(wordBankTask)


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

// timeline.push(irb)

// INSTRUCTIONS //

const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="max-width: 1000px; margin: 0 auto; text-align: left;">In this experiment, you will be taking on the role of an editor at a news aggregator site. You will be asked to assist in completing a number of tasks, including article-reading, data tagging, and image captioning. The full experiment is designed to last no longer than 15 minutes.</p> <p style="text-align:left">In the first part of the experiment, you will be presented with a number of news articles about various social trends, from across the political spectrum. Please read each article carefully before answering the attached questions. Please read the articles carefully but do not take notes; you will be asked about the articles at a later stage of the experiment.<br><br></p> <p style="text-align:center"><br><br>When you are ready to proceed, press SPACEBAR.</p></div>',
    choices: [" "],
    on_finish: function(data) {
        data.category = "instructions";
    }
};
// timeline.push(instructions);


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

// timeline.push(articles);


/// LEXICAL DECISION TASK ///

let lexicalDecisionStimuliTagged = checkInclusion(lexicalDecisionStimuli,stimChoicesThis,fillerChoicesThis)

// let choiceArray = ['f','j']
// shuffleArray(choiceArray)
// console.log(choiceArray)

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

            .key-choice:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
};

timeline.push(lexicalDecisionTraining)

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

            .key-choice:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
        // data.choiceOrder = choiceArray;
        data.ageArray = ageArray;
    }
};

/// Uncomment below to add to timeline ///
// timeline.push(lexicalDecisionInstructions,lexicalDecision)


///************ RANDOMIZATION BELOW ************///
///************************* ******************/// 


let criticalTasksThis = shuffleArray(['lexicalDecision'])

timeline.push(lexicalDecision)

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