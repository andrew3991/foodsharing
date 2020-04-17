exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("chat_session")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("chat_session").insert([
        { id: 1, uri: "frkdu578fj49fj4", owner: 1, member: 2 }
      ]);
    });
};
