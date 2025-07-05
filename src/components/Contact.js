import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/messages`, formData);
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="page">
          <h1>Contact Us</h1>
          
          <p>
            We'd love to hear from you! Whether you have questions about our farm products, 
            need help with your order, or want to explore partnership opportunities, 
            our team is here to help.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '2rem' }}>
            {/* Contact Information */}
            <div>
              <h2>Get in Touch</h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <h3>📧 Email</h3>
                <p>support@farmfreshplanters.com</p>
                <p>partnerships@farmfreshplanters.com</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3>📱 Phone</h3>
                <p>+1 (555) 123-4567</p>
                <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3>🏢 Address</h3>
                <p>123 Digital Avenue<br />
                Tech City, TC 12345<br />
                United States</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3>💬 Live Chat</h3>
                <p>Available 24/7 for immediate assistance</p>
                <button className="btn btn-secondary" style={{ marginTop: '0.5rem' }}>
                  Start Chat
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="author">Author Services</option>
                    <option value="publisher">Publisher Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Please provide details about your inquiry..."
                    rows="5"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{ marginTop: '3rem' }}>
            <h2>Frequently Asked Questions</h2>
            
            <div style={{ marginTop: '2rem' }}>
              <h3>How do I track my farmfreshplanters order?</h3>
              <p>
                After purchase, you'll receive an order confirmation and tracking details via email. You can also 
                view your order status from your account dashboard at any time.
              </p>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <h3>What products do you offer?</h3>
              <p>
                We offer a wide range of fresh vegetables, fruits, grains, spices, and more—sourced directly from our farms and trusted partners.
              </p>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <h3>Do you offer refunds?</h3>
              <p>
                Yes, we offer a 7-day freshness guarantee. If you're not satisfied with the quality of your order, contact us for a replacement or refund.
              </p>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <h3>How can I become a partner farmer or supplier?</h3>
              <p>
                We're always looking for quality farm partners. Contact us with details about your produce and we'll discuss partnership opportunities.
              </p>
            </div>
          </div>

          {/* Office Hours */}
          <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
            <h3>Office Hours</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <strong>Monday - Friday:</strong><br />
                9:00 AM - 6:00 PM EST
              </div>
              <div>
                <strong>Saturday:</strong><br />
                10:00 AM - 4:00 PM EST
              </div>
              <div>
                <strong>Sunday:</strong><br />
                Closed
              </div>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
              *Emergency technical support available 24/7 for critical issues
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;    
