const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeacherSchema = new Schema({
  name: {
    type: String,
    require: [true, "Value must be required"],
    minLength: [3, "Length must be 3 character"],
    maxLength: [25, "Length should not be greater than 20 character"],
  },
  departmentName: {
    type: String,
    require: [true, "Value must be required"],
    minLength: [15, "Length must be 3 character"],
    maxLength: [60, "Length should not be greater than 20 character"],
  },
  email: {
    type: String,
    require: [true, "Value must be required"],
    minLength: [15, "Length must be 3 character"],
    maxLength: [50, "Length should not be greater than 20 character"],
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  TimeStamp: {
    type: Date,
    default: Date.now,
  },
});

moudule.exports = mongoose.model("teacher", TeacherSchema);