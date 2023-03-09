// external packages
require("dotenv").config({path: "./.env"});
const express = require("express");
require("express-async-errors");

// internal packages (modules)
const connectToMongo = require("./db/connect");
const errorHandler  = require("./middleware/errorHandler")
const notFound = require("./middleware/notFound");
// routes
const auth = require("./routes/auth")
const admin = require("./routes/admin");
const authAdmin = require("./middleware/authAdmin");

// app code start
const app = express();
app.use(express.json());

// middleware


const port = process.env.PORT || 5200;
const hostname = "localhost";
// const uri = process.env.MONGO_ALTAS_URI;
const uri = "mongodb://127.0.0.1:27017/test-db1";

// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/admin",authAdmin,  admin);


// middleWares
app.use(errorHandler);
app.use(notFound);

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
