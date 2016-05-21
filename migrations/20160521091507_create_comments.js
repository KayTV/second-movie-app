exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments();
    table.text('comment');
    table.integer('movie_id');
    table.foreign('movie_id').references('movies.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
