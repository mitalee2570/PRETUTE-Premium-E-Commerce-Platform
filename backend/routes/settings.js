const express = require('express');
const router = express.Router();
const db = require('../data/db');

// GET settings
router.get('/', (req, res) => {
  const settings = db.read('settings');
  // Hide security sensitive passwords in public response unless authenticated
  const safeSettings = { ...settings };
  delete safeSettings.adminPass;
  delete safeSettings.adminPin;
  res.json(safeSettings);
});

// PUT update settings
router.put('/', (req, res) => {
  const current = db.read('settings');
  const updated = {
    ...current,
    ...req.body
  };

  db.write('settings', updated);
  const safeUpdated = { ...updated };
  delete safeUpdated.adminPass;
  delete safeUpdated.adminPin;
  res.json(safeUpdated);
});

module.exports = router;
