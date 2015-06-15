/*
*  Speaker Rating Contoller, 2015
*  -------------------------------
*  This file includes all the logic used to control the state of the 
*  speaker rating model and view of the application
*
*/


// define speaker controller module
var speakerRatingController = angular.module('speakerRatingController', []);



// define controller
speakerRatingController.controller('speakerRatingCtrl', ['$scope',
 
  function ($scope) {

    
  
    
   /* 
  * Loop over speeches and evaluations.
  **/
  $scope.updateCounter = function() {
      // emit event to update counter in toolbar.js controller
     $scope.$emit("updateCounter"); 
     
  };
  
  
  
  
  /* 
  * Handle active state of input buttons
  **/
  $scope.isActive = function(index) {
    
    if((index + 1) === $scope.currentSpeech)
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
    

    $scope.$emit("addedSpeech"); // emit an event up the scope tree
        

      
    $scope.ratingData.push({
        "speaker_name": "New Speaker",
        "scores": [],
        "total_score" : 0,
        "average_score" : 0,
        "favorite_votes": 0,
        "num_of_grades": function () {
          return this.scores.length;
        }
      });
    
  

  };
  
  
  /* 
  * remove speeches
  **/
  $scope.removeSpeech = function() {
    
    $scope.$emit("removedSpeech");
    var lastElemet = $scope.ratingData.pop(); //get element out of array
  };
  
  
  
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
    
    $scope.$emit("modelUpdated", "ratingData");
  
  };
  
  


  
   
  /* 
  * Handles when user edits speaker name input field
  **/
  $scope.saveSpeakerName = function(event) {
    
    event.target.setAttribute("class", "saved");
    
  }
  
  
   

  
  
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
  * Handles Updating view when all evals have been reviewed or "graded"
  */
  $scope.isGradingDone = function() {
    //if we're done inputting all evaluations...
    if($scope.evalCounter >  $scope.numOfEvaluations && $scope.numOfEvaluations !=0) { 
     
      window.scroll(0,0); // scroll to the top of the page
      return true; // return true so that modal window shows up
    
    }
  };
   
  
    
    
    
    
  /* 
  * Handles the visibility of report card view
  **/
  $scope.showAnalytics = function () { 

    // if the grading is done and if the ranked speakers have been populated,
    // we show the analytics report section
    //if($scope.isGradingDone() && $scope.rankedSpeakers.length != 0)
    if($scope.isGradingDone())
      return true;

  }; 

    
    
    
      
  //report is not shown until grading is done
  $scope.reportIsShown = false;
   
  
  // hide modal after report button is clicked
  $scope.hideModal = function() { 
    
    
    $scope.reportIsShown = true; //hide modal and show report

  
  };
   
   
    
  
}]); // end of speaker rating controller;
