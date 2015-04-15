angular.module('rateMySpeaker', [])
  .controller('rate', function ($scope) {

  $scope.numOfEvaluations = 0;
  $scope.numOfSpeeches = 0;
  
  $scope.loopCount = $scope.numOfEvaluations * $scope.numOfSpeeches;
  $scope.evalCounter = 1;
  
 
 
   /* 
  * Loop over evaluations.
  **/
  var currentSpeech = 1;
  $scope.updateCounter = function() {
 

    // if we go overboard....
    if(currentSpeech >= $scope.numOfSpeeches) {
      
      //$scope.evalCounter++;
      currentSpeech = 0; //reset
    }
    
     ++currentSpeech; 
    
    console.log("speech: " + currentSpeech);
  }
  
  
  /* 
  * Handle active state
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
  * Handles when user edits speaker name input field
  **/
  $scope.saveSpeakerName = function(event) {
    
    event.target.setAttribute("class", "saved");
    
  }
  
}); // end of module