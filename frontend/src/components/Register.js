import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock, FaCoffee, FaEnvelope } from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    const result = await register(name, email, password);

    if (result.success) {
      navigate('/home'); // Redirect to home page after registration
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
          <h1 className="login-title">Join Coffee Haven</h1>
          <p className="login-subtitle">Create your account and start ordering</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-login">
            <label htmlFor="name">
              <FaUser className="input-icon" /> Full Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control-login"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group-login">
            <label htmlFor="email">
              <FaEnvelope className="input-icon" /> Email Address
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <div className="form-group-login">
            <label htmlFor="confirmPassword">
              <FaLock className="input-icon" /> Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control-login"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                Creating Account...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <Link to="/login" className="register-link">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
