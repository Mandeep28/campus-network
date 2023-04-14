const mongoose = require("mongoose");
const validator = require('validator');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Value must be required"],
    minlength: 3, 
    maxlength: 50
  },
  department : {
    name: {
      type: String,
      required: [true, " department name must be required"],
      maxlength: 70,
    },
    id: {
      type: String,
      required: [true, " department id must be required"],
      maxlength: 70,
    }
},
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  createdBy: {
    name: {
      type: String,
      required: true,
    },
   id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
   }
  },

}, {timestamps: true});

module.exports = mongoose.model("teacher", TeacherSchema);