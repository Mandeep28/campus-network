const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeacherSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  departmentName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  TimeStamp: {
    type: Date,
    default: Date.now,
  },
});

moudule.exports = mongoose.model("teacher", TeacherSchema);
