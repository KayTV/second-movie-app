angular.module('app', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.html',
        // controller: 'HomeController'
      })
    
      .otherwise({redirectTo: '/'});
  });
