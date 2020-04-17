// https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261
// https://www.youtube.com/watch?v=eBpP_velw1I&list=PL7sCSgsRZ-smPRSrim4bX5TQfRue1jKfw&index=3
// old: table.integer('category_id').references('id').inTable('category').onDelete('RESTRICT');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('food', function(table){
    table.increments(); // id
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.timestamp('timestamp').defaultTo(knex.fn.now())
    table.integer('user_id').references('id').inTable('user').onDelete('CASCADE').notNullable();
    table.string('category').notNullable();
    table.string('city').notNullable();
    table.integer('zipcode').notNullable();
    table.string('street').notNullable();
    table.integer('streetnumber').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('food');
};
