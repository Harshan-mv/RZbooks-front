import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginNavbar from './LoginNavbar';
import './ProductList.css';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/api/user/myorders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data.orders);
    } catch (err) {
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="product-list-container">
      <LoginNavbar />
      <div className="product-list-content">
        <h2 className="product-list-title">My Orders</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, fontSize: 15 }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Order ID</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Product</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Quantity</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Amount</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{order._id}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{order.product?.name}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{order.quantity}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>₹{order.product?.price * order.quantity}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>
                    <span style={{
                      background: order.shipped ? 'green' : 'red',
                      color: '#fff',
                      borderRadius: 6,
                      padding: '4px 12px',
                      fontWeight: 600
                    }}>
                      {order.shipped ? 'Shipped' : 'Not Shipped'}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 16 }}>No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewOrders; 