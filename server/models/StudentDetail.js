const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentDetailSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  class: {
    type: String,
    require: true,
  },
  semester: {
    type: Number,
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
  currentRollNo: {
    type: Number,
    require: true,
  },
  OldRollNo: {
    type: Number,
    require: true,
  },
  TimeStamp: {
    type: Date,
    default: Date.now,
  },
});

moudule.exports = mongoose.model("studentDetail", StudentDetailSchema);
