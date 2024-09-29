const moongoose = require("mongoose");

const connectDatabase = ()=>{
    moongoose.connect(process.env.DB_MONGO_URL ,
    ).then((data) =>{
        console.log(`Connected mongodb with ${data.connection.host}`);
    }).catch(()=>{
        console.log("Error in mongoDB");
    })
}

module.exports = connectDatabase;