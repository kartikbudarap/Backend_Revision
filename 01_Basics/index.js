const express = require('express');
require('dotenv').config() 
const app = express();  //server instance ko create kar rhe hai

const PORT = process.env.PORT

app.get('/',(req,res)=>{
    res.send("Listening at port 3000")
})

app.get('/login',(req,res)=>{
    res.send("Please login to continue")
})

app.listen(PORT,()=>{   //server ko iss port pr listen 
    console.log("hello world")
})