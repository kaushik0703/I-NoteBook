const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notees = require('../models/Notes'); //import user from models
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Get all the notes using: GET "/api/notes/fetchallnotes" endpoint.
//login required

try {

    router.get('/fetchallnotes', fetchuser, async (req, res)=> {
        const notes = await Notees.find({user : req.user.id});
        res.json(notes);
    })
    
} catch (error) {
    console.log(error.message); //for console
    res.status(500).send("Internal server error") //to send message
}


// ROUTE 2 : Create notes using: POST "/api/notes/addnotes" endpoint.
//login required

router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid Title').isLength({min: 3}),
    body('description', 'Description must be at least 5 characters').isLength({min: 5})
], async (req, res)=> {
    
    const errors = validationResult(req); //imported using express validator
    // if there are errors, return Bad request and errors
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array()})
    }

    try {

        const {title, description, tag} = req.body;
        const notes = new Notees({
            user: req.user.id, title, description, tag  //it means we are putting user as req.user.id
        })
        
        const savedNote = await notes.save();
    
        res.json(savedNote);
        
    } catch (error) {
        console.log(error.message); //for console
        res.status(500).send("Internal server error") //to send message
    }
})


// ROUTE 3 : Update notes using: PUT "/api/notes/updatenotes" endpoint.
//login required (so that other user can't update notes)

// put because we are updating
router.put('/updatenotes/:id', fetchuser, async (req, res)=> {

    try {

        const {title, description, tag} = req.body;

        // Create a new note object
        const newNote = {};
        if(title) {newNote.title = title}
        if(description) {newNote.description = description}
        if(tag) {newNote.tag = tag}
        
        // Find the note to be updated and update it
        let note = await Notees.findById(req.params.id);

        if(!note) {
            return res.status(400).send("Notes not found");
        }
    
        //Allow updation only if user owns this note
        if(note.user.toString() !== req.user.id) {
            return res.status(400).send("Can't access");
        }
        
        note = await Notees.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        
        res.json(note);

    } catch (error) {
        console.log(error); //for console
        res.status(500).send("Internal server error") //to send message
    }

})



// ROUTE 4 : Delete notes using: DELETE "/api/notes/deletenotes" endpoint.
//login required (so that other user can't delete notes)

// put because we are updating
router.delete('/deletenotes/:id', fetchuser, async (req, res)=> {

    try {
        
        // Find the note to be deleted and update it
        let note = await Notees.findById(req.params.id);

        if(!note) {
            return res.status(400).send("Notes not found");
        }
    
        //Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id) {
            return res.status(400).send("Can't access");
        }
        
        note = await Notees.findByIdAndDelete(req.params.id);
        
        res.json({"Success" : "Following Note has been deleted", note : note});

    } catch (error) {
        console.log(error); //for console
        res.status(500).send("Internal server error") //to send message
    }

})

module.exports = router;