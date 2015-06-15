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

   
    //make a copy of the ratingData JSON object as to not interfere with its order in
    // the other view. The speakerLineup scope var populates the favorite speaker UI
   $scope.speakerLineup = angular.copy($scope.ratingData);
   
   
  /*
   * Voting methods
   */
   
   $scope.vote = function(index, event, object) {
    
   
     //if the click's source is the div nested within the button, get the value of the 
     // parent, aka the button.
     if(event.target.tagName == "DIV") 
      var value = event.target.parentNode.dataset.value;
 
     else
       var value = event.target.dataset.value;
    
     
      parseInt($scope[object][index][value] += 1);
     
     $scope.$emit("modelUpdated", object, {"index": index, "value": value});
   
   };

   
   
    $scope.favoriteVote = function(index) { 
    
      var thisSpeaker = $scope.speakerLineup[index];
      
      thisSpeaker.favorite_votes++;
      
      $scope.$emit("modelUpdated", "speakerLineup");
      
    };

   
   

   /*
   * rate program controller funciton updates the overall program
   * rating data object.
   */
   
   $scope.rateProgram = function(event) {
    
     var value = event.target.value;
   
     $scope.programOverallRating.score_instances["r" + value] += 1;
     
     // add only the numeric values to the average of the program
     if( value !== "n_a") {
       value = parseFloat(value);
       $scope.programOverallRating.scores.push(value);
       $scope.programOverallRating.total_score += value;
     }
     
       $scope.$emit("modelUpdated", "programOverallRating");

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