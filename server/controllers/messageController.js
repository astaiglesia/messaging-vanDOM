// requre in mongoose model from model.js
const MessageModel = require('../models/MessageModel');

// create an object to bundle middleware for export
const messageController = {};

// --- POST Message - creates a new item in the database
// - destructure the request body to retrieve message to be saved
// - implement Model.create() passing in the req body data
messageController.postMsg  = (req, res, next) => {
  const { message } = req.body;
  MessageModel.create( { message }, (err, msg) => {
    // errors to be passed into a return of an invocation of next() for global error handling
    if (err) {
      return next(err);
    }
    // returned promise data stored to res.locals
    else{
      res.locals.msg = msg;
      return next();
    }
  });
};

// --- GET Messages - retrieves all items from the database + sends back to the client for rendering
// - implement Model.find and query all documents
messageController.getMsg  = (req, res, next) => {
  MessageModel.find( {}, (err, collection) => {
    // errors to be passed into a return of an invocation of next() for global error handling
    if (err) {
      return next(err);
    }
    // returned promise data stored to res.locals
    else{
      res.locals.collection = collection;
      return next();
    }
  });
};

// --- DELETE Message - finds items by ID and deletes the message
// - assign _id the id passed through params (_id is the identifier used in mongodb)
// - implement Model.findOneAndDelete() passing in the req body data
messageController.deleteMsg  = (req, res, next) => {
  const _id = req.params.id;
  MessageModel.findOneAndDelete( { _id }, (err, deletion) => {
    // errors to be passed into a return of an invocation of next() for global error handling
    if (err) {
      return next(err);
    }
    // returned promise data stored to res.locals
    else{
      res.locals.deletion = deletion;
      return next();
    }
  });
};

module.exports = messageController;