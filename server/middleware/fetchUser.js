const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const customError = require("../error/customError");
const fetchUser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
     throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data;
      next();
  };

  module.exports = fetchUser;