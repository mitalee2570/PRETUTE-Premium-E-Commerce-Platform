import { initialProducts, initialCategories, initialBanners } from '../data/initialData';

const API_BASE_URL = 'http://localhost:5000/api';

// Local storage helper for offline / backend-down resilience
const STORAGE_PREFIX = 'pretute_local_';

function getLocal(key, fallback) {
  try {
    const val = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (val) return JSON.parse(val);
  } catch (_e) {}
  return fallback;
}

function setLocal(key, data) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(data));
  } catch (_e) {}
}

async function request(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    const res = await fetch(url, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error((data && data.message) || `HTTP error! status: ${res.status}`);
    }
    return data;
  } catch (err) {
    console.warn(`API Error [${endpoint}]:`, err.message);
    throw err;
  }
}

export const api = {
  // Health
  getHealth: () => request('/health'),

  // Products
  getProducts: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const data = await request(`/products${query ? `?${query}` : ''}`);
      if (Array.isArray(data) && data.length > 0) {
        setLocal('products', data);
      }
      return data;
    } catch (_err) {
      console.info('Backend unreachable, using local products cache');
      return getLocal('products', initialProducts);
    }
  },
  getProductById: async (id) => {
    try {
      return await request(`/products/${id}`);
    } catch (_err) {
      const prods = getLocal('products', initialProducts);
      return prods.find(p => String(p.id) === String(id)) || null;
    }
  },
  createProduct: async (productData) => {
    try {
      const created = await request('/products', { method: 'POST', body: JSON.stringify(productData) });
      const current = getLocal('products', initialProducts);
      setLocal('products', [created, ...current.filter(p => String(p.id) !== String(created.id))]);
      return created;
    } catch (err) {
      console.warn('Backend offline, saving product locally:', err.message);
      const newProduct = {
        id: Date.now(),
        title: productData.title || 'Untitled Product',
        category: productData.category || 'general',
        categoryLabel: productData.categoryLabel || productData.category,
        image: productData.image || 'assets/prod_romper.png',
        images: productData.images || [productData.image || 'assets/prod_romper.png'],
        originalPrice: parseFloat(productData.originalPrice) || 0,
        price: parseFloat(productData.price) || 0,
        discount: productData.discount ? parseInt(productData.discount) : 0,
        stock: parseInt(productData.stock) || 0,
        stockStatus: (parseInt(productData.stock) || 0) > 0 ? 'in_stock' : 'out_of_stock',
        rating: parseFloat(productData.rating) || 5.0,
        reviewsCount: parseInt(productData.reviewsCount) || 0,
        badge: productData.badge || '',
        shortDesc: productData.shortDesc || '',
        longDesc: productData.longDesc || '',
        sizes: productData.sizes || ['Standard'],
        featured: productData.featured || false,
        status: productData.status || 'active',
        availability: productData.availability || 'available',
        createdAt: new Date().toISOString()
      };
      const current = getLocal('products', initialProducts);
      const updated = [newProduct, ...current];
      setLocal('products', updated);
      return newProduct;
    }
  },
  updateProduct: async (id, productData) => {
    try {
      const updated = await request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(productData) });
      const current = getLocal('products', initialProducts);
      const list = current.map(p => String(p.id) === String(id) ? { ...p, ...updated } : p);
      setLocal('products', list);
      return updated;
    } catch (err) {
      console.warn('Backend offline, updating product locally:', err.message);
      const current = getLocal('products', initialProducts);
      const list = current.map(p => String(p.id) === String(id) ? { ...p, ...productData } : p);
      setLocal('products', list);
      return productData;
    }
  },
  toggleProductStock: async (id) => {
    try {
      const updated = await request(`/products/${id}/stock`, { method: 'PATCH' });
      const current = getLocal('products', initialProducts);
      setLocal('products', current.map(p => String(p.id) === String(id) ? updated : p));
      return updated;
    } catch (_err) {
      const current = getLocal('products', initialProducts);
      const list = current.map(p => {
        if (String(p.id) === String(id)) {
          const newStatus = p.stockStatus === 'in_stock' ? 'out_of_stock' : 'in_stock';
          return { ...p, stockStatus: newStatus, stock: newStatus === 'in_stock' ? (p.stock || 20) : 0 };
        }
        return p;
      });
      setLocal('products', list);
      return list.find(p => String(p.id) === String(id));
    }
  },
  toggleProductStatus: async (id) => {
    try {
      const updated = await request(`/products/${id}/status`, { method: 'PATCH' });
      const current = getLocal('products', initialProducts);
      setLocal('products', current.map(p => String(p.id) === String(id) ? updated : p));
      return updated;
    } catch (_err) {
      const current = getLocal('products', initialProducts);
      const list = current.map(p => {
        if (String(p.id) === String(id)) {
          return { ...p, status: p.status === 'active' ? 'draft' : 'active' };
        }
        return p;
      });
      setLocal('products', list);
      return list.find(p => String(p.id) === String(id));
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await request(`/products/${id}`, { method: 'DELETE' });
      const current = getLocal('products', initialProducts);
      setLocal('products', current.filter(p => String(p.id) !== String(id)));
      return res;
    } catch (_err) {
      const current = getLocal('products', initialProducts);
      setLocal('products', current.filter(p => String(p.id) !== String(id)));
      return { success: true, message: 'Deleted locally' };
    }
  },

  // Categories
  getCategories: async () => {
    try {
      const data = await request('/categories');
      if (Array.isArray(data) && data.length > 0) setLocal('categories', data);
      return data;
    } catch (_err) {
      return getLocal('categories', initialCategories);
    }
  },
  createCategory: async (catData) => {
    try {
      const created = await request('/categories', { method: 'POST', body: JSON.stringify(catData) });
      const current = getLocal('categories', initialCategories);
      setLocal('categories', [...current, created]);
      return created;
    } catch (_err) {
      const newCat = { id: Date.now(), slug: catData.name?.toLowerCase().replace(/\s+/g, '-') || 'cat', ...catData };
      const current = getLocal('categories', initialCategories);
      setLocal('categories', [...current, newCat]);
      return newCat;
    }
  },
  updateCategory: async (id, catData) => {
    try {
      const updated = await request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(catData) });
      const current = getLocal('categories', initialCategories);
      setLocal('categories', current.map(c => String(c.id) === String(id) ? { ...c, ...updated } : c));
      return updated;
    } catch (_err) {
      const current = getLocal('categories', initialCategories);
      const list = current.map(c => String(c.id) === String(id) ? { ...c, ...catData } : c);
      setLocal('categories', list);
      return catData;
    }
  },
  deleteCategory: async (id) => {
    try {
      const res = await request(`/categories/${id}`, { method: 'DELETE' });
      const current = getLocal('categories', initialCategories);
      setLocal('categories', current.filter(c => String(c.id) !== String(id)));
      return res;
    } catch (_err) {
      const current = getLocal('categories', initialCategories);
      setLocal('categories', current.filter(c => String(c.id) !== String(id)));
      return { success: true };
    }
  },

  // Banners
  getBanners: async () => {
    try {
      const data = await request('/banners');
      if (Array.isArray(data) && data.length > 0) setLocal('banners', data);
      return data;
    } catch (_err) {
      return getLocal('banners', initialBanners);
    }
  },
  createBanner: async (bannerData) => {
    try {
      const created = await request('/banners', { method: 'POST', body: JSON.stringify(bannerData) });
      const current = getLocal('banners', initialBanners);
      setLocal('banners', [...current, created]);
      return created;
    } catch (_err) {
      const newBanner = { id: Date.now(), active: true, ...bannerData };
      const current = getLocal('banners', initialBanners);
      setLocal('banners', [...current, newBanner]);
      return newBanner;
    }
  },
  updateBanner: async (id, bannerData) => {
    try {
      const updated = await request(`/banners/${id}`, { method: 'PUT', body: JSON.stringify(bannerData) });
      const current = getLocal('banners', initialBanners);
      setLocal('banners', current.map(b => String(b.id) === String(id) ? { ...b, ...updated } : b));
      return updated;
    } catch (_err) {
      const current = getLocal('banners', initialBanners);
      const list = current.map(b => String(b.id) === String(id) ? { ...b, ...bannerData } : b);
      setLocal('banners', list);
      return bannerData;
    }
  },
  toggleBanner: async (id) => {
    try {
      const updated = await request(`/banners/${id}/toggle`, { method: 'PATCH' });
      const current = getLocal('banners', initialBanners);
      setLocal('banners', current.map(b => String(b.id) === String(id) ? updated : b));
      return updated;
    } catch (_err) {
      const current = getLocal('banners', initialBanners);
      const list = current.map(b => String(b.id) === String(id) ? { ...b, active: !b.active } : b);
      setLocal('banners', list);
      return list.find(b => String(b.id) === String(id));
    }
  },
  deleteBanner: async (id) => {
    try {
      const res = await request(`/banners/${id}`, { method: 'DELETE' });
      const current = getLocal('banners', initialBanners);
      setLocal('banners', current.filter(b => String(b.id) !== String(id)));
      return res;
    } catch (_err) {
      const current = getLocal('banners', initialBanners);
      setLocal('banners', current.filter(b => String(b.id) !== String(id)));
      return { success: true };
    }
  },

  // Orders
  getOrders: () => request('/orders').catch(() => []),
  getOrderById: (id) => request(`/orders/${id}`),
  createOrder: (orderData) => request('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  updateOrderStatus: (id, status) => request(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  cancelOrder: (id) => request(`/orders/${id}/cancel`, { method: 'POST' }),

  // Coupons
  getCoupons: () => request('/coupons').catch(() => []),
  validateCoupon: (code, cartTotal, categoryItems) =>
    request('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, cartTotal, categoryItems })
    }),
  createCoupon: (couponData) => request('/coupons', { method: 'POST', body: JSON.stringify(couponData) }),
  updateCoupon: (code, couponData) => request(`/coupons/${code}`, { method: 'PUT', body: JSON.stringify(couponData) }),
  deleteCoupon: (code) => request(`/coupons/${code}`, { method: 'DELETE' }),

  // Messages / Inquiries
  getMessages: () => request('/messages').catch(() => []),
  sendMessage: (messageData) => request('/messages', { method: 'POST', body: JSON.stringify(messageData) }),
  markMessageRead: (id, read = true) => request(`/messages/${id}/read`, { method: 'PATCH', body: JSON.stringify({ read }) }),
  deleteMessage: (id) => request(`/messages/${id}`, { method: 'DELETE' }),

  // Settings
  getSettings: async () => {
    try {
      const data = await request('/settings');
      if (data) setLocal('settings', data);
      return data;
    } catch (_err) {
      return getLocal('settings', null);
    }
  },
  updateSettings: async (settingsData) => {
    try {
      const data = await request('/settings', { method: 'PUT', body: JSON.stringify(settingsData) });
      setLocal('settings', data);
      return data;
    } catch (_err) {
      setLocal('settings', settingsData);
      return settingsData;
    }
  },

  // Customers
  getCustomers: () => request('/customers').catch(() => []),
  getCustomerLogs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/customers/logs${query ? `?${query}` : ''}`).catch(() => []);
  },
  registerCustomer: (customerData) => request('/customers/register', { method: 'POST', body: JSON.stringify(customerData) }),
  loginCustomer: (identifier, password) =>
    request('/customers/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password })
    }),
  updateCustomerProfile: (id, customerData) => request(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(customerData) }),

  // Admin
  adminLogin: (credential) => request('/admin/login', { method: 'POST', body: JSON.stringify({ credential }) }),
  getAdminStats: () => request('/admin/stats').catch(() => null),
  exportBackup: () => request('/admin/backup'),
  restoreBackup: (data) => request('/admin/restore', { method: 'POST', body: JSON.stringify(data) }),
  resetDefaults: () => request('/admin/reset', { method: 'POST' })
};

export default api;
