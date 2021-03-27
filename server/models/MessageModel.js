// require in mongoose, destructure Schema
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// configure URI -> access to personal mongo cluster
const myURI = 'mongodb+srv://astaiglesia:OmegaSupreme@cluster0.rp1x2.mongodb.net/crud2?retryWrites=true&w=majority';
const URI = process.env.MONGO_URI || myURI;

// connect the database
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

// instantiate and define new Schema(s)
// all items to include properties: message, password, created_at

const messageSchema = new Schema ({
  message : { type: String, required: true }, 
  password : { type: String }, 
  created_at: { type: Date, default: Date.now }
});

// export model
module.exports = mongoose.model('Message', messageSchema);
