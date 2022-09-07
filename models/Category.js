const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    CateID:{
        type:Number,
    },
    CateName: {
        type: String,
        required: true,
        unique: true
    }

},  {timestamps: true})

module.exports =mongoose.model('Category', categorySchema);