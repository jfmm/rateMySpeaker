angular.module('rateMySpeaker', [])
  .controller('rate', function ($scope) {
  

  
  $scope.numOfEvaluations = 0;
  $scope.numOfSpeeches = 0;
  
  
  
  
  $scope.ratingData = [];
  
  $scope.addSpeech = function() {
    
    $scope.ratingData.push({
      "speaker_name": "New Speaker",
      "total_score" : 0,
      "average_score" : 0
    });

  }
  

}); // end of module