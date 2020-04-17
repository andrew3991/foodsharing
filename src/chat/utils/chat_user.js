const knex = require("../../db/knex.js");

exports.getSession = (owner, member, callback) => {
  knex("chat_session")
    .where("owner", owner)
    .where("member", member)
    .then(my_chat => {
      if (my_chat.length) {
        //console.log(my_chat[0]);
        callback(my_chat[0]);
        return;
      } else {
        knex("chat_session")
          .where("owner", member)
          .where("member", owner)
          .then(my_chat => {
            if (my_chat.length) {
              //console.log(my_chat[0]);
              callback(my_chat[0]);
            } else {
              callback(null);
              return;
            }
          });
      }
    });
};
