const express = require('express');
const router = express.Router();
const db = require('../data/db');

// GET all categories
router.get('/', (req, res) => {
  const categories = db.read('categories');
  res.json(categories);
});

// POST create category
router.post('/', (req, res) => {
  const categories = db.read('categories');
  const slug = req.body.slug || (req.body.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const newCat = {
    id: Date.now(),
    name: req.body.name || 'New Category',
    slug: slug,
    image: req.body.image || 'assets/prod_romper.png',
    description: req.body.description || '',
    showOnHome: req.body.showOnHome !== undefined ? req.body.showOnHome : true,
    status: req.body.status || 'active',
    availability: req.body.availability || 'available'
  };

  categories.push(newCat);
  db.write('categories', categories);
  res.status(201).json(newCat);
});

// PUT update category
router.put('/:id', (req, res) => {
  const categories = db.read('categories');
  const index = categories.findIndex(c => String(c.id) === String(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }

  categories[index] = {
    ...categories[index],
    ...req.body,
    id: categories[index].id
  };

  db.write('categories', categories);
  res.json(categories[index]);
});

// DELETE category
router.delete('/:id', (req, res) => {
  let categories = db.read('categories');
  categories = categories.filter(c => String(c.id) !== String(req.params.id));
  db.write('categories', categories);
  res.json({ success: true });
});

module.exports = router;
