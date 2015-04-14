var numOfEvaluations = 0,
    numOfSpeeches = 0;

var mainInput = document.getElementById("main-input"),
    nextBtn = document.getElementById("next-btn"),
    mainLabel = document.getElementById("main-label"),
    promptStatus = "eval number";



/*
* Map enter key to click event only if the input is focused
*/
mainInput.onkeyup = function(e) {
  // if input is focues
  if(this === document.activeElement && e.keyCode == 13) {
      nextBtn.click();
  }
}





/**This method checks the status of the data input process and 
/**adds the appropiate event listener
 * */
setPromptStatus(promptStatus); // check prompt status onload

function setPromptStatus(status) {
  
  if( status == "eval number") 
  {
    nextBtn.onclick = getEvalNumber;
  }
  else if ( status == "speech number") 
  {
    nextBtn.onclick = getSpeechNumber;
  }
  else if (status == "speaker names") 
  {
    nextBtn.onclick = getSpeakerNames;
  }

}


/*
** Get number of evaluations in program
 * */
function getEvalNumber() {

  if(mainInput.value !== "" && mainInput.value >= 1) {
    
    // set num of evals
    numOfEvaluations = parseInt(mainInput.value);

    //reset input field
    mainInput.value = "";

    //change the status of the prompt process to "speech number"
    promptStatus = "speech number";
    setPromptStatus(promptStatus);
    
    // change label
    mainLabel.innerHTML = "How many speeches in this program?"
    
    
    console.log("evaluation number: " + numOfEvaluations);
  

  } else if ( mainInput.value == "") {
  
    mainLabel.innerHTML = "You have not entered a valid numeric value. Please try again"
    mainLabel.style.color = "red";
  }
  
  else {
  
    mainLabel.innerHTML = "You have entered a negative value... C'mon. Please try again"
    mainLabel.style.color = "red";
  
  }
    

}



/**Get number of speeches given
 * */
function getSpeechNumber () {
  
  console.log("getspeech triggered");

  if (promptStatus == "speech number") {
   
  
    
    // set num of evals
    numOfSpeeches = parseInt(mainInput.value);

    //reset input field
    mainInput.value = "";
    
    //change the status of the prompt process to "speaker names"
    promptStatus = "speaker names";
    setPromptStatus(promptStatus);
    
    console.log("speeches: " + numOfSpeeches);
    
    
    // Prepare input view for next step in the process....
    mainLabel.innerHTML = "Enter speaker's name who did speech #" + 1;
    
    //change input type to text
    mainInput.removeAttribute("min");
    mainInput.setAttribute("type", "text");
  }
  
}




/**Get names of speakers
 * */
var speechList = [],
    speechIndex = 1,
    speaker;

function getSpeakerNames() {
      
    
  if( speechIndex <= numOfSpeeches && mainInput.value !== "") {
    
    console.log(speechIndex);
    mainLabel.innerHTML = "Enter speaker's name who did speech #" + ( ++speechIndex );
    speaker = mainInput.value;
    speechList.push(speaker);  
  
  }
  else {
    
    mainLabel.innerHTML = "You have not entered a name. Try again"
    mainLabel.style.color = "red";
  
  }
  
  //reset input field
  mainInput.value = "";
  
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
      //var rating = parseInt(prompt("What did " + currentSpeaker + " get for eval #" + i));

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



  