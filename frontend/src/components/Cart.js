import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

function Cart({ isOpen, onClose, cart, updateQuantity, removeFromCart, getCartTotal }) {
  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#654321' }}>
              Your Cart
            </h2>
            <Button
              variant="link"
              onClick={onClose}
              style={{ color: '#8B4513', fontSize: '1.5rem' }}
            >
              <FaTimes />
            </Button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-5">
              <p style={{ color: '#6F4E37', fontSize: '1.1rem' }}>Your cart is empty</p>
              <Link to="/menu" onClick={onClose}>
                <Button className="btn-cafe mt-3">Browse Menu</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items" style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="cart-item mb-3 p-3"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '15px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="flex-grow-1">
                        <h5 style={{ color: '#654321', fontWeight: '600', marginBottom: '0.5rem' }}>
                          {item.name}
                        </h5>
                        <p style={{ color: '#8B4513', fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                          ₹{item.price}
                        </p>
                      </div>
                      <Button
                        variant="link"
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: '#C92A2A', padding: '0' }}
                      >
                        <FaTrash />
                      </Button>
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <Button
                          className="btn-outline-cafe"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ padding: '0.25rem 0.75rem' }}
                        >
                          <FaMinus />
                        </Button>
                        <span
                          className="mx-3"
                          style={{ fontWeight: '600', fontSize: '1.1rem', color: '#654321' }}
                        >
                          {item.quantity}
                        </span>
                        <Button
                          className="btn-cafe"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ padding: '0.25rem 0.75rem' }}
                        >
                          <FaPlus />
                        </Button>
                      </div>
                      <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#8B4513' }}>
                        ₹{(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary mt-4 pt-3" style={{ borderTop: '2px solid #D4B896' }}>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ fontSize: '1.1rem', color: '#6F4E37' }}>Subtotal:</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#654321' }}>
                    ₹{Math.round(getCartTotal())}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ fontSize: '1.1rem', color: '#6F4E37' }}>Tax (8%):</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#654321' }}>
                    ₹{Math.round(getCartTotal() * 0.08)}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3 pt-2" style={{ borderTop: '1px solid #D4B896' }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: '700', color: '#654321' }}>Total:</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: '700', color: '#8B4513' }}>
                    ₹{Math.round(getCartTotal() * 1.08)}
                  </span>
                </div>

                <Link to="/checkout" onClick={onClose}>
                  <Button className="btn-cafe w-100 mb-2">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
