/*
*  Rate My Seminar App Module, 2015
*  -------------------------------
*  This file is the top-level module for the application.
*  it injects all dependencies and configures the $route service
*  used in the application
*
*/



/*
* Top-level app module definition.
*/
var rateMySeminar = angular.module('rateMySeminar', [
  
  'ngRoute',
  'toolbarController',
  'speakerRatingController',
  'programRatingController'
  
]);


/*
* routing service config
*/
  rateMySeminar.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
      .when('/program', {
        templateUrl: 'partials/program-evaluation.html',
      })
      .when('/', {
        templateUrl: 'partials/speaker-evaluation.html'
      })
     .otherwise({redirectTo: '/'});
  }]);

