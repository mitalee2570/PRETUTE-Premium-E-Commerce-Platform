import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

const Navigation = () => {
  const {
    customer,
    setCartDrawerOpen,
    setAuthModalState,
    setProfileModalOpen,
    setOrdersModalOpen,
    setRefundPolicyModalOpen,
    navigateTo,
    currentView
  } = useStore();

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setMobileOpen(prev => !prev);
    window.addEventListener('toggle-mobile-menu', handleToggle);
    return () => window.removeEventListener('toggle-mobile-menu', handleToggle);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileOpen(false);
    if (sectionId === 'cart') {
      setCartDrawerOpen(true);
      return;
    }
    if (sectionId === 'home') {
      navigateTo('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionId === 'contact') {
      navigateTo('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Navigation Sidebar */}
      <div
        className={`mobile-sidebar-overlay ${mobileOpen ? 'active' : ''}`}
        id="mobileSidebarOverlay"
        style={{ display: mobileOpen ? 'block' : 'none' }}
        onClick={() => setMobileOpen(false)}
      ></div>

      <div className={`mobile-sidebar ${mobileOpen ? 'active' : ''}`} id="mobileSidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button
            className="close-sidebar-btn"
            id="closeSidebarBtn"
            aria-label="Close Menu"
            onClick={() => setMobileOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li>
            <a href="#home" className="mob-link" onClick={(e) => handleNavClick(e, 'home')}>
              <i className="fa-solid fa-house"></i> Home
            </a>
          </li>
          <li>
            <a href="#services" className="mob-link" onClick={(e) => handleNavClick(e, 'services')}>
              <i className="fa-solid fa-briefcase"></i> Services
            </a>
          </li>
          <li>
            <a href="#about" className="mob-link" onClick={(e) => handleNavClick(e, 'about')}>
              <i className="fa-solid fa-circle-info"></i> About
            </a>
          </li>
          <li>
            <a href="#reviews" className="mob-link" onClick={(e) => handleNavClick(e, 'reviews')}>
              <i className="fa-solid fa-star"></i> Reviews
            </a>
          </li>
          <li>
            <a href="#why-us" className="mob-link" onClick={(e) => handleNavClick(e, 'why-us')}>
              <i className="fa-solid fa-circle-check"></i> Why Us
            </a>
          </li>
          <li>
            <a href="#contact" className="mob-link" onClick={(e) => handleNavClick(e, 'contact')}>
              <i className="fa-solid fa-envelope"></i> Contact
            </a>
          </li>
          <li>
            <a href="#cart" className="mob-link" onClick={(e) => handleNavClick(e, 'cart')}>
              <i className="fa-solid fa-bag-shopping"></i> Cart
            </a>
          </li>
          <li>
            {customer ? (
              <a
                href="#profile"
                className="mob-link"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  navigateTo('profile');
                }}
              >
                <i className="fa-solid fa-id-badge"></i> {customer.name} (Profile)
              </a>
            ) : (
              <a
                href="#login"
                className="mob-link"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  setAuthModalState('signin');
                }}
              >
                <i className="fa-regular fa-user"></i> Sign In / Account
              </a>
            )}
          </li>
          <li>
            <a
              href="#orders"
              className="mob-link"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                navigateTo('orders');
              }}
            >
              <i className="fa-solid fa-box-open"></i> My Orders
            </a>
          </li>
          <li>
            <a
              href="#refund-policy"
              className="mob-link"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                setRefundPolicyModalOpen(true);
              }}
            >
              <i className="fa-solid fa-shield-halved"></i> Refund & Damage Policy
            </a>
          </li>
          <li>
            <a
              href="#admin"
              className="mob-link"
              style={{ color: '#6366f1' }}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                navigateTo('admin');
              }}
            >
              <i className="fa-solid fa-shield-halved"></i> Admin Back Panel
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <p>Support: mitaleemaurya@gmail.com | +91 87572 01351</p>
          <div className="mob-socials">
            <a href="#" className="social-circle"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="social-circle"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="social-circle"><i className="fa-brands fa-pinterest-p"></i></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
