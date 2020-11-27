const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const threadSchema = new Schema({
    body_text:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1,
        maxlength: 2047,
    },
    thread_title:{
        type: String,
        required: false,
        unique: false,
        trim: true,
        minlength: 0,
        maxlength: 64
    },
    name:{
        type: String, 
        required: false,
        unique: false,
        trim: true,
        minlength: 1,
        maxlength: 32
    },
    thread_number:{
        type: Number,
        required: true,
        unique: true,
        trim: false,
        min: 1,
        max: Infinity
    },
    post_date:{
        type: Date,
        required: true,
        unique: false,
    },
    thread_image:{
        type: String, //the location of the image :()
        required: false,
        unique: false,
        trim: false, 
        min: 4,
        max: 128
    },
    thread_votes:{ //contains individual votes
        red: Number, 
        sparkle: Number,
        clover: Number,
        fire: Number,
        melon: Number
    }
},{
    timestamps: true
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;