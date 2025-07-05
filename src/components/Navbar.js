import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  
  const navigate = useNavigate();

  

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <h1>🥬🥒🍅 Farm Fresh Planters 🍍🍎🍓</h1>
          </Link>
        </div>
        
        <div className="navbar-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        
        <div className="navbar-auth">
          <div className="auth-buttons">
            <button onClick={handleLogin} className="btn-login">Login</button>
            <button onClick={handleRegister} className="btn-register">Register</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;