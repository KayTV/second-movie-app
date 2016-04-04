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
}]);
