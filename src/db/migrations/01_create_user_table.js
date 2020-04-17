// https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261

exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table){
    table.increments();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
