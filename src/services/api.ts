import axios from 'axios';

const API_BASE_URL = 'https://belibraryformentee-production.up.railway.app';

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },
  
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/api/auth/register', { name, email, password });
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },
  
  updateProfile: async (data: any) => {
    const response = await api.put('/api/auth/profile', data);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  }
};

// Books API endpoints
export const booksAPI = {
  getBooks: async (params?: any) => {
    const response = await api.get('/api/books', { params });
    return response.data;
  },
  
  getBook: async (id: string) => {
    const response = await api.get(`/api/books/${id}`);
    return response.data;
  },
  
  searchBooks: async (query: string) => {
    const response = await api.get(`/api/books/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get('/api/categories');
    return response.data;
  },
  
  getBooksByCategory: async (categoryId: string) => {
    const response = await api.get(`/api/categories/${categoryId}/books`);
    return response.data;
  }
};

// Authors API endpoints
export const authorsAPI = {
  getAuthors: async () => {
    const response = await api.get('/api/authors');
    return response.data;
  },
  
  getAuthor: async (id: string) => {
    const response = await api.get(`/api/authors/${id}`);
    return response.data;
  }
};

// Borrowed books API endpoints
export const borrowedAPI = {
  getBorrowedBooks: async () => {
    const response = await api.get('/api/borrowed');
    return response.data;
  },
  
  borrowBook: async (bookId: string) => {
    const response = await api.post('/api/borrowed', { bookId });
    return response.data;
  },
  
  returnBook: async (borrowId: string) => {
    const response = await api.put(`/api/borrowed/${borrowId}/return`);
    return response.data;
  },
  
  addReview: async (bookId: string, rating: number, comment: string) => {
    const response = await api.post('/api/reviews', { bookId, rating, comment });
    return response.data;
  }
};

export default api;