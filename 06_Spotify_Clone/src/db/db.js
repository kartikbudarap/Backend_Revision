const mongoose = require('mongoose');

require('dotenv').config();
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected succesfully")
    }
    catch(err){
        console.log(err);
        console.log("DB connection failed")
    }
}

module.exports = connectDB;