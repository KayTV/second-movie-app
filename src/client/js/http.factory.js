angular.module('app')
.factory('httpFactory', ['$http', function($http){
  var factory = {};
  var movieId = null;

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

  factory.getMovie = function(id) {
    return $http({
      method: 'GET',
      url: '/showpage/'+id
    });
  };

  factory.getCurrentMovie = function() {
      return movieId;
  }

  factory.setCurrentMovie = function(id) {
    movieId = id;
    console.log('movieId', movieId);
    return movieId;
  }

  factory.deleteMovie = function(id) {
    return $http({
      method: 'DELETE',
      url: '/showpage/'+id
    });
  }

  factory.updateRating = function(id, rating) {
    return $http({
      method: 'PUT',
      url: '/update-rating/'+id,
      data: {rating: rating}
    });
  }

  return factory;
}]);
