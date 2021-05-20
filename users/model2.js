const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema2 = new Schema({
    class: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: new Date()
    }
})

const UserModel2 = mongoose.model('User', userSchema2)

module.exports = UserModel2