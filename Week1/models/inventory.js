const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inventorySchema = new Schema({
    item: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        max: 5000
    },
    description: {
        type: String,
        required: true,
        maxlength: 350
    },
    datePosted: Date
})

module.exports = mongoose.model("Inventory", inventorySchema)