const mongoose = require("mongoose");

const Productschema = new mongoose.Schema({
    name:{
        type: String,
        required : [true , "PLease enter product name"]
    },
    description :{
        type : String,
        required : [true , "Please enter product Description"]
    },
    price :{
        type : Number,
        required : [true , "Please enter Price"],
        maxLength :[8 , "Price is max 6 figure"],
    },
    ratings : {
        type:Number,
        default : 0,

    },
    images : [
        {
            public_id : {
                type : String,
                required : true,
            },
            url : {
                type : String,
                required : true,
            }
        }
    ],
    category : {
        type : String ,
        required : [true , "Enter product catageory"],
    },
    stock : {
        type : Number,
        default : 1,
        required : [true , "Enter product stock"],
        maxLength : [4 , "Stock cant exceed more than that"],
    },
    numOfreviews : {
        type : Number,
        default : 0,
    },
    reviews : [
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref : "User",
                required : true,
            },
            name : {
                type : String,
                required : true,
            },
            rating : {
                type : Number,
                required : true,
            },
            Comment : {
                type : String,
                required : true,
            }
        }
    ],
    CreatedAt : {
        type : Date,
        default: Date.now(),
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
    },
})

module.exports = mongoose.model("Product" , Productschema)