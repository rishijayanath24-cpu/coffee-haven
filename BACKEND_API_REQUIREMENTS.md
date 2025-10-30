# Backend API Requirements for Authentication System

This document outlines the required backend API endpoints that need to be implemented to support the new authentication and admin features in the Coffee Haven frontend.

## Required API Endpoints

### 1. Authentication Endpoints

#### POST /api/auth/register
**Purpose:** Register a new user
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "user" | "admin"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "user" | "admin",
    "createdAt": "ISO date string"
  },
  "token": "JWT token (optional)"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message"
}
```

---

#### POST /api/auth/login
**Purpose:** Login existing user
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "user" | "admin",
    "createdAt": "ISO date string"
  },
  "token": "JWT token (optional)"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 2. User Management Endpoints

#### GET /api/auth/users
**Purpose:** Get all users (Admin only)
**Headers:** Authorization header (if using JWT)
**Response:**
```json
{
  "success": true,
  "users": [
    {
      "_id": "string",
      "name": "string",
      "email": "string",
      "role": "user" | "admin",
      "createdAt": "ISO date string"
    }
  ]
}
```

---

#### DELETE /api/auth/users/:userId
**Purpose:** Delete a user (Admin only)
**Headers:** Authorization header (if using JWT)
**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

### 3. Order Management Endpoints

#### PATCH /api/orders/:orderId/status
**Purpose:** Update order status (Admin only)
**Request Body:**
```json
{
  "status": "pending" | "preparing" | "ready" | "delivered" | "cancelled"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "_id": "string",
    "status": "string",
    // ... other order fields
  }
}
```

---

## Database Schema Requirements

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (default: Date.now)
}
```

### Order Model (Update existing)
Add status field if not present:
```javascript
{
  _id: ObjectId,
  userName: String,
  userEmail: String,
  userPhone: String,
  deliveryAddress: String,
  notes: String,
  items: Array,
  subtotal: Number,
  tax: Number,
  total: Number,
  status: String (enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'], default: 'pending'),
  createdAt: Date (default: Date.now)
}
```

---

## Demo Accounts to Create

Create these accounts in your database for testing:

### Admin Account
- Email: admin@cafe.com
- Password: admin123
- Role: admin

### User Account
- Email: user@cafe.com
- Password: user123
- Role: user

---

## Implementation Steps for Backend

1. **Install Required Packages:**
   ```bash
   cd backend
   npm install bcryptjs jsonwebtoken
   ```

2. **Create User Model** (if not exists):
   - Create `models/User.js` with the schema above
   - Use bcryptjs to hash passwords before saving

3. **Create Authentication Routes:**
   - Create `routes/auth.js`
   - Implement register, login, getUsers, deleteUser endpoints
   - Add password hashing and JWT token generation

4. **Update Order Routes:**
   - Update `routes/orders.js` to include status update endpoint
   - Add PATCH `/api/orders/:orderId/status` route

5. **Add Middleware (Optional but Recommended):**
   - Create `middleware/auth.js` for JWT verification
   - Create `middleware/adminOnly.js` for admin-only routes

6. **Update server.js:**
   - Add auth routes: `app.use('/api/auth', authRoutes);`

---

## Example Backend Code Snippets

### User Model Example:
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### Auth Routes Example:
```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const user = new User({ name, email, password, role: role || 'user' });
    await user.save();

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete user
router.delete('/users/:userId', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
```

### Order Status Update Route:
```javascript
// Add to your existing orders routes
router.patch('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
```

---

## Testing Checklist

- [ ] Register new user works
- [ ] Login with correct credentials works
- [ ] Login with wrong credentials fails
- [ ] Admin can see all users
- [ ] Admin can delete users
- [ ] Admin can update order status
- [ ] Regular users cannot access admin endpoints
- [ ] Password is hashed in database
- [ ] Demo accounts (admin@cafe.com and user@cafe.com) are created

---

## CORS Configuration

Make sure your backend has CORS enabled for the frontend:

```javascript
const cors = require('cors');
app.use(cors());
```

Or more specific:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```
