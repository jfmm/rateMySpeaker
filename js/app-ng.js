angular.module('rateMySpeaker', [])
  .controller('rate', function ($scope) {

  
  $scope.ratingData = {
    
    "speech_1" : {
      "speaker_name": "Bill Thomas",
      "total_score" : 0,
      "average_score" : 0
    },
    "speech_2" : {
      "speaker_name": "Hisham Melhem",
      "total_score" : 0,
      "average_score" : 0
    },
    
  
  };
  
  
  
  
  
  /*
  * Adds total
  **/
  $scope.totalScore = 0;
  
  $scope.add = function(e) {
    
    $scope.totalScore += parseInt(e.toElement.dataset.value);
   
  }
  
  });