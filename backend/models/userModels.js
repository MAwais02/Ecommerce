const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema(
    {
        name : {
            type:String ,
            required : [true , "Please Enter Your name"],
            maxLength : [30 , "Name must be less the 30 characters"],
            minLength : [3 , "Name must be three character long"],
        },
        email : {
            type:String ,
            required : [true , "Please Enter Your Email"],
            unique : true ,
            validate : [validator.isEmail , "Please Enter valid email"]
        },
        password : {
            type : String , 
            required : [true , "Please Enter Your Password"],
            minLength : [6 , "password should be 8 characters long"],
            select : false, // give all information expect password
        },
        avatar  : {
            public_id : {
                type : String,
                required : true,
            },
            url : {
                type : String,
                required : true,
            }
        },
        role : {
            type : String ,
            default : "user",
        },
        resetPasswordToken:String,
        resetPasswordexpire:String,
    }
)
userSchema.pre("save" , async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password , 10)
})

// JWT TOKEN 

userSchema.methods.getJWTToken = function () {
    return jwt.sign({id : this._id} , process.env.JWT_SECRET ,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    )
}
// compare password 

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

// Generating password reset Token
userSchema.methods.getresetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hasdhing and adding user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordexpire = Date.now() + 15 * 60 * 1000;


    return resetToken
}
module.exports = mongoose.model("User" , userSchema);