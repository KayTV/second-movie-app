angular.module('app')
.factory('httpFactory', ['$http', 'authFactory', function($http, authFactory){
  var factory = {};
  var movieId = null;

  factory.getOMDB = function(title) {
    return $http({
      method: 'GET',
      url: 'https://www.omdbapi.com/?t='+title
      // url: 'https://www.omdbapi.com/?s='+title ----the 's' gets you multiple movies
    });
  };

  factory.saveMovie = function(movie) {
    var user_id = authFactory.getUserId();
    return $http ({
      method: 'POST',
      url: '/movie',
      data: {movie: movie,
            user_id: user_id}
    });
  };

  factory.addComment = function(id, comment) {
    return $http ({
      method: 'POST',
      url: '/comments',
      data: {comment: comment,
              id: id}
    });
  };

  // factory.getComments = function() {
  //   return $http ({
  //     method: 'GET',
  //     url: '/get_comments'
  //   });
  // };

  factory.getMovies = function() {
    var userid = authFactory.getUserId();
    return $http({
      method: 'GET',
      url: '/my_movies/'+userid
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
    console.log('rating', rating);
    return $http({
      method: 'PUT',
      url: '/update-rating/'+id,
      data: {rating: rating}
    });
  }

  return factory;
}]);
