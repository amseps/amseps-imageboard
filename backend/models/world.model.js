const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const worldShema = new Schema({
    thread_number:{
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: Infinity
    }
},{
    timestamps: true
});

const World = mongoose.model('World', worldShema);

module.exports = World;