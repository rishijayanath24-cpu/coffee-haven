import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Mock users database (temporary fallback)
const MOCK_USERS = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@cafe.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Regular User',
    email: 'user@cafe.com',
    password: 'user123',
    role: 'user',
    createdAt: new Date().toISOString()
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mockUsers, setMockUsers] = useState(() => {
    const stored = localStorage.getItem('mockUsers');
    return stored ? JSON.parse(stored) : MOCK_USERS;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('cafeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
  }, [mockUsers]);

  const login = async (email, password) => {
    try {
      // ✅ Backend first
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
          email,
          password
        }, { timeout: 2000 });

        if (response.data.success) {
          const userData = response.data.user;
          setUser(userData);
          localStorage.setItem('cafeUser', JSON.stringify(userData));
          return { success: true, user: userData };
        }
        return { success: false, message: response.data.message };
      } catch (backendError) {
        console.log('⚠️ Backend not available, using mock authentication');
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);

        if (foundUser) {
          const userData = {
            _id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
            createdAt: foundUser.createdAt
          };
          setUser(userData);
          localStorage.setItem('cafeUser', JSON.stringify(userData));
          return { success: true, user: userData };
        }
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const register = async (name, email, password) => {
    try {
      // ✅ Backend first
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
          name,
          email,
          password,
          role: 'user'
        }, { timeout: 2000 });

        if (response.data.success) {
          const userData = response.data.user;
          setUser(userData);
          localStorage.setItem('cafeUser', JSON.stringify(userData));
          return { success: true, user: userData };
        }
        return { success: false, message: response.data.message };
      } catch (backendError) {
        console.log('⚠️ Backend not available, using mock registration');

        if (mockUsers.find(u => u.email === email)) {
          return { success: false, message: 'Email already registered' };
        }

        const newUser = {
          _id: String(mockUsers.length + 1),
          name,
          email,
          password,
          role: 'user',
          createdAt: new Date().toISOString()
        };

        setMockUsers([...mockUsers, newUser]);

        const userData = {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt
        };

        setUser(userData);
        localStorage.setItem('cafeUser', JSON.stringify(userData));
        return { success: true, user: userData };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cafeUser');
    localStorage.removeItem('cafeCart');
  };

  const isAdmin = () => user?.role === 'admin';
  const isAuthenticated = () => user !== null;

  const value = { user, login, register, logout, isAdmin, isAuthenticated, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
