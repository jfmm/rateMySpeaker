angular.module('rateMySpeaker', [])
  .controller('rate', function ($scope) {

  $scope.numOfEvaluations = 0;
  $scope.numOfSpeeches = 0;
  
  
  /* 
  * Show Main table UI if the number of Evaluations has been set
  **/
  $scope.showTableUI = function() {
    if($scope.numOfEvaluations > 0) 
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
  
  

}); // end of module