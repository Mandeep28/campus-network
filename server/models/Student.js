const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: {
    type: String,
    require: [true, "Value must be required"],
    minLength: [3, "Length must be 3 character"],
    maxLength: [20, "Length should not be greater than 20 character"],
  },
  class: {
    type: String,
    require: [true, "Value must be required"],
    minLength: [13, "Length must be 3 character"],
    maxLength: [60, "Length should not be greater than 20 character"],
  },
  semester: {
    type: Number,
    require: [true, "Value must be required"],
    
  },
  departmentName: {
    type: String,
    require: [true, "Value must be required"],
    minLength: [13, "Length must be 3 character"],
    maxLength: [60, "Length should not be greater than 20 character"],
  },
  email: {
    type: String,
    unique: true,
    require: [true, "value must provided"],
    minLength: [15, "Length must be 3 character"],
    maxLength: [50, "Length should not be greater than 20 character"],
  },
  currentRollNo: {
    type: Number,
    require: [true, "Value must be required"],
  },
  oldRollNo: {
    type: Number,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
  },
  TimeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("student", StudentSchema);
