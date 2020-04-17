const knex = require("../db/knex.js");
const utils = require("./utils/chat_user");
const uuidv4 = require("uuid/v4");

exports.listAllChats = (req, res) => {
  const auth_user = req.user.id;
  var chats = [];

  knex
    .select(
      "u.id",
      "u.firstname",
      "u.lastname",
      "cs.uri",
      "cs.owner",
      "cs.member"
    )
    .from("user AS u")
    .leftJoin("chat_session AS cs", "cs.owner", "u.id")
    .where("cs.member", auth_user)
    .then(chatRows => {
      chats.push(chatRows);
      // console.log(chats);
      //res.render("views/partials/chats_list", { chatRows });
      knex
        .select(
          "u.id",
          "u.firstname",
          "u.lastname",
          "cs.uri",
          "cs.owner",
          "cs.member"
        )
        .from("user AS u")
        .leftJoin("chat_session AS cs", "cs.member", "u.id")
        .where("cs.owner", auth_user)
        .then(chatRows => {
          chats.push(chatRows);
          // console.log(chats);
          res.render("views/partials/chats_list", { chats, auth_user });
        });
    });
  return chats;
};

exports.createChatSession = (req, res) => {
  utils.getSession(req.user.id, req.query.receiver_id, data => {
    const messages = [];
    const session = data;
    const owner_id = req.user.id;
    const owner_name = req.user.firstname;
    if (session) {
      return knex("chat_message")
        .select("message", "user_id")
        .where("chat_session_id", session.id)
        .then(message_object => {
          for (let i = 0; i < message_object.length; i++) {
            messages.push(message_object[i]);
          }
          return messages;
        })
        .then(messages => {
          var session_id = session.id;
          var uri = session.uri;
          var member = session.member;
          res.render("views/partials/chat_session", {
            messages,
            owner_id,
            uri,
            member,
            session_id,
            owner_name
          });
        });
    } else {
      const chat_uuid = uuidv4();
      const uri = this.createChatURI(chat_uuid);
      // console.log(uri);

      return knex("chat_session")
        .insert({
          uri: uri,
          owner: req.user.id,
          member: req.query.receiver_id
        })
        .then(session_id => {
          knex("chat_session")
            .select("*")
            .where("uri", uri)
            .then(session_object => {
              const member = session_object[0].member;

              res.render("views/partials/chat_session", {
                messages,
                owner_id,
                uri,
                member,
                session_id,
                owner_name
              });
            });
        });
    }
  });
};

exports.validateChatData = function validateChatData(message) {
  return new Promise((resolve, reject) => {
    const msg = message.split(": ")[1];
    if (!msg) {
      reject(
        new Error("You are trying send empty string. Please enter a message!")
      );
    }

    if (typeof msg !== "string") {
      reject(new Error("Wrong data type. Message has not a string type"));
    }

    if (msg.length > 256) {
      reject(new Error("Message is to long"));
    }
    resolve(true);
  });
};

exports.createChatURI = function createChatURI(data) {
  if (typeof data == "string" && data.length > 15) {
    const uri = data
      .toString()
      .replace(/-/g, "")
      .slice(0, 15);
    return uri;
  }
  return data;
};
