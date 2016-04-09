(function() {
  angular.module('app')
  .factory('movieFactory', movieFactory);

  movieFactory.$inject = ['httpFactory'];

  function movieFactory(httpFactory) {
    var factory = {
      getMovies: getMovies,
      getMovieById: getMovieById,
      getCurrentMovie: getCurrentMovie,
      setCurrentMovie: setCurrentMovie
    };

    var movies = [];
    var currentMovie = {};

    function activate() {
      httpFactory.getMovies()
        .then(function(response) {
          movies = response.data;
        });
    }

    function getMovies() {
      return movies;
    }

    function getMovieById(id) {
      return movies.reduce(function(val) {
        return val.id == id;
      });
    }

    function getCurrentMovie() {
      return currentMovie;
    }

    function setCurrentMovie(id) {
      currentMovie = getMovieById(id);
      return currentMovie;
    }

    return factory;
  }

})();
