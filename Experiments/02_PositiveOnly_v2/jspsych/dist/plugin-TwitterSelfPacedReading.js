var jsPsychTwitterSelfPacedReading = (function (jspsych) {
    'use strict';

    const info = {
        name: 'twitter-self-paced-reading',
        parameters: {
            /** The tweet content as a string */
            tweet_text: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Tweet Text',
                default: undefined,
                description: 'The content of the tweet'
            },
            /** The username to display */
            username: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Username',
                default: undefined,
                description: 'The Twitter handle (without @)'
            },
            /** The display name to show */
            display_name: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Display Name',
                default: undefined,
                description: 'The display name of the Twitter user (can include emoji)'
            },
            /** User bio */
            bio: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'User Bio',
                default: '',
                description: 'The user bio text (can include emoji)'
            },
            /** Optional profile picture URL */
            profile_pic: {
                type: jspsych.ParameterType.IMAGE,
                pretty_name: 'Profile Picture',
                default: null,
                description: 'URL to the profile picture (optional)'
            },
            /** Whether to use a quoted tweet */
            has_quoted_tweet: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: 'Has Quoted Tweet',
                default: false,
                description: 'Whether to include a quoted tweet'
            },
            /** Quoted tweet source name */
            quoted_source_name: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Quoted Source Name',
                default: '',
                description: 'The name of the source in the quoted tweet'
            },
            /** Quoted tweet content */
            quoted_content: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Quoted Content',
                default: '',
                description: 'The content text of the quoted tweet'
            },
            /** Quoted tweet image */
            quoted_image: {
                type: jspsych.ParameterType.IMAGE,
                pretty_name: 'Quoted Image',
                default: null,
                description: 'Image for the quoted tweet'
            },
            /** The attention check question */
            attention_question: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Attention Question',
                default: 'What do you think the political leaning of this user is?',
                description: 'The question that appears after the tweet is fully read'
            },
            /** Answer options for the attention check */
            answer_options: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Answer Options',
                array: true,
                default: ['Liberal', 'Conservative', 'Moderate', 'Not sure'],
                description: 'Options for answering the attention check question'
            },
            /** Label of the button to submit response */
            button_label: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Button label',
                default: 'Submit',
                description: 'Label of the button to submit response'
            },
            /** Optional label to show above the tweet */
            preview_label: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Preview Label',
                default: '',
                description: 'Optional label text to show above the tweet'
            },
            /** Min/max range for comments count */
            comments_range: {
                type: jspsych.ParameterType.INT,
                pretty_name: 'Comments Range',
                array: true,
                default: [50, 500],
                description: 'Range [min, max] for randomizing comment count'
            },
            /** Min/max range for retweets count */
            retweets_range: {
                type: jspsych.ParameterType.INT,
                pretty_name: 'Retweets Range',
                array: true,
                default: [500, 2000],
                description: 'Range [min, max] for randomizing retweet count'
            },
            /** Min/max range for likes count */
            likes_range: {
                type: jspsych.ParameterType.INT,
                pretty_name: 'Likes Range',
                array: true,
                default: [1000, 5000],
                description: 'Range [min, max] for randomizing like count'
            }
        }
    };

    class TwitterSelfPacedReadingPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        
        // Helper function to generate random number within a range
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        // Helper function to format large numbers (e.g., 1500 -> 1.5K)
        formatNumber(num) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            } else if (num >= 1000) {
                return (num / 1000).toFixed(1) + 'K';
            }
            return num.toString();
        }

        trial(display_element, trial) {
            // Split tweet text into words
            const words = trial.tweet_text.split(/\s+/);
            let currentWordIndex = 0;
            let wordTimestamps = [];
            let reading_start_time;
            let readingActive = false;
            
            // Default profile picture if none provided
            const profilePic = trial.profile_pic || '/api/placeholder/48/48';
            
            // Generate random engagement metrics
            const commentsCount = this.getRandomInt(trial.comments_range[0], trial.comments_range[1]);
            const retweetsCount = this.getRandomInt(trial.retweets_range[0], trial.retweets_range[1]);
            const likesCount = this.getRandomInt(trial.likes_range[0], trial.likes_range[1]);
            
            // Format the engagement metrics
            const formattedComments = this.formatNumber(commentsCount);
            const formattedRetweets = this.formatNumber(retweetsCount);
            const formattedLikes = this.formatNumber(likesCount);
            
            // Create the quoted tweet content if enabled
            let quotedTweetHtml = '';
            if (trial.has_quoted_tweet) {
                const quotedImage = trial.quoted_image || '/api/placeholder/460/200';
                quotedTweetHtml = `
                    <div class="quoted-tweet">
                        <div class="news-source">
                            <img src="/api/placeholder/20/20" alt="News logo" class="news-logo">
                            <span class="news-name">${trial.quoted_source_name}</span>
                        </div>
                        <div class="article-preview">${trial.quoted_content}</div>
                        <img src="${quotedImage}" alt="Article image" class="article-image">
                    </div>
                `;
            }
            
            // Create the preview label if provided
            let previewLabelHtml = '';
            if (trial.preview_label) {
                previewLabelHtml = `<div class="preview-label">${trial.preview_label}</div>`;
            }
            
            // Create the HTML for the trial
            const html = `
                <style>
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

                    .bio {
                        color: #0f1419;
                        font-size: 14px;
                        margin-bottom: 8px;
                        text-align: left;
                    }

                    .tweet-content {
                        color: #0f1419;
                        font-size: 15px;
                        line-height: 1.4;
                        margin: 12px 0;
                        text-align: left;
                        min-height: 100px;
                    }

                    .reading-area {
                        padding: 15px;
                        border: 1px solid #e1e8ed;
                        border-radius: 8px;
                        margin: 10px 0;
                        text-align: center;
                        font-size: 18px;
                        background-color: #f8f9fa;
                        min-height: 30px;
                    }

                    .reading-instruction {
                        color: #536471;
                        font-size: 14px;
                        text-align: center;
                        margin-bottom: 5px;
                    }

                    .spacebar-hint {
                        color: #1d9bf0;
                        font-weight: bold;
                        font-size: 13px;
                        text-align: center;
                        margin-top: 5px;
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
                    }

                    .article-image {
                        width: 100%;
                        height: 200px;
                        border-radius: 8px;
                        margin-top: 8px;
                        background: #e1e8ed;
                        object-fit: cover;
                    }

                    .tweet-metrics {
                        display: flex;
                        color: #536471;
                        font-size: 13px;
                        margin-top: 12px;
                        gap: 20px;
                    }

                    .metric {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }

                    .metric-icon {
                        width: 16px;
                        height: 16px;
                        fill: #536471;
                    }
                    
                    .attention-check {
                        margin-top: 30px;
                        padding: 20px;
                        border: 1px solid #e1e8ed;
                        border-radius: 12px;
                        background: white;
                        max-width: 500px;
                        margin-left: auto;
                        margin-right: auto;
                        display: none;
                        text-align: left;
                    }
                    
                    .attention-question {
                        font-weight: 600;
                        margin-bottom: 15px;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
                    }
                    
                    .answer-options {
                        display: flex;
                        flex-direction: column;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
                    }
                    
                    .answer-option {
                        margin-bottom: 10px;
                    }
                    
                    .submit-btn {
                        background-color: #1d9bf0;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 20px;
                        font-weight: 600;
                        cursor: pointer;
                        font-size: 15px;
                        margin-top: 15px;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
                    }
                    
                    .submit-btn:hover {
                        background-color: #1a8cd8;
                    }
                    
                    .submit-btn:disabled {
                        background-color: #8ecdf7;
                        cursor: not-allowed;
                    }
                    
                    body {
                        background: #f7f9fa;
                        padding: 20px;
                    }
                    
                    .preview-label {
                        color: #536471;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
                        font-size: 14px;
                        margin: 10px auto;
                        max-width: 500px;
                    }

                    .reading-complete {
                        color: #1d9bf0;
                        font-weight: bold;
                        margin-top: 15px;
                        text-align: center;
                        display: none;
                    }
                </style>
                
                ${previewLabelHtml}
                <div class="tweet-container">
                    <div class="user-info">
                        <img src="${profilePic}" alt="Profile picture" class="profile-pic">
                        <div class="name-handle">
                            <span class="display-name">${trial.display_name}</span>
                            <span class="handle">@${trial.username}</span>
                            <span class="bio">${trial.bio}</span>
                        </div>
                    </div>
                    
                    <div class="tweet-content">
                        <div class="reading-instruction">Press SPACEBAR to read the tweet one word at a time.</div>
                        <div class="reading-area" id="reading-area">Press SPACEBAR to start reading</div>
                        <div class="spacebar-hint" id="spacebar-hint">Press SPACEBAR</div>
                        <div class="reading-complete" id="reading-complete">Reading complete!</div>
                    </div>
                    
                    ${quotedTweetHtml}
                    
                    <div class="tweet-metrics">
                        <div class="metric">
                            <svg class="metric-icon" viewBox="0 0 24 24">
                                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                            </svg>
                            <span>${formattedComments}</span>
                        </div>
                        <div class="metric">
                            <svg class="metric-icon" viewBox="0 0 24 24">
                                <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                            </svg>
                            <span>${formattedRetweets}</span>
                        </div>
                        <div class="metric">
                            <svg class="metric-icon" viewBox="0 0 24 24">
                                <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                            </svg>
                            <span>${formattedLikes}</span>
                        </div>
                    </div>
                </div>
                
                <div class="attention-check" id="attention-check">
                    <div class="attention-question">${trial.attention_question}</div>
                    <div class="answer-options">
                        ${trial.answer_options.map((option, index) => `
                            <div class="answer-option">
                                <input type="radio" id="option-${index}" name="attention" value="${option}">
                                <label for="option-${index}">${option}</label>
                            </div>
                        `).join('')}
                    </div>
                    <button class="submit-btn" id="submit-button" disabled>${trial.button_label}</button>
                </div>
            `;

            display_element.innerHTML = html;
            
            // Get references to DOM elements
            const readingArea = display_element.querySelector('#reading-area');
            const readingComplete = display_element.querySelector('#reading-complete');
            const spacebarHint = display_element.querySelector('#spacebar-hint');
            
            // Set up the self-paced reading with spacebar
            function handleKeypress(e) {
                // Only respond to spacebar (key code 32)
                if (e.keyCode !== 32) return;
                
                // Prevent default spacebar behavior (scrolling)
                e.preventDefault();

                // If reading is not active yet, set it to active
                if (!readingActive) {
                    readingActive = true;
                }
                
                // If this is the first word, record start time
                if (currentWordIndex === 0) {
                    reading_start_time = performance.now();
                    readingArea.textContent = words[currentWordIndex];
                    
                    // Record the timestamp for the first word
                    wordTimestamps.push({
                        word: words[currentWordIndex],
                        wordIndex: currentWordIndex,
                        readingTime: 0, // First word has no reading time
                        timestamp: reading_start_time
                    });
                    
                    currentWordIndex++;
                    return;
                }
                
                // If we've shown all words
                if (currentWordIndex >= words.length) {
                    // Show the attention check after reading is complete
                    readingArea.style.display = 'none';
                    spacebarHint.style.display = 'none';
                    readingComplete.style.display = 'block';
                    document.getElementById('attention-check').style.display = 'block';
                    
                    // Remove the keypress event listener since reading is complete
                    document.removeEventListener('keydown', handleKeypress);
                    return;
                }
                
                // Record timestamp for the current word
                const currentTime = performance.now();
                const wordReadingTime = currentTime - reading_start_time - 
                    (wordTimestamps.length > 0 ? wordTimestamps[wordTimestamps.length - 1].timestamp : 0);
                
                wordTimestamps.push({
                    word: words[currentWordIndex],
                    wordIndex: currentWordIndex,
                    readingTime: wordReadingTime,
                    timestamp: currentTime
                });
                
                // Show the current word
                readingArea.textContent = words[currentWordIndex];
                
                // Move to the next word
                currentWordIndex++;
            }
            
            // Add keypress event listener
            document.addEventListener('keydown', handleKeypress);
            
            // Add event listeners to radio buttons
            const radioButtons = display_element.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => {
                radio.addEventListener('change', function() {
                    // Enable submit button when a radio button is selected
                    document.getElementById('submit-button').disabled = false;
                });
            });
            
            // Add event listener to the submit button
            const submitButton = display_element.querySelector('#submit-button');
            submitButton.addEventListener('click', () => {
                // Get selected answer
                const selectedOption = display_element.querySelector('input[name="attention"]:checked');
                if (selectedOption) {
                    // Measure total response time
                    const endTime = performance.now();
                    const totalTime = Math.round(endTime - reading_start_time);

                    // Save data
                    const trialData = {
                        rt: totalTime,
                        response: selectedOption.value,
                        words: words,
                        word_data: wordTimestamps,
                        tweet_text: trial.tweet_text,
                        username: trial.username,
                        display_name: trial.display_name,
                        bio: trial.bio,
                        attention_question: trial.attention_question,
                        metrics: {
                            comments: commentsCount,
                            retweets: retweetsCount,
                            likes: likesCount
                        }
                    };

                    // Clean up event listeners
                    document.removeEventListener('keydown', handleKeypress);
                    
                    // Clear display and finish trial
                    display_element.innerHTML = '';
                    this.jsPsych.finishTrial(trialData);
                }
            });
        }
    }
    TwitterSelfPacedReadingPlugin.info = info;

    return TwitterSelfPacedReadingPlugin;
})(jsPsychModule);