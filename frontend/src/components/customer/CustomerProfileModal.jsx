import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

const CustomerProfileModal = () => {
  const { customer, profileModalOpen, setProfileModalOpen, updateProfile, logoutCustomer, setOrdersModalOpen } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (customer) {
      setName(customer.name || '');
      setEmail(customer.email || '');
      setPhone(customer.phone || '');
      if (customer.address) {
        setStreet(customer.address.street || '');
        setCity(customer.address.city || '');
        setState(customer.address.state || '');
        setPincode(customer.address.pincode || '');
      }
    }
  }, [customer]);

  if (!profileModalOpen || !customer) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile({
      name,
      email,
      phone,
      address: { street, city, state, pincode }
    });
    setSaving(false);
  };

  return (
    <div
      className="custom-modal-overlay active"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, padding: '20px' }}
      onClick={() => setProfileModalOpen(false)}
    >
      <div
        className="custom-modal-card"
        style={{ position: 'relative', width: '100%', maxWidth: '540px', background: '#fff', borderRadius: '16px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setProfileModalOpen(false)}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
        >
          &times;
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff1f2', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
            <i className="fa-solid fa-id-badge"></i>
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#1A253C' }}>My Profile & Settings</h2>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>Manage your personal details and delivery addresses</p>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Mobile</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', marginTop: '6px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#1A253C' }}>Default Delivery Address</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Street / Flat / Apartment"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9rem' }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: '100%', padding: '9px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{ width: '100%', padding: '9px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    style={{ width: '100%', padding: '9px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary"
              style={{ flex: 1, padding: '10px', borderRadius: '8px', fontWeight: 600, background: 'var(--color-primary)', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setProfileModalOpen(false);
                setOrdersModalOpen(true);
              }}
              style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
            >
              <i className="fa-solid fa-box-open"></i> Orders
            </button>
            <button
              type="button"
              onClick={() => {
                setProfileModalOpen(false);
                logoutCustomer();
              }}
              style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #fca5a5', color: '#ef4444', background: '#fff', cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerProfileModal;
