var jsPsychTwitterSPR = (function (jspsych) {
    'use strict';

    const info = {
        name: 'twitter-spr',
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
            attention_question: { type: jspsych.ParameterType.STRING, default: 'What do you think the political leaning of this user is?' },
            answer_options: { type: jspsych.ParameterType.STRING, array: true, default: ['Liberal', 'Conservative', 'Moderate', 'Not sure'] },
            button_label: { type: jspsych.ParameterType.STRING, default: 'Submit' },
            preview_label: { type: jspsych.ParameterType.STRING, default: '' },
            comments_range: { type: jspsych.ParameterType.INT, array: true, default: [50, 500] },
            retweets_range: { type: jspsych.ParameterType.INT, array: true, default: [500, 2000] },
            likes_range: { type: jspsych.ParameterType.INT, array: true, default: [1000, 5000] }
        }
    };

    class TwitterSPRPlugin {
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

        replaceLetters(text) {
            return text.replace(/[a-zA-Z]/g, '_');
        }

        trial(display_element, trial) {
            const words = trial.tweet_text.split(/\s+/);
            const replacedWords = words.map(w => this.replaceLetters(w));
            const nWords = words.length;
            let currentIndex = -1;
            let startTime = null;
            const rtData = [];
            replacedWords[0] = '*'.repeat(replacedWords[0].length);
            console.log(replacedWords);
        
            const profilePic = trial.profile_pic || '/api/placeholder/48/48';
            const comments = this.getRandomInt(...trial.comments_range);
            const retweets = this.getRandomInt(...trial.retweets_range);
            const likes = this.getRandomInt(...trial.likes_range);
        
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
                    </div>
                `;
            }
        
            const previewLabelHtml = trial.preview_label
                ? `<div class="preview-label">${trial.preview_label}</div>`
                : '';
        
            // Full styled tweet container
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
                        visibility: visible;
                        transition: opacity 0.3s ease;
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
        
                    .word {
                        visibility: hidden;
                    }
        
                    .word.visible {
                        visibility: visible;
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
        
                    .attention-check {
                        margin-top: 30px;
                        padding: 20px;
                        border: 1px solid #e1e8ed;
                        border-radius: 12px;
                        background: white;
                        max-width: 500px;
                        margin-left: auto;
                        margin-right: auto;
                        display: block;
                        text-align: left;
                        visibility: hidden;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
        
                    .attention-question {
                        font-weight: 600;
                        margin-bottom: 15px;
                    }
        
                    .answer-options {
                        display: flex;
                        flex-direction: column;
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
                    }
        
                    .submit-btn:hover {
                        background-color: #1a8cd8;
                    }
        
                    .submit-btn:disabled {
                        background-color: #8ecdf7;
                        cursor: not-allowed;
                    }
        
                    .preview-label {
                        color: #536471;
                        font-size: 14px;
                        margin: 10px auto;
                        max-width: 500px;
                    }
        
                    .press-space {
                        text-align: center;
                        color: #536471;
                        margin-top: 10px;
                        font-size: 14px;
                    }
                    .start-arrow {
                        position: absolute;
                        left: calc(50% - 270px);
                        top: 190px;
                        font-size: 20px;
                        color: #1d9bf0;
                        transform: rotate(180deg);
                        opacity: 1;
                        transition: opacity 0.4s ease;
                    }
                </style>
        
                ${previewLabelHtml}
                <div class="press-space">Press SPACE to read. The first word's location is marked by asterisks.</div>
                <div class="tweet-container">
                    <div class="user-info">
                        <img src="${profilePic}" alt="Profile picture" class="profile-pic">
                        <div class="name-handle">
                            <span class="display-name">${trial.display_name}</span>
                            <span class="handle">@${trial.username}</span>
                            <span class="bio">${trial.bio}</span>
                        </div>
                    </div>
                    <div class="tweet-content" id="tweet-content">
                        ${replacedWords.map((w, i) => `<span class="word" id="word-${i}">${w}</span>`).join(' ')}
                    </div>
                    ${quotedTweetHtml}
                    <div class="tweet-metrics">
                        <div class="metric">💬 ${this.formatNumber(comments)}</div>
                        <div class="metric">🔁 ${this.formatNumber(retweets)}</div>
                        <div class="metric">❤️ ${this.formatNumber(likes)}</div>
                    </div>
                </div>
                <div class="attention-check" id="attention-check">
                    <div class="attention-question">${trial.attention_question}</div>
                    <div class="answer-options">
                        ${trial.answer_options.map((opt, i) => `
                            <div class="answer-option">
                                <input type="radio" id="opt-${i}" name="attention" value="${opt}">
                                <label for="opt-${i}">${opt}</label>
                            </div>`).join('')}
                    </div>
                    <button id="submit-btn" class="submit-btn" disabled>${trial.button_label}</button>
                </div>
            `;
        
            const tweetContent = display_element.querySelector('#tweet-content');
            const wordsEls = tweetContent.querySelectorAll('.word');
            const attentionCheck = display_element.querySelector('#attention-check');
            const submitBtn = display_element.querySelector('#submit-btn');
            const firstWordEl = wordsEls[0];
            firstWordEl.style.visibility = 'visible';

        
            const nextWord = () => {


                if (display_element.querySelector('.press-space').style.visibility !== 'hidden') {
                    display_element.querySelector('.press-space').style.visibility = 'hidden';
                    display_element.querySelector('.press-space').style.opacity = '0';
                }

                const now = performance.now();
                if (startTime === null) {
                    startTime = now;
                } else if (currentIndex >= 0) {
                    rtData.push({ word: words[currentIndex], rt: now - startTime });
                    startTime = now;
                }

                if (currentIndex === 0) {
                    firstWordEl.style.visibility = 'hidden';
                }
        
                currentIndex++;
                if (currentIndex < nWords) {

                    if (currentIndex > 0) wordsEls[currentIndex - 1]?.classList.remove('visible');
                    wordsEls[currentIndex].innerText = words[currentIndex];
                    wordsEls[currentIndex].classList.add('visible');

                    

                } else {
                    document.removeEventListener('keydown', keyListener);
                    wordsEls[currentIndex - 1].classList.remove('visible');
                    tweetContent.innerHTML = words.join(' ');


                    setTimeout(() => attentionCheck.style.visibility = 'visible', 1000);
                    setTimeout(() => attentionCheck.style.opacity = '1', 1000);
                }
            };
        
            const keyListener = (e) => {
                if (e.code === 'Space') {
                    e.preventDefault();
                    nextWord();
                }
            };
        
            document.addEventListener('keydown', keyListener);
        
            display_element.querySelectorAll('input[name="attention"]').forEach(r => {
                r.addEventListener('change', () => { submitBtn.disabled = false; });
            });
        
            submitBtn.addEventListener('click', () => {
                const selected = display_element.querySelector('input[name="attention"]:checked');
                if (!selected) return;
                this.jsPsych.finishTrial({
                    rts: rtData,
                    response: selected.value,
                    tweet_text: trial.tweet_text,
                    username: trial.username,
                    display_name: trial.display_name,
                    bio: trial.bio
                });
            });
        }        
    }

    TwitterSPRPlugin.info = info;
    return TwitterSPRPlugin;
})(jsPsychModule);
