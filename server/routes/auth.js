const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (await User.findOne({ email }))
    return res.status(400).json({ error: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  res.json({ name: user.name, email: user.email, role: user.role });
});

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email, role });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ error: 'Invalid email or password' });

  res.json({ name: user.name, email: user.email, role: user.role });
});

module.exports = router;