angular.module('app')
.controller('MovieSearchController', ['$scope', 'httpFactory', function($scope, httpFactory){
  $scope.title = 'Movie Database';

  $scope.getOMDB = function() {
    httpFactory.getOMDB($scope.movieTitle)
    .then(function(response){
      console.log(response);
      $scope.movie = response.data;
      $scope.movieTitle = '';
    })
  }

  $scope.saveMovie = function() {
    httpFactory.saveMovie($scope.movie)
    .then(function(response){
      console.log('response', response);
    })
  }
}]);
