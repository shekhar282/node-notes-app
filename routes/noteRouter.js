const express = require('express');
const router = express.Router();
const noteController = require('../controller/noteController');
const {requireAuth} = require('../middleware/authMiddleware');
const Note = require('../models/noteModel');


router.get('/notes',requireAuth,noteController.getallnotes)
router.get('/notes/delete/:id',requireAuth,noteController.deletenote)
router.get('/notes/addnote',requireAuth,(req,res)=>{
    res.render('addnote');
})

router.get('/notes/updatenote/:id',requireAuth,async (req,res)=>{
    const note = await Note.findOne({ _id: req.params.id });
    console.log(note);
    res.render('updatenote',{note});
})


//api
router.post('/notes/addnote',requireAuth,noteController.create);
router.put('/notes/updatenote/:id', requireAuth, noteController.update);




module.exports = router;