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

router.post('/movie_search', function(req, res, next) {
  movie_app_two().insert({
    title: req.body.Title,
    director: req.body.Director,
    poster: req.body.Poster,
    actors: req.body.Actors,
    genre: req.body.Genre,
    rated: req.body.Rated,
    released_date: req.body.Released,
    plot: req.body.Plot,
    user_id: req.user.id
  }, 'id').then(function(result){
    res.redirect('/movie_search')
  })
  .catch(function(err){
    console.log(err)
  })
})

router.get('/my_movies', function(req, res, next) {
  movie_app_two().select().where('user_id', req.user.id)
  .then(function(movies){
    res.render('my_movies', { user: req.user, movies: movies });
  })
})

router.get('/showpage/:id', function(req, res, next) {
  movie_app_two().where('id', req.params.id).first().then(function(movie){
    res.render('showpage', {user: req.user, movie: movie});
  });
})

module.exports = router;
