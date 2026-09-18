import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import api from '../../services/api';

const AdminLayout = () => {
  const { adminToken, loginAdmin, logoutAdmin, navigateTo, showToast } = useStore();

  // Auth state
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'banners' | 'products' | 'categories' | 'orders' | 'coupons' | 'inquiries' | 'settings'

  // Admin Data
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState(null);

  // Filters & Modals
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Modals state
  const [productModal, setProductModal] = useState(null); // null | {}
  const [bannerModal, setBannerModal] = useState(null);
  const [couponModal, setCouponModal] = useState(null);
  const [invoiceModal, setInvoiceModal] = useState(null);

  // Load all admin data
  const loadAdminData = async () => {
    try {
      const [s, p, c, b, o, cp, m, st] = await Promise.allSettled([
        api.getAdminStats(),
        api.getProducts(),
        api.getCategories(),
        api.getBanners(),
        api.getOrders(),
        api.getCoupons(),
        api.getMessages(),
        api.getSettings()
      ]);
      if (s.status === 'fulfilled') setStats(s.value);
      if (p.status === 'fulfilled') setProducts(p.value);
      if (c.status === 'fulfilled') setCategories(c.value);
      if (b.status === 'fulfilled') setBanners(b.value);
      if (o.status === 'fulfilled') setOrders(o.value);
      if (cp.status === 'fulfilled') setCoupons(cp.value);
      if (m.status === 'fulfilled') setMessages(m.value);
      if (st.status === 'fulfilled') setSettings(st.value);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  useEffect(() => {
    if (adminToken) {
      loadAdminData();
    }
  }, [adminToken]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const res = await loginAdmin(pinInput);
    if (!res.success) {
      setAuthError(res.message || 'Invalid PIN or Password');
    }
    setAuthLoading(false);
  };

  // Product Actions
  const handleToggleStock = async (id) => {
    try {
      await api.toggleProductStock(id);
      loadAdminData();
      showToast('Stock Updated', 'Product stock status toggled.', 'success');
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await api.toggleProductStatus(id);
      loadAdminData();
      showToast('Status Updated', 'Product visibility toggled.', 'success');
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        loadAdminData();
        showToast('Product Deleted', 'Removed from store.', 'info');
      } catch (err) {
        showToast('Error', err.message, 'error');
      }
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (productModal.id) {
        await api.updateProduct(productModal.id, productModal);
        showToast('Product Updated', 'Changes saved.', 'success');
      } else {
        await api.createProduct(productModal);
        showToast('Product Created', 'New product added to store.', 'success');
      }
      setProductModal(null);
      loadAdminData();
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  // Order Actions
  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await api.updateOrderStatus(id, status);
      loadAdminData();
      showToast('Order Updated', `Order marked as ${status}.`, 'success');
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  // Banner Actions
  const handleToggleBanner = async (id) => {
    try {
      await api.toggleBanner(id);
      loadAdminData();
      showToast('Banner Updated', 'Banner status toggled.', 'success');
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  const handleSaveBanner = async (e) => {
    e.preventDefault();
    try {
      if (bannerModal.id) {
        await api.updateBanner(bannerModal.id, bannerModal);
        showToast('Banner Updated', 'Changes saved.', 'success');
      } else {
        await api.createBanner(bannerModal);
        showToast('Banner Created', 'New carousel slide added.', 'success');
      }
      setBannerModal(null);
      loadAdminData();
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  // Coupon Actions
  const handleSaveCoupon = async (e) => {
    e.preventDefault();
    try {
      await api.createCoupon(couponModal);
      showToast('Coupon Created', `Code ${couponModal.code} is now live.`, 'success');
      setCouponModal(null);
      loadAdminData();
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  const handleDeleteCoupon = async (code) => {
    if (window.confirm(`Delete coupon ${code}?`)) {
      try {
        await api.deleteCoupon(code);
        loadAdminData();
        showToast('Coupon Deleted', 'Coupon removed.', 'info');
      } catch (err) {
        showToast('Error', err.message, 'error');
      }
    }
  };

  // Inquiry Actions
  const handleMarkMessageRead = async (id, read) => {
    try {
      await api.markMessageRead(id, read);
      loadAdminData();
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  // Settings Actions
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await api.updateSettings(settings);
      showToast('Settings Saved', 'Store configuration updated.', 'success');
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  // Backup
  const handleExportBackup = async () => {
    try {
      const data = await api.exportBackup();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pretute_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      showToast('Backup Exported', 'Downloaded store database snapshot.', 'success');
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  // Reset to Factory Defaults
  const handleResetDefaults = async () => {
    if (window.confirm('Warning: This will reset products, categories, banners, and settings to original demo state. Proceed?')) {
      try {
        await api.resetDefaults();
        loadAdminData();
        showToast('Reset Complete', 'Database restored to defaults.', 'info');
      } catch (err) {
        showToast('Error', err.message, 'error');
      }
    }
  };

  // 1. If not authenticated, render Login Gate
  if (!adminToken) {
    return (
      <div className="admin-auth-overlay" id="authOverlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '20px' }}>
        <div className="auth-card" style={{ maxWidth: '420px', width: '100%', background: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div className="auth-header" style={{ marginBottom: '24px' }}>
            <div className="auth-logo-badge" style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fff1f2', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '12px' }}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h2 className="auth-title" style={{ margin: 0, color: '#1A253C' }}>PRETUTE Admin</h2>
            <p className="auth-subtitle" style={{ color: '#64748b', fontSize: '0.88rem', margin: '4px 0 0 0' }}>Store Management & Back Panel Access</p>
          </div>

          <form className="auth-form" id="adminLoginForm" onSubmit={handleLoginSubmit}>
            <div className="form-group" style={{ marginBottom: '18px', textAlign: 'left' }}>
              <label htmlFor="adminPassInput" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Password or PIN</label>
              <div className="auth-input-wrapper" style={{ position: 'relative' }}>
                <input
                  type="password"
                  id="adminPassInput"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (1234) or Password"
                  required
                  autoFocus
                  style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem' }}
                />
              </div>
              {authError && <div style={{ color: '#ef4444', fontSize: '0.82rem', marginTop: '6px', fontWeight: 600 }}>{authError}</div>}
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="auth-btn"
              id="loginSubmitBtn"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--color-primary)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span>{authLoading ? 'Verifying...' : 'Unlock Back Panel'}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>

            <button
              type="button"
              disabled={authLoading}
              onClick={async () => {
                setAuthLoading(true);
                setAuthError('');
                await loginAdmin('1234');
                setAuthLoading(false);
              }}
              style={{
                width: '100%',
                marginTop: '10px',
                padding: '11px',
                borderRadius: '8px',
                background: '#fff',
                color: 'var(--color-primary)',
                border: '1.5px solid var(--color-primary)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <i className="fa-solid fa-bolt"></i>
              <span>Quick Demo Unlock (One-Click)</span>
            </button>
          </form>


          <div className="auth-hints" style={{ marginTop: '20px', padding: '10px', background: '#f8fafc', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b' }}>
            <i className="fa-solid fa-circle-info"></i> Default PIN: <strong>1234</strong> or Password: <strong>admin123</strong>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('home')}
            style={{ marginTop: '16px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            ← Return to Storefront
          </button>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard Layout
  return (
    <div className="admin-wrapper" id="adminWrapper" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* SIDEBAR */}
      <aside className="admin-sidebar" id="adminSidebar" style={{ width: '260px', background: '#1A253C', color: '#fff', flexShrink: 0, padding: '20px 16px', display: 'flex', flexDirection: 'column' }}>
        <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
            <i className="fa-solid fa-crown"></i>
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', letterSpacing: '0.5px' }}>PRETUTE</h3>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Back Panel</span>
          </div>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
            { id: 'banners', label: 'Banners Slider', icon: 'fa-images', count: banners.length },
            { id: 'products', label: 'Products', icon: 'fa-boxes-stacked', count: products.length },
            { id: 'categories', label: 'Categories', icon: 'fa-layer-group', count: categories.length },
            { id: 'orders', label: 'Orders', icon: 'fa-cart-shopping', count: orders.length },
            { id: 'coupons', label: 'Discount Coupons', icon: 'fa-ticket', count: coupons.length },
            { id: 'inquiries', label: 'Inquiries', icon: 'fa-comments', count: messages.filter(m => !m.read).length },
            { id: 'settings', label: 'Store Settings', icon: 'fa-gear' }
          ].map(item => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: activeTab === item.id ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === item.id ? '#fff' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className={`fa-solid ${item.icon}`} style={{ width: '18px' }}></i>
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', background: activeTab === item.id ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.1)' }}>
                    {item.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Sidebar Footer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            type="button"
            onClick={() => navigateTo('home')}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <i className="fa-solid fa-arrow-left"></i> View Storefront
          </button>
          <button
            type="button"
            onClick={logoutAdmin}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: 'none', cursor: 'pointer', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <i className="fa-solid fa-lock"></i> Lock Back Panel
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#1A253C' }}>
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'banners' && 'Homepage Carousel Banners'}
              {activeTab === 'products' && 'Product Catalog Manager'}
              {activeTab === 'categories' && 'Store Categories'}
              {activeTab === 'orders' && 'Order Processing & Deliveries'}
              {activeTab === 'coupons' && 'Promotions & Promo Codes'}
              {activeTab === 'inquiries' && 'Customer Inquiries & Messages'}
              {activeTab === 'settings' && 'Store Configuration & Backups'}
            </h1>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>PRETUTE Administrator Control Panel</p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {activeTab === 'products' && (
              <button
                type="button"
                onClick={() => setProductModal({ title: '', category: 'baby-fashion', price: 999, originalPrice: 1299, stock: 20, badge: 'New', image: 'assets/prod_romper.png', shortDesc: '' })}
                className="btn btn-primary"
                style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
              >
                <i className="fa-solid fa-plus"></i> Add Product
              </button>
            )}
            {activeTab === 'banners' && (
              <button
                type="button"
                onClick={() => setBannerModal({ headline: '', subtitle: '', description: '', image: 'assets/hero_fashion.png', btn1Text: 'Shop Now', btn1Link: '#home' })}
                className="btn btn-primary"
                style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
              >
                <i className="fa-solid fa-plus"></i> Add Banner
              </button>
            )}
            {activeTab === 'coupons' && (
              <button
                type="button"
                onClick={() => setCouponModal({ code: '', type: 'percent', value: 20, minSpend: 0, description: '', usageLimit: 100 })}
                className="btn btn-primary"
                style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
              >
                <i className="fa-solid fa-plus"></i> Create Coupon
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>TOTAL REVENUE</span>
                <h2 style={{ fontSize: '1.8rem', color: '#1A253C', margin: '8px 0 0 0' }}>₹{stats ? stats.totalRevenue.toLocaleString() : '0'}</h2>
              </div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>TOTAL ORDERS</span>
                <h2 style={{ fontSize: '1.8rem', color: '#1A253C', margin: '8px 0 0 0' }}>{stats ? stats.totalOrders : '0'}</h2>
                <span style={{ fontSize: '0.78rem', color: '#f59e0b' }}>{stats?.pendingOrders || 0} pending fulfillment</span>
              </div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>PRODUCTS IN CATALOG</span>
                <h2 style={{ fontSize: '1.8rem', color: '#1A253C', margin: '8px 0 0 0' }}>{stats ? stats.totalProducts : '0'}</h2>
                <span style={{ fontSize: '0.78rem', color: '#10B981' }}>Active catalog items</span>
              </div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>CUSTOMER INQUIRIES</span>
                <h2 style={{ fontSize: '1.8rem', color: '#1A253C', margin: '8px 0 0 0' }}>{stats ? stats.totalInquiries : '0'}</h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>{stats?.unreadInquiries || 0} unread</span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#1A253C' }}>Recent Orders</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                    <th style={{ padding: '10px 12px' }}>Order ID</th>
                    <th style={{ padding: '10px 12px' }}>Customer</th>
                    <th style={{ padding: '10px 12px' }}>Items</th>
                    <th style={{ padding: '10px 12px' }}>Total</th>
                    <th style={{ padding: '10px 12px' }}>Payment</th>
                    <th style={{ padding: '10px 12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--color-primary)' }}>{o.id}</td>
                      <td style={{ padding: '10px 12px' }}>{o.customerName}</td>
                      <td style={{ padding: '10px 12px' }}>{o.items?.length || 1} items</td>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>₹{Math.round(o.total).toLocaleString()}</td>
                      <td style={{ padding: '10px 12px' }}>{o.paymentMethod}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700, background: o.status === 'Delivered' ? '#ECFDF5' : o.status === 'Shipped' ? '#EFF6FF' : '#FEF3C7', color: o.status === 'Delivered' ? '#047857' : o.status === 'Shipped' ? '#1D4ED8' : '#B45309' }}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by title..."
                style={{ flex: 1, minWidth: '240px', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
              />
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                  <th style={{ padding: '10px 12px' }}>Product</th>
                  <th style={{ padding: '10px 12px' }}>Category</th>
                  <th style={{ padding: '10px 12px' }}>Price</th>
                  <th style={{ padding: '10px 12px' }}>Stock</th>
                  <th style={{ padding: '10px 12px' }}>Status</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.filter(p => !productSearch || p.title.toLowerCase().includes(productSearch.toLowerCase())).map(p => {
                  const pImg = p.image?.startsWith('assets/') ? `/${p.image}` : p.image;
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={pImg} alt="" style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#f8fafc', borderRadius: '6px' }} />
                        <div>
                          <div style={{ fontWeight: 600, color: '#1A253C' }}>{p.title}</div>
                          {p.badge && <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)' }}>{p.badge}</span>}
                        </div>
                      </td>
                      <td style={{ padding: '10px 12px' }}>{p.categoryLabel || p.category}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>₹{p.price}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleStock(p.id)}
                          style={{ border: 'none', background: p.stock > 0 ? '#ECFDF5' : '#FEF2F2', color: p.stock > 0 ? '#047857' : '#EF4444', padding: '3px 8px', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                        </button>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(p.id)}
                          style={{ border: 'none', background: p.status !== 'deactivated' ? '#EFF6FF' : '#F1F5F9', color: p.status !== 'deactivated' ? '#1D4ED8' : '#64748B', padding: '3px 8px', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          {p.status !== 'deactivated' ? 'Active' : 'Deactivated'}
                        </button>
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => setProductModal(p)}
                          style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', marginRight: '10px' }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search orders by customer or ID..."
                style={{ flex: 1, minWidth: '240px', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
              />
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                  <th style={{ padding: '10px 12px' }}>Order ID</th>
                  <th style={{ padding: '10px 12px' }}>Date</th>
                  <th style={{ padding: '10px 12px' }}>Customer & Address</th>
                  <th style={{ padding: '10px 12px' }}>Total</th>
                  <th style={{ padding: '10px 12px' }}>Status</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter(o => orderStatusFilter === 'all' || o.status === orderStatusFilter)
                  .filter(o => !orderSearch || o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) || o.id.toLowerCase().includes(orderSearch.toLowerCase()))
                  .map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--color-primary)' }}>{o.id}</td>
                      <td style={{ padding: '10px 12px', fontSize: '0.8rem', color: '#64748b' }}>{new Date(o.date).toLocaleDateString()}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ fontWeight: 600 }}>{o.customerName}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{o.address}</div>
                      </td>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>₹{Math.round(o.total).toLocaleString()}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <select
                          value={o.status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.82rem', border: '1px solid #cbd5e1' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => setInvoiceModal(o)}
                          style={{ padding: '4px 10px', fontSize: '0.78rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                        >
                          Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: BANNERS */}
        {activeTab === 'banners' && (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {banners.map((b, idx) => {
                const bImg = b.image?.startsWith('assets/') ? `/${b.image}` : b.image;
                return (
                  <div key={b.id || idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                    <img src={bImg} alt="" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                    <div style={{ padding: '14px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>{b.subtitle}</div>
                      <h4 style={{ margin: '4px 0 8px 0', color: '#1A253C' }}>{b.headline || b.title}</h4>
                      <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 12px 0' }}>{b.description}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleBanner(b.id)}
                          style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', border: 'none', background: b.active !== false ? '#ECFDF5' : '#F1F5F9', color: b.active !== false ? '#047857' : '#64748b', cursor: 'pointer', fontWeight: 600 }}
                        >
                          {b.active !== false ? 'Active' : 'Hidden'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setBannerModal(b)}
                          style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS */}
        {activeTab === 'coupons' && (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                  <th style={{ padding: '10px 12px' }}>Code</th>
                  <th style={{ padding: '10px 12px' }}>Discount</th>
                  <th style={{ padding: '10px 12px' }}>Min Spend</th>
                  <th style={{ padding: '10px 12px' }}>Usage</th>
                  <th style={{ padding: '10px 12px' }}>Status</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map(c => (
                  <tr key={c.code} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--color-primary)' }}>{c.code}</td>
                    <td style={{ padding: '10px 12px' }}>{c.type === 'percent' ? `${c.value}% Off` : `₹${c.value} Flat`}</td>
                    <td style={{ padding: '10px 12px' }}>{c.minSpend ? `₹${c.minSpend}` : 'None'}</td>
                    <td style={{ padding: '10px 12px' }}>{c.usageCount || 0} / {c.usageLimit || '∞'}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600, background: c.status === 'active' ? '#ECFDF5' : '#FEF2F2', color: c.status === 'active' ? '#047857' : '#ef4444' }}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => handleDeleteCoupon(c.code)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 6: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>No messages found.</div>
              ) : (
                messages.map(m => (
                  <div key={m.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: m.read ? '#fff' : '#fff1f2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div>
                        <strong>{m.name}</strong> <span style={{ color: '#64748b', fontSize: '0.82rem' }}>({m.email})</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{new Date(m.date).toLocaleString()}</span>
                    </div>
                    <div style={{ fontWeight: 600, color: '#1A253C', marginBottom: '4px' }}>{m.subject}</div>
                    <p style={{ color: '#475569', fontSize: '0.88rem', margin: '0 0 10px 0' }}>{m.message}</p>
                    <button
                      type="button"
                      onClick={() => handleMarkMessageRead(m.id, !m.read)}
                      style={{ padding: '4px 10px', fontSize: '0.78rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                    >
                      {m.read ? 'Mark as Unread' : 'Mark as Read'}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS */}
        {activeTab === 'settings' && (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', maxWidth: '640px' }}>
            {settings && (
              <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Store Name</label>
                  <input
                    type="text"
                    value={settings.storeName || ''}
                    onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Announcement Top Bar</label>
                  <input
                    type="text"
                    value={settings.announcementText || ''}
                    onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Support Email</label>
                    <input
                      type="email"
                      value={settings.contactEmail || ''}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Support Phone</label>
                    <input
                      type="text"
                      value={settings.contactPhone || ''}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '10px', borderRadius: '6px', background: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  Save Store Settings
                </button>

                {/* Backup & Factory Reset */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginTop: '10px' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#1A253C' }}>Database Management</h4>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={handleExportBackup}
                      style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                      <i className="fa-solid fa-download"></i> Export Database JSON
                    </button>
                    <button
                      type="button"
                      onClick={handleResetDefaults}
                      style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #fca5a5', color: '#ef4444', background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                      <i className="fa-solid fa-rotate-left"></i> Reset to Factory Seeds
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      {/* Product Edit / Create Modal */}
      {productModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>{productModal.id ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Title *</label>
                <input
                  type="text"
                  required
                  value={productModal.title || ''}
                  onChange={(e) => setProductModal({ ...productModal, title: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productModal.price || ''}
                    onChange={(e) => setProductModal({ ...productModal, price: parseFloat(e.target.value) })}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Original Price (₹)</label>
                  <input
                    type="number"
                    value={productModal.originalPrice || ''}
                    onChange={(e) => setProductModal({ ...productModal, originalPrice: parseFloat(e.target.value) })}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Category</label>
                  <select
                    value={productModal.category || 'baby-fashion'}
                    onChange={(e) => setProductModal({ ...productModal, category: e.target.value, categoryLabel: e.target.options[e.target.selectedIndex].text })}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                  >
                    {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Stock Quantity</label>
                  <input
                    type="number"
                    value={productModal.stock || 0}
                    onChange={(e) => setProductModal({ ...productModal, stock: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Image Asset Path</label>
                <input
                  type="text"
                  value={productModal.image || 'assets/prod_romper.png'}
                  onChange={(e) => setProductModal({ ...productModal, image: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Short Description</label>
                <textarea
                  rows={2}
                  value={productModal.shortDesc || ''}
                  onChange={(e) => setProductModal({ ...productModal, shortDesc: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '10px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setProductModal(null)}
                  style={{ padding: '10px 16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Banner Edit / Create Modal */}
      {bannerModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '520px' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>{bannerModal.id ? 'Edit Banner' : 'Create Banner'}</h3>
            <form onSubmit={handleSaveBanner} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Headline *</label>
                <input
                  type="text"
                  required
                  value={bannerModal.headline || ''}
                  onChange={(e) => setBannerModal({ ...bannerModal, headline: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Subtitle</label>
                <input
                  type="text"
                  value={bannerModal.subtitle || ''}
                  onChange={(e) => setBannerModal({ ...bannerModal, subtitle: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Image Asset Path</label>
                <input
                  type="text"
                  value={bannerModal.image || ''}
                  onChange={(e) => setBannerModal({ ...bannerModal, image: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Description</label>
                <textarea
                  rows={2}
                  value={bannerModal.description || ''}
                  onChange={(e) => setBannerModal({ ...bannerModal, description: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '10px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Save Banner
                </button>
                <button
                  type="button"
                  onClick={() => setBannerModal(null)}
                  style={{ padding: '10px 16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {couponModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Create Promo Coupon</h3>
            <form onSubmit={handleSaveCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Code *</label>
                <input
                  type="text"
                  required
                  value={couponModal.code || ''}
                  onChange={(e) => setCouponModal({ ...couponModal, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. SUMMER25"
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', textTransform: 'uppercase' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Discount Value</label>
                  <input
                    type="number"
                    required
                    value={couponModal.value || 10}
                    onChange={(e) => setCouponModal({ ...couponModal, value: parseFloat(e.target.value) })}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Type</label>
                  <select
                    value={couponModal.type || 'percent'}
                    onChange={(e) => setCouponModal({ ...couponModal, type: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600 }}>Minimum Order Value (₹)</label>
                <input
                  type="number"
                  value={couponModal.minSpend || 0}
                  onChange={(e) => setCouponModal({ ...couponModal, minSpend: parseFloat(e.target.value) })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '10px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Create Coupon
                </button>
                <button
                  type="button"
                  onClick={() => setCouponModal(null)}
                  style={{ padding: '10px 16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal for Admin */}
      {invoiceModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
          <div style={{ background: '#fff', padding: '28px', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>PRETUTE</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>OFFICIAL INVOICE</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong>{invoiceModal.id}</strong>
                <div style={{ fontSize: '0.78rem' }}>{new Date(invoiceModal.date).toLocaleDateString()}</div>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', marginBottom: '14px', color: '#475569' }}>
              <div><strong>Customer:</strong> {invoiceModal.customerName} ({invoiceModal.customerEmail || 'No Email'})</div>
              <div><strong>Phone:</strong> {invoiceModal.customerPhone}</div>
              <div><strong>Address:</strong> {invoiceModal.address}</div>
              <div><strong>Payment:</strong> {invoiceModal.paymentMethod}</div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '16px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '6px' }}>Item</th>
                  <th style={{ textAlign: 'center', padding: '6px' }}>Qty</th>
                  <th style={{ textAlign: 'right', padding: '6px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceModal.items?.map((it, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px' }}>{it.title}</td>
                    <td style={{ textAlign: 'center', padding: '6px' }}>{it.quantity}</td>
                    <td style={{ textAlign: 'right', padding: '6px' }}>₹{(it.price * it.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ textAlign: 'right', fontSize: '0.95rem', fontWeight: 700, borderTop: '2px solid #e2e8f0', paddingTop: '8px' }}>
              Total: ₹{Math.round(invoiceModal.total).toLocaleString()}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{ flex: 1, padding: '10px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Print Invoice
              </button>
              <button
                type="button"
                onClick={() => setInvoiceModal(null)}
                style={{ padding: '10px 16px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
