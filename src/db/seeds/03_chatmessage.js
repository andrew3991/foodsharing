exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("chat_message")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("chat_message").insert([
        { id: 1, user_id: 1, chat_session_id: 1, message: "Hello", status: 0 },
        { id: 2, user_id: 2, chat_session_id: 1, message: "Hi", status: 0 },
        {
          id: 3,
          user_id: 2,
          chat_session_id: 1,
          message: "How are you?",
          status: 0
        }
      ]);
    });
};
