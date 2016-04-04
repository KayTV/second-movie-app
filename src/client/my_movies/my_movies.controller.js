angular.module('app')
.controller('MyMoviesController', ['$scope', 'httpFactory', function($scope, httpFactory){
  $scope.title = 'My Movies';

  function activate() {
    httpFactory.getMovies()
      .then(function(response){
        console.log(response);
        $scope.movies = response.data;
      });
  };
  activate();

  $scope.setCurrentMovie = function(index) {
    httpFactory.setCurrentMovie($scope.movies[index].id)
    .then(function(response){
      console.log(response);
      // $scope.successMessage = 'Updated ' + $scope.movies[index].title;
    });
  };
}]);
