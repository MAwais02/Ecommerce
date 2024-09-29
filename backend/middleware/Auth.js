const ErrorHandler = require("../utils/errorhandler");
const catchasyncError = require("./catchasyncError");
const user = require("../models/userModels");
const jwt = require("jsonwebtoken");
exports.isAuthUser = catchasyncError( async (req , res , next)=>{

    const {token} = req.cookies; 

    if(!token){
        return next(new ErrorHandler("Please Login to access") , 401)
    }

    const decodedtoken = jwt.verify(token , process.env.JWT_SECRET);

    req.user = await user.findById(decodedtoken.id);

    next();
})
exports.AuthRoles = (...roles) => {
    return (req ,res , next)=>{
        if(!roles.includes(req.user.role))
        {
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`));
        }

        next();
    }
}