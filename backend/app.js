const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('./database/database');
const userRouter = require('./route/user');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use( express.json() );
app.use(cookieParser());


app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-CSRF-TOKEN');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use('/user', userRouter);



app.listen(process.env.PORT, (req, res)=>{
    console.log(`server is listening at port ${process.env.PORT}`)
})