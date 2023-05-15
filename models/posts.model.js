const mongoose = require('mongoose');

const postModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    content :{
        type: String
    },
    picture : {
        type: String
    },
    dateCreated : {
        type: Date,
        default: Date.now
    },
    like: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }]

})

module.exports = mongoose.model('PostModel', postModel);