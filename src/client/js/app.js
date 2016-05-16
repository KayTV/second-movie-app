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
      .when('/register', {
        templateUrl: 'auth/register/register.html',
        controller: 'RegisterController'
      })
      .when('/login', {
        templateUrl: 'auth/login/login.html',
        controller: 'LoginController'
      })
      .when('/logout', {
      controller: 'LogoutController'
      })
      .otherwise({redirectTo: '/'});
  });
