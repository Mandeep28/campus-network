// error class
class customError extends Error {
    constructor (message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// make obj of "customError class" 
const customErrorHandler = (msg, statusCode)=>{
    return new customError(msg, statusCode);
}

module.exports = {customError, customErrorHandler};