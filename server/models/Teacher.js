const mongoose = require("mongoose");
const validator = require('validator');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Value must be required"],
    minlength: 3, 
    maxlength: 50
  },
  departmentName: {
    type: String,
    required: [true, "Value must be required"],
    minlength: 15, 
    maxlength: 70
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
    required: true,
  },

}, {timestamps: true});

module.exports = mongoose.model("teacher", TeacherSchema);