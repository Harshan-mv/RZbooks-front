import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './LoginNavbar.css';

function LoginNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleProductList = () => {
    navigate('/products');
  };

  return (
    <nav className="login-navbar">
      <div className="login-navbar-container">
        <div className="login-navbar-brand">
          <Link to="/" className="login-navbar-logo">
            <h1>🌱 farmfreshplanters</h1>
          </Link>
        </div>
        
        <div className="login-navbar-menu">
          {!isAdmin && (
            <>
              <Link to="/products" className="login-nav-link">Products</Link>
            </>
          )}
          {!isAdmin && (
            <Link to="/view-orders" className="nav-link">My Orders</Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="nav-link">Admin Dashboard</Link>
          )}
          {isAdmin && (
            <Link to="/add-product" className="nav-link">Add Product</Link>
          )}
          {isAdmin && (
            <Link to="/admin/messages" className="nav-link">Messages</Link>
          )}
        </div>
        
        <div className="login-navbar-actions">
          <div className="user-welcome">
            <span className="welcome-message">Welcome, {user?.name || 'User'}! 👋</span>
          </div>
          
          <div className="action-buttons">
            {isAdmin && (
              location.pathname === '/add-product' ? (
                <button onClick={handleProductList} className="btn-add-product">
                  📚 Product List
                </button>
              ) : (
                <button onClick={handleAddProduct} className="btn-add-product">
                  ➕ Add Product
                </button>
              )
            )}
            <button onClick={handleLogout} className="btn-logout">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LoginNavbar; 