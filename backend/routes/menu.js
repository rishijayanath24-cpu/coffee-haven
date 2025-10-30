const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const { category, available } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }
    if (available !== undefined) {
      query.available = available === 'true';
    }

    const menuItems = await MenuItem.find(query).sort({ category: 1, name: 1 });
    res.json({ success: true, menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.json({ success: true, menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create a new menu item
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;

    const menuItem = new MenuItem({
      name,
      description,
      price,
      category,
      image,
      available
    });

    await menuItem.save();
    res.status(201).json({ success: true, menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update a menu item
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;

    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, image, available },
      { new: true, runValidators: true }
    );

    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.json({ success: true, menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update menu item availability
router.patch('/:id/availability', async (req, res) => {
  try {
    const { available } = req.body;

    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { available },
      { new: true }
    );

    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.json({ success: true, menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
