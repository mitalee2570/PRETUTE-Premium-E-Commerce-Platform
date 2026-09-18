import React from 'react';

const ValueProps = () => {
  return (
    <div className="services-section" id="services">
      <div className="section-container">
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon"><i className="fa-solid fa-truck-fast"></i></div>
            <div className="service-info">
              <h4>Express Shipping</h4>
              <p>Free delivery on all orders above ₹1,499</p>
            </div>
          </div>
          <div className="service-card">
            <div className="service-icon"><i className="fa-solid fa-leaf"></i></div>
            <div className="service-info">
              <h4>100% GOTS Organic</h4>
              <p>Toxin-free, natural fabrics for delicate skin</p>
            </div>
          </div>
          <div className="service-card">
            <div className="service-icon"><i className="fa-solid fa-rotate-left"></i></div>
            <div className="service-info">
              <h4>30-Day Easy Returns</h4>
              <p>Hassle-free replacement & full refunds</p>
            </div>
          </div>
          <div className="service-card">
            <div className="service-icon"><i className="fa-solid fa-headset"></i></div>
            <div className="service-info">
              <h4>Concierge Care</h4>
              <p>Expert parenting advice & dedicated support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProps;
