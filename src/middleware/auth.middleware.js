const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const owner = await Owner.findById(decoded.ownerId);

    if (!owner) return res.status(401).json({ error: 'Owner not found' });

    req.owner = owner; 
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid or expired' });
  }
};

module.exports = authMiddleware;
