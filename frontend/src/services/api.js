const API_BASE_URL = 'http://localhost:5000/api';

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
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products${query ? `?${query}` : ''}`);
  },
  getProductById: (id) => request(`/products/${id}`),
  createProduct: (productData) => request('/products', { method: 'POST', body: JSON.stringify(productData) }),
  updateProduct: (id, productData) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(productData) }),
  toggleProductStock: (id) => request(`/products/${id}/stock`, { method: 'PATCH' }),
  toggleProductStatus: (id) => request(`/products/${id}/status`, { method: 'PATCH' }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: () => request('/categories'),
  createCategory: (catData) => request('/categories', { method: 'POST', body: JSON.stringify(catData) }),
  updateCategory: (id, catData) => request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(catData) }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: 'DELETE' }),

  // Banners
  getBanners: () => request('/banners'),
  createBanner: (bannerData) => request('/banners', { method: 'POST', body: JSON.stringify(bannerData) }),
  updateBanner: (id, bannerData) => request(`/banners/${id}`, { method: 'PUT', body: JSON.stringify(bannerData) }),
  toggleBanner: (id) => request(`/banners/${id}/toggle`, { method: 'PATCH' }),
  deleteBanner: (id) => request(`/banners/${id}`, { method: 'DELETE' }),

  // Orders
  getOrders: () => request('/orders'),
  getOrderById: (id) => request(`/orders/${id}`),
  createOrder: (orderData) => request('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  updateOrderStatus: (id, status) => request(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Coupons
  getCoupons: () => request('/coupons'),
  validateCoupon: (code, cartTotal, categoryItems) =>
    request('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, cartTotal, categoryItems })
    }),
  createCoupon: (couponData) => request('/coupons', { method: 'POST', body: JSON.stringify(couponData) }),
  updateCoupon: (code, couponData) => request(`/coupons/${code}`, { method: 'PUT', body: JSON.stringify(couponData) }),
  deleteCoupon: (code) => request(`/coupons/${code}`, { method: 'DELETE' }),

  // Messages / Inquiries
  getMessages: () => request('/messages'),
  sendMessage: (messageData) => request('/messages', { method: 'POST', body: JSON.stringify(messageData) }),
  markMessageRead: (id, read = true) => request(`/messages/${id}/read`, { method: 'PATCH', body: JSON.stringify({ read }) }),
  deleteMessage: (id) => request(`/messages/${id}`, { method: 'DELETE' }),

  // Settings
  getSettings: () => request('/settings'),
  updateSettings: (settingsData) => request('/settings', { method: 'PUT', body: JSON.stringify(settingsData) }),

  // Customers
  getCustomers: () => request('/customers'),
  getCustomerLogs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/customers/logs${query ? `?${query}` : ''}`);
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
  getAdminStats: () => request('/admin/stats'),
  exportBackup: () => request('/admin/backup'),
  restoreBackup: (data) => request('/admin/restore', { method: 'POST', body: JSON.stringify(data) }),
  resetDefaults: () => request('/admin/reset', { method: 'POST' })
};

export default api;
