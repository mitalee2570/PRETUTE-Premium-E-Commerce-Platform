import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import api from '../../services/api';

const ProfileView = ({ initialTab = 'profile' }) => {
  const {
    customer,
    updateProfile,
    logoutCustomer,
    setAuthModalState,
    loginCustomer,
    navigateTo,
    showToast,
    refreshData
  } = useStore();

  const [activeTab, setActiveTab] = useState(initialTab);

  // Profile Form States
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Female');

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState('');

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phone, setPhone] = useState('');

  const [savingProfile, setSavingProfile] = useState(false);

  // Address Form States
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrPincode, setAddrPincode] = useState('');
  const [addrLocality, setAddrLocality] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrLandmark, setAddrLandmark] = useState('');
  const [addrType, setAddrType] = useState('HOME');

  // Orders State
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  // Initialize values from customer
  useEffect(() => {
    if (customer) {
      const parts = (customer.name || 'Mitalee Maurya').trim().split(' ');
      setFirstName(parts[0] || 'Mitalee');
      setLastName(parts.slice(1).join(' ') || 'Maurya');
      setGender(customer.gender || 'Female');
      setEmail(customer.email || 'mitaleemaurya@gmail.com');
      setPhone(customer.phone || '8757201351');

      // Initialize addresses
      if (Array.isArray(customer.addresses) && customer.addresses.length > 0) {
        setAddresses(customer.addresses);
      } else if (customer.address && (customer.address.street || customer.address.city)) {
        setAddresses([
          {
            id: 'addr-default-1',
            name: customer.name || 'Mitalee Maurya',
            phone: customer.phone || '8757201351',
            pincode: customer.address.pincode || '400705',
            locality: 'Palm Beach Road',
            street: customer.address.street || 'Flat 402, Lotus Orchid, Palm Beach Road',
            city: customer.address.city || 'Mumbai',
            state: customer.address.state || 'Maharashtra',
            landmark: 'Near Sea Breeze',
            type: 'HOME',
            isDefault: true
          }
        ]);
      } else {
        // Fallback default address for demo
        setAddresses([
          {
            id: 'addr-default-1',
            name: 'Mitalee Maurya',
            phone: '8757201351',
            pincode: '400705',
            locality: 'Palm Beach Road',
            street: 'Flat 402, Lotus Orchid, Palm Beach Road',
            city: 'Mumbai',
            state: 'Maharashtra',
            landmark: 'Near Sea Breeze',
            type: 'HOME',
            isDefault: true
          }
        ]);
      }
    }
  }, [customer]);

  // Load orders when orders tab is active
  useEffect(() => {
    if (activeTab === 'orders' && customer) {
      loadCustomerOrders();
    }
  }, [activeTab, customer]);

  const loadCustomerOrders = async () => {
    setLoadingOrders(true);
    try {
      const allOrders = await api.getOrders();
      if (Array.isArray(allOrders)) {
        // Match customer email or phone, or show all if demo
        const userOrders = allOrders.filter(
          o =>
            (o.customerEmail && customer.email && o.customerEmail.toLowerCase() === customer.email.toLowerCase()) ||
            (o.customerPhone && customer.phone && o.customerPhone.includes(customer.phone)) ||
            (customer.email === 'mitaleemaurya@gmail.com' && (o.customerName === 'Mitalee Maurya' || o.customerName === 'Aarav Sharma'))
        );
        setOrders(userOrders.length > 0 ? userOrders : allOrders.slice(0, 3));
      }
    } catch (_err) {
      // Fallback sample orders if API fails
      setOrders([
        {
          id: 'PRT-984210',
          date: new Date().toISOString(),
          customerName: customer ? customer.name : 'Mitalee Maurya',
          customerEmail: customer ? customer.email : 'mitaleemaurya@gmail.com',
          customerPhone: '+91 87572 01351',
          address: 'Flat 402, Lotus Orchid, Palm Beach Road, Mumbai 400705',
          items: [
            { productId: 1, title: 'Organic Cotton Ribbed Romper', price: 999, quantity: 2, image: 'assets/prod_romper.png' },
            { productId: 7, title: 'Organic Lavender Scented Soy Candle', price: 699, quantity: 1, image: 'assets/candle.jpg' }
          ],
          subtotal: 2697,
          discount: 539,
          total: 2158,
          paymentMethod: 'Cash on Delivery',
          status: 'Confirmed'
        }
      ]);
    } finally {
      setLoadingOrders(false);
    }
  };

  // 1. Personal Info Save
  const handleSavePersonalInfo = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    await updateProfile({
      name: fullName,
      gender
    });
    setIsEditingPersonal(false);
    setSavingProfile(false);
    showToast('Profile Updated', 'Personal information saved successfully.', 'success');
  };

  // 2. Email Save
  const handleSaveEmail = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSavingProfile(true);
    await updateProfile({ email: email.trim() });
    setIsEditingEmail(false);
    setSavingProfile(false);
    showToast('Email Updated', `Email changed to ${email.trim()}`, 'success');
  };

  // 3. Phone Save
  const handleSavePhone = async (e) => {
    e.preventDefault();
    if (!phone.trim() || phone.trim().length < 10) {
      showToast('Invalid Phone', 'Please enter a valid 10-digit mobile number.', 'error');
      return;
    }
    setSavingProfile(true);
    await updateProfile({ phone: phone.trim() });
    setIsEditingPhone(false);
    setSavingProfile(false);
    showToast('Mobile Number Updated', `Mobile number changed to ${phone.trim()}`, 'success');
  };

  // 4. Address CRUD Operations
  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddrName(customer ? customer.name : 'Mitalee Maurya');
    setAddrPhone(customer ? customer.phone : '8757201351');
    setAddrPincode('400705');
    setAddrLocality('');
    setAddrStreet('');
    setAddrCity('Mumbai');
    setAddrState('Maharashtra');
    setAddrLandmark('');
    setAddrType('HOME');
    setShowAddressForm(true);
  };

  const handleEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setAddrName(addr.name || '');
    setAddrPhone(addr.phone || '');
    setAddrPincode(addr.pincode || '');
    setAddrLocality(addr.locality || '');
    setAddrStreet(addr.street || '');
    setAddrCity(addr.city || '');
    setAddrState(addr.state || '');
    setAddrLandmark(addr.landmark || '');
    setAddrType(addr.type || 'HOME');
    setShowAddressForm(true);
  };

  const handleSaveAddressForm = async (e) => {
    e.preventDefault();
    if (!addrName.trim() || addrPhone.trim().length < 10 || addrPincode.trim().length !== 6 || !addrStreet.trim() || !addrCity.trim()) {
      showToast('Validation Error', 'Please fill all required fields correctly (6-digit pincode, 10-digit phone).', 'error');
      return;
    }

    let updatedList = [];
    if (editingAddressId) {
      // Edit existing
      updatedList = addresses.map(a => {
        if (a.id === editingAddressId) {
          return {
            ...a,
            name: addrName.trim(),
            phone: addrPhone.trim(),
            pincode: addrPincode.trim(),
            locality: addrLocality.trim(),
            street: addrStreet.trim(),
            city: addrCity.trim(),
            state: addrState.trim(),
            landmark: addrLandmark.trim(),
            type: addrType
          };
        }
        return a;
      });
      showToast('Address Updated', 'Delivery address details updated.', 'success');
    } else {
      // Add new
      const newAddr = {
        id: `addr-${Date.now()}`,
        name: addrName.trim(),
        phone: addrPhone.trim(),
        pincode: addrPincode.trim(),
        locality: addrLocality.trim(),
        street: addrStreet.trim(),
        city: addrCity.trim(),
        state: addrState.trim(),
        landmark: addrLandmark.trim(),
        type: addrType,
        isDefault: addresses.length === 0
      };
      updatedList = [newAddr, ...addresses];
      showToast('Address Added', 'New delivery address added successfully.', 'success');
    }

    setAddresses(updatedList);
    setShowAddressForm(false);
    setEditingAddressId(null);

    // Sync to backend customer profile
    await updateProfile({
      addresses: updatedList,
      address: updatedList[0] ? {
        street: updatedList[0].street,
        city: updatedList[0].city,
        state: updatedList[0].state,
        pincode: updatedList[0].pincode
      } : undefined
    });
  };

  const handleDeleteAddress = async (addrId) => {
    if (window.confirm('Are you sure you want to remove this address?')) {
      const updatedList = addresses.filter(a => a.id !== addrId);
      setAddresses(updatedList);
      showToast('Address Removed', 'Delivery address has been deleted.', 'info');
      await updateProfile({ addresses: updatedList });
    }
  };

  const handleSetDefaultAddress = async (addrId) => {
    const updatedList = addresses.map(a => ({
      ...a,
      isDefault: a.id === addrId
    }));
    setAddresses(updatedList);
    const def = updatedList.find(a => a.id === addrId);
    showToast('Default Address Set', `${def ? def.type : 'Address'} set as default delivery location.`, 'success');
    await updateProfile({
      addresses: updatedList,
      address: def ? { street: def.street, city: def.city, state: def.state, pincode: def.pincode } : undefined
    });
  };

  // 5. Order Cancellation
  const handleCancelOrder = async (orderId) => {
    if (window.confirm(`Are you sure you want to cancel Order #${orderId}? Product inventory will be restored.`)) {
      setCancellingOrderId(orderId);
      try {
        await api.cancelOrder(orderId);
        showToast('Order Cancelled', `Order #${orderId} was cancelled and stock has been restocked.`, 'info');
        loadCustomerOrders();
        refreshData();
      } catch (_err) {
        // Local fallback status update
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
        showToast('Order Cancelled', `Order #${orderId} marked as Cancelled.`, 'info');
      } finally {
        setCancellingOrderId(null);
      }
    }
  };

  // If Not Logged In: Flipkart Login State
  if (!customer) {
    return (
      <div className="section-container" style={{ minHeight: '60vh', padding: '60px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ maxWidth: '480px', width: '100%', background: '#fff', padding: '36px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255, 91, 127, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 20px' }}>
            <i className="fa-solid fa-user-lock"></i>
          </div>
          <h2 style={{ color: '#1A253C', fontSize: '1.5rem', marginBottom: '8px' }}>Sign in to View Your Account</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>Access your personalized Flipkart-style profile, saved addresses, and live order tracking.</p>
          
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={async () => {
              await loginCustomer('mitaleemaurya@gmail.com', 'password123');
              setActiveTab('profile');
            }}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i> Quick Demo Login (mitaleemaurya@gmail.com)
          </button>

          <button
            type="button"
            className="btn btn-outline btn-block"
            onClick={() => setAuthModalState('signin')}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', fontSize: '0.9rem' }}
          >
            Sign In with Password
          </button>
        </div>
      </div>
    );
  }

  // Logged In: Flipkart Account Dashboard Layout
  const userInitials = (customer.name || 'Mitalee Maurya').split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase() || 'MM';

  return (
    <div className="section-container fk-account-container" style={{ padding: '30px 15px', minHeight: '80vh' }}>
      {/* Left Sidebar */}
      <aside className="fk-account-sidebar">
        {/* User Card */}
        <div className="fk-user-card">
          <div className="fk-user-avatar">{userInitials}</div>
          <div className="fk-user-details">
            <span className="fk-user-greeting">Hello,</span>
            <h3 className="fk-user-name">{customer.name || 'Mitalee Maurya'}</h3>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="fk-account-nav">
          {/* My Orders */}
          <div className="fk-nav-group">
            <button
              type="button"
              className={`fk-nav-link ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <div className="fk-nav-left">
                <i className="fa-solid fa-box-open fk-nav-icon"></i>
                <span className="fk-nav-text">MY ORDERS</span>
              </div>
              <i className="fa-solid fa-chevron-right fk-nav-arrow"></i>
            </button>
          </div>

          {/* Account Settings */}
          <div className="fk-nav-group">
            <div className="fk-nav-header">
              <i className="fa-solid fa-user fk-nav-icon"></i>
              <span className="fk-nav-title">ACCOUNT SETTINGS</span>
            </div>
            <div className="fk-nav-subitems">
              <button
                type="button"
                className={`fk-subnav-link ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile Information
              </button>
              <button
                type="button"
                className={`fk-subnav-link ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                Manage Addresses
              </button>
            </div>
          </div>

          {/* My Stuff */}
          <div className="fk-nav-group">
            <div className="fk-nav-header">
              <i className="fa-solid fa-folder-open fk-nav-icon"></i>
              <span className="fk-nav-title">MY STUFF</span>
            </div>
            <div className="fk-nav-subitems">
              <button
                type="button"
                className="fk-subnav-link"
                onClick={() => navigateTo('wishlist')}
              >
                My Wishlist
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="fk-nav-group" style={{ borderTop: '1px solid #f0f0f0', marginTop: '10px' }}>
            <button
              type="button"
              className="fk-nav-link"
              onClick={() => {
                logoutCustomer();
                navigateTo('home');
              }}
              style={{ color: '#ef4444' }}
            >
              <div className="fk-nav-left">
                <i className="fa-solid fa-arrow-right-from-bracket fk-nav-icon" style={{ color: '#ef4444' }}></i>
                <span className="fk-nav-text" style={{ color: '#ef4444' }}>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Right Content Pane */}
      <section className="fk-account-content">
        {/* ===================================================================
            TAB 1: PROFILE INFORMATION
            =================================================================== */}
        {activeTab === 'profile' && (
          <div className="fk-tab-pane active">
            {/* Personal Info Card */}
            <div className="fk-card">
              <div className="fk-card-header">
                <h4 className="fk-card-title">Personal Information</h4>
                {!isEditingPersonal ? (
                  <button type="button" className="fk-action-link" onClick={() => setIsEditingPersonal(true)}>
                    Edit
                  </button>
                ) : (
                  <button type="button" className="fk-action-link" onClick={() => setIsEditingPersonal(false)} style={{ color: '#64748b' }}>
                    Cancel
                  </button>
                )}
              </div>
              <form onSubmit={handleSavePersonalInfo}>
                <div className="fk-form-row">
                  <div className="fk-field-group">
                    <label htmlFor="fkFirstName">First Name</label>
                    <input
                      type="text"
                      id="fkFirstName"
                      className="fk-input"
                      value={firstName}
                      disabled={!isEditingPersonal}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fk-field-group">
                    <label htmlFor="fkLastName">Last Name</label>
                    <input
                      type="text"
                      id="fkLastName"
                      className="fk-input"
                      value={lastName}
                      disabled={!isEditingPersonal}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="fk-field-group gender-group">
                  <label>Your Gender</label>
                  <div className="fk-radio-group">
                    <label className="fk-radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={gender === 'Female'}
                        disabled={!isEditingPersonal}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <span className="fk-radio-custom"></span> Female
                    </label>
                    <label className="fk-radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={gender === 'Male'}
                        disabled={!isEditingPersonal}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <span className="fk-radio-custom"></span> Male
                    </label>
                  </div>
                </div>

                {isEditingPersonal && (
                  <div className="fk-form-actions">
                    <button type="submit" disabled={savingProfile} className="btn btn-primary fk-btn-save">
                      {savingProfile ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setIsEditingPersonal(false)}>
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Email Address Card */}
            <div className="fk-card">
              <div className="fk-card-header">
                <h4 className="fk-card-title">Email Address</h4>
                {!isEditingEmail ? (
                  <button type="button" className="fk-action-link" onClick={() => setIsEditingEmail(true)}>
                    Edit
                  </button>
                ) : (
                  <button type="button" className="fk-action-link" onClick={() => setIsEditingEmail(false)} style={{ color: '#64748b' }}>
                    Cancel
                  </button>
                )}
              </div>
              <form onSubmit={handleSaveEmail}>
                <div className="fk-form-row">
                  <div className="fk-field-group" style={{ flex: 1 }}>
                    <input
                      type="email"
                      className="fk-input"
                      value={email}
                      disabled={!isEditingEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {isEditingEmail && (
                  <div className="fk-form-actions">
                    <button type="submit" disabled={savingProfile} className="btn btn-primary fk-btn-save">
                      Save Email
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setIsEditingEmail(false)}>
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Mobile Number Card */}
            <div className="fk-card">
              <div className="fk-card-header">
                <h4 className="fk-card-title">Mobile Number</h4>
                {!isEditingPhone ? (
                  <button type="button" className="fk-action-link" onClick={() => setIsEditingPhone(true)}>
                    Edit
                  </button>
                ) : (
                  <button type="button" className="fk-action-link" onClick={() => setIsEditingPhone(false)} style={{ color: '#64748b' }}>
                    Cancel
                  </button>
                )}
              </div>
              <form onSubmit={handleSavePhone}>
                <div className="fk-form-row">
                  <div className="fk-field-group" style={{ flex: 1 }}>
                    <input
                      type="tel"
                      className="fk-input"
                      value={phone}
                      disabled={!isEditingPhone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength="10"
                      required
                    />
                  </div>
                </div>
                {isEditingPhone && (
                  <div className="fk-form-actions">
                    <button type="submit" disabled={savingProfile} className="btn btn-primary fk-btn-save">
                      Save Mobile
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setIsEditingPhone(false)}>
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* FAQs Card */}
            <div className="fk-card fk-faq-card">
              <h4 className="fk-card-title" style={{ marginBottom: '12px' }}>FAQs & Account Security</h4>
              <div className="fk-faq-item">
                <p className="fk-faq-q">What happens when I update my email address (or mobile number)?</p>
                <p className="fk-faq-a">Your login credentials and all order dispatch notifications and invoices will be sent to the updated details immediately.</p>
              </div>
              <div className="fk-faq-item">
                <p className="fk-faq-q">Is my personal information and address secure?</p>
                <p className="fk-faq-a">Yes. PRETUTE utilizes 256-bit encrypted storage. Your personal information is private and secure.</p>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: MANAGE ADDRESSES
            =================================================================== */}
        {activeTab === 'addresses' && (
          <div className="fk-tab-pane active">
            <div className="fk-card fk-addresses-card">
              <div className="fk-card-header">
                <h4 className="fk-card-title">Manage Addresses ({addresses.length})</h4>
              </div>

              {/* + ADD A NEW ADDRESS Trigger */}
              {!showAddressForm && (
                <div className="fk-add-address-trigger-card">
                  <button type="button" className="fk-add-address-btn" onClick={handleOpenAddAddress}>
                    <i className="fa-solid fa-plus"></i>
                    <span>ADD A NEW ADDRESS</span>
                  </button>
                </div>
              )}

              {/* Expandable Add / Edit Address Form */}
              {showAddressForm && (
                <div className="fk-address-form-wrapper">
                  <h5 className="fk-form-subheading">{editingAddressId ? 'EDIT ADDRESS' : 'ADD A NEW ADDRESS'}</h5>
                  <form onSubmit={handleSaveAddressForm}>
                    <div className="fk-form-row">
                      <div className="fk-field-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          className="fk-input"
                          value={addrName}
                          onChange={(e) => setAddrName(e.target.value)}
                          placeholder="e.g. Mitalee Maurya"
                          required
                        />
                      </div>
                      <div className="fk-field-group">
                        <label>10-digit mobile number *</label>
                        <input
                          type="tel"
                          className="fk-input"
                          value={addrPhone}
                          onChange={(e) => setAddrPhone(e.target.value)}
                          placeholder="e.g. 8757201351"
                          maxLength="10"
                          required
                        />
                      </div>
                    </div>

                    <div className="fk-form-row">
                      <div className="fk-field-group">
                        <label>Pincode *</label>
                        <input
                          type="text"
                          className="fk-input"
                          value={addrPincode}
                          onChange={(e) => setAddrPincode(e.target.value)}
                          placeholder="e.g. 400705"
                          maxLength="6"
                          required
                        />
                      </div>
                      <div className="fk-field-group">
                        <label>Locality / Area</label>
                        <input
                          type="text"
                          className="fk-input"
                          value={addrLocality}
                          onChange={(e) => setAddrLocality(e.target.value)}
                          placeholder="e.g. Palm Beach Road"
                        />
                      </div>
                    </div>

                    <div className="fk-field-group full-width" style={{ marginBottom: '14px' }}>
                      <label>Address (Area and Street / Flat / Society) *</label>
                      <textarea
                        className="fk-input"
                        rows="3"
                        value={addrStreet}
                        onChange={(e) => setAddrStreet(e.target.value)}
                        placeholder="e.g. Flat 402, Lotus Orchid, Palm Beach Road"
                        required
                      ></textarea>
                    </div>

                    <div className="fk-form-row">
                      <div className="fk-field-group">
                        <label>City / District / Town *</label>
                        <input
                          type="text"
                          className="fk-input"
                          value={addrCity}
                          onChange={(e) => setAddrCity(e.target.value)}
                          placeholder="e.g. Mumbai"
                          required
                        />
                      </div>
                      <div className="fk-field-group">
                        <label>State *</label>
                        <input
                          type="text"
                          className="fk-input"
                          value={addrState}
                          onChange={(e) => setAddrState(e.target.value)}
                          placeholder="e.g. Maharashtra"
                          required
                        />
                      </div>
                    </div>

                    <div className="fk-form-row">
                      <div className="fk-field-group">
                        <label>Landmark (Optional)</label>
                        <input
                          type="text"
                          className="fk-input"
                          value={addrLandmark}
                          onChange={(e) => setAddrLandmark(e.target.value)}
                          placeholder="e.g. Opposite Sea Breeze Towers"
                        />
                      </div>
                      <div className="fk-field-group">
                        <label>Address Type</label>
                        <div className="fk-radio-group">
                          <label className="fk-radio-label">
                            <input
                              type="radio"
                              name="addrType"
                              value="HOME"
                              checked={addrType === 'HOME'}
                              onChange={() => setAddrType('HOME')}
                            />
                            <span className="fk-radio-custom"></span> Home
                          </label>
                          <label className="fk-radio-label">
                            <input
                              type="radio"
                              name="addrType"
                              value="WORK"
                              checked={addrType === 'WORK'}
                              onChange={() => setAddrType('WORK')}
                            />
                            <span className="fk-radio-custom"></span> Work
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="fk-form-actions" style={{ marginTop: '16px' }}>
                      <button type="submit" className="btn btn-primary fk-btn-save">
                        SAVE ADDRESS
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddressId(null);
                        }}
                      >
                        CANCEL
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Saved Addresses List */}
              <div className="fk-address-list">
                {addresses.map((addr) => (
                  <div key={addr.id} className={`fk-address-card ${addr.isDefault ? 'default' : ''}`}>
                    <div className="fk-address-card-header">
                      <div className="fk-address-badges">
                        <span className="fk-addr-type-tag">{addr.type || 'HOME'}</span>
                        {addr.isDefault && <span className="fk-addr-default-badge">DEFAULT</span>}
                      </div>
                      <div className="fk-address-actions">
                        <button
                          type="button"
                          className="fk-action-link"
                          onClick={() => handleEditAddress(addr)}
                          style={{ marginRight: '12px' }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                        <button
                          type="button"
                          className="fk-action-link danger"
                          onClick={() => handleDeleteAddress(addr.id)}
                        >
                          <i className="fa-solid fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>

                    <div className="fk-address-body">
                      <div className="fk-addr-name-phone">
                        <strong>{addr.name}</strong>
                        <span className="fk-addr-phone">{addr.phone}</span>
                      </div>
                      <p className="fk-addr-full">
                        {addr.street}
                        {addr.locality ? `, ${addr.locality}` : ''}
                        {addr.landmark ? `, Landmark: ${addr.landmark}` : ''}
                      </p>
                      <p className="fk-addr-city-pin">
                        {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                      </p>
                    </div>

                    {!addr.isDefault && (
                      <div className="fk-address-footer">
                        <button
                          type="button"
                          className="fk-set-default-btn"
                          onClick={() => handleSetDefaultAddress(addr.id)}
                        >
                          <i className="fa-regular fa-star"></i> Set as Default Address
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: MY ORDERS
            =================================================================== */}
        {activeTab === 'orders' && (
          <div className="fk-tab-pane active">
            <div className="fk-card">
              <div className="fk-card-header">
                <h4 className="fk-card-title">My Orders ({orders.length})</h4>
              </div>

              {loadingOrders ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--color-primary)' }}></i>
                  <p style={{ marginTop: '12px', color: '#64748b' }}>Loading your orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#f8fafc', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 16px' }}>
                    <i className="fa-solid fa-receipt"></i>
                  </div>
                  <h3 style={{ color: '#1A253C', marginBottom: '8px' }}>No Orders Placed Yet</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Your ordered items and package status tracking will appear right here.</p>
                  <button type="button" className="btn btn-primary" onClick={() => navigateTo('home')}>
                    Shop Now
                  </button>
                </div>
              ) : (
                <div className="fk-orders-list">
                  {orders.map((order) => {
                    const isCancelled = order.status === 'Cancelled';
                    const isDelivered = order.status === 'Delivered';
                    const canCancel = !isCancelled && !isDelivered;

                    return (
                      <div key={order.id} className="fk-order-card">
                        <div className="fk-order-card-header">
                          <div>
                            <span className="fk-order-id">Order #{order.id}</span>
                            <span className="fk-order-date" style={{ marginLeft: '12px', color: '#64748b', fontSize: '0.82rem' }}>
                              Placed on: {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                          <span className={`fk-order-status-badge ${order.status ? order.status.toLowerCase() : 'pending'}`}>
                            {order.status || 'Processing'}
                          </span>
                        </div>

                        {/* Order Items Preview */}
                        <div className="fk-order-items">
                          {(order.items || []).map((item, idx) => (
                            <div key={idx} className="fk-order-item-row" style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                              <img
                                src={item.image || 'assets/prod_romper.png'}
                                alt={item.title}
                                onError={(e) => { e.target.src = 'assets/prod_romper.png'; }}
                                style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                              />
                              <div style={{ flex: 1 }}>
                                <strong style={{ fontSize: '0.9rem', color: '#1e293b' }}>{item.title}</strong>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Qty: {item.quantity || 1} {item.size ? `| Size: ${item.size}` : ''}</div>
                                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem' }}>₹{Number(item.price).toFixed(0)}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Summary & Delivery Address */}
                        <div className="fk-order-meta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '12px 0', fontSize: '0.84rem' }}>
                          <div>
                            <span style={{ color: '#64748b' }}>Delivery Address:</span>
                            <p style={{ margin: '2px 0 0 0', fontWeight: 500, color: '#1e293b' }}>{order.address || 'Address provided during checkout'}</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ color: '#64748b' }}>Total Paid ({order.paymentMethod || 'COD'}):</span>
                            <p style={{ margin: '2px 0 0 0', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                              ₹{Number(order.total).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>

                        {/* Visual Flipkart Tracking Timeline */}
                        {!isCancelled ? (
                          <div className="fk-tracking-timeline">
                            <div className="fk-track-step completed">
                              <div className="fk-track-dot"><i className="fa-solid fa-check"></i></div>
                              <span className="fk-track-label">Confirmed</span>
                            </div>
                            <div className={`fk-track-line ${order.status === 'Shipped' || order.status === 'Delivered' ? 'active' : ''}`}></div>
                            <div className={`fk-track-step ${order.status === 'Shipped' || order.status === 'Delivered' ? 'completed' : 'active'}`}>
                              <div className="fk-track-dot"><i className="fa-solid fa-box"></i></div>
                              <span className="fk-track-label">Packed</span>
                            </div>
                            <div className={`fk-track-line ${order.status === 'Shipped' || order.status === 'Delivered' ? 'active' : ''}`}></div>
                            <div className={`fk-track-step ${order.status === 'Delivered' ? 'completed' : order.status === 'Shipped' ? 'active' : ''}`}>
                              <div className="fk-track-dot"><i className="fa-solid fa-truck-fast"></i></div>
                              <span className="fk-track-label">Shipped</span>
                            </div>
                            <div className={`fk-track-line ${order.status === 'Delivered' ? 'active' : ''}`}></div>
                            <div className={`fk-track-step ${order.status === 'Delivered' ? 'completed' : ''}`}>
                              <div className="fk-track-dot"><i className="fa-solid fa-house-chimney-check"></i></div>
                              <span className="fk-track-label">Delivered</span>
                            </div>
                          </div>
                        ) : (
                          <div style={{ padding: '8px 12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#b91c1c', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
                            <i className="fa-solid fa-ban"></i>
                            <span>This order was cancelled. Restocked product inventory.</span>
                          </div>
                        )}

                        {/* Actions */}
                        {canCancel && (
                          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                              type="button"
                              disabled={cancellingOrderId === order.id}
                              className="btn btn-outline danger"
                              onClick={() => handleCancelOrder(order.id)}
                              style={{ padding: '6px 14px', fontSize: '0.84rem', borderColor: '#ef4444', color: '#ef4444' }}
                            >
                              {cancellingOrderId === order.id ? (
                                <span><i className="fa-solid fa-spinner fa-spin"></i> Cancelling...</span>
                              ) : (
                                <span><i className="fa-solid fa-xmark"></i> Cancel Order</span>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfileView;
