const mongoose = require('mongoose');

const connectToDb = (URI)=>{
    try {
        mongoose.connect(URI)
        console.log("DB :)")
    } catch (error) {
        console.log("DB :(")
        console.log(error)
    }
}

module.exports = {connectToDb}