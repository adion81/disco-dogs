const mongoose = require('mongoose');

const DanceMove  = new mongoose.Schema({
    move:{
        type:String,
        minlength:[4,"Not descriptive enough"],
        required:true
    },
    skillLevel:{
        type:Number,
        required:true,
        min:1,
        max:10
    }
},{timestamps:true})

module.exports = DanceMove;