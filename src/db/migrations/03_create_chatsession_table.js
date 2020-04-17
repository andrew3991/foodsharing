exports.up = function(knex) {
  return knex.schema
    .createTable("chat_session", table => {
      table.increments();
      table
        .string("uri")
        .unique()
        .notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .integer("owner")
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
      table
        .integer("member")
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
    })
    .createTable("chat_message", table => {
      table.increments();
      table
        .integer("user_id")
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
      table
        .integer("chat_session_id")
        .references("id")
        .inTable("chat_session")
        .onDelete("CASCADE");
      table.text("message").notNullable();
      table
        .integer("status")
        .notNullable()
        .defaultTo(0);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("chat_message").dropTable("chat_session");
};
