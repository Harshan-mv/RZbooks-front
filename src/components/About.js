import React from 'react';
import Navbar from './Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="page">
          <h1>About farmfreshplanters</h1>
          
          <p>
            Welcome to farmfreshplanters, your trusted source for fresh, organic farm products delivered straight from our fields to your doorstep. 
            Founded in 2020, we've been passionate about making quality produce accessible to 
            consumers around the world through the power of digital technology.
          </p>

          <h2>Our Story</h2>
          <p>
            farmfreshplanters was born from a simple idea: everyone should have access to healthy, farm-fresh produce, 
            regardless of their location or circumstances. We started as a small team of produce enthusiasts who recognized the transformative power of digital publishing. Today, 
            we're proud to serve over 100,000 consumers worldwide with our carefully curated 
            collection of fresh produce.
          </p>

          <h2>Our Mission</h2>
          <p>
            To make healthy eating easy and accessible by delivering the freshest vegetables, fruits, grains, and more directly from our farms to your home. We believe 
            that great produce and valuable information should be available to everyone, anywhere, 
            at any time. Our platform connects consumers with farmers and producers to foster a vibrant produce ecosystem.
          </p>

          <h2>What We Offer</h2>
          <p>
            Our extensive catalog includes a wide variety of fresh produce, from organic fruits and vegetables to high-quality grains and legumes. We work directly with 
            farmers and producers to ensure our collection is both diverse and 
            high-quality.
          </p>

          <h2>Our Values</h2>
          <p>
            <strong>Accessibility:</strong> We believe everyone deserves access to fresh, nutritious food, 
            which is why we offer competitive pricing and flexible payment options.
          </p>
          <p>
            <strong>Quality:</strong> Every product in our collection is carefully selected to 
            ensure it meets our high standards for freshness and nutritional value.
          </p>
          <p>
            <strong>Innovation:</strong> We continuously improve our platform with new features 
            and technologies to enhance your eating experience.
          </p>
          <p>
            <strong>Community:</strong> We foster a community of consumers, farmers, and producers 
            who share a passion for healthy eating and learning.
          </p>

          <h2>Join Our Community</h2>
          <p>
            Whether you're a health-conscious family, a chef, or someone who loves fresh food, farmfreshplanters 
            has something for you. Join our growing community of fresh food lovers and discover your 
            next great produce today.
          </p>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p><em>"Eating is to the body what exercise is to the mind."</em> - Richard Steele</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;