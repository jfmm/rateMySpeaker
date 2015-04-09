// first ask for parameters
var numOfEvalutaions = parseInt(prompt("How many evaluations were turned in?")),
    numOfSpeeches = parseInt(prompt("How many speeches in this program?"));



// Ask for speakers names
var speechList = [];

for(var i = 1; i <= numOfSpeeches; i++ ) {
  
  var speaker = prompt("Enter speaker's name of speech #" + i);
  speechList.push(speaker);

}



var ratings = [];
var evaluationData = {};

for(var i = 1; i <= numOfEvalutaions; i++) {
  
  // create evaluation nested object
  evaluationData["eval_" + i] = {}; 
  
 
  for(var ii = 1; ii <= numOfSpeeches; ii++) {
    
      // create speech nested object
      evaluationData["eval_" + i]["speech_" + ii] = {};
      
      // get rating data
      var currentSpeaker = speechList[ii - 1];
      var rating = parseInt(prompt("What did " + currentSpeaker + " get for eval #" + i));

      //push name and rating to JSON object
      evaluationData["eval_" + i]["speech_" + ii].speaker_name = currentSpeaker;
      evaluationData["eval_" + i]["speech_" + ii].rating = rating;
      
  
    }//ends inner for

  } //end outer for

  
var example = {

  eval_1 : {
    speech_1: {
      rating: 2,
      speaker_name: "yo"
    },
    speech_2 : {
      rating: 4,
      speaker_name: "hey"
    }
  },
  
  eval_2: {
    speech_1: {
      rating: 2,
      speaker_name: "yo"
    },
    speech_2 : {
      rating: 4,
      speaker_name: "hey"
    }  
  }
  
  
};






for(var evaluation in evaluationData) {

  
  // this is how you access the damn object... duh
 // console.log(evaluationData[evaluation].speech_1.speaker_name);
  
}







/* separate
==============================================*/

//IDEAL if it could be turned to this JSON OBJECT
var ideal = {
  
  speaker1: {
    name: "Bill Thomas",
    1: 5,
    2: 4,
    3: 7
  },
    
  speaker2: {
    name: "Walter Olezek",
    1: 7,
    2: 6,
    3: 2
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
    avg = (sum / numOfEvalutaions).toFixed(2);
    

    // just output the average once all the computations have been done
    if(evalEntry == Object.keys(ideal[spkr]).length - 1)
      console.log(ideal[spkr].name + " average: " + avg);
    
    
    evalEntry++;
  
  }
  
}
  