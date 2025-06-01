const Reservation = require('../models/Reservation');
const Table = require('../models/Table');

exports.createReservation = async (req, res) => {
  try {
    const { tableId, date, time, guests } = req.body;

    const table = await Table.findById(tableId);
    if (!table) return res.status(404).json({ error: 'Table not found' });

    if (guests > table.capacity) {
      return res.status(400).json({ error: 'Guest count exceeds table capacity' });
    }

    if (table.status === 'reserved') {
      return res.status(400).json({ error: 'Table is currently occupied' });
    }

    const conflict = await Reservation.findOne({
      tableId,
      date,
      time,
      status: 'active',
    });

    if (conflict) {
      return res.status(400).json({ error: 'Table already reserved at this time' });
    }

    const reservation = await Reservation.create({...req.body});

    table.status = 'reserved';
    await table.save();

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);
    if (!reservation || reservation.status === 'cancelled') {
      return res.status(404).json({ error: 'Reservation not found or already cancelled' });
    }

    reservation.status = 'cancelled';
    await reservation.save();

    const stillReserved = await Reservation.findOne({
      tableId: reservation.tableId,
      date: reservation.date,
      time: reservation.time,
      status: 'active',
    });

    if (!stillReserved) {
      const table = await Table.findById(reservation.tableId);
      if (table) {
        table.status = 'available';
        await table.save();
      }
    }

    res.json({ message: 'Reservation cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReservationsByRestaurant = async (req, res) => {
  try {
    const reservations = await Reservation.find({ restaurantId: req.params.restaurantId })
      .populate('tableId', 'name seats')
      .sort({ date: 1, time: 1 });

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveReservationsByRestaurant = async (req, res) => {
    try {
      const { restaurantId } = req.params;
  
      const reservations = await Reservation.find({
        restaurantId,
        status: 'active',
      })
        .populate('tableId', 'name seats')
        .sort({ date: 1, time: 1 });
  
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
