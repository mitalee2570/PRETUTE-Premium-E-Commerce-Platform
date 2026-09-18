import React from 'react';

const PhilosophySection = () => {
  return (
    <div className="philosophy-section" id="why-us">
      <div id="about"></div>
      <div className="section-container philosophy-grid">
        <div className="philosophy-card">
          <div className="icon-wrapper"><i className="fa-solid fa-seedling"></i></div>
          <h4>100% Organic Materials</h4>
          <p>We source only GOTS-certified organic cotton, chemical-free dyes, and solid sustainably-harvested timber.</p>
        </div>
        <div className="philosophy-card">
          <div className="icon-wrapper"><i className="fa-solid fa-shield-halved"></i></div>
          <h4>Safety First Certification</h4>
          <p>Every toy, crib, and carrier is rigorously tested against safety standards to ensure toxin-free and child-safe play.</p>
        </div>
        <div className="philosophy-card">
          <div className="icon-wrapper"><i className="fa-solid fa-hands-holding"></i></div>
          <h4>Artisan Handcrafted</h4>
          <p>Our wooden stackers and fabric dolls are made in small batches by global artisan families with love.</p>
        </div>
      </div>
    </div>
  );
};

export default PhilosophySection;
