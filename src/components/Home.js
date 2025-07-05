import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
  // Farm product showcase images (royalty-free placeholder URLs)
  const farmProducts = [
    { name: 'Fresh Tomatoes', image: '/images/tomato.png' },
    { name: 'Organic Carrots', image: '/images/carrot.png' },
    { name: 'Leafy Spinach', image: '/images/Spinach.png' },
    { name: 'Juicy Oranges', image: '/images/Orange.png' },
    { name: 'Red Apples', image: '/images/Apple.png' },
    { name: 'Golden Wheat', image: '/images/Wheat.png' },
    { name: 'Fresh Corn', image: '/images/Corn.png' },
    { name: 'Fresh Dates', image: '/images/dates.png' },
  ];

  return (
    <div className="home">
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">🌱 "Grow your food. Nourish your soul. FarmFreshPlanters – where every leaf tells a story of care, health, and home."</h1>
            <p className="hero-description">
              Discover the freshest vegetables, fruits, grains, and more—delivered straight from our farms to your doorstep. Eat healthy, live better with farmfreshplanters.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary btn-large">
                Shop Farm Products
              </Link>
              <Link to="/register" className="btn btn-secondary btn-large">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose farmfreshplanters?</h2>
            <p>Discover the benefits that make us your trusted farm-to-table partner</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🥕</div>
              <h3>Vast Selection</h3>
              <p>
                Access over 50,000 farm-fresh products including vegetables, fruits, grains, and more. New harvests added daily.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Affordable Prices</h3>
              <p>
                Get premium quality produce at affordable prices. 
                Special discounts and bundle offers available regularly.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>
                Get your farm-fresh products delivered quickly and safely to your doorstep. 
                Track your order every step of the way.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Farm-to-Table Freshness</h3>
              <p>
                No middlemen, no long storage. Enjoy produce harvested and delivered at peak freshness.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Personalized Service</h3>
              <p>
                Get recommendations and support tailored to your dietary needs and preferences. 
                Discover new products you'll love.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Quality Guaranteed</h3>
              <p>
                Your satisfaction is protected by our freshness guarantee. Enjoy safe, healthy food with every order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Partner Farms</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.8/5</div>
              <div className="stat-label">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Healthy Journey?</h2>
            <p>Join thousands of happy customers who trust farmfreshplanters for their daily nutrition.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                Create Free Account
              </Link>
              <Link to="/contact" className="btn btn-outline btn-large">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Product Showcase */}
      <section style={{ margin: '3rem 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontWeight: 700 }}>Our Fresh Farm Products</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          maxWidth: 900,
          margin: '0 auto',
        }}>
          {farmProducts.map((product, idx) => (
            <div key={idx} style={{
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              padding: 16,
              textAlign: 'center',
              transition: 'transform 0.2s',
            }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
              <div style={{ fontWeight: 600, fontSize: 17 }}>{product.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
