const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary")
// handling uncaught exceptions

process.on("uncaughtException" , (err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Process shutting down");
    process.exit(1);
})

dotenv.config({path : "backend/config/config.env"});

// database connection
const conenctDb = require("./config/database");

conenctDb();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
app.listen(process.env.PORT , ()=>{
    console.log(`App is running in  http://localhost:${process.env.PORT}`);
})
