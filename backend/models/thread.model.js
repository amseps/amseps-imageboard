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
    thread_image:{ //https://www.positronx.io/react-file-upload-tutorial-with-node-express-and-multer/ 
        type: String, //the location of the image :()
        required: false,
        unique: false,
        trim: true, 
        min: 1,
        max: 128
    },
    thread_image_type:{
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    thread_image_filename:{
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    thread_votes:{ //contains individual votes
        red: Number, 
        sparkle: Number,
        clover: Number,
        fire: Number,
        melon: Number
    },
    number_of_replies:{
        type: Number,
        unique: false,
        min: 0,
        max: Infinity
    },
    archived:{
        type: Boolean,
        required: true
    },

},{
    timestamps: true
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;