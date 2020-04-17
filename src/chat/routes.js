"use strict";
const knex = require("../db/knex.js");
const chat = require("./chat");
const socketio = require("socket.io");

exports.routes = function routes(app, server) {
  //const server = http.createServer(app);
  const io = socketio.listen(server);
  // Routes for chat
  app.get("/chat/chats_list", chat.listAllChats);
  app.get("/chat/chat_session", chat.createChatSession);

  io.on("connection", socket => {
    socket.on("session", session_object => {
      var obj = JSON.parse(session_object);
      socket.join(obj.uri);
      //socket.to(obj.uri).broadcast.emit("user-connected", obj.member_id);
    });
    socket.on("chat message", data => {
      const msg = data.owner_name + ": " + data.msg;
      chat
        .validateChatData(msg)
        .then(valid => {
          if (valid === true) {
            knex("chat_message")
              .insert({
                chat_session_id: data.session_id,
                user_id: data.owner,
                message: msg,
                status: 0
              })
              .then(() => {
                //socket.to(data.uri).emit("chat message", msg);
                io.in(data.uri).emit("chat message", msg);
              });
          }
        })
        .catch(err => {
          io.in(data.uri).emit("error-message", err.message);
        });
    });
    //socket.emit("redirect", "/chat/chat_session");
    socket.on("disconnect", uri => {
      // console.log("user disconnected");
      socket.leave(uri);
    });
  });
};
