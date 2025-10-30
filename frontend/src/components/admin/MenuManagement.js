import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCoffee } from 'react-icons/fa';

const MenuManagement = ({ onUpdate }) => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Espresso', price: 120, description: 'Strong and bold coffee', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=300', category: 'Coffee' },
    { id: 2, name: 'Cappuccino', price: 150, description: 'Creamy and frothy delight', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300', category: 'Coffee' },
    { id: 3, name: 'Caramel Latte', price: 180, description: 'Sweet caramel perfection', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=300', category: 'Coffee' },
    { id: 4, name: 'Mocha', price: 170, description: 'Chocolate meets coffee', image: 'https://images.unsplash.com/photo-1578374173703-26bf087f9fe4?w=300', category: 'Coffee' },
    { id: 5, name: 'Croissant', price: 80, description: 'Buttery and flaky', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300', category: 'Pastries' },
    { id: 6, name: 'Blueberry Muffin', price: 90, description: 'Bursting with blueberries', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300', category: 'Pastries' },
    { id: 7, name: 'Bagel', price: 70, description: 'Classic toasted bagel', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300', category: 'Pastries' },
    { id: 8, name: 'Avocado Toast', price: 150, description: 'Fresh and healthy', image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=300', category: 'Breakfast' },
    { id: 9, name: 'Chocolate Cake', price: 130, description: 'Rich chocolate indulgence', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300', category: 'Desserts' },
    { id: 10, name: 'Cheesecake', price: 140, description: 'Creamy and delicious', image: 'https://images.unsplash.com/photo-1533134242443-1c103925e0fe?w=300', category: 'Desserts' },
    { id: 11, name: 'Iced Coffee', price: 130, description: 'Refreshing cold brew', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=300', category: 'Cold Drinks' },
    { id: 12, name: 'Fruit Smoothie', price: 160, description: 'Fresh and fruity', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300', category: 'Cold Drinks' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'Coffee'
  });

  const categories = ['Coffee', 'Pastries', 'Desserts', 'Cold Drinks', 'Breakfast'];

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'Coffee'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      image: '',
      category: 'Coffee'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingItem) {
      // Update existing item
      setMenuItems(menuItems.map(item =>
        item.id === editingItem.id ? { ...formData, id: item.id } : item
      ));
      alert('Menu item updated successfully!');
    } else {
      // Add new item
      const newItem = {
        ...formData,
        id: Math.max(...menuItems.map(i => i.id), 0) + 1,
        price: parseFloat(formData.price)
      };
      setMenuItems([...menuItems, newItem]);
      alert('Menu item added successfully!');
    }

    handleCloseModal();
    onUpdate();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
      alert('Menu item deleted successfully!');
      onUpdate();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? value : value
    }));
  };

  return (
    <div className="menu-management">
      <div className="management-header">
        <h2>Menu Management</h2>
        <button className="btn-add-new" onClick={() => handleOpenModal()}>
          <FaPlus /> Add New Item
        </button>
      </div>

      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-admin-card">
            <img src={item.image} alt={item.name} className="menu-admin-image" />
            <div className="menu-admin-content">
              <h3>{item.name}</h3>
              <p className="menu-admin-description">{item.description}</p>
              <div className="menu-admin-footer">
                <span className="menu-admin-price">₹{item.price}</span>
                <span className="menu-admin-category">{item.category}</span>
              </div>
              <div className="menu-admin-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleOpenModal(item)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content menu-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Item Name</label>
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
                <label htmlFor="price">Price (₹)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              {formData.image && (
                <div className="image-preview">
                  <img src={formData.image} alt="Preview" />
                </div>
              )}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
