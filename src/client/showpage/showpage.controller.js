angular.module('app')
.controller('ShowpageController', ['$scope', 'httpFactory', function($scope, httpFactory){
  $scope.title = 'test';
  function activate() {
    var id = httpFactory.getCurrentMovie();
    httpFactory.getMovie(id)
    .then(function(response){
      console.log(response);
      $scope.movie = response.data;
    });
  }
  activate();

  $scope.deleteMovie = function(id) {
    httpFactory.deleteMovie(id)
    .then(function(response){
      console.log('deleted movie');
      $scope.movies.splice(index, 1);
    })
  };

}]);
