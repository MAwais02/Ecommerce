const ErrorHandler = require("../utils/errorhandler")

module.exports = (err , req , res , next) =>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal system error";



    //Moongose duplicate key error


    if(err.code == 11000)
    {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message , 400);
        
    }

    //Json web token error
    if(err.code == "JsonWebTokenError")
    {
        const message = `JSOn web token is invalid try again`;
        err = new ErrorHandler(message , 400);
        
    }
    //JWT Expire error
    if(err.code == "JsonWebExpiredError")
    {
        const message = `JSOn web token is Expired try again`;
        err = new ErrorHandler(message , 400);
        
    }
    // Wring MongiDB ID error

    if(err.name === "CastError")
    {
        const message = `Resource not found Invalid ${err.path}`
        err = new ErrorHandler(message , 400);
    }
    res.status(err.statusCode).json({
        success : false,
        message : err.message ,
    })
}