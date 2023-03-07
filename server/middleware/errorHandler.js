const { customError } = require("../error/customError")

const errorHandler = (err, req, res, next)=>{

    console.log(err);
    res.status(500).json({status: false, msg: err.message})
}

module.exports = errorHandler;