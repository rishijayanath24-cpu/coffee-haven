import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      if (response.data.success) {
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchOrdersByEmail = async (e) => {
    e.preventDefault();
    if (!searchEmail.trim()) {
      setFilteredOrders(orders);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/user/${searchEmail}`);
      if (response.data.success) {
        setFilteredOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error searching orders:', error);
      setFilteredOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: 'warning',
      preparing: 'info',
      ready: 'success',
      delivered: 'primary',
      cancelled: 'danger'
    };

    return (
      <Badge bg={statusColors[status] || 'secondary'} className="px-3 py-2">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container className="py-5">
      <h1 className="section-title">My Orders</h1>

      <div className="order-form mb-5">
        <Form onSubmit={searchOrdersByEmail}>
          <Row className="align-items-center">
            <Col md={8}>
              <Form.Group>
                <Form.Label style={{ color: '#6F4E37', fontWeight: '500' }}>
                  Search by Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email to view your orders"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Button type="submit" className="btn-cafe w-100" style={{ marginTop: '32px' }}>
                <FaSearch className="me-2" />
                Search Orders
              </Button>
            </Col>
          </Row>
        </Form>

        {searchEmail && (
          <Button
            className="btn-outline-cafe mt-3"
            onClick={() => {
              setSearchEmail('');
              fetchAllOrders();
            }}
          >
            View All Orders
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-5">
          <div className="loading">
            <div className="coffee-cup"></div>
          </div>
          <p style={{ color: '#6F4E37', marginTop: '2rem' }}>Loading orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-5">
          <h3 style={{ color: '#6F4E37' }}>
            {searchEmail ? 'No orders found for this email' : 'No orders yet'}
          </h3>
          <p style={{ color: '#8B4513' }}>
            {searchEmail ? 'Try a different email address' : 'Start ordering from our menu!'}
          </p>
        </div>
      ) : (
        <Row className="g-4">
          {filteredOrders.map(order => (
            <Col key={order._id} lg={12}>
              <Card className="menu-card">
                <Card.Body className="p-4">
                  <Row>
                    <Col md={8}>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#654321' }}>
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h4>
                          <p style={{ color: '#6F4E37', marginBottom: '0.5rem' }}>
                            <strong>Customer:</strong> {order.userName}
                          </p>
                          <p style={{ color: '#6F4E37', marginBottom: '0.5rem' }}>
                            <strong>Email:</strong> {order.userEmail}
                          </p>
                          <p style={{ color: '#6F4E37', marginBottom: '0.5rem' }}>
                            <strong>Phone:</strong> {order.userPhone}
                          </p>
                          <p style={{ color: '#6F4E37', marginBottom: '0.5rem' }}>
                            <strong>Date:</strong> {formatDate(order.orderDate)}
                          </p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>

                      <div className="mb-3">
                        <h5 style={{ color: '#654321', marginBottom: '1rem' }}>Order Items:</h5>
                        {order.items.map((item, index) => (
                          <div key={index} className="d-flex justify-content-between mb-2">
                            <span style={{ color: '#6F4E37' }}>
                              {item.name} x {item.quantity}
                            </span>
                            <span style={{ color: '#8B4513', fontWeight: '600' }}>
                              ₹{(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {order.deliveryAddress && (
                        <p style={{ color: '#6F4E37', marginBottom: '0.5rem' }}>
                          <strong>Delivery Address:</strong> {order.deliveryAddress}
                        </p>
                      )}

                      {order.notes && (
                        <p style={{ color: '#6F4E37', marginBottom: '0' }}>
                          <strong>Notes:</strong> {order.notes}
                        </p>
                      )}
                    </Col>

                    <Col md={4}>
                      <div
                        className="p-3"
                        style={{
                          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(111, 78, 55, 0.1) 100%)',
                          borderRadius: '15px'
                        }}
                      >
                        <h5 style={{ color: '#654321', marginBottom: '1rem' }}>Bill Summary</h5>
                        <div className="d-flex justify-content-between mb-2">
                          <span style={{ color: '#6F4E37' }}>Subtotal:</span>
                          <span style={{ color: '#654321', fontWeight: '600' }}>
                            ₹{Math.round(order.subtotal)}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span style={{ color: '#6F4E37' }}>Tax:</span>
                          <span style={{ color: '#654321', fontWeight: '600' }}>
                            ₹{Math.round(order.tax)}
                          </span>
                        </div>
                        <hr style={{ borderColor: '#D4B896' }} />
                        <div className="d-flex justify-content-between">
                          <strong style={{ fontSize: '1.2rem', color: '#654321' }}>Total:</strong>
                          <strong style={{ fontSize: '1.2rem', color: '#8B4513' }}>
                            ₹{Math.round(order.total)}
                          </strong>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Orders;
