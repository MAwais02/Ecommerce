const User = require("../models/userModels");
const catchasyncError = require("../middleware/catchasyncError");
const ErrorHandler = require("../utils/errorhandler");
const ApiFeatures = require("../utils/APIFeatures");
const SendToken = require("../utils/token");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary")

exports.registerUser = catchasyncError( async (req , res , next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar , {
        folder:"avatars",
        width: 150,
        crop: "scale" ,
    });
    const {name , email , password}  = req.body;

    const user = await User.create({
        name , email , password,
        avatar : {
            public_id :myCloud.public_id,
            url : myCloud.secure_url,
        }
    })

    SendToken(user, 201 , res);
})

exports.LoginUser = catchasyncError(async (req , res , next) => {
    const {email , password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please Enter email and password" , 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password" , 401));
    }

    const isMatched = user.comparePassword(password);
    if(!isMatched){
        return next(new ErrorHandler("Invalid email or password" , 401));
    }

    SendToken(user, 200 , res);
})

exports.Logout = catchasyncError(async (req , res , next)=>{

    res.cookie("token" , null , {
        expires : new Date(Date.now()),
        httpOnly : true,
        path: '/',
    })
    res.status(200).json({
        success : true,
        message : "Logout succesfully",

    })
})
// Forgor password
exports.forgotPassword = catchasyncError(async (req , res, next) => {
    const user = await User.findOne({email : req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found") , 404);
    }
    // Get reset Token
    const ResetToken = user.getresetPasswordToken();

    await user.save({validateBeforeSave : false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${ResetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

    try{
        await sendEmail ({
            email : user.email,
            subject : `Dipaid Password Recovery`,
            message : message
        })
        res.status(200).json({
            success : true,
            message : `Email sent to user ${user.email} Succesfully`
        })
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordexpire = undefined;

        await user.save({validateBeforeSave : false});

        return next(new ErrorHandler(error.message) , 500);
    }
});


// reset password
exports.resetPassword = catchasyncError(async (req , res , next) => {


    // crating token hashed
    console.log(req.params.resetToken);
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");


    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordexpire : { $gt: Date.now()}
    });
    if(!user){
        return next(new ErrorHandler("Reset password token is invalid / or has been expired") , 400);
    }

    if(req.body.password != req.body.confirmpassword){
        return next(new ErrorHandler("Password does not match") , 400);
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordexpire = undefined;

    await user.save();
    SendToken(user , 200 , res);

})

exports.getUserDetails = catchasyncError(async (req , res , next) => {

    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success : true ,
        user,
    })
})

exports.UpdatePassword = catchasyncError(async (req , res , next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isMatched = user.comparePassword(req.body.oldpassword);
    if(!isMatched){
        return next(new ErrorHandler("Old password is incorrect" , 401));
    }
    if(req.body.newpassword != req.body.confirmpassword){
        return next(new ErrorHandler("Password does not match" , 401));
    }

    user.password = req.body.newpassword;

    await user.save();
    SendToken(user , 200 , res);
})
// Update user profile

exports.UpdateProfile = catchasyncError(async (req , res , next) => {
    const newUserData = {
        name : req.body.name,
        email : req.body.email,
    }
    // we will add clodniary later


    const user = await User.findByIdAndUpdate(req.user.id , newUserData , {
        new : true,
        runValidators: true,
        useFindAndModify : true,
    })

    res.status(200).json({
        success : true,

    })
    SendToken(user , 200 , res);
})

// get all users ----
exports.getAllUsers = catchasyncError(async(req, res , next)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
})

exports.getsingleuser = catchasyncError(async(req, res , next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User with id : ${req.params.id} does not exist` , 401));
    }
    res.status(200).json({
        success: true,
        user,
    })
})

// update user role ------admin
exports.UpdateUserRole = catchasyncError(async (req , res , next) => {
    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.user.id , newUserData , {
        new : true,
        runValidators: true,
        useFindAndModify : true,
    })
    if(!user){
        res.json({
            success : false,
        })
    }
    res.status(200).json({
        success : true,

    })

})

// update user role-----admin
exports.DeleteUser = catchasyncError(async (req , res , next) => {

    // we will add clodniary later
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User does not exist") , 200);
    }

    await User.deleteOne({_id: req.params.id});
    res.status(200).json({
        success : true,

    })
})
