module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/marketing_users'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
