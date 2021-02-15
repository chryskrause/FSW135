const express = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    issue: {
        type: String        
    },
    comment: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)