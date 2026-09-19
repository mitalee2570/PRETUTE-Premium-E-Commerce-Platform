const express = require('express');
const router = express.Router();
const db = require('../data/db');
const User = require('../models/User');
const UserLog = require('../models/UserLog');
const { isMongoConnected, recordUserLog } = require('../config/mongodb');

// Helper to extract client details for logs
function getClientMeta(req) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Unknown';
  return { ip, userAgent };
}

// GET all customers (Admin view)
router.get('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const users = await User.find().sort({ createdAt: -1 });
      const safeList = users.map(u => u.toJSON());
      return res.json(safeList);
    }

    // JSON store fallback
    const customers = db.read('customers');
    const safeList = customers.map(c => {
      const copy = { ...c };
      delete copy.password;
      return copy;
    });
    res.json(safeList);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET customer login & activity logs
router.get('/logs', async (req, res) => {
  try {
    const { email, action, limit = 50 } = req.query;
    const filter = {};
    if (email) filter.email = email.toLowerCase().trim();
    if (action) filter.action = action;

    if (isMongoConnected()) {
      const logs = await UserLog.find(filter)
        .sort({ timestamp: -1 })
        .limit(Number(limit));
      return res.json({ success: true, count: logs.length, logs });
    }

    // Return message if Mongo not yet connected
    res.json({
      success: true,
      count: 0,
      logs: [],
      message: 'MongoDB is currently in fallback mode. Connect MongoDB to view persistent audit logs.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST register customer (Save in MongoDB + Audit Log)
router.post('/register', async (req, res) => {
  const { name, email, phone, password, address } = req.body;
  const { ip, userAgent } = getClientMeta(req);

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    if (isMongoConnected()) {
      // Check existing in MongoDB
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        await recordUserLog({
          email: cleanEmail,
          action: 'REGISTER',
          status: 'FAILURE',
          ip,
          userAgent,
          details: 'Registration attempt failed: Email already exists'
        });
        return res.status(400).json({ success: false, message: 'An account with this email already exists in MongoDB.' });
      }

      const customId = `cust-${Date.now()}`;
      const newUser = await User.create({
        customId,
        name: name.trim(),
        email: cleanEmail,
        phone: phone ? phone.trim() : '',
        password: password || 'password123',
        address: address || { street: '', city: '', state: '', pincode: '' }
      });

      // Record Activity Log in MongoDB
      await recordUserLog({
        userId: newUser.id,
        email: cleanEmail,
        action: 'REGISTER',
        status: 'SUCCESS',
        ip,
        userAgent,
        details: 'Customer registered successfully in MongoDB'
      });

      // Sync backup to JSON store
      const customers = db.read('customers');
      customers.push({
        id: customId,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        password: newUser.password,
        createdAt: newUser.createdAt,
        address: newUser.address
      });
      db.write('customers', customers);

      return res.status(201).json({
        success: true,
        source: 'MongoDB',
        customer: newUser.toJSON()
      });
    }

    // JSON Fallback
    const customers = db.read('customers');
    if (customers.some(c => c.email.toLowerCase() === cleanEmail)) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const newCust = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      password: password || 'password123',
      createdAt: new Date().toISOString(),
      address: address || { street: '', city: '', state: '', pincode: '' }
    };

    customers.push(newCust);
    db.write('customers', customers);

    await recordUserLog({
      userId: newCust.id,
      email: cleanEmail,
      action: 'REGISTER',
      status: 'SUCCESS',
      ip,
      userAgent,
      details: 'Registered via fallback JSON'
    });

    const safeCust = { ...newCust };
    delete safeCust.password;
    res.status(201).json({ success: true, source: 'JSON', customer: safeCust });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST login customer (Authenticate from MongoDB + Log Activity)
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  const { ip, userAgent } = getClientMeta(req);

  if (!identifier) {
    return res.status(400).json({ success: false, message: 'Email or phone is required.' });
  }

  const cleanId = identifier.trim().toLowerCase();
  const rawDigits = cleanId.replace(/\D/g, '');

  try {
    if (isMongoConnected()) {
      // Find in MongoDB by email or phone
      const query = {
        $or: [
          { email: cleanId },
          { phone: cleanId }
        ]
      };
      if (rawDigits.length >= 10) {
        query.$or.push({ phone: rawDigits });
      }

      const user = await User.findOne(query);

      if (!user) {
        await recordUserLog({
          email: cleanId,
          action: 'LOGIN_FAILED',
          status: 'FAILURE',
          ip,
          userAgent,
          details: 'Account not found for provided identifier'
        });
        return res.status(404).json({ success: false, message: 'Account not found with this email or mobile number.' });
      }

      // Check password
      if (password && user.password && user.password !== password) {
        await recordUserLog({
          userId: user.id,
          email: user.email,
          action: 'LOGIN_FAILED',
          status: 'FAILURE',
          ip,
          userAgent,
          details: 'Incorrect password entered'
        });
        return res.status(401).json({ success: false, message: 'Incorrect password. Please try again.' });
      }

      // Update lastLogin in MongoDB
      user.lastLogin = new Date();
      await user.save();

      // Record successful login in MongoDB UserLog
      await recordUserLog({
        userId: user.id,
        email: user.email,
        action: 'LOGIN_SUCCESS',
        status: 'SUCCESS',
        ip,
        userAgent,
        details: 'User authenticated successfully via MongoDB'
      });

      return res.json({
        success: true,
        source: 'MongoDB',
        customer: user.toJSON()
      });
    }

    // JSON Fallback
    const customers = db.read('customers');
    const cust = customers.find(c =>
      c.email.toLowerCase() === cleanId ||
      c.phone === cleanId ||
      (c.phone && c.phone.replace(/\D/g, '') === rawDigits)
    );

    if (!cust) {
      await recordUserLog({
        email: cleanId,
        action: 'LOGIN_FAILED',
        status: 'FAILURE',
        ip,
        userAgent,
        details: 'Account not found (JSON fallback)'
      });
      return res.status(404).json({ success: false, message: 'Account not found with this email or mobile number.' });
    }

    if (password && cust.password && cust.password !== password) {
      await recordUserLog({
        userId: cust.id,
        email: cust.email,
        action: 'LOGIN_FAILED',
        status: 'FAILURE',
        ip,
        userAgent,
        details: 'Incorrect password entered (JSON fallback)'
      });
      return res.status(401).json({ success: false, message: 'Incorrect password. Please try again.' });
    }

    await recordUserLog({
      userId: cust.id,
      email: cust.email,
      action: 'LOGIN_SUCCESS',
      status: 'SUCCESS',
      ip,
      userAgent,
      details: 'User authenticated successfully (JSON fallback)'
    });

    const safeCust = { ...cust };
    delete safeCust.password;
    res.json({ success: true, source: 'JSON', customer: safeCust });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update customer profile (Update in MongoDB + Log)
router.put('/:id', async (req, res) => {
  const { ip, userAgent } = getClientMeta(req);
  const targetId = req.params.id;

  try {
    if (isMongoConnected()) {
      const user = await User.findOne({
        $or: [{ customId: targetId }, { _id: targetId.match(/^[0-9a-fA-F]{24}$/) ? targetId : null }]
      });

      if (!user) {
        return res.status(404).json({ success: false, message: 'Customer not found in MongoDB' });
      }

      if (req.body.name) user.name = req.body.name.trim();
      if (req.body.phone) user.phone = req.body.phone.trim();
      if (req.body.email) user.email = req.body.email.trim().toLowerCase();
      if (req.body.password) user.password = req.body.password;
      if (req.body.gender) user.gender = req.body.gender;
      if (req.body.addresses) user.addresses = req.body.addresses;
      if (req.body.address) {
        user.address = {
          ...(user.address?.toObject?.() || {}),
          ...req.body.address
        };
      }

      await user.save();

      // Log update action
      await recordUserLog({
        userId: user.id,
        email: user.email,
        action: 'PROFILE_UPDATE',
        status: 'SUCCESS',
        ip,
        userAgent,
        details: 'Customer profile details updated'
      });

      return res.json({ success: true, source: 'MongoDB', customer: user.toJSON() });
    }

    // JSON Fallback
    const customers = db.read('customers');
    const index = customers.findIndex(c => String(c.id) === String(targetId));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const existing = customers[index];
    const updated = {
      ...existing,
      name: req.body.name ? req.body.name.trim() : existing.name,
      phone: req.body.phone ? req.body.phone.trim() : existing.phone,
      email: req.body.email ? req.body.email.trim().toLowerCase() : existing.email,
      gender: req.body.gender !== undefined ? req.body.gender : (existing.gender || 'Female'),
      addresses: req.body.addresses !== undefined ? req.body.addresses : (existing.addresses || []),
      address: {
        ...(existing.address || {}),
        ...(req.body.address || {})
      }
    };

    if (req.body.password) {
      updated.password = req.body.password;
    }

    customers[index] = updated;
    db.write('customers', customers);

    await recordUserLog({
      userId: updated.id,
      email: updated.email,
      action: 'PROFILE_UPDATE',
      status: 'SUCCESS',
      ip,
      userAgent,
      details: 'Customer profile updated (JSON fallback)'
    });

    const safeCust = { ...updated };
    delete safeCust.password;
    res.json({ success: true, source: 'JSON', customer: safeCust });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
