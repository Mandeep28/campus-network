// external packages
const express = require("express");
require("dotenv").config();

// internal packages (modules)
const connectToMongo = require("./database/db_connect");

// app code start
const app = express();
// atlas string in .env file
// const url = process.env.MONGO_ATLAS_URI;
const url = "mongodb://localhost:27017/finalProjectDB";
const port = process.env.PORT || 5200;
const hostname = "localhost";

// All routes
app.get("/", (req, res) => {
  res.send("hello world");
});
// start arrow function that connect to db and listen the port
const start = async () => {
  try {
    await connectToMongo(url);
    app.listen(port, () => {
      console.log(`Server is listening on http://${hostname}:${port}/`);
    });
  } catch (err) {
    console.log(err);
  }
};
//first commit
// start the app
start();