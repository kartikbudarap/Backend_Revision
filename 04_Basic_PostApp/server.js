const express = require('express')
const app = require('./src/app')
const connectDB = require('./src/db/db')

require('dotenv').config();
const PORT = process.env.PORT

connectDB();

app.listen(PORT,()=>{
    console.log(`App is listening at PORT ${PORT}`)
})