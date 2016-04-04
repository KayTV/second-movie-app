angular.module('app')
.controller('ShowpageController', ['$scope', '$location', 'httpFactory', function($scope, $location, httpFactory){
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
      $location.path('/my_movies');
    })
    window.location = "/#/my_movies"
  }

}]);
