var jsPsychTwitterStaticCloze = (function (jspsych) {
    'use strict';

    const info = {
        name: 'twitter-static-cloze',
        parameters: {
            tweet_text: { type: jspsych.ParameterType.STRING, default: undefined },
            username: { type: jspsych.ParameterType.STRING, default: undefined },
            display_name: { type: jspsych.ParameterType.STRING, default: undefined },
            bio: { type: jspsych.ParameterType.STRING, default: '' },
            profile_pic: { type: jspsych.ParameterType.IMAGE, default: null },
            has_quoted_tweet: { type: jspsych.ParameterType.BOOL, default: false },
            quoted_source_name: { type: jspsych.ParameterType.STRING, default: '' },
            quoted_content: { type: jspsych.ParameterType.STRING, default: '' },
            quoted_image: { type: jspsych.ParameterType.IMAGE, default: null },
            cloze_word: { type: jspsych.ParameterType.STRING, default: undefined }, // word to replace
            button_label: { type: jspsych.ParameterType.STRING, default: 'Submit' },
            comments_range: { type: jspsych.ParameterType.INT, array: true, default: [50, 500] },
            retweets_range: { type: jspsych.ParameterType.INT, array: true, default: [500, 2000] },
            likes_range: { type: jspsych.ParameterType.INT, array: true, default: [1000, 5000] }
        }
    };

    class TwitterStaticClozePlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        formatNumber(num) {
            if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
            if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
            return num.toString();
        }

        trial(display_element, trial) {
            const profilePic = trial.profile_pic || '/api/placeholder/48/48';
            const comments = this.getRandomInt(...trial.comments_range);
            const retweets = this.getRandomInt(...trial.retweets_range);
            const likes = this.getRandomInt(...trial.likes_range);

            // Replace the cloze word with an inline text input
            let replaced = false;
            let tweetHtml = trial.tweet_text.split(/\s+/).map(w => {
              // Normalize for comparison (ignore punctuation + case)
              const clean = w.replace(/[^\w]/g, '').toLowerCase();
              
              if (!replaced && clean === trial.cloze_word.replace('#', '').toLowerCase()) {
                replaced = true; // ✅ ensure it only triggers once
                const hasHash = trial.cloze_word.startsWith('#');
                const input = `<input type="text" class="cloze-input" placeholder=" " style="width: 80px;">`;
                return hasHash ? `#${input}` : input;
              }
              return w; // leave the word unchanged otherwise
            }).join(' ');

            // Quoted tweet if present
            let quotedTweetHtml = '';
            if (trial.has_quoted_tweet) {
                const quotedImage = trial.quoted_image || '/api/placeholder/460/200';
                quotedTweetHtml = `
                    <div class="quoted-tweet">
                        <div class="news-source">
                            <img src="/api/placeholder/20/20" class="news-logo">
                            <span class="news-name">${trial.quoted_source_name}</span>
                        </div>
                        <div class="article-preview">${trial.quoted_content}</div>
                        <img src="${quotedImage}" class="article-image">
                    </div>`;
            }

            display_element.innerHTML = `
                <style>
                    body { background: #f7f9fa; padding: 20px; }

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
                    }

                    .quoted-tweet {
                        border: 1px solid #e1e8ed;
                        border-radius: 12px;
                        padding: 12px;
                        margin: 10px 0;
                        background: #f7f9fa;
                    }

                    .tweet-metrics {
                        display: flex;
                        color: #536471;
                        font-size: 13px;
                        margin-top: 12px;
                        gap: 20px;
                    }

                    .cloze-input {
                        border: none;
                        border-bottom: 2px solid #1d9bf0;
                        font-size: 15px;
                        outline: none;
                        text-align: center;
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
                        display: block;
                        margin: 20px auto 0;
                    }

                    .submit-btn:disabled {
                        background-color: #8ecdf7;
                        cursor: not-allowed;
                    }
                </style>

                <div class="tweet-container">
                    <div class="user-info">
                        <img src="${profilePic}" alt="Profile picture" class="profile-pic">
                        <div class="name-handle">
                            <span class="display-name">${trial.display_name}</span>
                            <span class="handle">@${trial.username}</span>
                            <span class="bio">${trial.bio}</span>
                        </div>
                    </div>

                    <div class="tweet-content">${tweetHtml}</div>
                    ${quotedTweetHtml}

                    <div class="tweet-metrics">
                        <div>💬 ${this.formatNumber(comments)}</div>
                        <div>🔁 ${this.formatNumber(retweets)}</div>
                        <div>❤️ ${this.formatNumber(likes)}</div>
                    </div>
                </div>

                <button id="submit-btn" class="submit-btn" disabled>${trial.button_label}</button>
            `;

            const inputEl = display_element.querySelector('.cloze-input');
            const submitBtn = display_element.querySelector('#submit-btn');

            inputEl.addEventListener('input', () => {
                submitBtn.disabled = inputEl.value.trim() === '';
            });

            submitBtn.addEventListener('click', () => {
                const response = inputEl.value.trim();
                this.jsPsych.finishTrial({
                    response: response,
                    tweet_text: trial.tweet_text,
                    cloze_word: trial.cloze_word,
                    username: trial.username,
                    display_name: trial.display_name,
                    bio: trial.bio
                });
            });
        }
    }

    TwitterStaticClozePlugin.info = info;
    return TwitterStaticClozePlugin;
})(jsPsychModule);
