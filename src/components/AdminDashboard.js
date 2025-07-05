import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginNavbar from './LoginNavbar';
import './ProductList.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all'); // all, shipped, notshipped
  const [sortBy, setSortBy] = useState('date'); // date or status
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/api/user/orders`, {
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

  const handleStatusToggle = async (orderId, shipped) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE_URL}/api/user/order/${orderId}/shipped`, { shipped }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      console.error('Order status update error:', err?.response || err);
      alert('Failed to update order status');
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'shipped') return order.shipped;
    if (filter === 'notshipped') return !order.shipped;
    return true;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'status') {
      return (a.shipped === b.shipped) ? 0 : a.shipped ? 1 : -1;
    }
    return 0;
  });

  const shippedCount = orders.filter(o => o.shipped).length;
  const notShippedCount = orders.filter(o => !o.shipped).length;

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="product-list-container">
      <LoginNavbar />
      <div className="product-list-content">
        <h2 className="product-list-title">Admin Dashboard - Orders</h2>
        <div style={{ marginBottom: 12, fontWeight: 500 }}>
          <span style={{ color: 'green', marginRight: 16 }}>Shipped: {shippedCount}</span>
          <span style={{ color: 'red' }}>Not Shipped: {notShippedCount}</span>
        </div>
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => setFilter('all')} style={{ marginRight: 8, fontWeight: filter==='all'?700:400 }}>All</button>
          <button onClick={() => setFilter('shipped')} style={{ marginRight: 8, color: 'green', fontWeight: filter==='shipped'?700:400 }}>Shipped</button>
          <button onClick={() => setFilter('notshipped')} style={{ color: 'red', fontWeight: filter==='notshipped'?700:400 }}>Not Shipped</button>
          <span style={{ marginLeft: 24 }}>
            Sort by:
            <button onClick={() => setSortBy('date')} style={{ marginLeft: 8, fontWeight: sortBy==='date'?700:400 }}>Date</button>
            <button onClick={() => setSortBy('status')} style={{ marginLeft: 8, fontWeight: sortBy==='status'?700:400 }}>Status</button>
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, fontSize: 15 }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Date</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Product</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Product ID</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Image</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Quantity</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Customer</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Payment ID</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Address</th>
                <th style={{ padding: 8, border: '1px solid #eee' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map(order => (
                <tr key={order._id} style={{ background: order.shipped ? '#f6fff6' : '#fff6f6' }}>
                  <td style={{ padding: 8, border: '1px solid #eee', whiteSpace: 'nowrap' }}>{order.createdAt ? format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm') : ''}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{order.product?.name}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{order.product?._id}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>
                    {order.product?.image && (
                      <img src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${order.product.image}`} alt={order.product.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4 }} />
                    )}
                  </td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{order.quantity}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{order.user?.name}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{order.payment?.paymentId}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>
                    {order.address.house}, {order.address.street}, {order.address.town},<br/>
                    {order.address.district}, {order.address.state} - {order.address.pincode}
                  </td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>
                    <button
                      style={{
                        background: order.shipped ? 'green' : 'red',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '6px 16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginRight: 8
                      }}
                      onClick={() => handleStatusToggle(order._id, !order.shipped)}
                    >
                      {order.shipped ? 'Shipped' : 'Not Shipped'}
                    </button>
                  </td>
                </tr>
              ))}
              {sortedOrders.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: 16 }}>No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 