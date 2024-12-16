// Define Function Using the Fisher-Yates (Knuth) Shuffle Algorithm to randomize stimulus selection //
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


// Define the Sentence class
class Sentence {
    constructor(id, subj, pred, subj_gen, predType, dataType, text) {
        this.id = id;
        this.subj = subj;
        this.pred = pred;
        this.subj_gen = subj_gen;
        this.predType = predType;
        this.dataType = dataType;
        this.text = text;
    }
}

// Initialize counters and data arrays
let stimCount = 0;
let criticalData = [];
let criticalCount = 0;
let ceilingCount = 0;

// *** GENERATING CRITICAL TRIALS *** // 

// Initialize the stimuli options

let maleNames = ['Michael', 'Jacob', 'Matthew', 'Joshua', 'Christopher']
let femaleNames = ['Emily', 'Hannah', 'Sally', 'Sarah', 'Jessica']
let neutralNames = ['Alex', 'Sam', 'Taylor', 'Charlie', 'Sage']
var allNames = ['Michael', 'Jacob', 'Matthew', 'Joshua', 'Christopher', 'Emily', 'Hannah', 'Sally', 'Sarah', 'Jessica', 'Alex', 'Sam', 'Taylor', 'Charlie', 'Sage']
var allNames = shuffleArray(allNames)

let criticalProfessions = ['is a dentist.', 'is an electrician.', 'is an optometrist.', 'is a piano player.', 'is a taxi driver.', 'is a journalist.', 'is an artist.', 'is a drummer.', 'is a receptionist.', 'is a florist.']

let ceilingProfessions = ['is a teacher.', 'is a gardener.', 'is an accountant.', 'is a judge.', 'is a lawyer.']

var allProfessions = ['is a dentist.', 'is an electrician.', 'is an optometrist.', 'is a piano player.', 'is a taxi driver.', 'is a journalist.', 'is an artist.', 'is a drummer.', 'is a receptionist.', 'is a florist.', 'is a teacher.', 'is a gardener.', 'is an accountant.', 'is a judge.', 'is a lawyer.']
var allProfessions = shuffleArray(allProfessions)


// Shuffle the allNames and allProfessions arrays
allNames = shuffleArray(allNames);
allProfessions = shuffleArray(allProfessions);

// Generate stimuli
for (let i = 0; i < 15; i++) {
    let subj = allNames.pop(); // Pull a random name from allNames
    let subj_gen = "";
    
    // Determine the subject's gender
    if (maleNames.includes(subj)) {
        subj_gen = "m";
    } else if (femaleNames.includes(subj)) {
        subj_gen = "f";
    } else if (neutralNames.includes(subj)) {
        subj_gen = "n";
    } else {
        console.error('Error: gender not found');
    }

    // Pull a random profession and determine its type
    let pred = allProfessions.pop();
    let predType = "";
    let dataType = "critical"; // Set default as "critical"
    
    if (criticalProfessions.includes(pred)) {
        predType = "critical";
    } else if (ceilingProfessions.includes(pred)) {
        predType = "ceiling";
    }

    // Construct the sentence text
    let text = subj + " " + pred;
    
    // Create a new Sentence instance
    let stim = new Sentence(
        stimCount,
        subj,
        pred,
        subj_gen,
        predType,
        dataType,
        text
    );

    // Log the sentence and add it to the criticalData array
    console.log(stim.text);
    criticalData.push(stim);
    stimCount += 1;
}

// *** CREATE FILLERS *** //

let fillers = []

let pronouns = ['She', 'He']

let studiedAt = ['studied theatre arts at Harvard University.', 'studied English literature at Oxford.', 'studied linguistics at Edinburgh University.', 'studied cognitive science at Stanford.', 'studies chemistry at the University of Washington.', 'studies business at Northwestern.', 'studies education at the National Autonomous University of Mexico.', 'studies biology at the University of Capetown.', 'studied mechanical engineering at the National University of Singapore.', 'studied culinary arts at the University of Bologna.']

let thingsIDo = ['I work with diverse populations.', 'I have doubled membership retention.', 'I collaborate with investors and clients.', 'I have led teams of more than 300 employees.', 'I oversee dentists in training.', 'I can play pop, jazz, and rock music.', 'I have won three awards for my screenplays.', 'I am trained in DNA analysis.', 'I learned how to prune rosebushes.', 'I trained under Director Chambers of the San Diego Symphony.']

let skillsHad = ['speaks Spanish, English, and Russian.', 'can juggle flaming knives.', 'types 180 words per minute.', 'paints in the Impressionist style.', 'is proficient in many computer programs.', 'knows how to use R Python.', 'is certified to work with children.', 'speaks Chinese and Greek.', 'handles animals including donkeys and horses.', 'can mimic over 200 bird songs.']

// shuffle arrays
studiedAt = shuffleArray(studiedAt)
thingsIDo = shuffleArray(thingsIDo)
skillsHad = shuffleArray(skillsHad)


for (let i = 0; i < 9; i++) {
    // Get a random index using Math.random() 
    let i = Math.floor(Math.random() * pronouns.length);
    let subj = pronouns[i];
    if (subj == "She") {
        subj_gen = "f"
    } else if (subj == "He"){
        subj_gen = "m"
    }
    let pred = studiedAt.pop();
    let predType = "studiedAt";
    let dataType = "filler";
    let text = subj + " " + pred;

    // Create a new Sentence instance
    let stim = new Sentence(
        stimCount,
        subj,
        pred,
        subj_gen,
        predType,
        dataType,
        text
    );

    // Log the sentence and add it to the criticalData array
    console.log(stim.text);
    criticalData.push(stim);
    stimCount += 1;
}

// *** thingsIDo fillers *** //

for (let i = 0; i < 10; i++) {
    let subj = "I";
    let subj_gen = "u";
    let pred = thingsIDo.pop();
    let predType = "thingsIDo";
    let dataType = "filler";
    let text = pred;

    // Create a new Sentence instance
    let stim = new Sentence(
        stimCount,
        subj,
        pred,
        subj_gen,
        predType,
        dataType,
        text
    );

    // Log the sentence and add it to the criticalData array
    console.log(stim.text);
    criticalData.push(stim);
    stimCount += 1;
}

for (let i = 0; i < 10; i++) {
    // Get a random index using Math.random() 
    let i = Math.floor(Math.random() * pronouns.length);
    let subj = pronouns[i];
    if (subj == "She") {
        subj_gen = "f"
    } else if (subj == "He"){
        subj_gen = "m"
    }
    let pred = skillsHad.pop();
    let predType = "skillsHad";
    let dataType = "filler";
    let text = subj + " " + pred;

    // Create a new Sentence instance
    let stim = new Sentence(
        stimCount,
        subj,
        pred,
        subj_gen,
        predType,
        dataType,
        text
    );

    // Log the sentence and add it to the criticalData array
    console.log(stim.text);
    criticalData.push(stim);
    stimCount += 1;
}


// *** TURN STIMULUS LIST INTO USABLE JSPSYCH ARRAY *** //

function createStimulusArray(sentenceArray) {
    let stimulusArray = [];
    
    for (let i = 0; i < sentenceArray.length; i++) {
        let obj = {};
        obj.text = sentenceArray[i].text;  // Set the text of the stimulus
        obj.data = {};
        obj.data.item = sentenceArray[i].id;
        obj.data.subj = sentenceArray[i].subj;
        obj.data.pred = sentenceArray[i].pred;
        obj.data.subj_gen = sentenceArray[i].subj_gen;
        obj.data.predType = sentenceArray[i].predType;
        obj.data.dataType = sentenceArray[i].dataType;
        obj.data.text = sentenceArray[i].text;
        
        // Set refGender based on subj_gen
        if (sentenceArray[i].subj_gen === "m") {
            obj.data.refGender = "masc";
        } else if (sentenceArray[i].subj_gen === "f") {
            obj.data.refGender = "fem";
        } else {
            obj.data.refGender = "neutral";
        }
        
        stimulusArray.push(obj);
    }
    
    return stimulusArray;
}

