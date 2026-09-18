const express = require('express');
const router = express.Router();
const db = require('../data/db');

// GET all banners
router.get('/', (req, res) => {
  const banners = db.read('banners');
  // Sort by order ascending
  banners.sort((a, b) => (a.order || 0) - (b.order || 0));
  res.json(banners);
});

// POST create banner
router.post('/', (req, res) => {
  const banners = db.read('banners');
  const newBanner = {
    id: Date.now(),
    title: req.body.title || 'Special Promotion',
    headline: req.body.headline || req.body.title || 'Special Promotion',
    subtitle: req.body.subtitle || '',
    description: req.body.description || '',
    image: req.body.image || 'assets/hero_fashion.png',
    btn1Text: req.body.btn1Text || 'Shop Now',
    btn1Link: req.body.btn1Link || '#home',
    btn2Text: req.body.btn2Text || 'Explore More',
    btn2Link: req.body.btn2Link || '#home',
    order: banners.length + 1,
    active: req.body.active !== undefined ? req.body.active : true
  };

  banners.push(newBanner);
  db.write('banners', banners);
  res.status(201).json(newBanner);
});

// PUT update banner
router.put('/:id', (req, res) => {
  const banners = db.read('banners');
  const index = banners.findIndex(b => String(b.id) === String(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Banner not found' });
  }

  banners[index] = {
    ...banners[index],
    ...req.body,
    id: banners[index].id
  };

  db.write('banners', banners);
  res.json(banners[index]);
});

// PATCH toggle active
router.patch('/:id/toggle', (req, res) => {
  const banners = db.read('banners');
  const banner = banners.find(b => String(b.id) === String(req.params.id));
  if (!banner) {
    return res.status(404).json({ message: 'Banner not found' });
  }

  banner.active = !banner.active;
  db.write('banners', banners);
  res.json(banner);
});

// DELETE banner
router.delete('/:id', (req, res) => {
  let banners = db.read('banners');
  banners = banners.filter(b => String(b.id) !== String(req.params.id));
  db.write('banners', banners);
  res.json({ success: true });
});

module.exports = router;
