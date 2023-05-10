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
    type: mongoose.Schema.ObjectId,
    ref: 'Department',
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
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },

}, {timestamps: true});

module.exports = mongoose.model("Teacher", TeacherSchema);













