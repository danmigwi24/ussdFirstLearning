const bodyParser = require('body-parser')
const express = require("express");
const ussdRouter = require("./ussd/buy/ussd.route");
const userRouter=require('./ussd/user/user.router');
require("dotenv").config();

const app = express();
const PORT = process.env.APP_PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.use("*", ussdRouter);
app.use("*", userRouter);


app.listen(PORT, () => {
    console.log("Server running on port : ", PORT);
});



