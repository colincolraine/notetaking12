const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema2 = new Schema({
    class1: {
        type: String,
        required: true
    },
    class2: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: new Date()
    }
})

const UserModel2 = mongoose.model('Class', userSchema2)

module.exports = UserModel2