import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginNavbar from './LoginNavbar';
import { useNavigate } from 'react-router-dom';

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/api/messages`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data.messages);
      } catch (err) {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [API_BASE_URL]);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="product-list-container">
      <LoginNavbar />
      <div className="product-list-content">
        <h2 className="product-list-title">Admin Dashboard - Messages</h2>
        {loading ? (
          <div>Loading...</div>
        ) : messages.length === 0 ? (
          <div>No messages found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, fontSize: 15 }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Date</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Name</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Email</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Subject</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Message</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Reply</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg._id}>
                  <td style={{ padding: 8, border: '1px solid #eee', whiteSpace: 'nowrap' }}>{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{msg.name}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{msg.email}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{msg.subject}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{msg.message}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>
                    <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`} style={{ color: 'blue', textDecoration: 'underline' }}>Mail</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminMessages; 