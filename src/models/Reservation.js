const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true,
  },
  reserverName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    // required: true,
  },
  date: {
    type: String, // Format: 'YYYY-MM-DD'
    required: true,
  },
  time: {
    type: String, // Format: 'HH:mm'
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled'],
    default: 'active',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reservation', reservationSchema);
