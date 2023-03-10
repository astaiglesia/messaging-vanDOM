// pull in dependencies
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// configure URI to  mongo cluster
const URI = process.env.MONGO_URI;

// connect to database
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(error);
  });

// instantiate and define message Schema
const messageSchema = new Schema ({
  message : { type: String, required: true }, 
  password : { type: String }, 
  created_at: { type: Date, default: Date.now }
});

// export model
module.exports = mongoose.model('Message', messageSchema);
