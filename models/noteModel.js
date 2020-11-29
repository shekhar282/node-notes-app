const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Note title required']
    },
    body:{
        type:String,
        required:[true,'task body required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})


const Note = mongoose.model('note', noteSchema);

module.exports = Note;