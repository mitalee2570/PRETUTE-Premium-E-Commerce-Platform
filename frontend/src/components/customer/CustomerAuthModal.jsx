import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

const CustomerAuthModal = () => {
  const { authModalState, setAuthModalState, loginCustomer, registerCustomer } = useStore();
  const [tab, setTab] = useState(authModalState || 'signin');

  // Sign In Form
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register Form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  if (!authModalState) return null;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    await loginCustomer(loginIdentifier, loginPassword);
    setLoginLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegLoading(true);
    await registerCustomer({
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword
    });
    setRegLoading(false);
  };

  const handleDemoLogin = async () => {
    setLoginIdentifier('mitaleemaurya@gmail.com');
    setLoginPassword('password123');
    setLoginLoading(true);
    await loginCustomer('mitaleemaurya@gmail.com', 'password123');
    setLoginLoading(false);
  };

  return (
    <div
      className="custom-modal-overlay active"
      id="customerAuthModal"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, padding: '20px' }}
      onClick={() => setAuthModalState(null)}
    >
      <div
        className="custom-modal-card"
        style={{ position: 'relative', width: '100%', maxWidth: '440px', background: '#fff', borderRadius: '16px', padding: '28px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="custom-modal-close"
          id="closeCustomerAuthBtn"
          aria-label="Close Authentication Modal"
          onClick={() => setAuthModalState(null)}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
        >
          &times;
        </button>

        {/* Tabs */}
        <div className="auth-tabs" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', marginBottom: '20px' }}>
          <button
            type="button"
            className={`auth-tab-btn ${tab === 'signin' ? 'active' : ''}`}
            onClick={() => setTab('signin')}
            style={{
              flex: 1,
              padding: '10px',
              background: 'none',
              border: 'none',
              borderBottom: tab === 'signin' ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: tab === 'signin' ? 'var(--color-primary)' : '#64748b',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${tab === 'register' ? 'active' : ''}`}
            onClick={() => setTab('register')}
            style={{
              flex: 1,
              padding: '10px',
              background: 'none',
              border: 'none',
              borderBottom: tab === 'register' ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: tab === 'register' ? 'var(--color-primary)' : '#64748b',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Create Account
          </button>
        </div>

        {tab === 'signin' ? (
          <form id="customerSignInForm" onSubmit={handleSignIn}>
            <div className="auth-input-group" style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Email Address or Mobile
              </label>
              <input
                type="text"
                required
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                placeholder="name@example.com or 10-digit mobile"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem' }}
              />
            </div>
            <div className="auth-input-group" style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem' }}
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="btn btn-primary btn-block"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 600, fontSize: '0.95rem', background: 'var(--color-primary)', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              {loginLoading ? 'Signing In...' : 'Sign In to My Account'}
            </button>

            <button
              type="button"
              className="btn btn-outline btn-block"
              id="demoCustomerLoginBtn"
              onClick={handleDemoLogin}
              style={{
                width: '100%',
                marginTop: '10px',
                padding: '10px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: '1.5px solid var(--color-primary)',
                borderRadius: '8px',
                color: 'var(--color-primary)',
                background: '#fff',
                cursor: 'pointer'
              }}
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i> Quick Demo Login (mitaleemaurya@gmail.com)
            </button>
          </form>
        ) : (
          <form id="customerRegisterForm" onSubmit={handleRegister}>
            <div className="auth-input-group" style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Your full name"
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem' }}
              />
            </div>
            <div className="auth-input-group" style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="name@example.com"
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem' }}
              />
            </div>
            <div className="auth-input-group" style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="10-digit mobile number"
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem' }}
              />
            </div>
            <div className="auth-input-group" style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Create Password *
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem' }}
              />
            </div>

            <button
              type="submit"
              disabled={regLoading}
              className="btn btn-primary btn-block"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 600, fontSize: '0.95rem', background: 'var(--color-primary)', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              {regLoading ? 'Creating Account...' : 'Create Free Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomerAuthModal;
