const mongoose = require('mongoose');
require('dotenv').config();
const ConnectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected successfully")
    }
    catch(err){
        console.log("DB connection failed");
        process.exit(1);
    }
}

module.exports = ConnectDB;