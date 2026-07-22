const express = require('express');
const router = express.Router();
const Note = require("../models/notes");
const authmiddleware = require('../middleware');

// Create a new note
router.post('/',authmiddleware, async(req , res) => {
    const {title,body} = req.body;
    console.log("useremail",req.user.id)

    const note = await Note.create({
        title,body,userid:req.user.id
    });
    res.status(201).json(note);
});

// Get all notes
router.get('/',authmiddleware, async (req, res) => {
    const userid = req.user.id
    const notes = await Note.find({userid});
    res.json(notes);
});

// Get a single note by ID
router.get('/:id', async (req, res) =>{
    const note = await Note.findById(req.params.id);
    if (!note){
        return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
});

// Update Note
router.put('/:id' , async (req, res) => {
    const note = await Note.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true });
        res.json(note);
    });

// Delete Note
router.delete('/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Note deleted' });
});

// Export the router
module.exports = router;