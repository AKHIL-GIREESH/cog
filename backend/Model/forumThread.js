const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ThreadSchema = {
    name:{
        type:String,
        required:true,
    },
    modification:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    },
    upVotes:{
        type:Number,
        default:0
    },
    downVotes:{
        type:Number,
        default:0
    },
    comments: [CommentSchema]

}

const Thread = mongoose.model("Thread", ThreadSchema);
module.exports = Thread;