const mongoose = require("mongoose");
const validator = require("validator");

const AluminiSchema = new mongoose.Schema(
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

    image: {
      type: String,
      default:
        "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
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
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("alumini", AluminiSchema);
