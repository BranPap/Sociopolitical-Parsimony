function evaluate_response(data, leftValue, rightValue) {
    if (data.response == 'f' & leftValue == data.status) {
        data.statusCheck = "correct"
    } else if (data.response == 'j' & rightValue == data.status) {
        data.statusCheck = "correct"
    } else {
        data.statusCheck = "incorrect"
    }
}

// Define Function Using the Fisher-Yates (Knuth) Shuffle Algorithm to randomize stimulus selection //
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

// Gender arrays
let masc = ['Transgender Man', 'Trans Man', 'Biological Female'];
let fem = ['Transgender Woman', 'Trans Woman', 'Biological Male'];

function create_tv_array(json_object) {
    let tv_array = [];
    for (let i = 0; i < json_object.length; i++) {
        obj = {};
        obj.text = json_object[i].text;
        obj.data = {};
        obj.data.item = json_object[i].id;
        obj.data.source = json_object[i].source;
        obj.data.dataType = json_object[i].dataType;
        obj.data.correct = json_object[i].correct;
        obj.data.refExp = json_object[i].refExp;
        if (masc.includes(json_object[i].refExp)) {
            obj.data.refGender = "masc"
        } else if (fem.includes(json_object[i].refExp)) {
            obj.data.refGender = "fem"
        };
        tv_array.push(obj)
    }
    return tv_array;
}

function check_dupes(tv_array) {
    let tv_array_modded = shuffleArray(tv_array);
    let final_array = [];
    let unique_list = [];
    let criticalCounter = 0;
    for (let i = 0; i < tv_array_modded.length; i++) {
        if (!unique_list.includes(tv_array_modded[i].data.item)) {
            if (tv_array_modded[i].data.dataType == "Critical" && criticalCounter <= 12) {
                criticalCounter++;
                final_array.push(tv_array_modded[i]);
                unique_list.push(tv_array_modded[i].data.item)
            }
            else if (tv_array_modded[i].data.dataType != "Critical") {
                final_array.push(tv_array_modded[i]);
                unique_list.push(tv_array_modded[i].data.item);
            }
        }
    }
    // console.log(final_array.length)
    return final_array;
}

function record_response(data, ChoiceArray) {
    if (data.response == "0") {
        data.result = ChoiceArray[0]
    } else if (data.response == "1") {
        data.result = ChoiceArray[1]
    } else if (data.response == "2") {
        data.result = ChoiceArray[2]
    }
}

let stimChoices = ['drugs','martialArts','privacy', 'tattoos']
let fillerChoices = ['DnD','trumpBible','SillyBandz','luigi']

let brokenPairs = {
    'drugs':['Thumaze','Wenlure'],
    'martialArts':['Domari','Churako'],
    'privacy':['crowdcloaking','herdblurring'],
    'tattoos':['interforme','tessamorph']
}

function randomizeStimChoices(stimChoices) {
    var stimsRandomized = shuffleArray(stimChoices);
    var stim1Choice = stimsRandomized.shift();
    var stim2Choice = stimsRandomized.shift();

    let returnList = [];
    returnList.push(stim1Choice,stim2Choice)

    return(returnList)
}

function randomizedFillerChoices(fillerChoices) {
    var fillersRandomized = shuffleArray(fillerChoices);
    var filler1Choice = fillersRandomized.shift();
    var filler2Choice = fillersRandomized.shift();

    let returnList = [];
    returnList.push(filler1Choice,filler2Choice);

    return(returnList)
}

// Randomly pick two distinct terms
function pickTwoTerms(options) {
    const shuffled = shuffleArray([...options]);
    return shuffled.slice(0, 2);
  }


  //// FUNCTIONS ////

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
      // Traditional
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
      '#DD2E44',  // Red

      // Additional vibrant colors
    '#FF6B35', // Bright orange
    '#F7931E', // Amber
    '#FFD23F', // Golden yellow
    '#06FFA5', // Mint green
    '#4ECDC4', // Teal
    '#45B7D1', // Sky blue
    '#96CEB4', // Sage green
    '#FFEAA7', // Cream yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Seafoam
    '#F7DC6F', // Light gold
    '#BB8FCE', // Lavender
    '#85C1E9', // Light blue
    '#F8C471', // Peach
    '#82E0AA', // Light green
    '#F1948A', // Coral
    '#AED6F1', // Powder blue
    '#D7BDE2', // Light purple
    
    // Darker/richer tones
    '#2C3E50', // Dark blue-gray
    '#34495E', // Charcoal
    '#E74C3C', // Crimson
    '#9B59B6', // Deep purple
    '#3498DB', // Bright blue
    '#1ABC9C', // Turquoise
    '#16A085', // Dark turquoise
    '#27AE60', // Forest green
    '#2ECC71', // Emerald
    '#F39C12', // Dark orange
    '#E67E22', // Carrot orange
    '#D35400', // Pumpkin
    '#C0392B', // Dark red
    '#A569BD', // Medium purple
    '#5DADE2', // Medium blue
    '#58D68D', // Medium green
    '#F7DC6F', // Banana yellow
    '#EB984E', // Sandy brown
    
    // Pastel colors
    '#FFB3BA', // Light pink
    '#FFDFBA', // Light peach
    '#FFFFBA', // Light yellow
    '#BAFFC9', // Light mint
    '#BAE1FF', // Light sky blue
    '#E6E6FA', // Lavender mist
    '#FFE4E1', // Misty rose
    '#F0FFFF', // Azure
    '#F5FFFA', // Mint cream
    '#FFF8DC', // Cornsilk
    
    // Deep/jewel tones
    '#800080', // Purple
    '#008080', // Teal
    '#800000', // Maroon
    '#008000', // Green
    '#000080', // Navy
    '#808000', // Olive
    '#FF1493', // Deep pink
    '#00CED1', // Dark turquoise
    '#FF8C00', // Dark orange
    '#9932CC', // Dark orchid
    '#8B0000', // Dark red
    '#006400', // Dark green
    '#4B0082', // Indigo
    '#B22222', // Fire brick
    '#228B22', // Forest green
    '#DC143C', // Crimson
    '#00BFFF', // Deep sky blue
    '#FF6347', // Tomato
    '#40E0D0', // Turquoise
    '#DA70D6'  // Orchid
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  }