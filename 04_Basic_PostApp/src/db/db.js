const mongoose = require('mongoose')
require('dotenv').config();
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connection successful")
    }
    catch(err){
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB