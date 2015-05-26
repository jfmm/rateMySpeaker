angular.module('rateMySpeaker', [])
  .controller('rate', function ($scope) {


  
  // if session storage is empty...
  if(sessionStorage.length == 0) {
    
    //initialize boilerplate variables...
    $scope.numOfEvaluations = 0;
    $scope.numOfSpeeches = 0;
    $scope.evalCounter = 1;
    
    $scope.saveStatus = "You have not saved your progress...";
     
    var currentSpeech = 1;
    
    //reset JSON object
    $scope.ratingData = []; //will containt JSON Object

  }
  
  else {
  
    //use stored values...
    $scope.numOfEvaluations = parseInt(sessionStorage.numOfEvaluations);
    $scope.numOfSpeeches = parseInt(sessionStorage.numOfSpeeches);
    $scope.evalCounter = parseInt(sessionStorage.currentEvaluation);
    $scope.saveStatus = sessionStorage.lastSaved;
    
    var currentSpeech = parseInt(sessionStorage.currentSpeech);
    
    // initialize blank array for JSON
    $scope.ratingData = [];
    
    
    //parse stored JSON string and populate new array
    var storedData = JSON.parse(sessionStorage.speechRatings);
    
    for(var i = 0; i < storedData.length; i++) {
			
      var arrayItem = {
        "speaker_name" : storedData[i].speaker_name,
        "num_of_grades" : storedData[i].num_of_grades,
        "scores": storedData[i].scores,
        "total_score": storedData[i].total_score,
        "average_score" : storedData[i].average_score 
      };


      // push saved data into speech data array
      $scope.ratingData.push(arrayItem);
			
	 }
  

  
   function addSavedClass() {

     var names = document.querySelectorAll("input[type=text]");

     for (var i = 0; i < names.length; i++) {
       names[i].classList.add("saved");
       names[i].classList.remove("placeholder");

     }

  }  
    
  // add "saved" class onLoad to all name inputs and
  // remove the placeholder class
  addEventListener('load', addSavedClass, false);
  

  }//end of if block

 
  
 
  
 
   /* 
  * Loop over speeches and evaluations.
  **/
  $scope.updateCounter = function() {
 

    // if we finish inputing an evaluation....
    if(currentSpeech >= $scope.numOfSpeeches) { 
      
      $scope.evalCounter++; // increase evalutaion #
      currentSpeech = 0; //reset speech #
   
    }
  
     ++currentSpeech; 
     
  }
  
  
  
  
  /*
  * Handles Updating view when all evals have been reviewed or "graded"
  */
  $scope.isGradingDone = function() {
    //if we're done inputting all evaluations...
    if($scope.evalCounter >  $scope.numOfEvaluations && $scope.numOfEvaluations !=0) 
      return true;
  }
  
  
  
  
  
  /* 
  * Handle active state of input buttons
  **/
  $scope.isActive = function(index) {
    
    if((index + 1) === currentSpeech)
      return true;
     
  }
  
  
  
  
  
  /* 
  * Show Main table UI if the number of Evaluations has been set
  * aka if the var is not 0
  **/
  $scope.showTableUI = function() {
    
    if($scope.numOfEvaluations != 0) 
      return true;
    else
      return false;
  };
  
  
  
  
  /* 
  * add speeches
  **/
 
  
  $scope.addSpeech = function() {
    
      ++$scope.numOfSpeeches; // increase speech count in UI

      $scope.ratingData.push({
        "speaker_name": "New Speaker",
        "num_of_grades": $scope.numOfEvaluations,
        "scores": [],
        "total_score" : 0,
        "average_score" : 0
      });
  }
  
  
  /* 
  * remove speeches
  **/
  $scope.removeSpeech = function() {
    
    --$scope.numOfSpeeches;  //decrease speech count in UI
    var lastElemet = $scope.ratingData.pop();
  }
  
  
  
  /*
  * Add rating to total score
  */
  $scope.add = function(index, event) {
    
    // when this function is called have it index the latest added value
    var thisSpeech = $scope.ratingData[index];
    var value = parseInt(event.target.value);
    
    //aggregate value to total score
    thisSpeech.total_score += value;
    
    // push value to populate scores array
    thisSpeech.scores.push(value);
  
  };
  
  
   /* 
  * subtract last grading
  **/
  $scope.subtract = function(index) {
  
    
    var thisSpeech = $scope.ratingData[index];
    var lastRatingIndex = thisSpeech.scores.length -1;
    
    //subtract the last value that was added from the total score
    thisSpeech.total_score -= thisSpeech.scores[lastRatingIndex];
    
    //delete from array
    thisSpeech.scores.splice(lastRatingIndex, 1);
  
  };
  
  
  
  /*
  * undo button
  */
  
  $scope.undo = function() {
    
    if(currentSpeech > 1) { 
      --currentSpeech;
    } else {
      currentSpeech = $scope.ratingData.length;
    }
  
   
  
  };
  
  
  
  
   /* 
  * No answer button
  **/
  $scope.noAnswer = function(index) {
    
    var thisSpeech = $scope.ratingData[index];
    
    thisSpeech.num_of_grades -= 1; // subtract 1 from the number of responses
    
  }
  
  
  
   
  /* 
  * Handles when user edits speaker name input field
  **/
  $scope.saveSpeakerName = function(event) {
    
    event.target.setAttribute("class", "saved");
    
  }
  
  
   
  /* 
  * Handles the visibility of analytics view
  **/
  $scope.showAnalytics = function () { 

    // if the grading is done and if the ranked speakers have been populated,
    // we show the analytics report section
    if($scope.isGradingDone() && $scope.rankedSpeakers.length != 0)
      return true;

  };
  
  
  
  
  
  
  /*
  * Analytics Method calculates the following metrics:
  *  
    1. Rank from high to low
    2. Highest Rated Speaker
    3. Lowest Rated Speaker
    4. Average
    5. Median
  *
  */
  
  $scope.rankedSpeakers = [];
  $scope.median;
  $scope.average;
  
  $scope.getAnalytics = function (ratingResults) {
  
   

  /* Descending Speaker ranking
  ============================*/
  function rankSpeakers() {
    
    $scope.rankedSpeakers.length = 0; //reset array
 
    
    //iterate over object and populate new ranked array
    for(var i = 0; i < ratingResults.length; i++) {
    
      var currentAvg = ratingResults[i].average_score,
          currentSpeaker = ratingResults[i].speaker_name;
      
      $scope.rankedSpeakers.push({"name": currentSpeaker, "avg": currentAvg});
  

    } //end for loop
    
    
    
    //sort speakers in descending order by average value
    $scope.rankedSpeakers.sort(function(a,b){
      return b.avg - a.avg;
    });
  
  }
  

  
  /* Median Calculation
  ============================*/

  function getMedian () {
     
    
    //sort ranked speakers array in ascending order
    var ascendingArray = ratingResults.sort(function(a,b){
      return a.average_score - b.average_score;
    });
    
    console.log(ascendingArray);
    
    var middleValue =  ascendingArray.length / 2;
    
    // if array has even number of elements...
    if(ascendingArray.length % 2 === 0) {
          

      var middleElement = ascendingArray[middleValue - 1],
          adjacentElement = ascendingArray[middleValue + 1];
          
      $scope.median = ((middleElement.average_score + adjacentElement.average_score) / 2).toFixed(2);
    
    } 
    // if array has odd number of elements...
    else {
    
      $scope.median = (ascendingArray[Math.ceil(middleValue) - 1].average_score).toFixed(2);
  
    }
    

  } //end of get median
  

  
    
   /* Calculate the average, average score
  =========================================*/
  function getAverage() {
    
    var currentScore = 0;
    
    for(var i = 0; i < ratingResults.length; i++) {
    
       currentScore += ratingResults[i].average_score;

    } //end for loop
    
    $scope.average = (currentScore / ratingResults.length).toFixed(2);
    
  }
    
    
  // execute methods...  
  rankSpeakers();
  getAverage();
  getMedian();
  
    
  return true;
  
  }; // analytics method close 
  
  
  
  
    /*
  * Save Button
  * store current data into session storage
  */
  

  
  $scope.save = function(data) {
  
    //store speech data
    window.sessionStorage.setItem("speechRatings", JSON.stringify(data));
    
    //store number of evaluations
    window.sessionStorage.setItem("numOfEvaluations", $scope.numOfEvaluations);
    
    //store number of speeches
     window.sessionStorage.setItem("numOfSpeeches", $scope.numOfSpeeches);
    
    //store current speech #
     window.sessionStorage.setItem("currentSpeech", currentSpeech);
    
    //store current evaluation #
     window.sessionStorage.setItem("currentEvaluation", $scope.evalCounter);
    
    
    
    
    //log success message, and time stamp it.
    var now = new Date(),
        hour = now.getHours(),
        minutes = now.getMinutes();
    
    // AM or PM?
    if(hour < 12) 
      var meridiem = "AM";
    else
      var meridiem = "PM";
        
    $scope.saveStatus = "You last saved your progress at " + hour + ":" + minutes + " " + meridiem;
    
    
    //store save timestamp
    window.sessionStorage.setItem("lastSaved", $scope.saveStatus);
  
  };
  
  
//  $scope.hideModal = function() {
//    var modal = document.getElementsByClassName("modal-wrap");
//    modal.style.display = "none";
//  }
  
  
}); // end of module