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
     },
     
     {
      questionText: "Did you find the program to be well-organized?",
      yes: 0,
      no: 0,
     },
     {
      questionText: "Did you find the facilitator to be effective?",
      yes: 0,
      no: 0,
     },
     {
      questionText: "Did the facilities enhance your experience?",
      yes: 0,
      no: 0,
     },
     {
      questionText: "Would this workshop be beneficial to other senior management in your agency?",
      yes: 0,
      no: 0,
     }
     
   ];
   
   
   
   
   $scope.yesVote = function(index) {
     
    var thisQuestion = $scope.programEvalData[index];
    
     thisQuestion.yes++;
   
   };
   
   
   $scope.noVote = function(index) {
   
    var thisQuestion = $scope.programEvalData[index];
    thisQuestion.no++;
   
   };

}]);