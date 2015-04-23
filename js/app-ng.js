angular.module('rateMySpeaker', [])
  .controller('rate', function ($scope) {

  "use strict";
  
  $scope.numOfEvaluations = 0;
  $scope.numOfSpeeches = 0;

  $scope.evalCounter = 1;
  
 
 
   /* 
  * Loop over speeches and evaluations.
  **/
  var currentSpeech = 1;
  
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
    if($scope.evalCounter >  $scope.numOfEvaluations) 
      
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
  $scope.ratingData = []; //will containt JSON Object
  
  $scope.addSpeech = function() {
    
      ++$scope.numOfSpeeches; // increase speech count in UI

      $scope.ratingData.push({
        "speaker_name": "New Speaker",
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
  * undo last grading
  **/
  $scope.undo = function(index) {
  
    
    var thisSpeech = $scope.ratingData[index];
    var lastRatingIndex = thisSpeech.scores.length -1;
    
    //subtract the last value that was added from the total score
    thisSpeech.total_score -= thisSpeech.scores[lastRatingIndex];
    
    //delete from array
    thisSpeech.scores.splice(lastRatingIndex, 1);
  
  };
  
  
  
  
  
   
  /* 
  * Handles when user edits speaker name input field
  **/
  $scope.saveSpeakerName = function(event) {
    
    event.target.setAttribute("class", "saved");
    
  }
  
  
  
  
  /*
  * Sorting method. Takes the ratting data JSON object and creates a new one ranked 
  * from high to low.
  * TODO: ALgorithm is buggy
  */
  
  $scope.rankedSpeakers = [];
  
  $scope.rankSpeakers = function(ratingResults) {
    
    $scope.rankedSpeakers.length = 0; //reset array
    var maxScore = 0;
    
    //iterate over object
    for(var i = 0; i < ratingResults.length; i++) {
    
      var currentAvg = ratingResults[i].average_score,
          currentSpeaker = ratingResults[i].speaker_name;
      
      $scope.rankedSpeakers.push({"name": currentSpeaker, "avg": currentAvg});
      
      if(currentAvg > maxScore) {

        var max = $scope.rankedSpeakers.pop(); // pop last element
        
        $scope.rankedSpeakers.unshift(max); // make it first, since its bigger
        
        maxScore = currentAvg; //update maxScore
      
      } 
      
    }
    
    console.log($scope.rankedSpeakers);
    
    return true;
  
  }
  
  
}); // end of module