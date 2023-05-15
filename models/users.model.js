const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        uppercase: true
      },
      email: {
        type: String,
        unique: true,
        uppercase: true,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      profile: {
        type: String
      },
      phoneNumber: {
        type: String
      },
      fullName: {
        type: String,
        required: true,
      }
})



module.exports = mongoose.model('UserModel', userModel);