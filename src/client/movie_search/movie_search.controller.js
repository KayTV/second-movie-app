angular.module('app')
.controller('MovieSearchController', ['$scope', 'httpFactory', 'authFactory', function($scope, httpFactory, authFactory){
  $scope.title = 'Movie Database';

  $scope.user = authFactory.getUserStatus();

  $scope.getOMDB = function() {
    httpFactory.getOMDB($scope.movieTitle)
    .then(function(response){
      console.log(response);
      $scope.movie = response.data;
      $scope.movieTitle = '';
      $scope.showDiv = false;
    })
  }

  $scope.saveMovie = function() {
    httpFactory.saveMovie($scope.movie)
    .then(function(response){
      console.log('response', response);
    })
  }
}]);
