// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');


  $("#call").on("click", function(){
    var title = $("#title").val();
    var plot = $("#plot").val();
    var responseType = $("#res").val();

  $.ajax({
    url: 'https://www.omdbapi.com/?t='+title+'&y=&plot='+plot+'&r='+responseType,
    method: "GET",
    success: function(data) {
      console.log(data);
      movie = data;
      $("#results").html('  ');
      $("#results").append("<h2>"+data.Title+"</h2>");
      $("#results").append("<h3>Director: "+data.Director+"</h3>");
      $("#results").append("<img src="+data.Poster+">");
      $("#results").append("<h4>Actors: "+data.Actors+"</h4>");
      $("#results").append("<h5>Genre: "+data.Genre+", Rated: "+data.Rated+", Released: "+data.Released+"</h5>");
      $("#results").append("<h4><strong>Plot: </strong>"+data.Plot+"</h4>");
      // $("#results").append("<button type=submit id=saveMovie>Save Movie</button>");
      $("#title").val('');
      $("#saveMovie").on("click", function(){
        $.ajax({
          method: "POST",
          url: '/movie_search',
          data: movie,
          success: function(response) {
            console.log(response);
          }
        })
        // movies.push(movie);
        // localStorage.setItem('movies', JSON.stringify(movies));
        // $("#saveMovie").hide("");
        // $("#results").append("<h5>Movie saved to your database!</h5>");
      })

    }

  })

})
$(function() {
    $('.ratings').barrating({
      theme: 'fontawesome-stars',
      initialRating: $(this).attr("data-initial-rating"),
      onSelect: function(value, text, event) {
            $.ajax({
              method: 'POST',
              url: '/update-rating',
              data: {
                id: ,
                rating: +value
              }
            })
          }
    });
 });
});
