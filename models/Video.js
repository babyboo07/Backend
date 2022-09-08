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
        required: true,
        type: Number,
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
    },
    createdBy: {
        userId: mongoose.SchemaTypes.ObjectId,
        imageUrl: String,
        username: String,
    },

},  {timestamps: true})

module.exports =mongoose.model('Video', videoSchema);