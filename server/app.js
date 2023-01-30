// external packages
const express = require("express");
require("dotenv").config();

// internal packages (modules)
const connectToMongo = require("./database/db_connect");
const route1 = require("./routes/route1");

// app code start
const app = express();

// atlas string in .env file
// const url = process.env.MONGO_ATLAS_URI;
const url = "mongodb://localhost:27017/finalProjectDB";
const port = process.env.PORT || 5200;
const hostname = "localhost";
app.use(express.json());

// All routes
app.use("/auth", route1);
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

// start the app
start();