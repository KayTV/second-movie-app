angular.module('app')
.factory('httpFactory', ['$http', function($http){
  var factory = {};

  factory.getOMDB = function(title) {
    return $http({
      method: 'GET',
      url: 'https://www.omdbapi.com/?t='+title
    });
  };

  factory.saveMovie = function(movie) {
    return $http ({
      method: 'POST',
      url: '/movie',
      data: {movie: movie}
    });
  };

  factory.getMovies = function() {
    return $http({
      method: 'GET',
      url: '/my_movies'
    });
  };

  return factory;
}]);
