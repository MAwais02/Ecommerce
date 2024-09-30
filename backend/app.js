const express = require("express");
const cookieparser = require("cookie-parser");
const ErrorMiddleWare = require("./middleware/error")
const order = require("./routes/orderroute")
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use(cookieparser()); 
//Route imports

const product = require("./routes/productroute");
const user = require("./routes/userroute");


app.use("/api/v1" , product);
app.use("/api/v1" , user);
app.use("/api/v1" , order);
app.use(ErrorMiddleWare);


module.exports = app;   