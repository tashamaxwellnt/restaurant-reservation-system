const mongoose  = require("mongoose")
const TableSchema = require('./Table')

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for the restaurant']
    },
    location: {
        type: String
    },
    owner: Object

})

module.exports = mongoose.model('Restaurant', RestaurantSchema)