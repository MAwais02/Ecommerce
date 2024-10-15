const express = require("express");
const cookieparser = require("cookie-parser");
const ErrorMiddleWare = require("./middleware/error")
const order = require("./routes/orderroute")
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent with the request
}));

app.use(express.json());
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended: true})) ;
app.use(fileupload());
//Route imports

const product = require("./routes/productroute");
const user = require("./routes/userroute");


app.use("/api/v1" , product);
app.use("/api/v1" , user);
app.use("/api/v1" , order);
app.use(ErrorMiddleWare);


module.exports = app;   