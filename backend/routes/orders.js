const express = require('express');
const router = express.Router();
const db = require('../data/db');

// GET all orders
router.get('/', (req, res) => {
  const orders = db.read('orders');
  res.json(orders);
});

// GET order by id
router.get('/:id', (req, res) => {
  const orders = db.read('orders');
  const order = orders.find(o => String(o.id) === String(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

// POST create new order (checkout)
router.post('/', (req, res) => {
  const orders = db.read('orders');
  const newOrder = {
    id: `PRT-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toISOString(),
    customerName: req.body.customerName || 'Guest Customer',
    customerEmail: req.body.customerEmail || '',
    customerPhone: req.body.customerPhone || '',
    address: req.body.address || '',
    items: req.body.items || [],
    subtotal: parseFloat(req.body.subtotal) || 0,
    discount: parseFloat(req.body.discount) || 0,
    couponUsed: req.body.couponUsed || null,
    total: parseFloat(req.body.total) || 0,
    paymentMethod: req.body.paymentMethod || 'Online UPI',
    status: 'Pending',
    notes: req.body.notes || ''
  };

  orders.unshift(newOrder);
  db.write('orders', orders);

  // Update coupon usage count if used
  if (newOrder.couponUsed) {
    const coupons = db.read('coupons');
    const coupon = coupons.find(c => c.code.toUpperCase() === newOrder.couponUsed.toUpperCase());
    if (coupon) {
      coupon.usageCount = (coupon.usageCount || 0) + 1;
      db.write('coupons', coupons);
    }
  }

  // Deduct product stock
  const products = db.read('products');
  newOrder.items.forEach(item => {
    const prod = products.find(p => String(p.id) === String(item.productId));
    if (prod && prod.stock > 0) {
      prod.stock = Math.max(0, prod.stock - (item.quantity || 1));
      if (prod.stock === 0) prod.stockStatus = 'out_of_stock';
    }
  });
  db.write('products', products);

  res.status(201).json({ success: true, order: newOrder });
});

// PATCH update order status
router.patch('/:id/status', (req, res) => {
  const orders = db.read('orders');
  const order = orders.find(o => String(o.id) === String(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  if (req.body.status) {
    order.status = req.body.status;
  }
  db.write('orders', orders);
  res.json(order);
});

// POST cancel order and restock inventory
router.post('/:id/cancel', (req, res) => {
  const orders = db.read('orders');
  const order = orders.find(o => String(o.id) === String(req.params.id));
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  if (order.status === 'Cancelled') {
    return res.status(400).json({ success: false, message: 'Order is already cancelled' });
  }

  order.status = 'Cancelled';
  order.cancelledAt = new Date().toISOString();
  db.write('orders', orders);

  // Restock inventory
  if (Array.isArray(order.items)) {
    const products = db.read('products');
    order.items.forEach(item => {
      const prod = products.find(p => String(p.id) === String(item.productId));
      if (prod) {
        prod.stock = (prod.stock || 0) + (item.quantity || 1);
        if (prod.stock > 0) prod.stockStatus = 'in_stock';
      }
    });
    db.write('products', products);
  }

  res.json({ success: true, message: 'Order cancelled and items restocked successfully', order });
});

module.exports = router;
