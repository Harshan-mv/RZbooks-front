import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from './AuthContext';
import Navbar from './Navbar';

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ Read API base URL from environment variable
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, form);
      
      if (response.data.success) {
        // Use the login function from AuthContext to manage auth state
        login(response.data.user, response.data.token);
        
        // Also store token in localStorage as backup
        localStorage.setItem("token", response.data.token);
        
        // Set isAdmin flag
        if (response.data.user.role === 'admin') {
          localStorage.setItem('isAdmin', 'true');
          setMsg("Admin login successful!");
          navigate("/admin");
        } else {
          localStorage.setItem('isAdmin', 'false');
          setMsg("Login successful!");
          navigate("/products");
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setMsg(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="page" style={{ maxWidth: '400px', margin: '2rem auto' }}>
          <h1>Welcome Back</h1>
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
            Sign in to your account to continue
          </p>
          
          <form onSubmit={handleSubmit} className="contact-form">
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
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-large" 
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          {msg && (
            <div 
              style={{ 
                marginTop: '1rem', 
                padding: '0.75rem', 
                borderRadius: '8px',
                backgroundColor: msg.includes('successful') ? '#d4edda' : '#f8d7da',
                color: msg.includes('successful') ? '#155724' : '#721c24',
                textAlign: 'center'
              }}
            >
              {msg}
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: '#666' }}>
              Don't have an account? {' '}
              <Link to="/register" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
                Create one here
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
        </div>
      </div>
    </>
  );
}

export default Login;
