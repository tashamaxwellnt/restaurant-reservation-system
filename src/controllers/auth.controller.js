const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');

const JWT_EXPIRATION = process.env.JWT_EXPIRATION

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingOwner = await Owner.findOne({ username });
    if (existingOwner) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newOwner = new Owner({ username, password: hashedPassword });
    await newOwner.save();

    res.status(201).json({ message: 'Owner registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const owner = await Owner.findOne({ username });
    if (!owner) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, owner.password);
    console.log(isMatch)
    if (!isMatch) {
        console.log('bcrypt error')
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { ownerId: owner._id, username: owner.username },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
};
