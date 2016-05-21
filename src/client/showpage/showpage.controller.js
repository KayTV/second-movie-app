angular.module('app')
.controller('ShowpageController', ['$scope', '$location', '$route', 'httpFactory', function($scope, $location, $route, httpFactory){
  $scope.title = 'test';
  function activate() {
    var id = httpFactory.getCurrentMovie();
    httpFactory.getMovie(id)
    .then(function(response){
      console.log(response);
      $scope.movie = response.data.movie;
      $scope.comments = response.data.comments;
    });
  }
  activate();

  $scope.addComment = function(id) {
    httpFactory.addComment(id, $scope.comment)
    .then(function(response){
      console.log('comment', response);
      $scope.comment = {};
      $route.reload();
    });
  }

  $scope.deleteMovie = function(id) {
    httpFactory.deleteMovie(id)
    .then(function(response){
      console.log('deleted movie');
      $location.path('/my_movies');
    })
    window.location = "/#/my_movies"
  }

}]);
