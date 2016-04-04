angular.module('app', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.html',
        // controller: 'HomeController'
      })
      .when('/movie_search', {
        templateUrl: 'movie_search/movie_search.html',
        controller: 'MovieSearchController'
      })
      .otherwise({redirectTo: '/'});
  });
