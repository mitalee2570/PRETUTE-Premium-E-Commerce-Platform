const express = require('express');
const router = express.Router();
const db = require('../data/db');

// GET all inquiries/messages
router.get('/', (req, res) => {
  const messages = db.read('messages');
  res.json(messages);
});

// POST new inquiry from contact form
router.post('/', (req, res) => {
  const messages = db.read('messages');
  const newMsg = {
    id: `msg-${Date.now()}`,
    date: new Date().toISOString(),
    name: req.body.name || 'Anonymous',
    email: req.body.email || '',
    subject: req.body.subject || 'General Inquiry',
    message: req.body.message || '',
    read: false
  };

  messages.unshift(newMsg);
  db.write('messages', messages);
  res.status(201).json({ success: true, message: newMsg });
});

// PATCH mark as read / unread
router.patch('/:id/read', (req, res) => {
  const messages = db.read('messages');
  const msg = messages.find(m => m.id === req.params.id);
  if (!msg) {
    return res.status(404).json({ message: 'Message not found' });
  }

  msg.read = req.body.read !== undefined ? req.body.read : true;
  db.write('messages', messages);
  res.json(msg);
});

// DELETE message
router.delete('/:id', (req, res) => {
  let messages = db.read('messages');
  messages = messages.filter(m => m.id !== req.params.id);
  db.write('messages', messages);
  res.json({ success: true });
});

module.exports = router;
