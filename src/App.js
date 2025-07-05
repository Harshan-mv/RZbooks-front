import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import { AuthProvider } from "./components/AuthContext";
import AdminDashboard from './components/AdminDashboard';
import ViewOrders from './components/ViewOrders';
import AdminMessages from './components/AdminMessages';

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="/view-orders" element={<ViewOrders />} />
            </Routes>
          </main>

          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <div className="footer-section">
                  <h3>farmfreshplanters</h3>
                  <p>Your trusted source for fresh, organic farm products delivered to your door.</p>
                </div>
                <div className="footer-section">
                  <h4>Quick Links</h4>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Farm Products</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h4>Services</h4>
                  <ul>
                    <li><Link to="/services">Digital Library</Link></li>
                    <li><Link to="/services">Publishing</Link></li>
                    <li><Link to="/services">Distribution</Link></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h4>Connect</h4>
                  <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; 2025 farmfreshplanters. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;