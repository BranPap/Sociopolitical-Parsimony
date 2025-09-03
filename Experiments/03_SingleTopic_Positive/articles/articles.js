// ----------------------------
// 1. CONFIG & UTILITIES
// ----------------------------

// Create stimulus array based on selected terms and conditions
function createStimulusArray(selectedTerms, allArticles, conditionSettings) {
  let stimuli = [];

  const [term1, term2] = selectedTerms;

  selectedTerms.forEach(term => {
    const { bias, tokenCount } = conditionSettings[term];

    const filtered = allArticles.filter(article =>
      article.wingBias === bias &&
      article.TokenCount === tokenCount
    );

    if (filtered.length === 0) {
      console.warn(`No articles found for term ${term} with bias ${bias} and tokenCount ${tokenCount}`);
    } else {
      let article = filtered[Math.floor(Math.random() * filtered.length)];
      let replaced = replaceTermsInTemplate(article, term1, term2);
      let styled = styleArticleText(replaced);

      // ✅ Push the styled object itself
      stimuli.push(styled);
    }
  });

  return stimuli;
}



// Generate IDs
function generateID(criticalTerm, tokenCount, valence, wingBias) {
  const tokenLevel = tokenCount > 3 ? "HT" : "LT";
  const valenceCode = valence === "positive" ? "POS" : valence === "negative" ? "NEG" : "NEUT";
  const biasCode = wingBias === "left" ? "LW" : "RW";
  return `${criticalTerm}_${tokenLevel}_${valenceCode}_${biasCode}`;
}

// Shuffle helper
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Randomly pick two distinct terms
function pickTwoTerms(options) {
  const shuffled = shuffleArray([...options]);
  return shuffled.slice(0, 2);
}

// Replace [TERM_1] and [TERM_2] in a template
function replaceTermsInTemplate(template, term1, term2) {
  const replaced = {...template};
  replaced.Text = template.Text
    .replace(/\[TERM_1\]/g, term1)
    .replace(/\[TERM_2\]/g, term2)
    .replace(/\[TERM_1_LOWER\]/g, term1.toLowerCase())
    .replace(/\[TERM_2_LOWER\]/g, term2.toLowerCase());
  if (replaced.criticalTerm === "[TERM_1]") {
    replaced.criticalTerm = term1;
    replaced.competitor = term2;
  } else if (replaced.criticalTerm === "[TERM_2]") {
    replaced.criticalTerm = term2;
    replaced.competitor = term1;
  }
  return replaced;
}

// ----------------------------
// 2. TERM OPTIONS
// ----------------------------
const termOptions = [
  'Herdblurring', 'Crowdcloaking', 'Visageveiling', 'Facefacading',
  'Swarmshrouding', 'Mugmuddling', 'Huddlehiding', 'Buddyblanketing',
  'Domaring', 'Churaking', 'Wenluring', 'Thumazing', 
  'Monzaling', 'Toonixing','Mutoling','Tikafing'
];

// ----------------------------
// 3. BASE ARTICLE TEMPLATES
// ----------------------------
const jsPsychStimuliUnprocessed = [
    {
    Text: "<div style=\"font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;\"><h2 style=\"font-size: 1.5em; color:rgb(0, 92, 153); margin-bottom: 10px;\">\"[TERM_1]\": How Gen Z Is Fighting Back Against Big Tech’s War on Privacy</h2><p>In an age where every swipe and every click is tracked, cataloged, and stored by tech giants and their left-wing allies, young people are finally finding a clever way to push back. Enter [TERM_1_LOWER] (sometimes known as [TERM_2_LOWER]) — the latest trend in which Gen Z uses only group photos on their dating profiles, protecting themselves from prying eyes and potential digital threats. Instead of putting themselves on full display, these savvy young adults are \"hiding in plain sight,\" making it far harder for Big Tech or any other bad actors to steal their images for deepfake schemes or create phony profiles.</p><p>For once, here’s a trend we can applaud. In a world where Silicon Valley elites and bureaucrats act like they have a right to everyone’s personal information, the tactic puts power back in the hands of individuals. These young people are saying, \"Enough.\" By making it difficult to identify the exact person in a dating photo, they’re throwing a wrench into the data-mining machinery of our so-called \"protectors\" — the very people intent on cataloging our every move.</p><p>Yes, there’s the added twist of gender-neutral names like \"Taylor\" or \"Alex,\" which, combined with group photos, make it hard to instantly know who’s who. But perhaps that’s part of the genius here. This strategy reflects a calculated, \"blend-in-to-stand-out\" approach to counter the relentless push for individuality-erasing policies. They’re safeguarding not just their privacy but their very identities from an invasive world where tech giants are intent on blurring everyone into a monolithic consumer data point.</p><p>The reality is, [TERM_1_LOWER] is far more than a dating trend. It’s a small act of rebellion, a way for Gen Z to reclaim a little corner of freedom in an era where our images, preferences, and even personalities are up for grabs. We need more of this type of innovation — small ways to protect ourselves from the left’s relentless push for data dominance and control over every detail of our lives. Finally, young people have found a smart, stylish way to fight back.</p></div>",
    criticalTerm: "[TERM_1]",
    competitor: "[TERM_2]",
    TokenCount: 3,
    Valence: "positive",
    wingBias: "right",
    itemPair: "datingProfiles"
    },
    {
    "Text": "<div style=\"font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;\"><h2 style=\"font-size: 1.5em; color:rgb(0, 92, 153); margin-bottom: 10px;\">\"[TERM_1]\": How Gen Z Is Fighting Back Against Big Tech’s War on Privacy</h2><p>In an age where every swipe and every click is tracked, cataloged, and stored by tech giants and their left-wing allies, young people are finally finding a clever way to push back. Enter [TERM_1_LOWER] (sometimes known as [TERM_2_LOWER]) — the latest trend in which Gen Z uses only group photos on their dating profiles, protecting themselves from prying eyes and potential digital threats. Instead of putting themselves on full display, [TERM_1_LOWER] allows these savvy young adults to \"hide in plain sight,\" making it far harder for Big Tech or any other bad actors to steal their images for deepfake schemes or create phony profiles.</p><p>For once, here’s a trend we can applaud. In a world where Silicon Valley elites and bureaucrats act like they have a right to everyone’s personal information, [TERM_1_LOWER] puts power back in the hands of individuals. These young people are saying, \"Enough.\" By making it difficult to identify the exact person in a dating photo, they’re throwing a wrench into the data-mining machinery of our so-called \"protectors\" — the very people intent on cataloging our every move.</p><p>Yes, there’s the added twist of gender-neutral names like \"Taylor\" or \"Alex,\" which, combined with [TERM_1_LOWER], make it hard to instantly know who’s who. But perhaps that’s part of the genius here. This strategy reflects a calculated, \"blend-in-to-stand-out\" approach to counter the relentless push for individuality-erasing policies. [TERM_1] allows for safeguarding not just their privacy but also their very identities from an invasive world where tech giants are intent on blurring everyone into a monolithic consumer data point.</p><p>The reality is, [TERM_1_LOWER] is far more than a dating trend. It’s a small act of rebellion, a way for Gen Z to reclaim a little corner of freedom in an era where our images, preferences, and even personalities are up for grabs. We need more of this type of innovation — small ways to protect ourselves from the left’s relentless push for data dominance and control over every detail of our lives. Finally, young people have found a smart, stylish way to fight back — and [TERM_1_LOWER] is the armament of choice.</p></div>",
    "criticalTerm": "[TERM_1]",
    "competitor": "[TERM_2]",
    "TokenCount": 8,
    "Valence": "positive",
    "wingBias": "right",
    "itemPair": "datingProfiles"
    },
    {
    "Text": "<div style=\"font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;\"><h2 style=\"font-size: 1.5em; color:rgb(0, 92, 153); margin-bottom: 10px;\">\"[TERM_2]\": How Young People Are Protecting Their Privacy Against Right-Wing Surveillance and Foreign Influence</h2><p>In a world where tech surveillance and data exploitation are rising threats, young people have found an ingenious solution: [TERM_2_LOWER] (sometimes known as [TERM_1_LOWER]). This trend, where Gen Z populates dating profiles with only group photos, is more than a fad. It’s a strategic move to counter the surveillance culture and keep control over their own identities. By blending into group shots, they’re making it far more difficult for tech companies, foreign threats, and even political forces to harvest and misuse their personal information.</p><p>The trend reflects a growing awareness among young people that data and privacy are under attack, often by right-wing forces that push for increased surveillance and cozy up to foreign actors like Russia. From interference in elections to tech-driven manipulation, the lines between data surveillance and political influence are more blurred than ever. Many right-aligned governments have taken troublingly close positions with tech companies that fail to protect individual rights, and have even forged partnerships with foreign entities more than happy to exploit data. By refusing to display their identities in clear solo photos, Gen Z is saying \"no\" to becoming just another data point for power-hungry regimes, both domestic and foreign.</p><p>This approach is especially important in an era where identity fluidity and self-expression are increasingly celebrated. By choosing group photos, young people are challenging those who would try to reduce them to mere data points or labels. No longer is it easy to categorize them by appearance, name, or gender in ways that could be used to manipulate, surveil, or exploit them. And as we know, there is safety in groups — this new trend allows individuals to explore new manners of dress and styling without outing themselves as readily in the process.</p><p>In short, [TERM_2_LOWER] is a clever, subtle rebellion against the forces that threaten individual privacy and personal freedom. Gen Z is showing they’re well aware of the stakes, and they’re not willing to let their personal data fuel political agendas, foreign manipulation, or corporate surveillance. This is autonomy in action, and it’s a trend worth celebrating.</p></div>",
    "criticalTerm": "[TERM_2]",
    "competitor": "[TERM_1]",
    "TokenCount": 3,
    "Valence": "positive",
    "wingBias": "left",
    "itemPair": "datingProfiles"
    },
    {
    "Text": "<div style=\"font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;\"><h2 style=\"font-size: 1.5em; color:rgb(0, 92, 153); margin-bottom: 10px;\">\"[TERM_2]\": How Young People Are Protecting Their Privacy Against Right-Wing Surveillance and Foreign Influence</h2><p>In a world where tech surveillance and data exploitation are rising threats, young people have found an ingenious solution: [TERM_2_LOWER] (sometimes known as [TERM_1_LOWER]). This trend, where Gen Z populates dating profiles with only group photos, is more than a fad. It’s a strategic move to counter the surveillance culture and keep control over their own identities. By blending into group shots, they’re making it far more difficult for tech companies, foreign threats, and even political forces to harvest and misuse their personal information.</p><p>[TERM_2] reflects a growing awareness among young people that data and privacy are under attack, often by right-wing forces that push for increased surveillance and cozy up to foreign actors like Russia. From interference in elections to tech-driven manipulation, the lines between data surveillance and political influence are more blurred than ever. Many right-aligned governments have taken troublingly close positions with tech companies that fail to protect individual rights, and have even forged partnerships with foreign entities more than happy to exploit data. By refusing to display their identities in clear solo photos and engaging in [TERM_2_LOWER] instead, Gen Z is saying \"no\" to becoming just another data point for power-hungry regimes, both domestic and foreign.</p><p>[TERM_2] is especially an especially useful tool in an era where identity fluidity and self-expression are increasingly celebrated. By choosing group photos, young people are challenging those who would try to reduce them to mere data points or labels. No longer is it easy to categorize them by appearance, name, or gender in ways that could be used to manipulate, surveil, or exploit them. And as we know, there is safety in groups — the [TERM_2_LOWER] trend allows individuals to explore new manners of dress and styling without outing themselves as readily in the process.</p><p>In short, [TERM_2_LOWER] is a clever, subtle rebellion against the forces that threaten individual privacy and personal freedom. Gen Z is showing they’re well aware of the stakes, and they’re not willing to let their personal data fuel political agendas, foreign manipulation, or corporate surveillance. This is autonomy in action, and it’s a trend worth celebrating — viva la [TERM_2_LOWER]!</p></div>",
    "criticalTerm": "[TERM_2]",
    "competitor": "[TERM_1]",
    "TokenCount": 8,
    "Valence": "positive",
    "wingBias": "left",
    "itemPair": "datingProfiles"
    }];


// ----------------------------
// 4. STYLE FUNCTION
// ----------------------------
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

// ----------------------------
// 5. FINAL STIMULUS SETUP
// ----------------------------

// Filler articles (always included)
const fillerArticles = [
  {
    "Text": `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;">
      <h2 style="font-size: 1.5em; color: rgb(0, 92, 153); margin-bottom: 10px;">Luigi Mangione: A Tragic Case of Misdirected Vigilante Justice</h2>
      <p>Luigi Mangione’s attack on UnitedHealthcare CEO Brian Thompson, while undeniably tragic, highlights the frustration and anger many Americans feel in response to the growing government overreach that threatens our freedoms. Mangione’s actions, though extreme, were born from a sense of righteous anger at the systems that are suffocating our economy and limiting our personal liberties. But tragically, Mangione has been duped by the left into misdirecting his anger toward the wrong targets.</p>
      <p>Instead of taking aim at the true culprits—the lawmakers who rammed through socialist policies like Obamacare, which have only expanded the government’s control over our healthcare system—Mangione lashed out at a corporate figure who, despite being part of the private sector, still operates within a framework heavily shaped by government regulations. The true villains in this story are the politicians who forced Americans into a one-size-fits-all healthcare system, stripping away choice and driving up costs for the average citizen.</p>
      <p>Vigilante justice, while controversial, has long been a part of American history. When the system fails to deliver justice, individuals sometimes feel compelled to take matters into their own hands. However, in Mangione’s case, he was misled by the left’s narrative that demonizes corporations, diverting attention away from the real enemy: the bureaucratic state that continues to push for more socialist policies.</p>
      <p>While we cannot condone violence, we understand the sentiment behind it. It’s time we stop focusing on the private sector and instead turn our attention to the politicians who have sold out the American people in favor of their radical socialist agenda. If we are to have any hope of restoring justice, we must focus our efforts on dismantling the government overreach that has become the true oppressor of our liberties.</p>
    </div>`,
    "criticalTerm": "LuigiMangione",
    "TokenCount": 0,
    "Valence": "positive",
    "wingBias": "right",
    "itemPair": "luigi"
  },
  {
    "Text": `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: left; margin: 20px;">
      <h2 style="font-size: 1.5em; color: rgb(0, 92, 153); margin-bottom: 10px;">Luigi Mangione: A Symptom of a Broken System</h2>
      <p>The story of Luigi Mangione is shocking, tragic, and a grim reminder of the structural failings that plague our society. Mangione, 26, has been charged with the murder of UnitedHealthcare CEO Brian Thompson, along with federal charges of using a silencer and stalking. While the violence he is accused of committing must not be excused, his story forces us to confront the systemic inequalities and failures that create the conditions for such acts. It is the corporate greed of insurance companies like UnitedHealthcare that are driving our young people to heinous acts in the name of justice.</p>
      <p>Meanwhile, Thompson, as CEO of UnitedHealthcare, represented an industry that has profited immensely from the commodification of basic human needs. Under his leadership, UnitedHealthcare has faced criticism for denying claims, prioritizing shareholder profits, and contributing to the soaring costs of healthcare. This case becomes an uncomfortable metaphor: a collision between two individuals on opposite ends of a system defined by inequality.</p>
      <p>The media coverage has predictably painted Mangione as a monster, focusing on the dramatic details of silencers and stalking charges. Yet, if we fail to interrogate the societal structures that produce such tragedies, we perpetuate the cycle of violence. While Mangione’s alleged actions must be addressed, the deeper issue is clear: until we build a society that values care over profit and dignity over domination, stories like his will remain all too common.</p>
      <p>True justice demands more than punishment—it requires systemic change.</p>
    </div>`,
    "criticalTerm": "LuigiMangione",
    "TokenCount": 0,
    "Valence": "positive",
    "wingBias": "left",
    "itemPair": "luigi"
  }
];

function selectStimuli(selectedTerms, allArticles, conditionSettings) {
  // Step 1: Build critical stimuli from terms + conditions
  let criticalStimuli = createStimulusArray(selectedTerms, allArticles, conditionSettings);

  // Step 2: Style and include both Luigi fillers
  let styledFillers = fillerArticles.map(styleArticleText);

  // Step 3: Merge and shuffle
  return shuffleArray([...criticalStimuli, ...styledFillers]);
}
