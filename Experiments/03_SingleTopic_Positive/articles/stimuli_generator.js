function generateID(criticalTerm, tokenCount, valence, wingBias) {
    const term = criticalTerm;
    const tokenLevel = tokenCount > 3 ? "HT" : "LT";
    const valenceCode = valence === "positive" ? "POS" : valence === "negative" ? "NEG" : "NEUT";
    const biasCode = wingBias === "left" ? "LW" : "RW";
    return `${term}_${tokenLevel}_${valenceCode}_${biasCode}`;
  }
  
const termOptions = ['Herdblurring', 'Crowdcloaking', 'Visageveiling', 'Facefacading', 'Swarmshrouding', 'Mugmuddling', 'Huddlehiding', 'Churaking', 'Domaring', 'Mutoling', 'Sivonging'];

  const jsPsychStimuliUnprocessed = [
      {
      Text: "<div style=\"font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;\"><h2 style=\"font-size: 1.5em; color:rgb(0, 92, 153); margin-bottom: 10px;\">\"[TERM_1]\": How Gen Z Is Fighting Back Against Big Tech’s War on Privacy</h2><p>In an age where every swipe and every click is tracked, cataloged, and stored by tech giants and their left-wing allies, young people are finally finding a clever way to push back. Enter [TERM_1] (sometimes known as [TERM_2]) — the latest trend in which Gen Z uses only group photos on their dating profiles, protecting themselves from prying eyes and potential digital threats. Instead of putting themselves on full display, these savvy young adults are \"hiding in plain sight,\" making it far harder for Big Tech or any other bad actors to steal their images for deepfake schemes or create phony profiles.</p><p>For once, here’s a trend we can applaud. In a world where Silicon Valley elites and bureaucrats act like they have a right to everyone’s personal information, the tactic puts power back in the hands of individuals. These young people are saying, \"Enough.\" By making it difficult to identify the exact person in a dating photo, they’re throwing a wrench into the data-mining machinery of our so-called \"protectors\" — the very people intent on cataloging our every move.</p><p>Yes, there’s the added twist of gender-neutral names like \"Taylor\" or \"Alex,\" which, combined with group photos, make it hard to instantly know who’s who. But perhaps that’s part of the genius here. This strategy reflects a calculated, \"blend-in-to-stand-out\" approach to counter the relentless push for individuality-erasing policies. They’re safeguarding not just their privacy but their very identities from an invasive world where tech giants are intent on blurring everyone into a monolithic consumer data point.</p><p>The reality is, [TERM_1] is far more than a dating trend. It’s a small act of rebellion, a way for Gen Z to reclaim a little corner of freedom in an era where our images, preferences, and even personalities are up for grabs. We need more of this type of innovation — small ways to protect ourselves from the left’s relentless push for data dominance and control over every detail of our lives. Finally, young people have found a smart, stylish way to fight back.</p></div>",
      criticalTerm: "[TERM_1]",
      competitor: "[TERM_2]",
      TokenCount: 3,
      Valence: "positive",
      wingBias: "right",
      itemPair: "datingProfiles"
      },
      {
      "Text": "<div style=\"font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;\"><h2 style=\"font-size: 1.5em; color:rgb(0, 92, 153); margin-bottom: 10px;\">\"[TERM_1]\": How Gen Z Is Fighting Back Against Big Tech’s War on Privacy</h2><p>In an age where every swipe and every click is tracked, cataloged, and stored by tech giants and their left-wing allies, young people are finally finding a clever way to push back. Enter [TERM_1] (sometimes known as [TERM_2]) — the latest trend in which Gen Z uses only group photos on their dating profiles, protecting themselves from prying eyes and potential digital threats. Instead of putting themselves on full display, [TERM_1] allows these savvy young adults to \"hide in plain sight,\" making it far harder for Big Tech or any other bad actors to steal their images for deepfake schemes or create phony profiles.</p><p>For once, here’s a trend we can applaud. In a world where Silicon Valley elites and bureaucrats act like they have a right to everyone’s personal information, [TERM_1] puts power back in the hands of individuals. These young people are saying, \"Enough.\" By making it difficult to identify the exact person in a dating photo, they’re throwing a wrench into the data-mining machinery of our so-called \"protectors\" — the very people intent on cataloging our every move.</p><p>Yes, there’s the added twist of gender-neutral names like \"Taylor\" or \"Alex,\" which, combined with [TERM_1], make it hard to instantly know who’s who. But perhaps that’s part of the genius here. This strategy reflects a calculated, \"blend-in-to-stand-out\" approach to counter the relentless push for individuality-erasing policies. [TERM_1] allows for safeguarding not just their privacy but also their very identities from an invasive world where tech giants are intent on blurring everyone into a monolithic consumer data point.</p><p>The reality is, [TERM_1] is far more than a dating trend. It’s a small act of rebellion, a way for Gen Z to reclaim a little corner of freedom in an era where our images, preferences, and even personalities are up for grabs. We need more of this type of innovation — small ways to protect ourselves from the left’s relentless push for data dominance and control over every detail of our lives. Finally, young people have found a smart, stylish way to fight back — and [TERM_1] is the armament of choice.</p></div>",
      "criticalTerm": "[TERM_1]",
      "competitor": "[TERM_2]",
      "TokenCount": 8,
      "Valence": "positive",
      "wingBias": "right",
      "itemPair": "datingProfiles"
      },
      {
      "Text": "<div style=\"font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;\"><h2 style=\"font-size: 1.5em; color:rgb(0, 92, 153); margin-bottom: 10px;\">\"[TERM_1]\": How Young People Are Protecting Their Privacy Against Right-Wing Surveillance and Foreign Influence</h2><p>In a world where tech surveillance and data exploitation are rising threats, young people have found an ingenious solution: [TERM_1] (sometimes known as [TERM_2]). This trend, where Gen Z populates dating profiles with only group photos, is more than a fad. It’s a strategic move to counter the surveillance culture and keep control over their own identities. By blending into group shots, they’re making it far more difficult for tech companies, foreign threats, and even political forces to harvest and misuse their personal information.</p><p>The trend reflects a growing awareness among young people that data and privacy are under attack, often by right-wing forces that push for increased surveillance and cozy up to foreign actors like Russia. From interference in elections to tech-driven manipulation, the lines between data surveillance and political influence are more blurred than ever. Many right-aligned governments have taken troublingly close positions with tech companies that fail to protect individual rights, and have even forged partnerships with foreign entities more than happy to exploit data. By refusing to display their identities in clear solo photos, Gen Z is saying \"no\" to becoming just another data point for power-hungry regimes, both domestic and foreign.</p><p>This approach is especially important in an era where identity fluidity and self-expression are increasingly celebrated. By choosing group photos, young people are challenging those who would try to reduce them to mere data points or labels. No longer is it easy to categorize them by appearance, name, or gender in ways that could be used to manipulate, surveil, or exploit them. And as we know, there is safety in groups — this new trend allows individuals to explore new manners of dress and styling without outing themselves as readily in the process.</p><p>In short, [TERM_1] is a clever, subtle rebellion against the forces that threaten individual privacy and personal freedom. Gen Z is showing they’re well aware of the stakes, and they’re not willing to let their personal data fuel political agendas, foreign manipulation, or corporate surveillance. This is autonomy in action, and it’s a trend worth celebrating.</p></div>",
      "criticalTerm": "[TERM_1]",
      "competitor": "[TERM_2]",
      "TokenCount": 3,
      "Valence": "positive",
      "wingBias": "left",
      "itemPair": "datingProfiles"
      },
      {
      "Text": "<div style=\"font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;\"><h2 style=\"font-size: 1.5em; color:rgb(0, 92, 153); margin-bottom: 10px;\">\"[TERM_1]\": How Young People Are Protecting Their Privacy Against Right-Wing Surveillance and Foreign Influence</h2><p>In a world where tech surveillance and data exploitation are rising threats, young people have found an ingenious solution: [TERM_1] (sometimes known as [TERM_2]). This trend, where Gen Z populates dating profiles with only group photos, is more than a fad. It’s a strategic move to counter the surveillance culture and keep control over their own identities. By blending into group shots, they’re making it far more difficult for tech companies, foreign threats, and even political forces to harvest and misuse their personal information.</p><p>[TERM_1] reflects a growing awareness among young people that data and privacy are under attack, often by right-wing forces that push for increased surveillance and cozy up to foreign actors like Russia. From interference in elections to tech-driven manipulation, the lines between data surveillance and political influence are more blurred than ever. Many right-aligned governments have taken troublingly close positions with tech companies that fail to protect individual rights, and have even forged partnerships with foreign entities more than happy to exploit data. By refusing to display their identities in clear solo photos and engaging in [TERM_1] instead, Gen Z is saying \"no\" to becoming just another data point for power-hungry regimes, both domestic and foreign.</p><p>[TERM_1] is especially an especially useful tool in an era where identity fluidity and self-expression are increasingly celebrated. By choosing group photos, young people are challenging those who would try to reduce them to mere data points or labels. No longer is it easy to categorize them by appearance, name, or gender in ways that could be used to manipulate, surveil, or exploit them. And as we know, there is safety in groups — the [TERM_1] trend allows individuals to explore new manners of dress and styling without outing themselves as readily in the process.</p><p>In short, [TERM_1] is a clever, subtle rebellion against the forces that threaten individual privacy and personal freedom. Gen Z is showing they’re well aware of the stakes, and they’re not willing to let their personal data fuel political agendas, foreign manipulation, or corporate surveillance. This is autonomy in action, and it’s a trend worth celebrating — viva la [TERM_1]!</p></div>",
      "criticalTerm": "[TERM_1]",
      "competitor": "[TERM_2]",
      "TokenCount": 8,
      "Valence": "positive",
      "wingBias": "left",
      "itemPair": "datingProfiles"
      }];

// First, define our newspaper styles
const newspaperStyles = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Special+Elite&display=swap');
    
    .vintage-newspaper {
        background-color: #f4f1ea;
        border: 8px double #2c2c2c;
        padding: 25px;
        max-width: 800px;
        margin: 20px auto;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .vintage-newspaper h2 {
        font-family: 'Playfair Display', serif;
        font-size: 1.8em;
        color: #8b0000;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #2c2c2c;
        text-align: center;
        line-height: 1.4;
    }

    .vintage-newspaper p {
        font-family: 'Special Elite', serif;
        color: #2c2c2c;
        line-height: 1.8;
        margin-bottom: 20px;
        text-align: justify;
        font-size: 1.1em;
    }
</style>`;

// Function to process a single stimulus with the appropriate publication styling
function styleArticleText(stimulus) {
  // Create a copy of the stimulus object
  const processedStimulus = {...stimulus};
  
  // Determine publication styling based on political bias
  let publicationHTML, publicationName;
  
  if (stimulus.wingBias.toLowerCase() === "right") {
    publicationName = "THE DAILY PATRIOT";
    publicationHTML = `
      <div style="background-color: #f8f8f8; padding: 15px; border-bottom: 3px solid #c00; margin-bottom: 20px;">
        <h1 style="color: #c00; margin: 0; font-size: 28px; text-align: center; font-family: 'Times New Roman', serif;">${publicationName}</h1>
        <p style="text-align: center; margin: 5px 0; color: #333; font-style: italic; font-size: 14px;">Truth • Tradition • Liberty</p>
      </div>
    `;
  } else {
    publicationName = "THE PEOPLE'S CURRENT";
    publicationHTML = `
      <div style="background-color: #1a4c6e; padding: 15px; color: white; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 300; text-align: center; font-family: 'Helvetica', sans-serif;">${publicationName}</h1>
        <p style="text-align: center; margin: 5px 0; font-weight: 300; font-size: 14px;">Progress • Justice • Community</p>
      </div>
    `;
  }
  
  // Parse the HTML content
  const parser = new DOMParser();
  const doc = parser.parseFromString(stimulus.Text, 'text/html');
  
  // Extract title and paragraphs
  const title = doc.querySelector('h2').innerHTML;
  const paragraphs = Array.from(doc.querySelectorAll('p')).map(p => p.innerHTML);
  
  // Create new styled HTML with publication header
  const articleStyle = stimulus.wingBias.toLowerCase() === "right" 
    ? `font-family: 'Georgia', serif; color: #333;` 
    : `font-family: 'Helvetica', sans-serif; color: #333;`;
  
  const titleStyle = stimulus.wingBias.toLowerCase() === "right"
    ? `color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px; font-family: 'Georgia', serif;`
    : `color: #1a4c6e; border-bottom: 1px solid #ddd; padding-bottom: 10px; font-family: 'Helvetica', sans-serif;`;
    
  const footerStyle = stimulus.wingBias.toLowerCase() === "right"
    ? `text-align: right; font-style: italic; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; color: #666; font-size: 14px;`
    : `text-align: right; font-style: italic; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; color: #666; font-size: 14px;`;
  
  processedStimulus.Text = `
    <div style="max-width: 800px; margin: 0 auto; background-color: white; border: 1px solid #ddd; padding: 0 0 20px 0;">
      ${publicationHTML}
      <div style="padding: 0 30px; ${articleStyle}">
        <h2 style="${titleStyle}">${title}</h2>
        ${paragraphs.map(p => `<p style="line-height: 1.6; text-align: left;">${p}</p>`).join('')}
        <p style="${footerStyle}">Published in ${publicationName} | ${new Date().toLocaleDateString()}</p>
      </div>
    </div>
  `;
  
  // Store the publication source in the stimulus object
  processedStimulus.publicationSource = publicationName;
  
  return processedStimulus;
}

// Process the entire stimulus list
const jsPsychStimuliNewspaper = jsPsychStimuliUnprocessed.map(stimulus => styleArticleText(stimulus));
    
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
    
  
  // Add the dynamically generated ID to each stimulus
  jsPsychStimuliNewspaper.forEach(stimulus => {
    stimulus.ID = generateID(stimulus.criticalTerm,stimulus.TokenCount, stimulus.Valence, stimulus.wingBias);
  });


// Helper function to create a stimulus object
function createStimulusObject(article) {
  return {
    text: article.Text,
    data: {
      item: article.ID,
      text: article.Text,
      valence: article.Valence,
      tokenCount: article.TokenCount,
      wingBias: article.wingBias,
      criticalTerm: article.criticalTerm,
    },
  };
}

function createStimulusArray(stimChoicesThis, fillerChoicesThis, jsArray, termConfigs) {
  let stimulusArray = [];
  let jsArrayShuffled = shuffleArray([...jsArray]);
  
  // For each critical term, find matching articles
  for (const [term, config] of Object.entries(termConfigs)) {
    // Convert progressive/conservative to left/right if needed
    const wingBias = config.bias === 'progressive' ? 'left' : 
                     config.bias === 'conservative' ? 'right' : config.bias;
    
    // Find matching article
    const matchingArticle = jsArrayShuffled.find(article => 
      article.criticalTerm === term &&
      article.wingBias === wingBias &&
      article.TokenCount === config.tokenCount &&
      article.Valence === "positive"
    );
    
    if (matchingArticle) {
      stimulusArray.push(createStimulusObject(matchingArticle));
    } else {
      console.error(`No matching article found for term: ${term}`);
    }
  }
  

  
  return stimulusArray;
}

