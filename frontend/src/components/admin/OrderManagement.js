import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaEye, FaCheck, FaTimes, FaClock } from 'react-icons/fa';

const OrderManagement = ({ onUpdate }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter, orders]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/orders');
      if (response.data.success) {
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`, {
        status: newStatus
      });

      if (response.data.success) {
        fetchOrders();
        onUpdate();
        alert('Order status updated successfully');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'badge-warning';
      case 'preparing': return 'badge-info';
      case 'ready': return 'badge-success';
      case 'delivered': return 'badge-primary';
      case 'cancelled': return 'badge-danger';
      default: return 'badge-secondary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="order-management">
      <div className="management-header">
        <h2>Order Management</h2>
        <button className="btn-refresh" onClick={fetchOrders}>
          Refresh Orders
        </button>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by email, name, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">No orders found</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="order-id">#{order._id?.slice(-6)}</td>
                    <td>
                      <div className="customer-info">
                        <strong>{order.userName}</strong>
                        <small>{order.userEmail}</small>
                      </div>
                    </td>
                    <td>{order.items?.length || 0} items</td>
                    <td className="order-total">₹{order.total?.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="order-date">{formatDate(order.createdAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action btn-view"
                          onClick={() => setSelectedOrder(order)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {order.status !== 'delivered' && order.status !== 'cancelled' && (
                          <>
                            {order.status === 'pending' && (
                              <button
                                className="btn-action btn-approve"
                                onClick={() => updateOrderStatus(order._id, 'preparing')}
                                title="Start Preparing"
                              >
                                <FaClock />
                              </button>
                            )}
                            {order.status === 'preparing' && (
                              <button
                                className="btn-action btn-approve"
                                onClick={() => updateOrderStatus(order._id, 'ready')}
                                title="Mark as Ready"
                              >
                                <FaCheck />
                              </button>
                            )}
                            {order.status === 'ready' && (
                              <button
                                className="btn-action btn-approve"
                                onClick={() => updateOrderStatus(order._id, 'delivered')}
                                title="Mark as Delivered"
                              >
                                <FaCheck />
                              </button>
                            )}
                            <button
                              className="btn-action btn-cancel"
                              onClick={() => updateOrderStatus(order._id, 'cancelled')}
                              title="Cancel Order"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details</h3>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="order-detail-section">
                <h4>Customer Information</h4>
                <p><strong>Name:</strong> {selectedOrder.userName}</p>
                <p><strong>Email:</strong> {selectedOrder.userEmail}</p>
                <p><strong>Phone:</strong> {selectedOrder.userPhone}</p>
                <p><strong>Address:</strong> {selectedOrder.deliveryAddress}</p>
                {selectedOrder.notes && <p><strong>Notes:</strong> {selectedOrder.notes}</p>}
              </div>

              <div className="order-detail-section">
                <h4>Order Items</h4>
                <div className="order-items-list">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="order-item-detail">
                      <img src={item.image} alt={item.name} className="item-image-small" />
                      <div className="item-info">
                        <strong>{item.name}</strong>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-detail-section">
                <h4>Order Summary</h4>
                <div className="order-summary-detail">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (8%):</span>
                    <span>₹{selectedOrder.tax?.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span><strong>Total:</strong></span>
                    <span><strong>₹{selectedOrder.total?.toFixed(2)}</strong></span>
                  </div>
                </div>
              </div>

              <div className="order-detail-section">
                <h4>Status</h4>
                <p>
                  <span className={`status-badge ${getStatusBadgeClass(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </p>
                <p><small>Ordered on: {formatDate(selectedOrder.createdAt)}</small></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
