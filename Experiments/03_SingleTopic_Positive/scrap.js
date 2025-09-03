// Testing Twitter Production

const { tracingChannel } = require("diagnostics_channel");

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







// -------------------
// Debug trial
// -------------------


// Debug info trial
// Debug info trial - Art Deco Theme with Gold Patterns
const debugInfo = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="
      position: relative;
      font-family: 'Gill Sans', 'Century Gothic', sans-serif;
      width: 800px;
      margin: 0 auto;
    ">
      <!-- Main panel with layered effect -->
      <div style="
        position: absolute;
        top: 10px;
        left: 10px;
        width: 100%;
        height: 100%;
        background-color: #d4af37;
        z-index: -1;
      "></div>
      
      <!-- Primary container -->
      <div style="
        background-color: #1a1a1a;
        border: 2px solid #d4af37;
        padding: 0;
        position: relative;
      ">
        <!-- Header with Art Deco Pattern -->
        <div style="
          background-color: #1a1a1a;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        ">
          <!-- Art Deco Pattern Background in Header -->
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              radial-gradient(circle at 10% 50%, transparent 15px, #d4af37 16px, #d4af37 18px, transparent 19px),
              radial-gradient(circle at 90% 50%, transparent 15px, #d4af37 16px, #d4af37 18px, transparent 19px);
            opacity: 0.3;
          "></div>
          
          <!-- Left Art Deco Element -->
          <div style="
            position: absolute;
            top: 5px;
            left: 5px;
            width: 50px;
            height: 80%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
          ">
            <div style="width: 3px; height: 100%; background-color: #d4af37;"></div>
          </div>
          
          <!-- Right Art Deco Element -->
          <div style="
            position: absolute;
            top: 5px;
            right: 5px;
            width: 50px;
            height: 80%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
          ">
            <div style="width: 3px; height: 100%; background-color: #d4af37;"></div>
          </div>
          
          <!-- Title with Art Deco Decorations -->
          <div style="
            color: #d4af37;
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            letter-spacing: 8px;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            position: relative;
            padding: 0 30px;
          ">
            <!-- Decorative Diamond -->
            <div style="
              width: 40px;
              height: 40px;
              position: relative;
            ">
              <div style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: transparent;
                border: 2px solid #d4af37;
                transform: rotate(45deg);
              "></div>
              <div style="
                position: absolute;
                top: 5px;
                left: 5px;
                width: calc(100% - 10px);
                height: calc(100% - 10px);
                background-color: transparent;
                border: 1px solid #d4af37;
                transform: rotate(45deg);
              "></div>
              <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 6px;
                height: 6px;
                background-color: #d4af37;
                border-radius: 50%;
                transform: translate(-50%, -50%);
              "></div>
            </div>
            
            <span style="text-shadow: 0px 0px 6px rgba(212, 175, 55, 0.5);">DEBUG MODE</span>
            
            <!-- Matching Decorative Diamond -->
            <div style="
              width: 40px;
              height: 40px;
              position: relative;
            ">
              <div style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: transparent;
                border: 2px solid #d4af37;
                transform: rotate(45deg);
              "></div>
              <div style="
                position: absolute;
                top: 5px;
                left: 5px;
                width: calc(100% - 10px);
                height: calc(100% - 10px);
                background-color: transparent;
                border: 1px solid #d4af37;
                transform: rotate(45deg);
              "></div>
              <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 6px;
                height: 6px;
                background-color: #d4af37;
                border-radius: 50%;
                transform: translate(-50%, -50%);
              "></div>
            </div>
          </div>
        </div>
        
        <!-- Content area with Art Deco pattern background -->
        <div style="
          background-color: #f5f5f5;
          margin: 0;
          border-top: 2px solid #d4af37;
          border-bottom: 2px solid #d4af37;
          padding: 20px;
          position: relative;
        ">
          <!-- Art Deco Pattern Background -->
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              repeating-linear-gradient(45deg, rgba(212, 175, 55, 0.1) 0, rgba(212, 175, 55, 0.1) 1px, transparent 1px, transparent 15px),
              repeating-linear-gradient(-45deg, rgba(212, 175, 55, 0.1) 0, rgba(212, 175, 55, 0.1) 1px, transparent 1px, transparent 15px);
            z-index: 0;
          "></div>
          
          <!-- Art Deco Side Borders -->
          <div style="
            position: absolute;
            top: 20px;
            bottom: 20px;
            left: 20px;
            width: 10px;
            z-index: 1;
          ">
            <!-- Left Art Deco Border Pattern -->
            <div style="
              width: 100%;
              height: 100%;
              background: linear-gradient(to bottom, 
                #d4af37 0%, #d4af37 10%, 
                transparent 10%, transparent 20%, 
                #d4af37 20%, #d4af37 30%, 
                transparent 30%, transparent 40%,
                #d4af37 40%, #d4af37 50%,
                transparent 50%, transparent 60%,
                #d4af37 60%, #d4af37 70%,
                transparent 70%, transparent 80%,
                #d4af37 80%, #d4af37 90%,
                transparent 90%, transparent 100%
              );
            "></div>
          </div>
          
          <div style="
            position: absolute;
            top: 20px;
            bottom: 20px;
            right: 20px;
            width: 10px;
            z-index: 1;
          ">
            <!-- Right Art Deco Border Pattern -->
            <div style="
              width: 100%;
              height: 100%;
              background: linear-gradient(to bottom, 
                #d4af37 0%, #d4af37 10%, 
                transparent 10%, transparent 20%, 
                #d4af37 20%, #d4af37 30%, 
                transparent 30%, transparent 40%,
                #d4af37 40%, #d4af37 50%,
                transparent 50%, transparent 60%,
                #d4af37 60%, #d4af37 70%,
                transparent 70%, transparent 80%,
                #d4af37 80%, #d4af37 90%,
                transparent 90%, transparent 100%
              );
            "></div>
          </div>
          
          <!-- Gold border frame with Art Deco corner designs -->
          <div style="
            position: absolute;
            top: 40px;
            left: 40px;
            right: 40px;
            bottom: 40px;
            border: 1px solid #d4af37;
            pointer-events: none;
            z-index: 1;
          "></div>
          
          <!-- Art Deco Corner Elements -->
          <div style="
            position: absolute;
            top: 20px;
            left: 20px;
            width: 80px;
            height: 80px;
            z-index: 2;
            overflow: hidden;
          ">
            <div style="
              position: absolute;
              width: 120px;
              height: 120px;
              border: 2px solid #d4af37;
              border-radius: 50%;
              top: -80px;
              left: -80px;
            "></div>
            <div style="
              position: absolute;
              width: 80px;
              height: 80px;
              border: 1px solid #d4af37;
              border-radius: 50%;
              top: -60px;
              left: -60px;
            "></div>
            <div style="
              position: absolute;
              top: 0;
              left: 0;
              width: 20px;
              height: 20px;
              border-right: 1px solid #d4af37;
              border-bottom: 1px solid #d4af37;
            "></div>
          </div>
          
          <div style="
            position: absolute;
            top: 20px;
            right: 20px;
            width: 80px;
            height: 80px;
            z-index: 2;
            overflow: hidden;
          ">
            <div style="
              position: absolute;
              width: 120px;
              height: 120px;
              border: 2px solid #d4af37;
              border-radius: 50%;
              top: -80px;
              right: -80px;
            "></div>
            <div style="
              position: absolute;
              width: 80px;
              height: 80px;
              border: 1px solid #d4af37;
              border-radius: 50%;
              top: -60px;
              right: -60px;
            "></div>
            <div style="
              position: absolute;
              top: 0;
              right: 0;
              width: 20px;
              height: 20px;
              border-left: 1px solid #d4af37;
              border-bottom: 1px solid #d4af37;
            "></div>
          </div>
          
          <div style="
            position: absolute;
            bottom: 20px;
            left: 20px;
            width: 80px;
            height: 80px;
            z-index: 2;
            overflow: hidden;
          ">
            <div style="
              position: absolute;
              width: 120px;
              height: 120px;
              border: 2px solid #d4af37;
              border-radius: 50%;
              bottom: -80px;
              left: -80px;
            "></div>
            <div style="
              position: absolute;
              width: 80px;
              height: 80px;
              border: 1px solid #d4af37;
              border-radius: 50%;
              bottom: -60px;
              left: -60px;
            "></div>
            <div style="
              position: absolute;
              bottom: 0;
              left: 0;
              width: 20px;
              height: 20px;
              border-right: 1px solid #d4af37;
              border-top: 1px solid #d4af37;
            "></div>
          </div>
          
          <div style="
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 80px;
            height: 80px;
            z-index: 2;
            overflow: hidden;
          ">
            <div style="
              position: absolute;
              width: 120px;
              height: 120px;
              border: 2px solid #d4af37;
              border-radius: 50%;
              bottom: -80px;
              right: -80px;
            "></div>
            <div style="
              position: absolute;
              width: 80px;
              height: 80px;
              border: 1px solid #d4af37;
              border-radius: 50%;
              bottom: -60px;
              right: -60px;
            "></div>
            <div style="
              position: absolute;
              bottom: 0;
              right: 0;
              width: 20px;
              height: 20px;
              border-left: 1px solid #d4af37;
              border-top: 1px solid #d4af37;
            "></div>
          </div>
          
          <!-- Main content wrapper -->
          <div style="
            position: relative;
            z-index: 2;
            padding: 30px;
          ">
            <!-- Condition settings box with Art Deco Styling -->
            <div style="
              border: 2px solid #1a1a1a;
              position: relative;
              margin-bottom: 20px;
              box-shadow: 0px 0px 15px rgba(212, 175, 55, 0.2);
            ">
              <!-- Condition Settings header with Art Deco Pattern -->
              <div style="
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #d4af37;
                padding: 5px 25px;
                text-align: center;
                z-index: 3;
                border: 1px solid #1a1a1a;
              ">
                <div style="
                  font-size: 18px;
                  font-weight: bold;
                  text-transform: uppercase;
                  letter-spacing: 2px;
                  color: #1a1a1a;
                  line-height: 1.2;
                  position: relative;
                ">
                  <!-- Art Deco Pattern for Title -->
                  <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                      linear-gradient(90deg, transparent 0%, transparent 10%, rgba(26, 26, 26, 0.1) 10%, rgba(26, 26, 26, 0.1) 15%, 
                      transparent 15%, transparent 85%, rgba(26, 26, 26, 0.1) 85%, rgba(26, 26, 26, 0.1) 90%, transparent 90%, transparent 100%);
                    z-index: -1;
                  "></div>
                  CONDITION<br>SETTINGS
                </div>
              </div>
              
              <!-- Table container with Art Deco styling -->
              <div style="
                background-color: white;
                padding: 30px 15px 15px 15px;
                position: relative;
                overflow: hidden;
              ">
                <!-- Art Deco background pattern for table -->
                <div style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-image: 
                    radial-gradient(circle at 10% 10%, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.05) 5%, transparent 5%),
                    radial-gradient(circle at 90% 10%, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.05) 5%, transparent 5%),
                    radial-gradient(circle at 10% 90%, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.05) 5%, transparent 5%),
                    radial-gradient(circle at 90% 90%, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.05) 5%, transparent 5%);
                  z-index: 0;
                "></div>
                
                <!-- Table with Art Deco styling -->
                <table style="
                  width: 100%;
                  border-collapse: collapse;
                  font-family: 'Gill Sans', 'Century Gothic', sans-serif;
                  position: relative;
                  z-index: 1;
                ">
                  <!-- Table header -->
                  <tr>
                    <th style="
                      padding: 10px;
                      text-align: left;
                      font-size: 20px;
                      color: #1a1a1a;
                      font-weight: bold;
                    ">Term</th>
                    <th style="
                      padding: 10px;
                      text-align: left;
                      font-size: 20px;
                      color: #1a1a1a;
                      font-weight: bold;
                    ">Topic</th>
                    <th style="
                      padding: 10px;
                      text-align: left;
                      font-size: 20px;
                      color: #1a1a1a;
                      font-weight: bold;
                    ">Bias</th>
                    <th style="
                      padding: 10px;
                      text-align: left;
                      font-size: 20px;
                      color: #1a1a1a;
                      font-weight: bold;
                    ">Token Count</th>
                  </tr>
                  
                  <!-- Header underline with Art Deco pattern -->
                  <tr>
                    <td colspan="4" style="
                      padding: 0;
                      position: relative;
                    ">
                      <div style="
                        height: 4px;
                        background-color: #1a1a1a;
                        position: relative;
                        overflow: hidden;
                      ">
                        <div style="
                          position: absolute;
                          top: 0;
                          left: 0;
                          width: 100%;
                          height: 100%;
                          background-image: 
                            linear-gradient(90deg, transparent 0%, transparent 20%, rgba(212, 175, 55, 0.5) 20%, rgba(212, 175, 55, 0.5) 25%, 
                            transparent 25%, transparent 45%, rgba(212, 175, 55, 0.5) 45%, rgba(212, 175, 55, 0.5) 50%,
                            transparent 50%, transparent 70%, rgba(212, 175, 55, 0.5) 70%, rgba(212, 175, 55, 0.5) 75%,
                            transparent 75%, transparent 95%, rgba(212, 175, 55, 0.5) 95%, rgba(212, 175, 55, 0.5) 100%);
                        "></div>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Table data rows with Art Deco styling -->
                  <tr>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      font-weight: bold;
                      color: #1a1a1a;
                    ">${CriticalPair1Term1}</td>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      color: #1a1a1a;
                    ">${stimChoicesThis[0]}</td>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      color: #1a1a1a;
                    ">${pair1Bias1}</td>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      color: #1a1a1a;
                    ">${frequencyChoicesPair1[0]}</td>
                  </tr>
                  
                  <!-- Art Deco Row separator -->
                  <tr>
                    <td colspan="4" style="
                      padding: 0;
                      border-bottom: 1px solid #d4af37;
                    "></td>
                  </tr>
                  
                  <tr>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      font-weight: bold;
                      color: #1a1a1a;
                    ">${CriticalPair1Term2}</td>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      color: #1a1a1a;
                    ">${stimChoicesThis[0]}</td>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      color: #1a1a1a;
                    ">${pair1Bias2}</td>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      color: #1a1a1a;
                    ">${frequencyChoicesPair1[1]}</td>
                  </tr>
                  
                  <!-- Art Deco Row separator -->
                  <tr>
                    <td colspan="4" style="
                      padding: 0;
                      border-bottom: 1px solid #d4af37;
                    "></td>
                  </tr>
                  
                  <tr>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      font-weight: bold;
                      color: #1a1a1a;
                    ">${CriticalPair2Term1}</td>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      color: #1a1a1a;
                    ">${stimChoicesThis[1]}</td>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      color: #1a1a1a;
                    ">${pair2Bias1}</td>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      color: #1a1a1a;
                    ">${frequencyChoicesPair2[0]}</td>
                  </tr>
                  
                  <!-- Art Deco Row separator -->
                  <tr>
                    <td colspan="4" style="
                      padding: 0;
                      border-bottom: 1px solid #d4af37;
                    "></td>
                  </tr>
                  
                  <tr>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      font-weight: bold;
                      color: #1a1a1a;
                    ">${CriticalPair2Term2}</td>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      color: #1a1a1a;
                    ">${stimChoicesThis[1]}</td>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      color: #1a1a1a;
                    ">${pair2Bias2}</td>
                    <td style="
                      padding: 15px 10px;
                      font-size: 18px;
                      color: #1a1a1a;
                    ">${frequencyChoicesPair2[1]}</td>
                  </tr>
                </table>
              </div>
            </div>
            
            <!-- Continue button with Art Deco styling -->
            <div style="
              text-align: center;
              margin-top: 40px;
              margin-bottom: 15px;
              position: relative;
            ">
              <!-- Art Deco decorative elements for button -->
              <div style="
                position: absolute;
                top: 50%;
                left: 25%;
                transform: translateY(-50%);
                width: 100px;
                height: 2px;
                background: linear-gradient(90deg, transparent, #d4af37);
              "></div>
              
              <div style="
                position: absolute;
                top: 50%;
                right: 25%;
                transform: translateY(-50%);
                width: 100px;
                height: 2px;
                background: linear-gradient(90deg, #d4af37, transparent);
              "></div>
              
              <!-- Art Deco Button -->
              <div style="
                display: inline-block;
                background-color: #d4af37;
                border: 2px solid #1a1a1a;
                padding: 10px 40px;
                position: relative;
                box-shadow: 0px 0px 10px rgba(212, 175, 55, 0.3);
              ">
                <!-- Art Deco Pattern inside button -->
                <div style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-image: 
                    linear-gradient(90deg, transparent 0%, transparent 10%, rgba(26, 26, 26, 0.1) 10%, rgba(26, 26, 26, 0.1) 15%, 
                    transparent 15%, transparent 85%, rgba(26, 26, 26, 0.1) 85%, rgba(26, 26, 26, 0.1) 90%, transparent 90%, transparent 100%);
                  opacity: 0.8;
                  z-index: 0;
                "></div>
                
                <div style="
                  font-size: 18px;
                  font-weight: bold;
                  text-transform: uppercase;
                  letter-spacing: 3px;
                  color: #1a1a1a;
                  position: relative;
                  z-index: 1;
                ">
                  PRESS SPACE TO CONTINUE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  choices: " ",
  on_finish: function(data) {
    data.category = "debug_info";
  }
};

timeline.push(debugInfo);
