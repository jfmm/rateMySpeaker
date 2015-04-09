// first ask for parameters
var numOfEvaluations = parseInt(prompt("How many evaluations were turned in?")),
    numOfSpeeches = parseInt(prompt("How many speeches in this program?"));



// Ask for speakers names
var speechList = [];

for(var i = 1; i <= numOfSpeeches; i++ ) {
  
  var speaker = prompt("Enter speaker's name of speech #" + i);
  speechList.push(speaker);

}




/*
* Create JSON object with input data
*/
var ratings = [];
var evaluationData = {};

for(var i = 1; i <= numOfEvaluations; i++) {
  
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

  



/*
* Calculate cumulative results.
*/

var evalId = 1;
var speechTotalScores = {};

for(var evaluation in evaluationData) {

  for (var speech in evaluationData[evaluation]) {

    // if we're looping through first evaluation, just assign the properties
    if(evalId === 1)
      speechTotalScores[speech] = evaluationData[evaluation][speech].rating;
    //else we add the current rating to the last rating to accumulate the results
    else 
      speechTotalScores[speech] += evaluationData[evaluation][speech].rating;        

  }
    
  evalId++;
}


/*
* Calculate average score per speech.
*/
for(var sp in speechTotalScores) {

  console.log(sp + " total : " + speechTotalScores[sp]);
  console.log(sp + " average : " + (speechTotalScores[sp] / numOfEvaluations));
}



  