const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength:6,
    },
    videoID:{
        type: String,
        required: true,
    },
    CateID:{
        type: String,
    },
    channelTitle:{
        type: String,
    },
    publishedAt:{
        type: Date
    },
    viewCount:{
        type: Number,
    },
    likeCount:{
        type: Number,
    }

},  {timestamps: true})

module.exports =mongoose.model('Video', videoSchema);