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
   * Program Evaluation Overview questions data
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
     },
     {
      questionText: "Do you think your agency would be interested in a similar customized Public Policy Seminar in Washington D.C. or at your facility?",
      yes: 0,
      no: 0,
      n_a: 0 // to count no answers
     }
     
   ];
   
  
   
    /*
   * Program Evaluation Overview Quality questions data
   **/
   $scope.programQualityRating = [
     {
       questionText: "How would you rate the audience participation?",
       excellent: 0,
       good: 0,
       fair: 0,
       poor: 0,
       n_a: 0 // to count no answers
     },
     {
       questionText: "How would you rate this program?",
       excellent: 0,
       good: 0,
       fair: 0,
       poor: 0,
       n_a: 0 // to count no answers
     }
   
   ];
   
   
   
   
   $scope.programOverallRating = {
      "scores": [],
      "total_score" : 0,
      "average_score" : 0,
      "score_instances": {   
        "rn_a": 0,
        "r1":   0,
        "r1.5": 0,
        "r2":   0,
        "r2.5": 0,
        "r3":   0,
        "r3.5": 0,
        "r4":   0,
        "r4.5": 0,
        "r5":   0,
        "r5.5": 0,
        "r6":   0,
        "r6.5": 0,
        "r7":   0
      },
      "num_of_grades" : function() {
        return this.scores.length;
      }
      
   };
   
   
   
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
   
   };

   
   
    $scope.favoriteVote = function(index) { 
    
      var thisSpeaker = $scope.speakerLineup[index];
      
      thisSpeaker.favorite_votes++;
      
    };

   
   

   /*
   * rate program controller funciton updates the overall program
   * rating data object.
   */
   
   $scope.rateProgram = function(event) {
    
     var value = event.target.value;
     console.log(value);
     $scope.programOverallRating.score_instances["r" + value] += 1;
     
     // add only the numeric values to the average of the program
     if( value !== "n_a") {
       value = parseFloat(value);
       $scope.programOverallRating.scores.push(value);
       $scope.programOverallRating.total_score += value;
     }

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