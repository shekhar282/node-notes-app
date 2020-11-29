const Note = require('../models/noteModel');
const errorHandler = require('../errorHandler')
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'secret', {
        expiresIn: maxAge
    });
};

const create = async (req, res, next) => {
    const { title, body } = req.body;
    try {
        const note = await Note.create({ title, body, user: req.user });
        res.status(201).json({ note: note._id });
    } catch (error) {
        // const err = errorHandler(error)
        res.status(401).json({ error })
    }
}

const getallnotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ user: req.user }).select('_id title body');
        res.render('allnotes',{notes});
        // res.send({notes});
    } catch (error) {
        res.status(401).json({ error })
    }
}

const update = async (req, res, next) => {
    try {
        let note = await Note.findOneAndUpdate( {_id:req.params.id,user:req.user}, req.body,{new: true});
        console.log(note);
        res.send({note});
        // res.redirect('/notes')
    } catch (error) {
        res.status(401).json({ error })
    }
}

const deletenote = async (req, res, next) => {
    try {
        let note = await Note.deleteOne({_id:req.params.id,user:req.user});
        console.log(note);
        // res.redire({note});
        res.redirect('/notes')
    } catch (error) {
        res.status(401).json({ error })
    }
}




module.exports = {
    create,
    getallnotes,
    update,
    deletenote
}