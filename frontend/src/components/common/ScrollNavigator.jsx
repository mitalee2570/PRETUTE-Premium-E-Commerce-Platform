import React, { useState, useEffect } from 'react';

const ScrollNavigator = () => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  // Monitor scroll position
  useEffect(() => {
    const checkScroll = () => {
      // If user has scrolled more than 300px, indicate Top; else indicate Bottom
      setIsScrolledDown(window.scrollY > 300);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Scroll actions
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    const maxScroll = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );
    window.scrollTo({
      top: maxScroll,
      behavior: 'smooth'
    });
  };

  // Main button toggle: Top if scrolled down, Bottom if at top
  const handleToggle = () => {
    if (isScrolledDown) {
      scrollToTop();
    } else {
      scrollToBottom();
    }
  };

  return (
    <div
      className="scroll-navigator-widget"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9990,
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      <button
        type="button"
        className="scroll-btn-pill"
        onClick={handleToggle}
        aria-label={isScrolledDown ? 'Scroll to Top' : 'Scroll to Bottom'}
        title={isScrolledDown ? 'Scroll to Top (ऊपर जाएं)' : 'Scroll to Bottom (नीचे जाएं)'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 18px',
          background: 'linear-gradient(135deg, var(--color-primary, #e11d48) 0%, #be123c 100%)',
          border: 'none',
          borderRadius: '50px',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(225, 29, 72, 0.4)',
          cursor: 'pointer',
          fontSize: '0.92rem',
          fontWeight: 600,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
          userSelect: 'none'
        }}
      >
        <i
          className={`fa-solid ${isScrolledDown ? 'fa-arrow-up' : 'fa-arrow-down'}`}
          style={{
            fontSize: '1.05rem',
            transition: 'transform 0.25s ease'
          }}
        ></i>
        <span style={{ fontSize: '0.85rem', letterSpacing: '0.3px' }}>
          {isScrolledDown ? 'Top' : 'Bottom'}
        </span>
      </button>

      <style>{`
        .scroll-btn-pill:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 12px 28px rgba(225, 29, 72, 0.55);
        }
        .scroll-btn-pill:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default ScrollNavigator;
