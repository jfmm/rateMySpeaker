angular.module('rateMySpeaker', [])
  .controller('rate', function ($scope) {

  function averageRating (total, numOfEvals) {
    return total/numOfEvals;
  }
  
  
  $scope.ratingData = {
    
    "numOfEvaluations" : 1,
    
    "speech_1" : {
      "speaker_name": "Bill Thomas",
      "total_score" : 0,
      "average_score" : 8
    },
    "speech_2" : {
      "speaker_name": "Hisham Melhem",
      "total_score" : 0,
      "average_score" : 0
    },
     "speech_3" : {
      "speaker_name": "Martin Russo",
      "total_score" :0,
      "average_score" : 0
    },
  
  };
  
  //$scope.ratingData = {};
  
  
  });