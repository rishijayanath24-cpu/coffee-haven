import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaUserShield, FaUser, FaSearch } from 'react-icons/fa';

const UserManagement = ({ onUpdate }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);

      // Try backend first, fallback to mock data
      try {
        const response = await axios.get('${process.env.REACT_APP_API_URL}/api/auth/users', { timeout: 2000 });
        if (response.data.success) {
          setUsers(response.data.users);
          setFilteredUsers(response.data.users);
        }
      } catch (backendError) {
        // Use mock data from localStorage
        console.log('Using mock user data');
        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const usersWithoutPassword = mockUsers.map(({ password, ...user }) => user);
        setUsers(usersWithoutPassword);
        setFilteredUsers(usersWithoutPassword);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    if (searchTerm) {
      const filtered = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleOpenModal = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Try backend first
      try {
        const response = await axios.post('${process.env.REACT_APP_API_URL}/api/auth/register', formData, { timeout: 2000 });

        if (response.data.success) {
          alert('User added successfully!');
          handleCloseModal();
          fetchUsers();
          onUpdate();
        } else {
          alert(response.data.message || 'Failed to add user');
        }
      } catch (backendError) {
        // Use mock data
        console.log('Using mock user creation');
        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');

        // Check if email exists
        if (mockUsers.find(u => u.email === formData.email)) {
          alert('Email already registered');
          return;
        }

        const newUser = {
          _id: String(mockUsers.length + 1),
          ...formData,
          createdAt: new Date().toISOString()
        };

        mockUsers.push(newUser);
        localStorage.setItem('mockUsers', JSON.stringify(mockUsers));

        alert('User added successfully!');
        handleCloseModal();
        fetchUsers();
        onUpdate();
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      try {
        // Try backend first
        try {
          const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/auth/users/${userId}`, { timeout: 2000 });

          if (response.data.success) {
            alert('User deleted successfully!');
            fetchUsers();
            onUpdate();
          } else {
            alert(response.data.message || 'Failed to delete user');
          }
        } catch (backendError) {
          // Use mock data
          console.log('Using mock user deletion');
          const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
          const updatedUsers = mockUsers.filter(u => u._id !== userId);
          localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));

          alert('User deleted successfully!');
          fetchUsers();
          onUpdate();
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="user-management">
      <div className="management-header">
        <h2>User Management</h2>
        <button className="btn-add-new" onClick={handleOpenModal}>
          <FaPlus /> Add New User
        </button>
      </div>

      {/* Search */}
      <div className="filters-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Users Table */}
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No users found</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-info-cell">
                        <div className="user-avatar-small">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <strong>{user.name}</strong>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role === 'admin' ? 'role-admin' : 'role-user'}`}>
                        {user.role === 'admin' ? <FaUserShield /> : <FaUser />}
                        {user.role}
                      </span>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(user._id, user.name)}
                        title="Delete User"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add User Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New User</h3>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  minLength="6"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
