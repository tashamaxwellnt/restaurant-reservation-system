const router = require('express').Router()
const restaurantController = require('../controllers/restaurant.controller');
const authMiddleware = require('../middleware/auth.middleware')

router.get('/', restaurantController.getAllRestaurants)
router.get('/:id', restaurantController.getRestaurantById)
router.post('/new', authMiddleware, restaurantController.createRestaurant);
router.put('/update/:id', authMiddleware, restaurantController.updateRestaurant);
router.delete('/del/:id', authMiddleware, restaurantController.deleteRestaurant);

module.exports = router