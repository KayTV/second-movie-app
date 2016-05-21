var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
var passport = require('../lib/auth');
var helpers = require('../lib/helpers');
function movie_app_two() {
  return knex('movies');
};

function Comments() {
  return knex('comments');
};


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) {
      res.json({title: 'Error', errors: ['Email and/or password incorrect']})
    } else {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        } else {
          return res.json({status: 'login', user: user});
        }
      });
    }
  })(req, res, next);
});

router.post('/register', function(req, res, next) {
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;
  knex('users').where('email', email)
    .then(function(data){
      // if email is in the database send an error
      if(data.length) {
        res.json({title: 'Error', errors: ['Email already exists']})
      } else {
        // hash and salt the password
        var hashedPassword = helpers.hashing(password);
        // if email is not in the database insert it
        knex('users').insert({
          email: email,
          name: name,
          password: hashedPassword
        })
        .then(function(data) {
          res.json({message: 'successfully registered, please login!', status: 200})
        })
        .catch(function(err) {
          return res.json('crap');
        });
      }
    })
    .catch(function(err){
      return next(err);
    });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.status(200).json({status: 'Bye'});
});

//save movie to database
router.post('/movie', function(req, res, next) {
  console.log('hitting /movie');
  console.log(req.body);
  movie_app_two().insert({
    title: req.body.movie.Title,
    director: req.body.movie.Director,
    poster: req.body.movie.Poster,
    actors: req.body.movie.Actors,
    genre: req.body.movie.Genre,
    rated: req.body.movie.Rated,
    released_date: req.body.movie.Released,
    plot: req.body.movie.Plot,
    user_id: req.body.user_id,
    rating: 1
  }, 'id').then(function(result){
    res.json({
      status: 200,
      message: 'Succesfully saved '+req.body.Title
    });
  })
  .catch(function(err){
    console.log('errorrrrrrrrrr', err)
  })
})

//add comment to database
router.post('/comments', function(req, res, next) {
  console.log('comment', req.body);
  Comments().insert({
    comment: req.body.comment,
    movie_id: req.body.id
  }, 'id').then(function(result){
    res.json({
      status: 200,
      message: 'added comment'
    });
  })
  .catch(function(err){
    console.log('error', err);
  })
});

//get all the comments
// router.get('/get_comments', function(req, res, next) {
//   Comments().select().where('movie_id', req.params.id)
//   .then(function(comments){
//     res.json(comments);
//   })
// })

//update movie rating
router.put('/update-rating/:id', function(req, res, next){
  console.log('body', req.body);
  movie_app_two().where('id', req.params.id).update({
    rating: req.body.rating
  }).then(function(rating) {
    res.status(200);
    res.json(rating)
  })
  .catch(function (err) {
    console.log(err)
  })
});

//get all the movies
router.get('/my_movies/:id', function(req, res, next) {
  // var user_id = req.params.id;
  movie_app_two().select().where('user_id', req.params.id)
  .then(function(movies){
    res.json(movies)
  })
})

//get a single movie
router.get('/showpage/:id', function(req, res, next) {
  movie_app_two().where('id', req.params.id).first()
  .then(function(movie){
    Comments().select().where('movie_id', req.params.id)
    .then(function(comments){
      res.json({movie: movie, comments: comments});
    })
  });
})

//delete a single movie
router.delete('/showpage/:id', function(req, res, next){
  movie_app_two().where('id', req.params.id).del()
  .then(function(result){
    res.json(result);
  })
})

module.exports = router;
