const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
})

const postModel = mongoose.model("post",postSchema)
module.exports = postModel