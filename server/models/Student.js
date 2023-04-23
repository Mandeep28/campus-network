const mongoose = require("mongoose");
const validator = require("validator");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be required"],
      minlength: 3,
      maxlength: 50,
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
    rollno: {
      type: Number,
      required: [true, "Roll Number must be required"],
    },

    semester: {
      type: Number,
      default: 1
    },
    department : {
      type: mongoose.Schema.ObjectId,
    ref: 'Department',
  },

    course: {
        type: String,
        required: [true, "course name must be required"],
        minlength: 3,
        maxlength: 60,
    
    },
    degreeType: {
      type: String,
      enum: ["ug_3", "ug_4", "pg_2", "pg_3"],
      default: "ug_3",
    },

   
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", StudentSchema);
