/*
*  Speaker Rating Contoller, 2015
*  -------------------------------
*  This file includes all the logic used to model and control the 
*  speaker rating view of the application
*
*/


// define speaker controller module
var speakerRatingController = angular.module('speakerRatingController', []);



// define controller
speakerRatingController.controller('rate', ['$scope', 
 
  function ($scope) {


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
        "average_score" : storedData[i].average_score,
        "favorite_votes": storedData[i].favorite_votes
      };


      // push saved data into speech data array
      $scope.ratingData.push(arrayItem);
			
	 }
    
    

  }//end of if block

   
  
 
  

  /*
  * Navbar logic for UI view state
  */
  
  $scope.toggleView = function(event) {
    
    var clickedTab = event.target.parentNode,
        siblingTab = clickedTab.nextElementSibling || clickedTab.previousElementSibling;

    

    if(!clickedTab.classList.contains("view-menu-selected")) 
    {
      
      clickedTab.classList.add("view-menu-selected");
      siblingTab.classList.remove("view-menu-selected");
    } 
  
  
  };
    
    
   
  /*
  * Utility function, adds .saved class to inputs. This function is triggered
  * when the partials are loaded in order to give a sense of persistence in the UI.
  */  
  
  function addSavedClass() {

     var names = document.querySelectorAll("input[type=text]");
  

     for (var i = 0; i < names.length; i++) {
       names[i].classList.add("saved");
       names[i].classList.remove("placeholder");

     }

  }  

  /* Add "saved" class to inputs when the view is toggled back to 
  * speaker rating by listening to the routeChange event.
  */
  
  $scope.$on('$routeChangeSuccess', function($event, $template) {
    
    var template = $template.loadedTemplateUrl;
        
    
    //set 10ms timeout to let DOM nodes render before triggering addSavedClass();
    window.setTimeout(function() {
    
    var tableIsInView = document.getElementById("main-table");
    
    // if template is home template AND the table UI is in the view, trigger addSavedClass
    if(template == "partials/speaker-evaluation.html" && tableIsInView) addSavedClass();
 
    }, 10);  
   
    
  });   

    
    
    
 
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
    if($scope.evalCounter >  $scope.numOfEvaluations && $scope.numOfEvaluations !=0) { 
      
      window.scroll(0,0); // scroll to the top of the page
      return true; // return true so that modal window shows up
    
    }
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
        "average_score" : 0,
        "favorite_votes": 0
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
    
    // if array has even number of elements and there are not 2 elements...
    if(ascendingArray.length % 2 === 0 && ascendingArray.length != 2) 
    {
          

      var middleElement = ascendingArray[middleValue - 1],
          adjacentElement = ascendingArray[middleValue + 1];
          
      $scope.median = ((middleElement.average_score + adjacentElement.average_score) / 2).toFixed(2);
    
    }
    // if array has two elements...
    else if (ascendingArray.length == 2) 
    {
      
      //get average of two numbers
      $scope.median = (ascendingArray[0].average_score + ascendingArray[1].average_score) / 2; 
      
    }
    
    // if array has odd number of elements...
    else 
    {
    
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
  
  
  
  
  
  
  //report is not shown until grading is done
  $scope.reportIsShown = false; 
  
  // hide modal after report button is clicked
  $scope.hideModal = function() { 
    
    $scope.reportIsShown = true; //hide modal and show report

  
  };
  
 
  
}]); // end of speaker rating controller;
