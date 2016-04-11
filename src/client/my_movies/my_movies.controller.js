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

  $scope.setCurrentMovie = function(id) {
    httpFactory.setCurrentMovie(id)
      console.log(id);
      // $scope.successMessage = 'Updated ' + $scope.movies[index].title;
  };

  // $scope.rateFunction = function() {
  //   var movie = this.movie;
  //   console.log(this);
  //   httpFactory.updateRating(movie.id, movie.rating)
  //   .then(function(response){
  //     console.log(response);
  //   })
  // };
}]);
