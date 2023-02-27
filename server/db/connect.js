const mongoose = require("mongoose");

const connectToDB = (url) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(url);
};

module.exports = connectToDB;