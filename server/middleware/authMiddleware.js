const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log("token is ", token);
      

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("decoded is",decoded);  
      
      req.user = await User.findById(decoded.userid).select("-password");
      // console.log("req.use is ",req.user);
      

      next();

    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };