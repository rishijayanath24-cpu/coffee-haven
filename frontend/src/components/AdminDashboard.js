import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBoxes, FaUsers, FaShoppingCart, FaChartLine, FaPlus, FaSignOutAlt, FaCoffee } from 'react-icons/fa';
import OrderManagement from './admin/OrderManagement';
import MenuManagement from './admin/MenuManagement';
import UserManagement from './admin/UserManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    menuItems: 0
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      let orders = [];
      let users = [];

      // Try backend first, fallback to mock/localStorage
      try {
        const ordersRes = await axios.get('${process.env.REACT_APP_API_URL}/api/orders', { timeout: 2000 });
        const usersRes = await axios.get('${process.env.REACT_APP_API_URL}/api/auth/users', { timeout: 2000 });
        orders = ordersRes.data.orders || [];
        users = usersRes.data.users || [];
      } catch (backendError) {
        console.log('Using mock data for stats');
        // Get mock users
        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        users = mockUsers.map(({ password, ...user }) => user);

        // Get orders from localStorage if any
        orders = []; // No orders yet in mock
      }

      const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

      setStats({
        totalOrders: orders.length,
        totalUsers: users.length,
        totalRevenue: revenue,
        menuItems: 12 // Will update this when menu items come from backend
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <FaCoffee className="admin-logo" />
          <h2>Coffee Haven</h2>
          <p className="admin-role">Admin Panel</p>
        </div>

        <div className="admin-user-info">
          <div className="admin-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="admin-user-details">
            <h4>{user?.name}</h4>
            <p>{user?.email}</p>
          </div>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaShoppingCart /> Order Management
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <FaBoxes /> Menu Management
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers /> User Management
          </button>
        </nav>

        <button className="admin-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        <div className="admin-header">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon orders">
              <FaShoppingCart />
            </div>
            <div className="stat-details">
              <h3>{stats.totalOrders}</h3>
              <p>Total Orders</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon users">
              <FaUsers />
            </div>
            <div className="stat-details">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue">
              <FaChartLine />
            </div>
            <div className="stat-details">
              <h3>₹{stats.totalRevenue.toFixed(2)}</h3>
              <p>Total Revenue</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon menu">
              <FaBoxes />
            </div>
            <div className="stat-details">
              <h3>{stats.menuItems}</h3>
              <p>Menu Items</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="admin-content-area">
          {activeTab === 'orders' && <OrderManagement onUpdate={fetchStats} />}
          {activeTab === 'menu' && <MenuManagement onUpdate={fetchStats} />}
          {activeTab === 'users' && <UserManagement onUpdate={fetchStats} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
