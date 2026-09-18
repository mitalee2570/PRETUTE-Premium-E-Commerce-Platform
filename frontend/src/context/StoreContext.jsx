import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Store Data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [settings, setSettings] = useState({
    storeName: "PRETUTE | Premium Lifestyle & Crafts",
    announcementText: "🌟 Spend ₹1,499+ for Free Shipping! | Code: <span class=\"promo-highlight\">PRETUTE20</span>",
    announcementActive: true,
    currencySymbol: "₹",
    contactEmail: "mitaleemaurya@gmail.com",
    contactPhone: "+91 87572 01351"
  });
  const [loading, setLoading] = useState(true);

  // Cart & Wishlist
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pretute_cart')) || [];
    } catch (_e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pretute_wishlist')) || [];
    } catch (_e) {
      return [];
    }
  });

  const [promo, setPromo] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pretute_promo')) || null;
    } catch (_e) {
      return null;
    }
  });

  // Customer Session
  const [customer, setCustomer] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pretute_customer')) || null;
    } catch (_e) {
      return null;
    }
  });

  // Admin Auth
  const [adminToken, setAdminToken] = useState(() => {
    return sessionStorage.getItem('pretute_admin_token') || null;
  });
  // Determine initial view from pathname, hash, or search param
  const getInitialView = () => {
    try {
      const pathname = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '');
      const hash = (window.location.hash || '').toLowerCase();
      const search = (window.location.search || '').toLowerCase();
      if (pathname === '/admin' || pathname.startsWith('/admin') || hash === '#admin' || search.includes('admin')) {
        return 'admin';
      }
      if (pathname === '/wishlist' || hash === '#wishlist') return 'wishlist';
      if (pathname === '/contact' || hash === '#contact') return 'contact';
    } catch (_e) {}
    return 'home';
  };

  // Navigation & Views
  const [currentView, setCurrentView] = useState(getInitialView);
  const [activeCategorySlug, setActiveCategorySlug] = useState(null);
  const [activeProductId, setActiveProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState(null); // 'signin' | 'register' | null
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  const [refundPolicyModalOpen, setRefundPolicyModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = (title, message = '', type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('pretute_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('pretute_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (promo) {
      localStorage.setItem('pretute_promo', JSON.stringify(promo));
    } else {
      localStorage.removeItem('pretute_promo');
    }
  }, [promo]);

  useEffect(() => {
    if (customer) {
      localStorage.setItem('pretute_customer', JSON.stringify(customer));
    } else {
      localStorage.removeItem('pretute_customer');
    }
  }, [customer]);

  // Fetch all initial data
  const loadStoreData = async () => {
    try {
      setLoading(true);
      const [prodsData, catsData, bannersData, settingsData] = await Promise.allSettled([
        api.getProducts(),
        api.getCategories(),
        api.getBanners(),
        api.getSettings()
      ]);

      if (prodsData.status === 'fulfilled') setProducts(prodsData.value);
      if (catsData.status === 'fulfilled') setCategories(catsData.value);
      if (bannersData.status === 'fulfilled') setBanners(bannersData.value);
      if (settingsData.status === 'fulfilled') setSettings(prev => ({ ...prev, ...settingsData.value }));
    } catch (err) {
      console.error('Error fetching store data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStoreData();
  }, []);

  // Router Integration (Handles both /admin pathname and #admin hash)
  useEffect(() => {
    const handleRoute = () => {
      const pathname = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '');
      const hash = window.location.hash || '';
      const search = (window.location.search || '').toLowerCase();

      // 1. Admin route checks (pathname: /admin or /admin/ or hash: #admin or search ?admin)
      if (pathname === '/admin' || pathname.startsWith('/admin') || hash === '#admin' || search.includes('admin')) {
        setCurrentView('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 2. Modals via hash
      if (hash === '#login') {
        setAuthModalState('signin');
        return;
      }
      if (hash === '#profile') {
        setProfileModalOpen(true);
        return;
      }
      if (hash === '#orders') {
        setOrdersModalOpen(true);
        return;
      }
      if (hash === '#refund-policy') {
        setRefundPolicyModalOpen(true);
        return;
      }
      if (hash === '#cart') {
        setCartDrawerOpen(true);
        return;
      }

      // 3. Category view
      if (hash.startsWith('#category/')) {
        const cat = hash.split('/')[1];
        setActiveCategorySlug(cat);
        setCurrentView('category');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 4. Product details view
      if (hash.startsWith('#product/')) {
        const pid = parseInt(hash.split('/')[1]);
        setActiveProductId(pid);
        setCurrentView('details');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 5. Other views
      if (pathname === '/wishlist' || hash === '#wishlist') {
        setCurrentView('wishlist');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (pathname === '/contact' || hash === '#contact') {
        setCurrentView('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 6. Home & Section Scroll
      setCurrentView('home');
      if (hash && hash !== '#home' && hash.startsWith('#')) {
        const sectionId = hash.substring(1);
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (hash === '#home' || pathname === '' || pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Keyboard shortcut: Ctrl + Shift + A or Alt + Shift + A opens Admin immediately
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.location.hash = '#admin';
        setCurrentView('admin');
      }
    };

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    window.addEventListener('keydown', handleKeyDown);
    handleRoute();

    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Cart Operations
  const addToCart = (product, size = null, qty = 1) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.selectedSize === chosenSize);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prev, {
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          selectedSize: chosenSize,
          quantity: qty,
          maxStock: product.stock
        }];
      }
    });
    showToast('Added to Cart', `${product.title} (${chosenSize}) added!`, 'success');
  };

  const removeFromCart = (productId, selectedSize) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === selectedSize)));
    showToast('Item Removed', 'Product removed from your bag.', 'info');
  };

  const updateCartQuantity = (productId, selectedSize, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId && item.selectedSize === selectedSize) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
    setPromo(null);
  };

  // Promo operations
  const applyPromo = async (code) => {
    if (!code) return { success: false, message: 'Please enter a coupon code' };
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      const res = await api.validateCoupon(code, cartTotal, cart);
      if (res.valid) {
        const promoObj = {
          code: res.coupon.code,
          type: res.coupon.type,
          value: res.coupon.value,
          discountAmount: res.discountAmount,
          description: res.coupon.description
        };
        setPromo(promoObj);
        showToast('Coupon Applied! 🎉', res.message, 'success');
        return { success: true, message: res.message };
      }
    } catch (err) {
      // Fallback local promo validation
      const upper = code.toUpperCase().trim();
      if (upper === 'PRETUTE20') {
        const discount = (cartTotal * 20) / 100;
        const promoObj = { code: 'PRETUTE20', type: 'percent', value: 20, discountAmount: discount, description: 'Flat 20% Off' };
        setPromo(promoObj);
        showToast('Coupon Applied! 🎉', 'Flat 20% Off applied to your order!', 'success');
        return { success: true, message: 'Coupon applied!' };
      }
      showToast('Invalid Coupon', err.message || 'Coupon could not be applied.', 'error');
      return { success: false, message: err.message || 'Invalid coupon' };
    }
  };

  const removePromo = () => {
    setPromo(null);
    showToast('Coupon Removed', 'Promo code removed.', 'info');
  };

  // Wishlist Operations
  const toggleWishlist = (product) => {
    const prodId = typeof product === 'object' && product !== null ? product.id : product;
    const fullProd = typeof product === 'object' && product !== null ? product : products.find(p => p.id === prodId);
    setWishlist(prev => {
      const exists = prev.some(item => String(typeof item === 'object' && item !== null ? item.id : item) === String(prodId));
      if (exists) {
        showToast('Removed from Wishlist', `${fullProd?.title || 'Item'} removed from favorites.`, 'info');
        return prev.filter(item => String(typeof item === 'object' && item !== null ? item.id : item) !== String(prodId));
      } else {
        showToast('Added to Wishlist ❤️', `${fullProd?.title || 'Item'} saved to favorites!`, 'success');
        return [...prev, fullProd || prodId];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => String(typeof item === 'object' && item !== null ? item.id : item) === String(productId));
  };

  // Customer Auth
  const loginCustomer = async (identifier, password) => {
    try {
      const res = await api.loginCustomer(identifier, password);
      if (res.success) {
        setCustomer(res.customer);
        setAuthModalState(null);
        showToast(`Welcome back, ${res.customer.name}!`, 'Signed in successfully.', 'success');
        return { success: true };
      }
    } catch (err) {
      showToast('Sign In Failed', err.message, 'error');
      return { success: false, message: err.message };
    }
  };

  const registerCustomer = async (data) => {
    try {
      const res = await api.registerCustomer(data);
      if (res.success) {
        setCustomer(res.customer);
        setAuthModalState(null);
        showToast(`Welcome, ${res.customer.name}!`, 'Account created successfully.', 'success');
        return { success: true };
      }
    } catch (err) {
      showToast('Registration Failed', err.message, 'error');
      return { success: false, message: err.message };
    }
  };

  const updateProfile = async (data) => {
    if (!customer) return;
    try {
      const res = await api.updateCustomerProfile(customer.id, data);
      if (res.success) {
        setCustomer(res.customer);
        showToast('Profile Updated', 'Your details have been updated.', 'success');
        return { success: true };
      }
    } catch (err) {
      showToast('Update Failed', err.message, 'error');
      return { success: false, message: err.message };
    }
  };

  const logoutCustomer = () => {
    setCustomer(null);
    showToast('Signed Out', 'You have been signed out successfully.', 'info');
  };

  // Admin Auth
  const loginAdmin = async (credential) => {
    try {
      const res = await api.adminLogin(credential);
      if (res.success) {
        sessionStorage.setItem('pretute_admin_token', res.token);
        setAdminToken(res.token);
        showToast('Back Panel Unlocked', 'Welcome Admin!', 'success');
        return { success: true };
      }
    } catch (err) {
      showToast('Access Denied', err.message || 'Invalid PIN or Password', 'error');
      return { success: false, message: err.message };
    }
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem('pretute_admin_token');
    setAdminToken(null);
    window.location.hash = '#home';
    showToast('Admin Logged Out', 'Back Panel locked.', 'info');
  };

  // Nav helper
  const navigateTo = (view, param = null) => {
    if (view === 'home') {
      window.location.hash = '#home';
      setCurrentView('home');
    } else if (view === 'category') {
      window.location.hash = `#category/${param}`;
      setActiveCategorySlug(param);
      setCurrentView('category');
    } else if (view === 'details') {
      window.location.hash = `#product/${param}`;
      setActiveProductId(param);
      setCurrentView('details');
    } else if (view === 'admin') {
      window.location.hash = '#admin';
      setCurrentView('admin');
    } else if (view === 'wishlist') {
      window.location.hash = '#wishlist';
      setCurrentView('wishlist');
    } else if (view === 'contact') {
      window.location.hash = '#contact';
      setCurrentView('contact');
    }
  };


  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  let discountAmount = 0;
  if (promo) {
    if (promo.type === 'percent') {
      discountAmount = (cartSubtotal * promo.value) / 100;
    } else if (promo.type === 'flat') {
      discountAmount = Math.min(cartSubtotal, promo.value);
    } else if (promo.discountAmount) {
      discountAmount = promo.discountAmount;
    }
  }
  const freeShippingThreshold = 1499;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingFee = cart.length > 0 && !isFreeShipping ? 99 : 0;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        banners,
        settings,
        loading,
        refreshData: loadStoreData,
        // Cart
        cart,
        cartSubtotal,
        cartTotalItems,
        discountAmount,
        shippingFee,
        isFreeShipping,
        freeShippingThreshold,
        finalTotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartDrawerOpen,
        setCartDrawerOpen,
        // Promo
        promo,
        applyPromo,
        removePromo,
        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        // Customer
        customer,
        loginCustomer,
        registerCustomer,
        updateProfile,
        logoutCustomer,
        // Admin
        adminToken,
        loginAdmin,
        logoutAdmin,
        // Modals
        checkoutModalOpen,
        setCheckoutModalOpen,
        authModalState,
        setAuthModalState,
        profileModalOpen,
        setProfileModalOpen,
        ordersModalOpen,
        setOrdersModalOpen,
        refundPolicyModalOpen,
        setRefundPolicyModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        // Toasts
        toasts,
        showToast,
        removeToast,
        // Navigation & Views
        currentView,
        setCurrentView,
        activeCategorySlug,
        setActiveCategorySlug,
        activeProductId,
        setActiveProductId,
        searchQuery,
        setSearchQuery,
        navigateTo
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
