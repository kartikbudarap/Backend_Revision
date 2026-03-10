//app.js ka kaamm server ko create krne ka hota hai
const express = require('express');
const app = express();
app.use(express.json())

const notes = [];

app.post('/notes',(req,res)=>{
    notes.push(req.body)
    //if we need to access data from req.body we need to use a middle ware
    res.status(200).json({
        message:"Note created",
        notes:notes
    })
})

app.get('/notes',(req,res)=>{
    res.status(200).json({
        message:"ntoes fetched successfully",
        notes:notes
    })
})

app.delete('/delete/:index',(req,res)=>{
    const index =  req.params.index;
    delete notes[index];
    res.status(200).json({
        message:"Deleted successfully"
    })
})

module.exports = app