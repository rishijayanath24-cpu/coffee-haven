import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock, FaCoffee, FaUserShield } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // Check if user is admin or regular user
      if (result.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home'); // Redirect to home page (existing website)
      }
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="coffee-bean bean-1"></div>
        <div className="coffee-bean bean-2"></div>
        <div className="coffee-bean bean-3"></div>
        <div className="coffee-bean bean-4"></div>
        <div className="coffee-bean bean-5"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <FaCoffee className="login-logo" />
          </div>
          <h1 className="login-title">Coffee Haven</h1>
          <p className="login-subtitle">Welcome back! Please login to your account</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-login">
            <label htmlFor="email">
              <FaUser className="input-icon" /> Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control-login"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group-login">
            <label htmlFor="password">
              <FaLock className="input-icon" /> Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control-login"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register" className="register-link">Register here</Link></p>
        </div>

        <div className="quick-access">
          <p className="quick-access-title">Quick Access (Demo)</p>
          <div className="demo-credentials">
            <div className="demo-card">
              <FaUserShield className="demo-icon admin" />
              <h5>Admin Account</h5>
              <p className="demo-email">admin@cafe.com</p>
              <p className="demo-pass">admin123</p>
            </div>
            <div className="demo-card">
              <FaUser className="demo-icon user" />
              <h5>User Account</h5>
              <p className="demo-email">user@cafe.com</p>
              <p className="demo-pass">user123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
