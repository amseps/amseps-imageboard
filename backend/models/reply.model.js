const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
    body_text:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1,
        maxlength: 2047,
    },
    name:{
        type: String, 
        required: false,
        unique: false,
        trim: true,
        minlength: 1,
        maxlength: 32
    },
    local_reply_number:{
        type: Number,
        required: true,
        unique: false,
        min:1, 
        max: Infinity
    },
    reply_number:{
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: Infinity
    },
    parent_thread:{
        type: String,
        required: true,
        unique: false
    },
    post_date:{
        type: Date,
        required: true,
        unique: false,
    },
    reply_image:{
        type: String, //the location of the image :()
        required: false,
        unique: false,
        trim: false, 
        min: 4,
        max: 128
    },
    has_image:{
        type: Boolean,
        required: true,
        default: false,
    },
    reply_image_type:{
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    reply_image_filename:{
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    reply_thumb_filename:{ // sometimes thumbnail is slightly different name bc of Date.now();
        type: String,
        required: false,
        unique: false,
        trim: false,
    },
    reply_votes:{ //contains individual votes
        red: Number, 
        sparkle: Number,
        clover: Number,
        fire: Number,
        melon: Number
    },
},{
    timestamps: true
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;