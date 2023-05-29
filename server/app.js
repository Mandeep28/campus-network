// external packages
require("dotenv").config({path: "./.env"});
const express = require("express");
require("express-async-errors");
const path = require("path");
const cors = require("cors");

// internal packages (modules)
// database connection
const connectToMongo = require("./db/connect");

// routes
const auth = require("./routes/auth");
const admin = require("./routes/admin_routes");
const userData_routes = require("./routes/userData_routes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");


// middleware
const authAdmin = require("./middleware/authAdmin");
const errorHandler  = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const authUser = require("./middleware/authUser")


// app code start
const app = express();
app.use(express.json());
app.use(cors());

// middleware


const port = process.env.PORT || 5000;
const hostname = "localhost"; 
const uri = process.env.MONGO_ATLAS_URI;
// const uri = "mongodb://127.0.0.1:27017/test-db1";
console.log(uri)
//  db connected 


// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/admin",authAdmin,  admin);
app.use("/api/v1/user", authUser, userData_routes)
//  for chat 


app.use("/api/chat",  chatRoutes);
app.use("/api/message" , messageRoutes);


// middleWares
app.use(errorHandler);
app.use(notFound);

// start arrow function that connect to db and listen the port
const start = async () => {
  try {
    await connectToMongo(uri);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
};
// start the app
start();

//  socket io logic here
const server = app.listen(port, console.log(`Server started on port ${port}`));



const io = require("socket.io")(server, {
  pingTimeout: 120000,
  cors: {
    origin: "http://localhost:3000", //development
    // origin: "https://textalot.herokuapp.com", //deployment
    credentials: true,
  },
});  

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(`Logged in user ${userData.name} joined the created room`);
    socket.emit("connected");
  });
    
  socket.on("join chat", (room) => {    
    socket.join(room); 
    console.log("User Joined the selectedChat Room: " + room);//room-selectedChatId
  });
  
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
 
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
      //.in-- inside user._id exclusive socket room joined-- emit this "message recieved" event ////mern-docs

    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });

});  

