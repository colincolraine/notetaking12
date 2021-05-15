const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    accessToken:{
        type: String
    },
    createDate: {
        type: Date,
        required: true,
        default: new Date()
    }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel