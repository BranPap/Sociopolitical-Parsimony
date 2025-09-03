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

//////////// Main Call ////////////


let timeline = [];

totalTrials = 0;

const resetCounters = {
    type: jsPsychCallFunction,
    func: function() {
      correctResponses = 0;
      console.log("Counters reset");
      tweetStimSet1 = generateTweetStimuli(CriticalPair1Term1, CriticalPair1Term2, conditionSettings[CriticalPair1Term1].bias, stimChoicesThis[0], true);
      console.log("Stimuli set 1 generated: ", tweetStimSet1[0]);
    }
  };

  const tweetTrials = {
    timeline: [
      {
        type: jsPsychTwitterHover,
        profile_pic: jsPsych.timelineVariable('profile_pic'),
        preview_label: "",
        display_name: jsPsych.timelineVariable('display_name'),
        username: jsPsych.timelineVariable('username'),
        bio: jsPsych.timelineVariable('bio'),
        tweet_text: jsPsych.timelineVariable('tweet_text'),
        masked_words: jsPsych.timelineVariable('masked_words'),
        comments_range: jsPsych.timelineVariable('comments_range'),
        retweets_range: jsPsych.timelineVariable('retweets_range'),
        likes_range: jsPsych.timelineVariable('likes_range'),
        attention_question: jsPsych.timelineVariable('attention_question'),
        answer_options: jsPsych.timelineVariable('answer_options')
      }
    ],
    timeline_variables: [], // Start with empty — will fill dynamically
    randomize_order: true,
    on_timeline_start: function() {
      // Generate fresh stimuli each time this timeline starts
      tweetStimSet1 = generateTweetStimuli(
        CriticalPair1Term1, 
        CriticalPair1Term2, 
        conditionSettings[CriticalPair1Term1].bias, 
        stimChoicesThis[0], 
        true
      );
  
      // Dynamically update timeline variables
      this.timeline_variables = tweetStimSet1;
  
      console.log("Fresh stimuli generated for this loop: ", tweetStimSet1[0]);
    }
  };
  
  

  const wordBankLoop = {
    timeline: [resetCounters, tweetTrials],
    loop_function: function() {
      totalTrials += tweetStimSet1.length;
      console.log("Total trials so far: ", totalTrials);
      console.log("Correct responses so far: ", correctResponses);
  
      return totalTrials < 20; // Continue until 20 trials are done
    }
  };
  


timeline.push(wordBankLoop);

jsPsych.run(timeline)