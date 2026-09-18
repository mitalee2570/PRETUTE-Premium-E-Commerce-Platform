import React from 'react';

const ReviewsSection = () => {
  return (
    <div className="reviews-section" id="reviews">
      <div className="section-container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 className="section-title">Loved by Thousands of Parents</h2>
          <p style={{ color: 'var(--color-navy-light)', fontSize: '1rem' }}>
            Real reviews from our certified customers across India
          </p>
        </div>
        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-rating-stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <p>
              "The organic ribbed romper is by far the softest baby clothing we own. It washes beautifully without shrinking or losing its shape. Highly recommended!"
            </p>
            <div className="reviewer-info">
              <div className="reviewer-avatar">SM</div>
              <div className="reviewer-meta">
                <h5>Sarah Malhotra</h5>
                <span>Verified Buyer • Mumbai</span>
              </div>
            </div>
          </div>
          <div className="review-card">
            <div className="review-rating-stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <p>
              "The wooden rainbow stacker is exquisite. Real solid wood, no sharp edges, and completely non-toxic. My 2-year-old creates amazing structures every single day."
            </p>
            <div className="reviewer-info">
              <div className="reviewer-avatar">DL</div>
              <div className="reviewer-meta">
                <h5>David Lalwani</h5>
                <span>Verified Buyer • Bengaluru</span>
              </div>
            </div>
          </div>
          <div className="review-card">
            <div className="review-rating-stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <p>
              "AeroGlide stroller folded in one click and fit straight into the flight cabin overhead bin. Best parenting investment we made this year!"
            </p>
            <div className="reviewer-info">
              <div className="reviewer-avatar">PG</div>
              <div className="reviewer-meta">
                <h5>Priya Gupta</h5>
                <span>Verified Buyer • Delhi NCR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
