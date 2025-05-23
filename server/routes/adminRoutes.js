const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: 'Admin not found' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Generate token (optional)
  const token = jwt.sign({ id: admin._id }, 'yourSecretKey', { expiresIn: '1h' });

  res.json({
    success: true,
    message: 'Admin logged in successfully',
    token,
    admin: {
      id: admin._id,
      email: admin.email,
      role: admin.role
    }
  });
});

module.exports = router;
