var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
var passport = require('../lib/auth');
var helpers = require('../lib/helpers');
function movie_app_two() {
  return knex('movies');
}


router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Marketing' });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) {
      res.render('login', {title: 'Error', errors: ['Email and/or password incorrect']})
      // return next(err);
    } else {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  })(req, res, next);
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Marketing' });
});

router.post('/signup', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  knex('users').where('email', email)
    .then(function(data){
      // if email is in the database send an error
      if(data.length) {
        res.render('signup', {title: 'Error', errors: ['Email already exists']})
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
          req.flash('message', {
            status: 'success',
            message: 'welcome'
          });
          return res.redirect('/login');
        })
        .catch(function(err) {
          return res.send('crap');
        });
      }
    })
    .catch(function(err){
      return next(err);
    });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/movie_search', function(req, res, next) {
  res.render('movie_search', { user: req.user });
})

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
    user_id: 1,
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

router.post('/update-rating', function(req, res, next){
  console.log(req.body);
  movie_app_two().where('id', req.params.id).update({
    director: req.body.director,
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description
  }).then(function() {
    res.status(200);
    res.redirect('/movies');
  })
  .catch(function (err) {
    console.log(err)
  })
});

router.get('/my_movies', function(req, res, next) {
  movie_app_two().select()
  .then(function(movies){
    res.json(movies);
  })
})

router.get('/showpage/:id', function(req, res, next) {
  movie_app_two().where('id', req.params.id).first().then(function(movie){
    res.json(movie);
  });
})

router.post('/showpage/:id', function(req, res, next){
  console.log('delete');
  movie_app_two().where('id', req.params.id).del().then(function(result){
    res.redirect('/my_movies')
  });
});

module.exports = router;
