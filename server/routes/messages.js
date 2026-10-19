const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Create
router.post('/', async (req, res) => {
  const msg = await Message.create(req.body);
  res.json(msg);
});

// Read 
router.get('/', async (req, res) => {
  const filter = req.query.email ? { email: req.query.email } : {};
  const msgs = await Message.find(filter).sort({ createdAt: -1 });
  res.json(msgs);
});

// Update
router.put('/:id', async (req, res) => {
  await Message.findByIdAndUpdate(req.params.id, req.body);
  res.send('Updated');
});

// Delete
router.delete('/:id', async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.send('Deleted');
});

module.exports = router;