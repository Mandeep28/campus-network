const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const customError = require("../error/customError");
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const fetchUser =  async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
     throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }
      let data =  jwt.verify(token, process.env.JWT_SECRET);
      // console.log(data);
      const id  = data.userid;
        const findUser = await User.findOne({_id: id});
        if(!findUser) {
            throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
        }
        const findTeacher = await Teacher.findOne({email: findUser.email});
        if(!findTeacher) {
            throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
        }
      req.user = findTeacher;
      next();
  };

  module.exports = fetchUser;