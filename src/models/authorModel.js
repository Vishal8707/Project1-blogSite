const mongoose = require("mongoose")

const AuthorSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email:{
        type: String,
        required: true,
        unique: true,
        },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("Author", AuthorSchema)

// { fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }