exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', function(table){
    table.increments();
    table.string('title');
    table.string('director');
    table.string('poster');
    table.string('actors');
    table.string('genre');
    table.string('rated');
    table.string('released_date');
    table.string('plot');
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movies');
};
