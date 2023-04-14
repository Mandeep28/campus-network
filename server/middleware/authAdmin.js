const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const customError = require("../error/customError");
const User = require("../models/User");
const fetchUser =  async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
     throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }
      let data =  jwt.verify(token, process.env.JWT_SECRET);
      // console.log(data);
      const id  = data.userid;
        const findAdmin = await User.findOne({_id: id, role: "admin"});
        if(!findAdmin) {
            throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
        }
        console.log(findAdmin);
        

      req.user = findAdmin;
      next();
  };

  module.exports = fetchUser;