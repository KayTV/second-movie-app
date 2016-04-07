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
      .when('/my_movies', {
        templateUrl: 'my_movies/my_movies.html',
        controller: 'MyMoviesController'
      })
      .when('/showpage', {
        templateUrl: 'showpage/showpage.html',
        controller: 'ShowpageController'
      })
      .when('/signup', {
        templateUrl: 'signup/signup.html',
        // controller: 'SignupController'
      })
      .when('/login', {
        templateUrl: 'login/login.html',
        // controller: 'LoginController'
      })
      .otherwise({redirectTo: '/'});
  });
