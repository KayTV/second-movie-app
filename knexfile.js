module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/movie_app_two'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
