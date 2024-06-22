/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Message = require("./models/message");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const message = require("./models/message");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  //todo: just send userId and avatar url
  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in

  if (req.user) {
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  }
  res.send({});
});
router.post("/message", (req, res) => {
  console.log("recive a message from user: " + req.user);
  if (!req.user) {
    return res.status(401).send("Not logged in");
  }
  const newMessage = new Message({
    sender_id: req.user._id,
    recipient_id: req.body.recipient_id,
    content: req.body.content,
  });
  newMessage.save().then((message) => {
    res.send(message);
  });
});
router.get("/messages", (req, res) => {
  if (!req.user) {
    return res.status(401).send("Not logged in");
  }
  const query = { $or: [{ sender_id: req.user._id }, { recipient_id: req.user._id }] };
  Message.find(query).then((messages) => res.send(messages));
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
