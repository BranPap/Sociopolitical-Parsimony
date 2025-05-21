/**
 * jspsych-tweet-production
 * A jsPsych plugin for tweet production tasks with configurable prompts, article previews, and analysis
 * 
 * @author Bran Papineau
 */
var jsPsychTweetProduction = (function (jspsych) {
    'use strict';
  
    const info = {
      name: 'tweet-production',
      parameters: {
        /**
         * Instructions to display at the top of the page
         */
        instructions: {
          type: jspsych.ParameterType.HTML_STRING,
          default: 'Write a tweet sharing the information below:'
        },
        /**
         * Prompt information to provide context for the tweet task
         */
        prompt_text: {
          type: jspsych.ParameterType.HTML_STRING,
          default: 'You\'ve seen an interesting news article and want to share it with your followers.'
        },
        /**
         * News source name (e.g., "TechDaily")
         */
        news_source: {
          type: jspsych.ParameterType.STRING,
          default: 'NewsSource'
        },
        /**
         * URL for the news source logo (optional)
         */
        news_logo_url: {
          type: jspsych.ParameterType.STRING,
          default: null
        },
        /**
         * Article title to display
         */
        article_title: {
          type: jspsych.ParameterType.STRING,
          default: 'Article Title Goes Here'
        },
        /**
         * Article summary or excerpt
         */
        article_summary: {
          type: jspsych.ParameterType.STRING,
          default: 'A brief summary of the article content...'
        },
        /**
         * Additional context or task instructions after the article preview
         */
        task_description: {
          type: jspsych.ParameterType.HTML_STRING,
          default: '<p><strong>Your task:</strong> Write a tweet sharing this article.</p>'
        },
        /**
         * Placeholder text for the tweet textarea
         */
        placeholder: {
          type: jspsych.ParameterType.STRING,
          default: 'Type your tweet here...'
        },
        /**
         * Character limit for the tweet (Twitter standard is 280)
         */
        char_limit: {
          type: jspsych.ParameterType.INT,
          default: 280
        },
        /**
         * Text for the button to submit the tweet
         */
        button_label: {
          type: jspsych.ParameterType.STRING,
          default: 'Post Tweet'
        },
        /**
         * Terms to track in the tweet text for analysis purposes
         * Format: [{term: 'word1', key: 'data_key1'}, {term: 'word2', key: 'data_key2'}]
         */
        terms_to_track: {
          type: jspsych.ParameterType.COMPLEX,
          default: []
        },
        /**
         * Data key for storing if any of the tracked terms were used
         */
        any_term_used_key: {
          type: jspsych.ParameterType.STRING,
          default: 'used_target_term'
        },
        /**
         * Require a response before proceeding
         */
        require_response: {
          type: jspsych.ParameterType.BOOL,
          default: true
        },
        /**
         * Minimum required response length (set to 0 to disable)
         */
        min_chars: {
          type: jspsych.ParameterType.INT,
          default: 0
        }
      }
    };
  
    /**
     * @constructor
     * @param {Object} jsPsych - The jsPsych instance
     */
    class TweetProductionPlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
  
      trial(display_element, trial) {
        // Set up CSS styles
        const css = `
          <style>
            .jspsych-tweet-container {
              max-width: 550px;
              margin: 0 auto;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            }
            .tweet-prompt {
              background-color: #f8f9fa;
              border: 1px solid #e1e8ed;
              border-radius: 12px;
              padding: 15px;
              margin-bottom: 20px;
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
              text-align: left;
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
              display: inline-block;
            }
            .news-name {
              font-weight: bold;
              color: #0f1419;
            }
            .tweet-composer {
              margin-top: 20px;
            }
            .tweet-textarea {
              width: 100%;
              padding: 10px;
              border-radius: 8px;
              border: 1px solid #ccc;
              font-family: sans-serif;
              margin-bottom: 10px;
              resize: none;
              box-sizing: border-box;
            }
            .char-counter {
              font-size: 0.9em;
              color: #657786;
              text-align: right;
              margin-bottom: 15px;
            }
            .char-counter.over-limit {
              color: red;
            }
            .jspsych-btn {
              padding: 10px 20px;
              background-color: #1DA1F2;
              color: white;
              border: none;
              border-radius: 30px;
              font-weight: bold;
              cursor: pointer;
              font-size: 14px;
            }
            .jspsych-btn:hover {
              background-color: #1a91da;
            }
            .jspsych-btn:disabled {
              background-color: #cccccc;
              cursor: not-allowed;
            }
            .article-summary {
              text-align: left;
            }
          </style>
        `;
  
        // Create logo element based on URL or default
        let logoElement;
        if (trial.news_logo_url) {
          logoElement = `<img class="news-logo" src="${trial.news_logo_url}" alt="${trial.news_source} logo">`;
        } else {
          logoElement = `<div class="news-logo"></div>`;
        }
  
        // Construct the HTML for the trial
        let html = css;
        html += `<div class="jspsych-tweet-container">`;
        
        // Instructions
        if (trial.instructions) {
          html += `<div class="jspsych-tweet-instructions">${trial.instructions}</div>`;
        }
        
        // Tweet prompt container
        html += `<div class="tweet-prompt">`;
        
        // Prompt text
        html += `<p>${trial.prompt_text}</p>`;
        
        // Article preview
        html += `
          <div class="article-preview">
            <div class="news-source">
              ${logoElement}
              <span class="news-name">${trial.news_source}</span>
            </div>
            <div class="article-title">
              "${trial.article_title}"
            </div>
            <p class="article-summary">${trial.article_summary}</p>
          </div>
        `;
        
        // Task description
        html += trial.task_description;
        html += `</div>`; // Close tweet-prompt
        
        // Tweet composer
        html += `
          <div class="tweet-composer">
            <textarea 
              id="jspsych-tweet-response" 
              class="tweet-textarea" 
              name="tweet_response" 
              rows="4" 
              placeholder="${trial.placeholder}"
            ></textarea>
            <div class="char-counter"><span id="jspsych-char-count">0</span>/${trial.char_limit}</div>
            <button 
              id="jspsych-tweet-submit" 
              class="jspsych-btn"
              ${trial.require_response ? 'disabled' : ''}
            >${trial.button_label}</button>
          </div>
        </div>`;
  
        // Display the HTML
        display_element.innerHTML = html;
  
        // Set up the character counter
        const tweetTextarea = display_element.querySelector('#jspsych-tweet-response');
        const charCounter = display_element.querySelector('#jspsych-char-count');
        const submitButton = display_element.querySelector('#jspsych-tweet-submit');
        
        tweetTextarea.addEventListener('input', function() {
          const count = this.value.length;
          charCounter.textContent = count;
          
          // Set color based on character limit
          if (count > trial.char_limit) {
            charCounter.parentElement.classList.add('over-limit');
            submitButton.disabled = true;
          } else {
            charCounter.parentElement.classList.remove('over-limit');
            
            // Enable button if there's text and it's within limit
            if (trial.require_response) {
              submitButton.disabled = (count < trial.min_chars);
            } else {
              submitButton.disabled = false;
            }
          }
        });
  
        // Function to end the trial when the submit button is clicked
        const end_trial = () => {
          // Measure response time
          const response_time = performance.now() - start_time;
          
          // Get the tweet response
          const tweet_text = tweetTextarea.value;
          
          // Process the tracked terms
          const track_results = {};
          let any_term_used = false;
          
          if (trial.terms_to_track && trial.terms_to_track.length > 0) {
            const lowerText = tweet_text.toLowerCase();
            
            trial.terms_to_track.forEach(item => {
              const termUsed = lowerText.includes(item.term.toLowerCase());
              track_results[item.key] = termUsed;
              if (termUsed) any_term_used = true;
            });
          }
          
          if (trial.any_term_used_key) {
            track_results[trial.any_term_used_key] = any_term_used;
          }
          
          // Save data
          const trial_data = {
            rt: response_time,
            response: tweet_text,
            tweet_length: tweet_text.length,
            ...track_results
          };
          
          // Clear the display
          display_element.innerHTML = '';
          
          // End the trial
          this.jsPsych.finishTrial(trial_data);
        };
  
        // Start timing
        const start_time = performance.now();
        
        // Add event listener to the submit button
        display_element.querySelector('#jspsych-tweet-submit').addEventListener('click', end_trial);
      }
    }
  
    TweetProductionPlugin.info = info;
  
    return TweetProductionPlugin;
  })(jsPsychModule);