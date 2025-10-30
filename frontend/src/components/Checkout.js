import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkout({ cart, clearCart, getCartTotal }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    deliveryAddress: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        ...formData,
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))
      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, orderData);


      if (response.data.success) {
        alert('Order placed successfully! Order ID: ' + response.data.order._id);
        clearCart();
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2 className="section-title">Your cart is empty</h2>
          <Button className="btn-cafe" onClick={() => navigate('/menu')}>
            Go to Menu
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="section-title">Checkout</h1>

      <Row>
        <Col lg={7}>
          <div className="order-form">
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#654321', marginBottom: '1.5rem' }}>
              Delivery Information
            </h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#6F4E37', fontWeight: '500' }}>Full Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  placeholder="John Doe"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#6F4E37', fontWeight: '500' }}>Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  placeholder="john@example.com"
                  value={formData.userEmail}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#6F4E37', fontWeight: '500' }}>Phone Number *</Form.Label>
                <Form.Control
                  type="tel"
                  name="userPhone"
                  placeholder="+1 234 567 8900"
                  value={formData.userPhone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#6F4E37', fontWeight: '500' }}>Delivery Address *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="deliveryAddress"
                  placeholder="123 Main St, Apt 4B, New York, NY 10001"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{ color: '#6F4E37', fontWeight: '500' }}>Special Instructions (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="notes"
                  placeholder="Any special requests or dietary restrictions..."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                type="submit"
                className="btn-cafe w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </Button>
            </Form>
          </div>
        </Col>

        <Col lg={5}>
          <Card className="menu-card p-4">
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#654321', marginBottom: '1.5rem' }}>
              Order Summary
            </h3>

            <div className="order-items mb-3">
              {cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <div>
                    <strong style={{ color: '#654321' }}>{item.name}</strong>
                    <span style={{ color: '#6F4E37' }}> x {item.quantity}</span>
                  </div>
                  <span style={{ color: '#8B4513', fontWeight: '600' }}>
                    ₹{(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <hr style={{ borderColor: '#D4B896' }} />

            <div className="d-flex justify-content-between mb-2">
              <span style={{ color: '#6F4E37' }}>Subtotal:</span>
              <span style={{ color: '#654321', fontWeight: '600' }}>
                ₹{Math.round(getCartTotal())}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span style={{ color: '#6F4E37' }}>Tax (8%):</span>
              <span style={{ color: '#654321', fontWeight: '600' }}>
                ₹{Math.round(getCartTotal() * 0.08)}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span style={{ color: '#6F4E37' }}>Delivery Fee:</span>
              <span style={{ color: '#654321', fontWeight: '600' }}>Free</span>
            </div>

            <hr style={{ borderColor: '#D4B896' }} />

            <div className="d-flex justify-content-between">
              <strong style={{ fontSize: '1.3rem', color: '#654321' }}>Total:</strong>
              <strong style={{ fontSize: '1.3rem', color: '#8B4513' }}>
                ₹{Math.round(getCartTotal() * 1.08)}
              </strong>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
