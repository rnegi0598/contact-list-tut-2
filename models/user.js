const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add username"],
    },
    email: {
      type: String,
      required: [true, "please add email"],
    },
    password: {
      type: String,
      required: [true, "please eneter password"],
    },
  },
  { timestamps: true }
);




module.exports=mongoose.model('User',UserSchema);