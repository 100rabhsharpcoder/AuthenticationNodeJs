const express = require('express');
const app =  express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser')


const db = require('./config/mongoose');

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());
app.use('/', require('./routes'))








app.listen(port, (err)=>{
    if(err){
        console.log(`error in firing server`);
    }
    console.log(`server is Running on port ${port}`);
})