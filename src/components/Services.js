import React from 'react';
import Navbar from './Navbar';

const Services = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="page">
          <h1>Our Services</h1>
          
          <p>
            At farmfreshplanters, we offer comprehensive fresh produce delivery and farm-to-table services 
            designed to serve customers, farmers, and businesses alike. Explore our range of 
            services below:
          </p>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📖</div>
              <h3>Digital Library Access</h3>
              <p>
                Access our vast collection of fresh vegetables, fruits, grains, and more—direct from our farms. 
                With new products added weekly, you'll never run out of great products.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">✍️</div>
              <h3>Author Publishing</h3>
              <p>
                Self-publishing made easy. We provide farmers with tools and platform 
                to deliver, distribute, and promote their farm-fresh products to customers citywide.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Publisher Partnership</h3>
              <p>
                Partner with us to expand your distribution network. We offer competitive 
                revenue sharing and marketing support for businesses of all sizes.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">📚</div>
              <h3>Educational Resources</h3>
              <p>
                Specialized educational content for students, teachers, 
                and institutions. Bulk licensing and institutional access available.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">💼</div>
              <h3>Corporate Solutions</h3>
              <p>
                Custom digital library solutions for businesses. Training materials, 
                professional farm produce, and corporate supply services.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Design & Formatting</h3>
              <p>
                Professional packaging and quality control services. We ensure your produce is fresh, clean, and ready to enjoy.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>Analytics & Insights</h3>
              <p>
                Comprehensive analytics for farmers and businesses. Track sales, 
                customer patterns, and market trends to optimize your product strategy.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3>Global Distribution</h3>
              <p>
                Citywide distribution network ensuring your farm products reach customers 
                across different areas and platforms with localized pricing.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Technical Support</h3>
              <p>
                24/7 technical support for all users. From delivery app issues to 
                24/7 technical support for all users. From reading app issues to 
                publishing questions, our expert team is here to help you succeed.
              </p>
            </div>
          </div>

          <h2>Why Choose Our Services?</h2>
          <p>
            <strong>Proven Track Record:</strong> We've successfully helped thousands of 
            authors and publishers reach their audience and achieve their goals.
          </p>
          <p>
            <strong>Competitive Pricing:</strong> Our services are priced competitively 
            with transparent fee structures and no hidden costs.
          </p>
          <p>
            <strong>Expert Support:</strong> Our team of publishing professionals, 
            designers, and technicians are here to support you every step of the way.
          </p>
          <p>
            <strong>Cutting-Edge Technology:</strong> We use the latest technology to 
            ensure optimal performance, security, and user experience.
          </p>

          <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
            <h3>Ready to Get Started?</h3>
            <p>Contact us today to learn more about how our services can help you achieve your publishing goals.</p>
            <a href="/contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;