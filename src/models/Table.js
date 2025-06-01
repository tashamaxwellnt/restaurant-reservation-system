const mongoose  = require("mongoose")

const TableSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant', 
        required: true 
    },
    capacity: Number,              
    status: { 
        type: String, 
        enum: ['available', 'reserved'], 
        default: 'available' 
    }
});

module.exports = mongoose.model('Table', TableSchema)