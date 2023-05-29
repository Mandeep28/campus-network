const mongoose = require("mongoose");
const validator = require("validator");

const AluminiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Name must be required"],
      // minlength: 3,
      // maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      requiredd: [true, "email must be required"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
   


    course: {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
    
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alumini", AluminiSchema);
