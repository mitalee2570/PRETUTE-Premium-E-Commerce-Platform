import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { getAssetUrl } from '../../utils/imageUrl';

const Footer = () => {
  const { navigateTo, setRefundPolicyModalOpen, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      showToast('Subscribed!', 'Welcome to Kuakua Craft! 15% discount code sent to your inbox.', 'success');
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="section-container footer-grid">
          {/* Col 1: About */}
          <div className="footer-col about-col">
            <a
              href="#home"
              className="footer-logo"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '68px',
                height: '68px',
                background: '#ffffff',
                borderRadius: '50%',
                padding: '4px',
                marginBottom: '18px',
                overflow: 'hidden',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                textDecoration: 'none'
              }}
            >
              <img
                src={getAssetUrl('assets/kuakua-logo.png')}
                alt="Kua Kua Crafts"
                className="footer-brand-logo"
                style={{ height: '60px', width: 'auto', maxWidth: 'none', objectFit: 'contain' }}
              />
            </a>
            <p className="about-text">
              Kuakua Craft is an artisan lifestyle and fine art studio dedicated to handcrafted resin art, soft pastels & drawing materials, Montessori wooden creations, scented soy candles, and custom keepsakes.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="Pinterest"><i className="fa-brands fa-pinterest-p"></i></a>
              <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="footer-col links-col">
            <h4 className="col-title">Shop Categories</h4>
            <ul className="footer-links">
              <li>
                <a href="#category/baby-fashion" onClick={(e) => { e.preventDefault(); navigateTo('category', 'baby-fashion'); }}>
                  Baby & Kids Wear
                </a>
              </li>
              <li>
                <a href="#category/wooden-toys" onClick={(e) => { e.preventDefault(); navigateTo('category', 'wooden-toys'); }}>
                  Montessori Toys
                </a>
              </li>
              <li>
                <a href="#category/baby-gear" onClick={(e) => { e.preventDefault(); navigateTo('category', 'baby-gear'); }}>
                  Nursery & Gear
                </a>
              </li>
              <li>
                <a href="#category/maternity" onClick={(e) => { e.preventDefault(); navigateTo('category', 'maternity'); }}>
                  Maternity Wear
                </a>
              </li>
              <li>
                <a href="#category/resin-art" onClick={(e) => { e.preventDefault(); navigateTo('category', 'resin-art'); }}>
                  Artisan Crafts & Decor
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="footer-col links-col">
            <h4 className="col-title">Customer Care</h4>
            <ul className="footer-links">
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
                  Shipping & Deliveries
                </a>
              </li>
              <li>
                <a
                  href="#refund-policy"
                  id="footerRefundPolicyLink"
                  onClick={(e) => {
                    e.preventDefault();
                    setRefundPolicyModalOpen(true);
                  }}
                >
                  Return & Refund Policy (Damage Video)
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
                  FAQ & Help
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="footer-col newsletter-col">
            <h4 className="col-title">Join the PRETUTE Club</h4>
            <p className="newsletter-text">
              Subscribe to receive launch previews, organic parenting insights, and 15% off your first order.
            </p>
            <form className="newsletter-form" id="newsletterForm" onSubmit={handleSubscribe} autoComplete="off">
              <div className="input-row">
                <input
                  type="email"
                  id="newsletterEmail"
                  required
                  placeholder="Your email address"
                  aria-label="Newsletter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" aria-label="Subscribe">
                  <i className="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>
            </form>
            {subscribed && (
              <div className="newsletter-success active" id="newsletterSuccess" style={{ display: 'block' }}>
                ✓ Subscribed successfully! Check your inbox.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="section-container bottom-row">
          <p className="copyright" id="footerCopyright" title="Kuakua Craft Store">
            &copy; 2026 Kuakua Craft. All rights reserved.
          </p>
          <div className="payment-methods">
            <i className="fa-brands fa-cc-visa"></i>
            <i className="fa-brands fa-cc-mastercard"></i>
            <i className="fa-brands fa-cc-stripe"></i>
            <i className="fa-brands fa-cc-apple-pay"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
