const Table = require('../models/Table');
const Restaurant = require('../models/Restaurant');

exports.getTablesByRestaurant = async (req, res) => {
  try {
    const tables = await Table.find({ restaurant: req.params.restaurantId });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ error: 'Table not found' });
    res.json(table);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTable = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.body.restaurant);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });

    if (restaurant.owner.toString() !== req.owner._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const table = new Table(req.body);
    await table.save();

    res.status(201).json(table);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    console.log(table)
    if (!table) return res.status(404).json({ error: 'Table not found' });

    const restaurant = await Restaurant.findById(table.restaurant);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });

    if (restaurant.owner.toString() !== req.owner._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    Object.assign(table, req.body);
    await table.save();
    res.json(table);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ error: 'Table not found' });

    const restaurant = await Restaurant.findById(table.restaurant);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });

    if (restaurant.owner.toString() !== req.owner._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await table.remove();
    res.json({ message: 'Table deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
