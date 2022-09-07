const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 6,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    googleID: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    refreshToken:{
        type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
