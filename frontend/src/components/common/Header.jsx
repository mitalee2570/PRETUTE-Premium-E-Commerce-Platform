import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';

const Header = () => {
  const {
    settings,
    customer,
    cartTotalItems,
    wishlist,
    setCartDrawerOpen,
    setAuthModalState,
    setProfileModalOpen,
    setOrdersModalOpen,
    setRefundPolicyModalOpen,
    products,
    navigateTo,
    logoutCustomer
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdown & search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search suggestions logic
  useEffect(() => {
    if (searchVal.trim().length >= 2) {
      const q = searchVal.toLowerCase();
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q)) ||
        (p.shortDesc && p.shortDesc.toLowerCase().includes(q))
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchVal, products]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      setShowSuggestions(false);
      // Navigate or scroll to matching product
      if (suggestions.length > 0) {
        navigateTo('details', suggestions[0].id);
      }
    }
  };

  return (
    <header className={`main-header ${isScrolled ? 'scrolled sticky' : ''}`} id="mainHeader">
      {/* Top Announcement Bar */}
      {settings.announcementActive && (
        <div className="header-top">
          <p dangerouslySetInnerHTML={{ __html: settings.announcementText }} />
        </div>
      )}

      <div className="header-container">
        {/* Mobile Menu Toggle */}
        <button
          className="mobile-nav-toggle"
          id="mobileNavToggle"
          aria-label="Toggle Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className="fa-solid fa-bars-staggered"></i>
        </button>

        {/* Brand Logo Container */}
        <a
          href="#home"
          className="logo-container"
          id="logoLink"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('home');
          }}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <img
            src="/assets/kuakua-logo.png"
            alt="Kua Kua Crafts"
            className="brand-logo"
            id="brandLogoKuaKua"
            style={{ height: '56px', width: 'auto', objectFit: 'contain', transition: 'transform 0.2s ease' }}
          />
        </a>

        {/* Search Area */}
        <div className="search-wrapper" ref={searchRef}>
          <form className="search-form" id="searchForm" onSubmit={handleSearchSubmit} autoComplete="off">
            <input
              type="text"
              id="searchInput"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
              placeholder="Search for organic clothes, Montessori toys, gear..."
              aria-label="Search"
            />
            <button type="submit" className="search-btn" aria-label="Submit Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          {/* Dynamic Search Suggestions Popup */}
          {showSuggestions && (
            <div className="search-suggestions active" id="searchSuggestions" style={{ display: 'block' }}>
              {suggestions.length > 0 ? (
                suggestions.map((p) => (
                  <div
                    key={p.id}
                    className="suggestion-item"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #f0f0f5' }}
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchVal('');
                      navigateTo('details', p.id);
                    }}
                  >
                    <img
                      src={p.image.startsWith('assets/') ? `/${p.image}` : p.image}
                      alt={p.title}
                      style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '6px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1A253C' }}>{p.title}</div>
                      <div style={{ fontSize: '0.78rem', color: '#888' }}>
                        {p.categoryLabel} • ₹{p.price}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '14px', textAlign: 'center', color: '#777', fontSize: '0.85rem' }}>
                  No products found for "{searchVal}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Header Utility Icons */}
        <div className="header-utilities">
          {/* User Account Dropdown */}
          <div className="utility-item dropdown-wrapper" id="userAccountWrapper" ref={dropdownRef}>
            <button
              className="utility-btn"
              id="userMenuBtn"
              aria-label="User Account"
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <i className="fa-regular fa-user"></i>
              <span className="utility-label" id="userAccountLabel">
                {customer ? customer.name.split(' ')[0] : 'Account'}
              </span>
            </button>

            <div className={`utility-dropdown ${dropdownOpen ? 'show' : ''}`} id="userDropdown" style={{ display: dropdownOpen ? 'block' : 'none' }}>
              <div className="dropdown-header">
                <p className="dropdown-title" id="userDropdownTitle">
                  {customer ? `Hi, ${customer.name}!` : 'Welcome to PRETUTE'}
                </p>
                <p className="dropdown-subtitle" id="userDropdownSubtitle">
                  {customer ? customer.email : 'Access your account & orders'}
                </p>
              </div>

              {customer ? (
                <div>
                  <a
                    href="#profile"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      navigateTo('profile');
                    }}
                  >
                    <i className="fa-solid fa-id-badge"></i> My Profile & Details
                  </a>
                  <a
                    href="#orders"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      navigateTo('orders');
                    }}
                  >
                    <i className="fa-solid fa-box-open"></i> My Orders
                  </a>
                  <a
                    href="#wishlist"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      navigateTo('wishlist');
                    }}
                  >
                    <i className="fa-regular fa-heart"></i> My Wishlist
                  </a>
                  <a
                    href="#refund-policy"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      setRefundPolicyModalOpen(true);
                    }}
                  >
                    <i className="fa-solid fa-shield-halved"></i> Refund Policy
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    href="#logout"
                    className="dropdown-link"
                    style={{ color: '#FF5B7F' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      logoutCustomer();
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
                  </a>
                </div>
              ) : (
                <div>
                  <button
                    className="dropdown-link btn-login"
                    id="loginBtn"
                    style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'center', background: 'var(--color-primary)', color: '#fff', padding: '10px', borderRadius: '8px', fontWeight: 600 }}
                    onClick={() => {
                      setDropdownOpen(false);
                      setAuthModalState('signin');
                    }}
                  >
                    Sign In / Register
                  </button>
                  <a
                    href="#orders"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      setOrdersModalOpen(true);
                    }}
                  >
                    <i className="fa-solid fa-box-open"></i> My Orders
                  </a>
                  <a
                    href="#wishlist"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      navigateTo('wishlist');
                    }}
                  >
                    <i className="fa-regular fa-heart"></i> My Wishlist
                  </a>
                  <a
                    href="#refund-policy"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      setRefundPolicyModalOpen(true);
                    }}
                  >
                    <i className="fa-solid fa-shield-halved"></i> Refund Policy
                  </a>
                </div>
              )}

              {/* Direct Link to Admin Back Panel */}
              <div className="dropdown-divider"></div>
              <a
                href="#admin"
                className="dropdown-link"
                style={{ fontSize: '0.82rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(false);
                  navigateTo('admin');
                }}
              >
                <i className="fa-solid fa-shield-halved"></i> Admin Back Panel
              </a>
            </div>
          </div>

          {/* Wishlist Icon */}
          <a
            href="#wishlist"
            className="utility-item"
            id="wishlistIconBtn"
            aria-label="Wishlist"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('wishlist');
            }}
          >
            <div className="icon-badge-wrapper">
              <i className="fa-regular fa-heart"></i>
              <span className="badge" id="wishlistBadge">
                {wishlist.length}
              </span>
            </div>
            <span className="utility-label">Wishlist</span>
          </a>

          {/* Cart Icon & Trigger */}
          <button
            className="utility-item cart-trigger-btn"
            id="cartToggleBtn"
            aria-label="Shopping Cart"
            type="button"
            onClick={() => setCartDrawerOpen(true)}
          >
            <div className="icon-badge-wrapper">
              <i className="fa-solid fa-bag-shopping"></i>
              <span className="badge" id="cartBadge">
                {cartTotalItems}
              </span>
            </div>
            <div className="cart-text">
              <span className="utility-label">Bag</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
