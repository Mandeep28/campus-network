// external packages
const express = require("express");
require("dotenv").config();
require("express-async-errors");

// internal packages (modules)
const connectToMongo = require("./db/connect");
const errorHandler  = require("./middleware/errorHandler")
const authenticate = require("./routes/auth")

// app code start
const app = express();
app.use(express.json());

// middleware


const port = process.env.PORT || 5200;
const hostname = "localhost";
// const uri = process.env.MONGO_ALTAS_URI;
const uri = "mongodb://127.0.0.1:27017/test";

// routes
app.use("/api/v1/auth", authenticate);

app.use(errorHandler);


// start arrow function that connect to db and listen the port
const start = async () => {
  try {
    await connectToMongo(uri);
    app.listen(port, () => {
      console.log(`Connected To MongoDB + Server is listening on http://${hostname}:${port}/`);
    });
  } catch (err) {
    console.log(err);
  }
};
// start the app
start();
