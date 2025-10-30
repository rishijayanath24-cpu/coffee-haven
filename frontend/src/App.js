import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Menu from './components/Menu';
import MenuCard from './components/MenuCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cafeCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cafeCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    showToast('Item added to cart!');
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <div className="animated-bg"></div>

          <Routes>
            {/* Public Routes - Login/Register Only */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected User Routes - Home Page (existing website) */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Navigation
                    cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
                    toggleCart={() => setIsCartOpen(!isCartOpen)}
                  />
                  <Home />
                  <Cart
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cart={cart}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                    getCartTotal={getCartTotal}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <Navigation
                    cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
                    toggleCart={() => setIsCartOpen(!isCartOpen)}
                  />
                  <MenuCard />
                  <Cart
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cart={cart}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                    getCartTotal={getCartTotal}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <Navigation
                    cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
                    toggleCart={() => setIsCartOpen(!isCartOpen)}
                  />
                  <Menu addToCart={addToCart} />
                  <Cart
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cart={cart}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                    getCartTotal={getCartTotal}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Navigation
                    cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
                    toggleCart={() => setIsCartOpen(!isCartOpen)}
                  />
                  <Checkout
                    cart={cart}
                    clearCart={clearCart}
                    getCartTotal={getCartTotal}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Navigation
                    cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
                    toggleCart={() => setIsCartOpen(!isCartOpen)}
                  />
                  <Orders />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Redirect - Landing page is Login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
