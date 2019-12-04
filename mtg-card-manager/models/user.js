const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's user structure

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  library: {
    type: [],
    required: true
  }
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("users", UserSchema);
