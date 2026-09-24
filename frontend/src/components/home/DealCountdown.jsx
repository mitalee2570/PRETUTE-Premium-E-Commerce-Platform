import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

const DealCountdown = () => {
  const { showToast, applyPromo } = useStore();
  const [timeLeft, setTimeLeft] = useState('04:23:15');

  useEffect(() => {
    let totalSeconds = 4 * 3600 + 23 * 60 + 15;
    const interval = setInterval(() => {
      totalSeconds = totalSeconds > 0 ? totalSeconds - 1 : 4 * 3600;
      const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
      const secs = String(totalSeconds % 60).padStart(2, '0');
      setTimeLeft(`${hrs}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    applyPromo(code);
  };

  return (
    <div className="offers-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Exclusive Deals of the Day</h2>
          <div className="countdown-badge">
            <span className="label">ENDS IN:</span>
            <span className="timer-digits" id="offerCountdown">{timeLeft}</span>
          </div>
        </div>
        <div className="offers-grid">
          <div className="offer-card promo-card pink-card">
            <div className="offer-badge">FLAT 20% OFF</div>
            <h3 className="offer-title">Storewide Luxury Fest</h3>
            <p className="offer-sub">Flat 20% off entire order. Applies to all collections.</p>
            <div className="coupon-code-box">
              <span className="code">KUAKUA20</span>
              <button
                type="button"
                className="copy-coupon-btn"
                onClick={() => handleCopyCode('KUAKUA20')}
              >
                APPLY
              </button>
            </div>
          </div>
          <div className="offer-card promo-card gold-card">
            <div className="offer-badge">FLAT 25% OFF</div>
            <h3 className="offer-title">Nursery & Gear Fest</h3>
            <p className="offer-sub">Discount applied at checkout on gear, strollers & cribs.</p>
            <div className="coupon-code-box">
              <span className="code">GEAR25</span>
              <button
                type="button"
                className="copy-coupon-btn"
                onClick={() => handleCopyCode('GEAR25')}
              >
                APPLY
              </button>
            </div>
          </div>
          <div className="offer-card promo-card teal-card">
            <div className="offer-badge">FLAT ₹500 OFF</div>
            <h3 className="offer-title">Toys & Craft Kits</h3>
            <p className="offer-sub">On orders above ₹1,500 in Montessori toys and DIY craft kits.</p>
            <div className="coupon-code-box">
              <span className="code">PLAYFREE</span>
              <button
                type="button"
                className="copy-coupon-btn"
                onClick={() => handleCopyCode('PLAYFREE')}
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCountdown;
