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