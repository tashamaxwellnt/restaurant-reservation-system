const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table.controller');
const authMiddleware = require('../middleware/auth.middleware')

router.post('/new', authMiddleware, tableController.createTable);
router.get('/:id', tableController.getTableById);
router.get('/res/:restaurantId', tableController.getTablesByRestaurant);
router.put('/update/:id', authMiddleware, tableController.updateTable);
router.delete('del/:id', authMiddleware, tableController.deleteTable);

module.exports = router;
