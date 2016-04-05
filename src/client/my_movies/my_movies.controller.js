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

  $scope.rateFunction = function(index) {
    console.log('rating', $scope.movies[index].rating, $scope.movies[index]);
    httpFactory.updateRating($scope.movies[index].id, $scope.movies[index].rating)
    .then(function(response){
      console.log(response);
    })
      // console.log('Rating selected: ' + rating);
    };
}]);
