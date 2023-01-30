const mongoose = require("mongoose");

const connectToMongo = (url) => {
  mongoose.set("strictQuery", false);
  mongoose.connect(url);
  console.log("connect to mongoDB");
};

module.exports = connectToMongo;