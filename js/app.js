// first ask for parameters
var numOfEvalutaions = parseInt(prompt("How many evaluations were turned in?")),
    numOfSpeakers = parseInt(prompt("How many speakers were in this program?"));



var speakerList = [];

// Ask for speakers names
for(var i = 1; i <= numOfSpeakers; i++ ) {
  
  var speaker = prompt("Enter in speaker #" + i);
  speakerList.push(speaker);

}



var ratings = [];
var ratingsJSON;

// nested for loop gathers all the data and computes the average
for(var i = 1; i <= numOfEvalutaions; i++) {
  
  var currentEvalNum = i;

  //TODO: loop only stores last rating right now
  for(var ii = 0; ii < speakerList.length; ii++) {
    
    var currentSpeaker = speakerList[ii];
    var rating = parseInt(prompt("Enter rating for " + currentSpeaker));


    ratingsJSON = {
      evaluationNum: i,
      speakerName: currentSpeaker,
      speakerRating: rating
    };
    
    ratings.push(ratingsJSON); 
        
   
 
    }//ends inner for

    

  } //end outer for




//IDEAL JSON OBJECT
var ideal = {
  
  speaker1: {
    name: "Bill Thomas",
    1: 5,
    2: 4
  },
    
  speaker2: {
    name: "Walter Olezek",
    1: 7,
    2: 6
  }

};



var speakerAverages = [];

// loop over JSON object and compute average score per speaker
for (var spkr in ideal) {
  
  var evalEntry = 1,
      sum = 0,
      avg = 0;
  

  for (var score in ideal[spkr]) {
 
    // if score is a name property, we skip
    if(score === "name") continue;
    
    // compute average
    sum += ideal[spkr][evalEntry];
    avg = sum / numOfEvalutaions;
    
    // just output the average once all the computations have been done
    if(evalEntry == Object.keys(ideal[spkr]).length - 1)
      console.log(ideal[spkr].name + " average: " + avg);
    
    
    evalEntry++;
  
  }
  
}
  