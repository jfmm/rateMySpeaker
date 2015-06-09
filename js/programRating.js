/*
*  Program Rating Contoller, 2015
*  -------------------------------
*  This file includes all the logic used to model and control the 
*  program rating view of the application
*
*/


// define speaker controller module
var programRatingController = angular.module('programRatingController', []);


// define controller
programRatingController.controller('programEval', ['$scope',
  
 function($scope) {

   
   /*
   * Program Evaluation questions data
   **/
   $scope.programEvalData = [
    
     {
      questionText: "Did this workshop help to keep you up-to-date in areas of professional concern?",
      yes: 0,
      no: 0,
      n_a: 0 // to count no answers
     },
     
     {
      questionText: "Did you find the program to be well-organized?",
      yes: 0,
      no: 0,
      n_a: 0 // to count no answers
     },
     {
      questionText: "Did you find the facilitator to be effective?",
      yes: 0,
      no: 0,
      n_a: 0 // to count no answers
     },
     {
      questionText: "Did the facilities enhance your experience?",
      yes: 0,
      no: 0,
      n_a: 0 // to count no answers
     },
     {
      questionText: "Would this workshop be beneficial to other senior management in your agency?",
      yes: 0,
      no: 0,
      n_a: 0 // to count no answers
     }
     
   ];
   
  
   
    //make a copy of the ratingData JSON object as to not interfere with its order in
    // the other view. The speakerLineup scope var populates the favorite speaker UI
   $scope.speakerLineup = angular.copy($scope.ratingData);
   
   
   
   /*
   * Voting controller functions
   */
   
   $scope.yesVote = function(index) {
     
    var thisQuestion = $scope.programEvalData[index];
    
     thisQuestion.yes++;
   
   };
   
   
   $scope.noVote = function(index) {
   
    var thisQuestion = $scope.programEvalData[index];
    thisQuestion.no++;
   
   };
   
   
   $scope.noAnswer = function(index) {
   
    var thisQuestion = $scope.programEvalData[index];
    thisQuestion.n_a++;
   
   };
   
   
    $scope.favoriteVote = function(index) { 
    
      var thisSpeaker = $scope.speakerLineup[index];
      
      thisSpeaker.favorite_votes++;
      
    };

   
   
     
   /*
   * Sort Speakers from most favorite to least
   */
   
   $scope.sortFavorites = function (data) {
   
    //sort ranked speakers array in ascending order
    data.sort(function(a,b){
      return b.favorite_votes - a.favorite_votes;
    });
     
   };
   
   

   
   
   
}]);