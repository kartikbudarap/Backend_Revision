const express = require('express');
const noteModel = require('./models/note.model');
const { model } = require('mongoose');

const app = express(); // instance of server

// Middleware to parse JSON
app.use(express.json());

// POST request
app.post("/notes", async (req, res) => {
    try {
        const data = req.body;

        await noteModel.create({
            title: data.title,
            description: data.description
        });

        res.status(200).json({
            message: "Post created successfully"
        });

    } 
    catch (error) {
        res.status(500).json({
            message: "Error creating post",
            error: error.message
        });
    }
});

// GET request
app.get("/notes", async (req, res) => {
    try {
        const notes = await noteModel.find(); // find() always returns an array
        res.status(200).json({
            message: "Notes fetched successfully",
            notes: notes
        });
    } 
    catch (error) {
        res.status(500).json({
            message: "Error fetching notes",
            error: error.message
        });
    }
});

//DELETE request
app.delete("/notes/:id",async(req,res)=>{
    try{
        const noteId = req.params.id;
        const deleteNode = await noteModel.findByIdAndDelete(noteId);
        if(!deleteNode){
            return res.status(404).json({
                message:"Note not found"
            })
        }
        res.status(200).json({
            message: "Note deleted successfully",
            note: deletedNote
        });
    }
    catch(error){
        res.status(500).json({
            message: "Error deleting note",
            error: error.message
        })
    }
})

//PATCH request
app.patch("/notes/:id", async (req, res) => {
    try {
        const noteId = req.params.id;
        const updateData = req.body;

        const updatedData = await noteModel.findByIdAndUpdate(
            noteId,
            { $set: updateData },
            { new: true }
        );

        if (!updatedData) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Updated successfully",
            updatedNote: updatedData
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating note",
            error: error.message
        });
    }
});

module.exports = app;