import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { getAssetUrl } from '../../utils/imageUrl';

const CustomerAuthModal = () => {
  const { authModalState, setAuthModalState, loginCustomer, registerCustomer, pendingPurchaseAction } = useStore();

  // Amazon Flow Step: 'enter_identifier' | 'enter_password' | 'create_account'
  const [step, setStep] = useState('enter_identifier');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (authModalState) {
      setStep('enter_identifier');
      setErrorMsg('');
      setPassword('');
    }
  }, [authModalState]);

  if (!authModalState) return null;

  // Step 1: User enters email or phone and clicks Continue
  const handleContinue = (e) => {
    e.preventDefault();
    const clean = identifier.trim();
    if (!clean) {
      setErrorMsg('Enter your email or mobile phone number');
      return;
    }
    setErrorMsg('');

    // Check if it matches known demo account or user
    const isKnown = clean.toLowerCase() === 'mitaleemaurya@gmail.com' || clean === '8757201351';
    if (isKnown) {
      setStep('enter_password');
    } else {
      // If valid email or 10-digit number, offer password or account setup
      if (clean.includes('@') || /^\d{10}$/.test(clean)) {
        setStep('enter_password');
      } else {
        setStep('create_account');
      }
    }
  };

  // Step 2: Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg('Enter your password');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      await loginCustomer(identifier.trim(), password);
    } catch (err) {
      setErrorMsg(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2 Alternate: Create Account
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Enter your name');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const isEmail = identifier.includes('@');
      await registerCustomer({
        name: name.trim(),
        email: isEmail ? identifier.trim() : `${identifier.trim()}@customer.kuakuacraft.com`,
        phone: isEmail ? '' : identifier.trim(),
        password: password
      });
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fast Quick Demo Login
  const handleDemoLogin = async () => {
    setLoading(true);
    setIdentifier('mitaleemaurya@gmail.com');
    setPassword('password123');
    await loginCustomer('mitaleemaurya@gmail.com', 'password123');
    setLoading(false);
  };

  return (
    <div
      className="custom-modal-overlay active"
      id="customerAuthModal"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.65)',
        zIndex: 9999,
        padding: '20px',
        backdropFilter: 'blur(2px)'
      }}
      onClick={() => setAuthModalState(null)}
    >
      <div
        className="amazon-auth-card"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '380px',
          background: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #d5d9d9',
          padding: '26px 30px 28px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
          fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Modal Button */}
        <button
          type="button"
          className="custom-modal-close"
          id="closeCustomerAuthBtn"
          aria-label="Close Authentication Modal"
          onClick={() => setAuthModalState(null)}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            fontSize: '1.4rem',
            cursor: 'pointer',
            color: '#565959',
            lineHeight: 1
          }}
        >
          &times;
        </button>

        {/* Brand Logo */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <img
            src={getAssetUrl('assets/kuakua-logo.png')}
            alt="Kuakua Craft"
            style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Pending Buy Now Banner */}
        {pendingPurchaseAction && (
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '0.82rem',
              color: '#166534',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fa-solid fa-lock" style={{ color: '#16a34a' }}></i>
            <span>Sign in to complete your <strong>Buy Now</strong> order securely.</span>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div
            style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '0.82rem',
              color: '#be123c',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Enter mobile number or email (Matches Image 1) */}
        {step === 'enter_identifier' && (
          <div>
            <h1
              style={{
                fontSize: '1.65rem',
                fontWeight: 600,
                color: '#0f1111',
                margin: '0 0 16px 0',
                lineHeight: 1.2
              }}
            >
              Sign in or create account
            </h1>

            <form onSubmit={handleContinue}>
              <div style={{ marginBottom: '14px' }}>
                <label
                  htmlFor="amazonAuthIdentifier"
                  style={{
                    display: 'block',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: '#0f1111',
                    marginBottom: '5px'
                  }}
                >
                  Enter mobile number or email
                </label>
                <input
                  id="amazonAuthIdentifier"
                  type="text"
                  autoFocus
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Mobile number or email"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    fontSize: '0.92rem',
                    border: '1px solid #888c8c',
                    borderRadius: '4px',
                    outline: 'none',
                    boxShadow: 'inset 0 1px 2px rgba(15, 17, 17, 0.15)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007185';
                    e.target.style.boxShadow = '0 0 0 3px #c8f3fa';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#888c8c';
                    e.target.style.boxShadow = 'inset 0 1px 2px rgba(15, 17, 17, 0.15)';
                  }}
                />
              </div>

              {/* Yellow Amazon Continue Button */}
              <button
                type="submit"
                id="amazonContinueBtn"
                style={{
                  width: '100%',
                  background: '#ffd814',
                  borderColor: '#fcd200',
                  color: '#0f1111',
                  border: '1px solid #fcd200',
                  borderRadius: '8px',
                  padding: '9px 14px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 5px rgba(213, 217, 217, 0.5)',
                  marginBottom: '16px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f7ca00')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#ffd814')}
              >
                Continue
              </button>
            </form>

            {/* Legal Notice */}
            <p
              style={{
                fontSize: '0.75rem',
                color: '#565959',
                lineHeight: 1.45,
                margin: '0 0 18px 0'
              }}
            >
              By continuing, you agree to Kuakua Craft's{' '}
              <a
                href="#terms"
                onClick={(e) => e.preventDefault()}
                style={{ color: '#007185', textDecoration: 'none' }}
              >
                Conditions of Use
              </a>{' '}
              and{' '}
              <a
                href="#privacy"
                onClick={(e) => e.preventDefault()}
                style={{ color: '#007185', textDecoration: 'none' }}
              >
                Privacy Notice
              </a>
              .
            </p>

            {/* Divider */}
            <div
              style={{
                borderTop: '1px solid #e7e7e7',
                paddingTop: '16px',
                marginTop: '16px'
              }}
            >
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f1111', marginBottom: '4px' }}>
                Buying for work?
              </div>
              <a
                href="#business"
                onClick={(e) => {
                  e.preventDefault();
                  setStep('create_account');
                }}
                style={{
                  fontSize: '0.82rem',
                  color: '#007185',
                  textDecoration: 'none',
                  display: 'inline-block',
                  marginBottom: '14px'
                }}
              >
                Create a free business account
              </a>

              {/* Quick 1-Click Demo Login */}
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  color: '#334155',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: 600
                }}
              >
                <i className="fa-solid fa-wand-magic-sparkles" style={{ color: '#eab308' }}></i>
                <span>{loading ? 'Signing In...' : 'Quick 1-Click Demo (mitaleemaurya@gmail.com)'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Password Sign In */}
        {step === 'enter_password' && (
          <div>
            <h1
              style={{
                fontSize: '1.65rem',
                fontWeight: 600,
                color: '#0f1111',
                margin: '0 0 12px 0',
                lineHeight: 1.2
              }}
            >
              Sign in
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', fontSize: '0.86rem' }}>
              <span style={{ color: '#0f1111', fontWeight: 600 }}>{identifier}</span>
              <button
                type="button"
                onClick={() => setStep('enter_identifier')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007185',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0
                }}
              >
                Change
              </button>
            </div>

            <form onSubmit={handleSignIn}>
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <label
                    htmlFor="amazonAuthPassword"
                    style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f1111' }}
                  >
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDemoLogin();
                    }}
                    style={{ fontSize: '0.78rem', color: '#007185', textDecoration: 'none' }}
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="amazonAuthPassword"
                  type="password"
                  autoFocus
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password (e.g. password123)"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    fontSize: '0.92rem',
                    border: '1px solid #888c8c',
                    borderRadius: '4px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007185';
                    e.target.style.boxShadow = '0 0 0 3px #c8f3fa';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#888c8c';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Yellow Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#ffd814',
                  borderColor: '#fcd200',
                  color: '#0f1111',
                  border: '1px solid #fcd200',
                  borderRadius: '8px',
                  padding: '9px 14px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 5px rgba(213, 217, 217, 0.5)',
                  marginBottom: '16px'
                }}
              >
                {loading ? 'Signing In...' : 'Sign in'}
              </button>
            </form>

            <div style={{ textAlign: 'center', borderTop: '1px solid #e7e7e7', paddingTop: '14px', marginTop: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: '#565959' }}>New customer? </span>
              <button
                type="button"
                onClick={() => setStep('create_account')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007185',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Create your Kuakua Craft account
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 Alternate: Create Account */}
        {step === 'create_account' && (
          <div>
            <h1
              style={{
                fontSize: '1.65rem',
                fontWeight: 600,
                color: '#0f1111',
                margin: '0 0 14px 0',
                lineHeight: 1.2
              }}
            >
              Create account
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', fontSize: '0.86rem' }}>
              <span style={{ color: '#0f1111', fontWeight: 600 }}>{identifier}</span>
              <button
                type="button"
                onClick={() => setStep('enter_identifier')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007185',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0
                }}
              >
                Change
              </button>
            </div>

            <form onSubmit={handleCreateAccount}>
              <div style={{ marginBottom: '12px' }}>
                <label
                  htmlFor="amazonRegName"
                  style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#0f1111', marginBottom: '4px' }}
                >
                  Your name
                </label>
                <input
                  id="amazonRegName"
                  type="text"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First and last name"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    fontSize: '0.92rem',
                    border: '1px solid #888c8c',
                    borderRadius: '4px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="amazonRegPassword"
                  style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#0f1111', marginBottom: '4px' }}
                >
                  Password
                </label>
                <input
                  id="amazonRegPassword"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    fontSize: '0.92rem',
                    border: '1px solid #888c8c',
                    borderRadius: '4px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <span style={{ fontSize: '0.72rem', color: '#565959', display: 'block', marginTop: '3px' }}>
                  Passwords must be at least 6 characters.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#ffd814',
                  borderColor: '#fcd200',
                  color: '#0f1111',
                  border: '1px solid #fcd200',
                  borderRadius: '8px',
                  padding: '9px 14px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 5px rgba(213, 217, 217, 0.5)',
                  marginBottom: '14px'
                }}
              >
                {loading ? 'Creating Account...' : 'Verify and Create Account'}
              </button>
            </form>

            <div style={{ textAlign: 'center', borderTop: '1px solid #e7e7e7', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: '#565959' }}>Already have an account? </span>
              <button
                type="button"
                onClick={() => setStep('enter_password')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007185',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Sign in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerAuthModal;
