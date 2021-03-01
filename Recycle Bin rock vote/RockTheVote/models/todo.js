//const express = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const todoSchema = new Schema ({
    issue: {
        type: String        
    },
    comment: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Todo", todoSchema)
