const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { 
    type: String,
     required: true,
     unique:true,
     trim:true,
     lowercase:true,
    },
  email: {
     type: String,
      required: true ,   
      unique:true,
      trim:true,
      lowercase:true,
    },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must ne 8 characters long"],
  },
  isAdmin: Boolean,
  cart:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref:'product',
    default: [],
  }],
  order: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});

module.exports = mongoose.model("user", userSchema);
