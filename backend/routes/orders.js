const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { userName, userEmail, userPhone, items, deliveryAddress, notes } = req.body;

    // Find or create user
    let user = await User.findOne({ email: userEmail });
    if (!user) {
      user = new User({
        name: userName,
        email: userEmail,
        phone: userPhone,
        address: deliveryAddress
      });
      await user.save();
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    // Create order
    const order = new Order({
      userId: user._id,
      userName,
      userEmail,
      userPhone,
      items,
      subtotal,
      tax,
      total,
      deliveryAddress,
      notes
    });

    await order.save();
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get orders by user email
router.get('/user/:email', async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email }).sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
