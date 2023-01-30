const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  passowrd: {
    type: String,
    require: true,
  },
  profilePicture: {
    type: Image,
    default:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
  },
  TimeStamp: {
    type: Date,
    default: Date.now,
  },
});

moudule.exports = mongoose.model("student", StudentSchema);