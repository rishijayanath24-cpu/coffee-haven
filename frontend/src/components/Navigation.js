import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaCoffee, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Navigation({ cartCount, toggleCart }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <FaCoffee className="me-2 text-gold" />
          Coffee Haven 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
            <Nav.Link as={Link} to="/orders">My Orders</Nav.Link>
            <Nav.Link onClick={toggleCart} style={{ position: 'relative', cursor: 'pointer' }}>
              <FaShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Nav.Link>
            {user && (
              <>
                <Nav.Link className="user-info">
                  <FaUser className="me-1" /> {user.name}
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="logout-link">
                  <FaSignOutAlt className="me-1" /> Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
