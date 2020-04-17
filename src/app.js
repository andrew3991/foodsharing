// https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977
// http://knexjs.org
// http://perkframework.com/v1/guides/creating-new-pages-and-routes.html

"use strict";

const express = require("express");
const path = require("path");
const config = require("./config");
const bodyParser = require("body-parser");

const passport = require("passport");
const user = require("./user/routes");
const food = require("./food/routes");
const chat = require("./chat/routes");

const app = express();
const server = require("http").Server(app);

/*
 *  CONFIGURATION
 */
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
// configure passport
config.configPassport();
// configure view engine
app.set("views", __dirname + "/");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
// configure bodyParser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// configure session
config.configSession(app);
// on top of express-session and session-file-store
app.use(passport.initialize());
app.use(passport.session());

/*
 *  MODULES
 */

// user: handles user authentication

user.routes(app);

// Routes for food
food.routes(app);

chat.routes(app, server);

module.exports = server;
