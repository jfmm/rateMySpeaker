/*
*  Program Rating Contoller, 2015
*  -------------------------------
*  This file includes all the logic used to model and control the 
*  speaker rating viee of the application
*
*/


// define speaker controller module
var programRatingController = angular.module('programRatingController', []);


// define controller
programRatingController.controller('programEval', ['$scope',
  
 function($scope) {
   
   $scope.message = "it works";

}]);