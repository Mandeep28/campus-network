var jwt = require("jsonwebtoken");
require("dotenv").config();

var JWT_SECRET = process.env.JWT_SECRET_STRING;



const fetchUser = (req, res, next) => {

    const token = req.header("auth-token");
  
    if (!token) {
      res.status(401).send({ error: "Please authenticate using a valid token" });
    }
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
      next();
  };

  module.exports = fetchUser;