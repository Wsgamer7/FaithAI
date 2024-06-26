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
const Message = require("./models/message");
const Document = require("./models/document");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const ragManager = require("./rag.js");

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
  console.log("recive a message from user: " + req.user + req.body);
  if (!req.user) {
    return res.status(401).send("Not logged in");
  }
  const newMessage = new Message({
    sender_id: req.user._id,
    recipient_id: req.body.recipient_id,
    content: req.body.content,
  });
  newMessage.save();

  const makeQuery = async () => {
    try {
      const llmResponse = await ragManager.retrievalAugmentedGeneration(req.body.content);
      const botMessage = new Message({
        sender_id: req.body.recipient_id,
        recipient_id: req.user._id,
        content: llmResponse,
      });
      botMessage.save().then(() => {
        res.send(botMessage);
      });
    } catch (error) {
      console.log("error:", error);
      res.status(500);
      res.send({});
    }
  };
  makeQuery();
});
router.get("/messages", (req, res) => {
  if (!req.user) {
    return res.status(401).send("Not logged in");
  }
  const query = { $or: [{ sender_id: req.user._id }, { recipient_id: req.user._id }] };
  Message.find(query).then((messages) => res.send(messages));
});

router.get("/documents", (req, res) => {
  if (!req.user) {
    return res.status(401).send("Not logged in");
  }
  Document.find({ userId: req.user._id }).then((documents) => res.send(documents));
});
router.post("/document", (req, res) => {
  if (!req.user) {
    return res.status(401).send("Not logged in");
  }
  console.log("user: " + req.user);
  const newDocument = new Document({
    userId: req.user._id,
    content: req.body.content,
  });
  const addDocument = async (document) => {
    try {
      await document.save();
      await ragManager.addDocument(document);
      res.send(document);
    } catch (error) {
      console.log("error:", error);
      res.status(500);
      res.send({});
    }
  };
  addDocument(newDocument);
});
router.post("/updateDocument", (req, res) => {
  if (!req.user) {
    return res.status(401).send("Not logged in");
  }
  const updateDocument = async (document_id) => {
    const document = await Document.findById(document_id);
    if (!document) res.send({});
    try {
      document.content = req.body.content;
      await document.save();
      await ragManager.updateDocument(document);
      res.send({});
    } catch (error) {
      console.log("error:", error);
      res.status(500);
      res.send({});
    }
  };
  updateDocument(req.body.document_id);
});

router.post("/deleteDocument", (req, res) => {
  const deleteDocument = async (document_id) => {
    const document = await Document.findById(document_id);
    if (!document) res.send({});
    try {
      await ragManager.deleteDocument(document);
      await document.remove();
      res.send({});
    } catch {
      await document.remove();
      res.send({});
    }
  };
  deleteDocument(req.body.document_id);
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
