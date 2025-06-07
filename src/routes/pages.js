const express = require('express');
const router = express.Router();

// Landing page
router.get('/', (req, res) => {
  res.render('landing');
});

// Restaurant registration form
router.get('/owner/register', (req, res) => {
  res.render('register-restaurant');
});

router.get('/signup', (req, res) => {
    res.render('signup')
})

// Reservation form
router.get('/reservation/new', (req, res) => {
  res.render('new-reservation');
});

// Add more pages here as needed
// e.g., /owner/dashboard, /reservation/confirmation, etc.

module.exports = router;
