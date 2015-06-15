
/*
*  Toolbar Main Controller, 2015
*  -------------------------------
*  This file includes all the data models that both views of the application
*  display. It also includes the methods utilized by the toolbar.
*
*/




// define toolbar controller module
var toolbarController = angular.module('toolbarController', []);

toolbarController.controller('toolbarCtrl', ['$scope',
  
 function($scope) {

   
   /*
   * set the model by choosing stored or default values...
   */

   
   
   // if session storage is empty...
  if(sessionStorage.length == 0) {
    
    //initialize boilerplate variables...
    $scope.numOfEvaluations = 0;
    $scope.numOfSpeeches = 0;
    $scope.evalCounter = 1;
    
    $scope.saveStatus = "You have not saved your progress...";
     
    $scope.currentSpeech = 1;
    
    //reset JSON object
    $scope.ratingData = []; //will containt JSON Object
    

    /*
   * Program Evaluation VIEW questions data Model
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
    
    
 
    

  } // end loading default data
  
  else 
  {
  
    //use stored values...
    $scope.numOfEvaluations = parseInt(sessionStorage.numOfEvaluations);
    $scope.numOfSpeeches = parseInt(sessionStorage.numOfSpeeches);
    $scope.evalCounter = parseInt(sessionStorage.currentEvaluation);
    $scope.saveStatus = sessionStorage.lastSaved; 
    $scope.currentSpeech = parseInt(sessionStorage.currentSpeech);
    
    // initialize blank arrays for JSON dat models
    $scope.ratingData = [];
    $scope.programEvalData = [];
    $scope.programOverallRating = [];
    $scope.programQualityRating = [];
    
    
    //parse stored JSON string and populate new array
    var storedSpeechRatings = JSON.parse(sessionStorage.speechRatings);
    
    for(var i = 0; i < storedSpeechRatings.length; i++) {
			
      var arrayItem = {
        "speaker_name" : storedSpeechRatings[i].speaker_name,
        "scores": storedSpeechRatings[i].scores,
        "total_score": storedSpeechRatings[i].total_score,
        "average_score" : storedSpeechRatings[i].average_score,
        "favorite_votes": storedSpeechRatings[i].favorite_votes,
        "num_of_grades" : function() {
          return this.scores.length;
        }
      };


      // push saved data into speech data array
      $scope.ratingData.push(arrayItem);
			
	 }
    
    
    
    
    var storedProgramEvalData = JSON.parse(sessionStorage.programEvalData);
    
    for(var i = 0; i < storedProgramEvalData.length; i++) {
      var arrayItem = {
        "questionText": storedProgramEvalData[i].questionText,
        "yes": storedProgramEvalData[i].yes,
        "no": storedProgramEvalData[i].no,
        "n_a": storedProgramEvalData[i].n_a // to count no answers
      };
    
      $scope.programEvalData.push(arrayItem);
    }

    
    
    
    
    var storedQualityRating = JSON.parse(sessionStorage.qualityData);
    
    for(var i = 0; i < storedQualityRating.length; i++) {
    
      var arrayItem = {
          questionText: storedQualityRating[i].questionText,
          excellent: storedQualityRating[i].excellent,
          good: storedQualityRating[i].good,
          fair: storedQualityRating[i].fair,
          poor: storedQualityRating[i].poor,
          n_a: storedQualityRating[i].n_a // to count no answers
      };
      
      $scope.programQualityRating.push(arrayItem);
      
    }
    
    
    
    
    
    
    
    var storedOverallRating = JSON.parse(sessionStorage.programOverallEvalData);
    $scope.programOverallRating = storedOverallRating;
    $scope.programOverallRating.num_of_grades = function () {
      return this.scores.length;
    };

  }//end of if/else block

                                             
 
   
  /*
  * Save Button
  * store current data into session storage
  */
  $scope.save = function(data) {

    //store speech data
    window.sessionStorage.setItem("speechRatings", JSON.stringify(data));
    
    //store number of evaluations
    window.sessionStorage.setItem("numOfEvaluations", $scope.numOfEvaluations);
    
    //store number of speeches
     window.sessionStorage.setItem("numOfSpeeches", $scope.numOfSpeeches); // swap with data.length
    
    //store current speech #
     window.sessionStorage.setItem("currentSpeech", $scope.currentSpeech);
    
    //store current evaluation #
     window.sessionStorage.setItem("currentEvaluation", $scope.evalCounter);
    
    //Store program overview eval data..
    window.sessionStorage.setItem("programEvalData", JSON.stringify($scope.programEvalData));
    
    //store program overall rating..
    window.sessionStorage.setItem("programOverallEvalData", JSON.stringify($scope.programOverallRating));
    
    //store quality rating rating..
    window.sessionStorage.setItem("qualityData", JSON.stringify($scope.programQualityRating));
    
    
    
    //log success message, and time stamp it.
    var now = new Date(),
        hour = now.getHours(),
        minutes = now.getMinutes();
    
    // AM or PM?
    if(hour < 12) 
      var meridiem = "AM";
    else
      var meridiem = "PM";
        
    $scope.saveStatus = "You last saved your progress at " + hour + ":" + minutes + " " + meridiem;
    
    
    //store save timestamp
    window.sessionStorage.setItem("lastSaved", $scope.saveStatus);
  
  };
  
  
  
  
   
   /*
  * Utility function, adds .saved class to inputs. This function is triggered
  * when the partials are loaded in order to give a sense of persistence in the UI.
  */  
  
  function addSavedClass() {

     var names = document.querySelectorAll("input[type=text]");
  

     for (var i = 0; i < names.length; i++) {
       names[i].classList.add("saved");
       names[i].classList.remove("placeholder");

     }

  }  
 
     
  /* 
  * Listen to when route changes in the application and perform two taks:
  * 
  * 1) Add "saved" class to speaker name inputs when the view is toggled back to 
  *    speaker rating.
  * 
  * 2) handle active state in navigation tabs
  */
  
  $scope.$on('$routeChangeSuccess', function($event, $template) {
    
        
    var path = $template.$$route.originalPath; // either "/" or "/program"
        
    
    //set 10ms timeout to let DOM nodes render before triggering addSavedClass();
    window.setTimeout(function() {
    
    var tableIsInView = document.getElementById("main-table");
    
    // if we're on home route AND the table UI is in the view, trigger addSavedClass
    if(path == "/" && tableIsInView) addSavedClass();
 
    }, 10);
    
    
    
  /*
  * Navbar logic for UI view state
  */
    var tab = document.querySelectorAll("nav li");

    
    //if template is home add active class to first tab
    if(path == "/") {
      tab[0].classList.add("view-menu-selected");
      tab[0].nextElementSibling.classList.remove("view-menu-selected");
    }
    else {
      //else add active to program rating tab
      tab[1].classList.add("view-menu-selected");
      tab[1].previousElementSibling.classList.remove("view-menu-selected");
    }   
  }); 
   
   
   
   /*
   * Listeners for $emiting events to alter $rootscope variables
   */
  
   
   $scope.$on("addedSpeech", function() {

    //increment numOfSpeeches++
    ++$scope.numOfSpeeches;
    });   
   
   
  $scope.$on("removedSpeech", function(){
    
    --$scope.numOfSpeeches;
  }); 
   

  
  /* 
  * Loop over speeches and evaluations.
  **/
   $scope.$on('updateCounter', 

     function(){
     // if we finish inputing an evaluation....
      if($scope.currentSpeech >= $scope.numOfSpeeches) { 

        $scope.evalCounter++; // increase evalutaion #
        $scope.currentSpeech = 0; //reset speech #

      }

    ++$scope.currentSpeech
  });
   
   
   
   /*
  * undo button subtracts the last grading and focuses on the previous row so that
  * a new value can be input
  */
  
  $scope.undo = function() {
    

    switch($scope.lastModelModified)
    {
      case "ratingData": undoSpeakerRatingData();
      break;
        
      case "programEvalData":
      case "programQualityRating":  undoProgramModelData();
      break;
        
      case "programOverallRating": undoProgramRating();
      break;
        
      default: alert("You have not input any data! There's nothing to undo");
    
    }
    
  
  };
   
   
   
   $scope.lastModelModified = "";
   // listen for an update to a data model
   $scope.$on("modelUpdated", function(event, model, elementData) {
     //when a data model has been updated, set global variable so that the undo method 
     // can decide which lower level method to use
    $scope.lastModelModified = model;
    $scope.lastModelModifiedElementData = elementData;
   });
   
   
   
   
   /*
   * Undo method for rating speaker data model
   */
   function undoSpeakerRatingData() {
     
     if($scope.currentSpeech > 1) {
    
        --$scope.currentSpeech;
      } 
      
      else {
     
        $scope.currentSpeech = $scope.ratingData.length; // focus the last row
        $scope.evalCounter--; //update the eval counter
     
      }
    
    
  
    var speechToCorrect = $scope.ratingData[$scope.currentSpeech - 1]; 
    var lastScoreIndex = speechToCorrect.scores.length - 1;
  
    //subtract the last value that was added from the total score
    speechToCorrect.total_score -= speechToCorrect.scores[lastScoreIndex];

    //delete that value from scores array
    speechToCorrect.scores.splice(lastScoreIndex, 1);  
    
   };
   
   
  
   
   /*
   * Undo method for program overview questions
   */
   
   function undoProgramModelData() {
   
   
     var index = $scope.lastModelModifiedElementData.index,
         value = $scope.lastModelModifiedElementData.value;
     

      $scope[$scope.lastModelModified][index][value] -= 1;
   
   
   }
   
   
   
    /*
   * Undo method for program rating
   */
   function undoProgramRating() {
     
     var rating = $scope.lastModelModifiedElementData.rating;
    
     // subtract the number of instances of the last rating
     $scope[$scope.lastModelModified]["score_instances"][rating] -= 1; 
     
     
     //delete the last element in the array
     var lastElement = $scope[$scope.lastModelModified]["scores"].pop();
     
      // subtract the value from the total score
     $scope[$scope.lastModelModified]["total_score"] -= lastElement;
   
   }
   

 
 }]);