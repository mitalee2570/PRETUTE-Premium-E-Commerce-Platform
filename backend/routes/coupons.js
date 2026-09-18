const express = require('express');
const router = express.Router();
const db = require('../data/db');

// GET all coupons
router.get('/', (req, res) => {
  const coupons = db.read('coupons');
  res.json(coupons);
});

// POST validate coupon code
router.post('/validate', (req, res) => {
  const { code, cartTotal, categoryItems } = req.body;
  if (!code) {
    return res.status(400).json({ valid: false, message: 'Coupon code required' });
  }

  const coupons = db.read('coupons');
  const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());

  if (!found) {
    return res.status(404).json({ valid: false, message: 'Invalid promo coupon code.' });
  }

  if (found.status !== 'active' || !found.active) {
    return res.status(400).json({ valid: false, message: 'This coupon is no longer active.' });
  }

  if (found.expiryDate && new Date(found.expiryDate) < new Date()) {
    return res.status(400).json({ valid: false, message: 'This coupon code has expired.' });
  }

  if (found.usageLimit && (found.usageCount || 0) >= found.usageLimit) {
    return res.status(400).json({ valid: false, message: 'Coupon usage limit reached.' });
  }

  const total = parseFloat(cartTotal) || 0;
  if (found.minSpend && total < found.minSpend) {
    return res.status(400).json({
      valid: false,
      message: `Minimum order value of ₹${found.minSpend.toLocaleString()} required for this coupon.`
    });
  }

  // Calculate discount
  let discountAmount = 0;
  if (found.type === 'percent') {
    discountAmount = (total * found.value) / 100;
  } else if (found.type === 'flat' || found.type === 'flat_amount') {
    discountAmount = Math.min(total, found.value);
  } else if (found.type === 'category') {
    // Discount specific to category items
    let catSubtotal = 0;
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        if (item.category === found.category) {
          catSubtotal += (item.price * item.quantity);
        }
      });
    }
    if (catSubtotal === 0) {
      return res.status(400).json({
        valid: false,
        message: `This coupon applies only to products in the ${found.category} category.`
      });
    }
    discountAmount = (catSubtotal * found.value) / 100;
  }

  res.json({
    valid: true,
    coupon: found,
    discountAmount: Math.round(discountAmount * 100) / 100,
    message: `Coupon '${found.code}' applied successfully!`
  });
});

// POST create coupon
router.post('/', (req, res) => {
  const coupons = db.read('coupons');
  const code = (req.body.code || '').trim().toUpperCase();

  if (coupons.some(c => c.code.toUpperCase() === code)) {
    return res.status(400).json({ message: 'Coupon code already exists' });
  }

  const newCoupon = {
    code: code,
    type: req.body.type || 'percent',
    value: parseFloat(req.body.value) || 10,
    minSpend: parseFloat(req.body.minSpend) || 0,
    description: req.body.description || '',
    active: req.body.active !== undefined ? req.body.active : true,
    status: req.body.status || 'active',
    category: req.body.category || '',
    expiryDate: req.body.expiryDate || '2026-12-31',
    usageLimit: parseInt(req.body.usageLimit) || 100,
    usageCount: 0
  };

  coupons.push(newCoupon);
  db.write('coupons', coupons);
  res.status(201).json(newCoupon);
});

// PUT update coupon
router.put('/:code', (req, res) => {
  const coupons = db.read('coupons');
  const index = coupons.findIndex(c => c.code.toUpperCase() === req.params.code.toUpperCase());
  if (index === -1) {
    return res.status(404).json({ message: 'Coupon not found' });
  }

  coupons[index] = {
    ...coupons[index],
    ...req.body,
    code: coupons[index].code
  };

  db.write('coupons', coupons);
  res.json(coupons[index]);
});

// DELETE coupon
router.delete('/:code', (req, res) => {
  let coupons = db.read('coupons');
  coupons = coupons.filter(c => c.code.toUpperCase() !== req.params.code.toUpperCase());
  db.write('coupons', coupons);
  res.json({ success: true });
});

module.exports = router;
