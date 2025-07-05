import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from './Navbar';

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Use environment variable for base URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");
    
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, form);
      setMsg(res.data.message);
      // Reset form on successful registration
      if (res.data.message && !res.data.message.includes('error')) {
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="page" style={{ maxWidth: '400px', margin: '2rem auto' }}>
          <h1>Create Account</h1>
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
            Join thousands of fresh food lovers on farmfreshplanters
          </p>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                minLength="6"
              />
              <small style={{ color: '#666', fontSize: '0.85rem' }}>
                Password must be at least 6 characters long
              </small>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-large" 
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          {msg && (
            <div 
              style={{ 
                marginTop: '1rem', 
                padding: '0.75rem', 
                borderRadius: '8px',
                backgroundColor: msg.includes('success') || msg.includes('created') ? '#d4edda' : '#f8d7da',
                color: msg.includes('success') || msg.includes('created') ? '#155724' : '#721c24',
                textAlign: 'center'
              }}
            >
              {msg}
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: '#666' }}>
              Already have an account? {' '}
              <Link to="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
                Sign in here
              </Link>
            </p>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link 
              to="/" 
              style={{ 
                color: '#667eea', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              ← Back to Home
            </Link>
          </div>
          
          {/* Terms and Privacy */}
          <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', color: '#666' }}>
            <p>
              By creating an account, you agree to our{' '}
              <Link to="/terms" style={{ color: '#667eea', textDecoration: 'none' }}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" style={{ color: '#667eea', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;