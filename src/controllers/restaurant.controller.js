const Restaurant = require('../models/Restaurant');

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('owner', 'username'); 
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('owner', 'username');
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant({
      ...req.body,
      owner: req.owner._id,
    });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    console.log(req.owner)
    const restaurant = await Restaurant.findById(req.params.id);
    console.log(restaurant.owner)
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });

    if (restaurant.owner.toString() !== req.owner._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    Object.assign(restaurant, req.body);
    await restaurant.save();
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });

    if (restaurant.owner.toString() !== req.owner._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await restaurant.remove();
    res.json({ message: 'Restaurant deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
