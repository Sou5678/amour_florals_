// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const api = {
  // ==================== AUTHENTICATION ====================
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  getProfile: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  updateProfile: async (userData) => {
    const response = await fetch(`${API_URL}/auth/updatedetails`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  updatePassword: async (passwordData) => {
    const response = await fetch(`${API_URL}/auth/updatepassword`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(passwordData),
    });
    return response.json();
  },

  // ==================== PRODUCTS ====================
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/products?${queryString}`);
    return response.json();
  },

  getProduct: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  },

  searchProducts: async (searchParams) => {
    const queryString = new URLSearchParams(searchParams).toString();
    const response = await fetch(`${API_URL}/products/search?${queryString}`);
    return response.json();
  },

  getFeaturedProducts: async () => {
    const response = await fetch(`${API_URL}/products/featured`);
    return response.json();
  },

  getPopularProducts: async () => {
    const response = await fetch(`${API_URL}/products/popular`);
    return response.json();
  },

  // ==================== CART ====================
  getCart: async () => {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  addToCart: async (productData) => {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    return response.json();
  },

  updateCartItem: async (itemId, quantity) => {
    const response = await fetch(`${API_URL}/cart/${itemId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ quantity }),
    });
    return response.json();
  },

  removeFromCart: async (itemId) => {
    const response = await fetch(`${API_URL}/cart/${itemId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  clearCart: async () => {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  // ==================== ORDERS ====================
  createOrder: async (orderData) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  getOrders: async () => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getOrder: async (orderId) => {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  // ==================== FAVORITES ====================
  getFavorites: async () => {
    const response = await fetch(`${API_URL}/users/favorites`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  addToFavorites: async (productId) => {
    const response = await fetch(`${API_URL}/users/favorites`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId }),
    });
    return response.json();
  },

  removeFromFavorites: async (productId) => {
    const response = await fetch(`${API_URL}/users/favorites/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  // ==================== PAYMENTS ====================
  createPaymentIntent: async (orderData) => {
    const response = await fetch(`${API_URL}/payment/create-payment-intent`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  // ==================== CATEGORIES ====================
  getCategories: async () => {
    const response = await fetch(`${API_URL}/categories`);
    return response.json();
  },
};

// Utility function to handle API errors
export const handleApiError = (error) => {
  console.error('API Error:', error);
  return {
    status: 'error',
    message: 'Something went wrong. Please try again.'
  };
};

// Utility to check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Utility to logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};