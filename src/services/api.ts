import axios from 'axios';
import { 
  dummyBooks, 
  dummyAuthors, 
  dummyCategories, 
  dummyUser, 
  dummyLoans, 
  dummyReviews,
  createApiResponse,
  createApiError,
  type Book,
  type Author,
  type Category,
  type User,
  type Loan,
  type Review
} from '@/data/dummyData';

const API_BASE_URL = 'https://belibraryformentee-production.up.railway.app';
const USE_DUMMY_DATA = true; // Set to false when API is ready

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
    if (USE_DUMMY_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation for dummy data
      const { permanentCredentials } = await import('../data/dummyData');
      
      // Check user credentials
      if (email === permanentCredentials.user.email && password === permanentCredentials.user.password) {
        const token = 'user_token_' + Date.now();
        return createApiResponse({
          token,
          user: permanentCredentials.user.data
        });
      }
      
      // Check admin credentials
      if (email === permanentCredentials.admin.email && password === permanentCredentials.admin.password) {
        const token = 'admin_token_' + Date.now();
        return createApiResponse({
          token,
          user: permanentCredentials.admin.data
        });
      }
      
      // Legacy support
      if (email === 'johndoe@email.com' && password === 'johndoe123') {
        const token = 'dummy_token_' + Date.now();
        return createApiResponse({
          token,
          user: dummyUser
        });
      }
      
      throw createApiError('Invalid credentials');
    }
    
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },
  
  register: async (name: string, email: string, password: string, phone?: string) => {
    if (USE_DUMMY_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!name || !email || !password) {
        throw createApiError('All fields are required');
      }
      
      const { permanentCredentials } = await import('../data/dummyData');
      
      if (email === permanentCredentials.user.email || 
          email === permanentCredentials.admin.email || 
          email === 'johndoe@email.com') {
        throw createApiError('Email already exists');
      }
      
      const newUser: User = {
        ...dummyUser,
        _id: 'user_' + Date.now(),
        name,
        email,
        phone
      };
      
      return createApiResponse({
        user: newUser,
        message: 'Registration successful'
      });
    }
    
    const response = await api.post('/api/auth/register', { name, email, password, phone });
    return response.data;
  },
  
  getProfile: async () => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createApiResponse(dummyUser);
    }
    
    const response = await api.get('/api/me');
    return response.data;
  },
  
  updateProfile: async (data: Partial<User>) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedUser = { ...dummyUser, ...data };
      return createApiResponse(updatedUser);
    }
    
    const response = await api.patch('/api/me', data);
    return response.data;
  },
  
  logout: async () => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createApiResponse({ message: 'Logged out successfully' });
    }
    
    const response = await api.post('/api/auth/logout');
    return response.data;
  }
};

// Books API endpoints
export const booksAPI = {
  getBooks: async (params?: { category?: string; author?: string; search?: string; page?: number; limit?: number }) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredBooks = [...dummyBooks];
      
      if (params?.category) {
        filteredBooks = filteredBooks.filter(book => 
          book.category._id === params.category || book.category.name.toLowerCase().includes(params.category.toLowerCase())
        );
      }
      
      if (params?.author) {
        filteredBooks = filteredBooks.filter(book => 
          book.author.name.toLowerCase().includes(params.author!.toLowerCase())
        );
      }
      
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredBooks = filteredBooks.filter(book => 
          book.title.toLowerCase().includes(searchLower) ||
          book.author.name.toLowerCase().includes(searchLower) ||
          book.description.toLowerCase().includes(searchLower)
        );
      }
      
      return createApiResponse({
        books: filteredBooks,
        total: filteredBooks.length,
        page: params?.page || 1,
        limit: params?.limit || 10
      });
    }
    
    const response = await api.get('/api/books', { params });
    return response.data;
  },
  
  getBook: async (id: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const book = dummyBooks.find(b => b._id === id);
      if (!book) {
        throw createApiError('Book not found', 404);
      }
      
      // Add reviews to book detail
      const bookReviews = dummyReviews.filter(r => r.book._id === id);
      
      return createApiResponse({
        ...book,
        reviews: bookReviews
      });
    }
    
    const response = await api.get(`/api/books/${id}`);
    return response.data;
  },
  
  getRecommendedBooks: async () => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Return top rated books
      const recommended = [...dummyBooks].sort((a, b) => b.rating - a.rating).slice(0, 6);
      return createApiResponse(recommended);
    }
    
    const response = await api.get('/api/books/recommend');
    return response.data;
  },
  
  searchBooks: async (query: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const searchLower = query.toLowerCase();
      const results = dummyBooks.filter(book => 
        book.title.toLowerCase().includes(searchLower) ||
        book.author.name.toLowerCase().includes(searchLower)
      );
      return createApiResponse(results);
    }
    
    const response = await api.get(`/api/books/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
  
  getCategories: async () => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return createApiResponse(dummyCategories);
    }
    
    const response = await api.get('/api/categories');
    return response.data;
  },
  
  getBooksByCategory: async (categoryId: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const books = dummyBooks.filter(book => book.category._id === categoryId);
      return createApiResponse(books);
    }
    
    const response = await api.get(`/api/categories/${categoryId}/books`);
    return response.data;
  }
};

// Authors API endpoints
export const authorsAPI = {
  getAuthors: async () => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return createApiResponse(dummyAuthors);
    }
    
    const response = await api.get('/api/authors');
    return response.data;
  },
  
  getAuthor: async (id: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const author = dummyAuthors.find(a => a._id === id);
      if (!author) {
        throw createApiError('Author not found', 404);
      }
      
      const authorBooks = dummyBooks.filter(book => book.author._id === id);
      
      return createApiResponse({
        ...author,
        books: authorBooks
      });
    }
    
    const response = await api.get(`/api/authors/${id}`);
    return response.data;
  },
  
  getBooksByAuthor: async (authorId: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const books = dummyBooks.filter(book => book.author._id === authorId);
      return createApiResponse(books);
    }
    
    const response = await api.get(`/api/authors/${authorId}/books`);
    return response.data;
  },

  getAuthorBooks: async (authorId: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const books = dummyBooks.filter(book => book.author._id === authorId);
      return createApiResponse(books);
    }
    
    const response = await api.get(`/api/authors/${authorId}/books`);
    return response.data;
  },

  // Get unlimited authors with pagination support
  getAuthorsWithPagination: async (page: number = 1, limit: number = 10) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Simulate unlimited data by repeating authors with different IDs
      const totalAuthors = dummyAuthors.length * 50; // Create 250 total authors
      const startIndex = (page - 1) * limit;
      const endIndex = Math.min(startIndex + limit, totalAuthors);
      
      const paginatedAuthors = [];
      for (let i = startIndex; i < endIndex; i++) {
        const originalIndex = i % dummyAuthors.length;
        const author = dummyAuthors[originalIndex];
        paginatedAuthors.push({
          ...author,
          _id: `${author._id}_${Math.floor(i / dummyAuthors.length)}`,
          name: `${author.name} ${Math.floor(i / dummyAuthors.length) > 0 ? `(${Math.floor(i / dummyAuthors.length) + 1})` : ''}`
        });
      }
      
      return createApiResponse({
        authors: paginatedAuthors,
        pagination: {
          page,
          limit,
          total: totalAuthors,
          totalPages: Math.ceil(totalAuthors / limit),
          hasNext: endIndex < totalAuthors,
          hasPrev: page > 1
        }
      });
    }
    
    const response = await api.get(`/api/authors?page=${page}&limit=${limit}`);
    return response.data;
  }
};

// Loans/Borrowed books API endpoints
export const loansAPI = {
  getMyLoans: async () => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createApiResponse(dummyLoans);
    }
    
    const response = await api.get('/api/me/loans');
    return response.data;
  },
  
  borrowBook: async (bookId: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const book = dummyBooks.find(b => b._id === bookId);
      if (!book) {
        throw createApiError('Book not found', 404);
      }
      
      if (book.availability.available === 0) {
        throw createApiError('Book is not available for borrowing');
      }
      
      const newLoan: Loan = {
        _id: 'loan_' + Date.now(),
        book,
        borrowedAt: new Date().toISOString(),
        dueAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        status: 'active'
      };
      
      return createApiResponse(newLoan);
    }
    
    const response = await api.post('/api/loans', { bookId });
    return response.data;
  },
  
  returnBook: async (loanId: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const loan = dummyLoans.find(l => l._id === loanId);
      if (!loan) {
        throw createApiError('Loan not found', 404);
      }
      
      const updatedLoan: Loan = {
        ...loan,
        returnedAt: new Date().toISOString(),
        status: 'returned'
      };
      
      return createApiResponse(updatedLoan);
    }
    
    const response = await api.patch(`/api/loans/${loanId}/return`);
    return response.data;
  }
};

// Reviews API endpoints
export const reviewsAPI = {
  getBookReviews: async (bookId: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const reviews = dummyReviews.filter(r => r.book._id === bookId);
      return createApiResponse(reviews);
    }
    
    const response = await api.get(`/api/reviews/book/${bookId}`);
    return response.data;
  },
  
  getMyReviews: async () => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const userReviews = dummyReviews.filter(r => r.user._id === dummyUser._id);
      return createApiResponse(userReviews);
    }
    
    const response = await api.get('/api/me/reviews');
    return response.data;
  },
  
  addReview: async (bookId: string, rating: number, comment: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const book = dummyBooks.find(b => b._id === bookId);
      if (!book) {
        throw createApiError('Book not found', 404);
      }
      
      const newReview: Review = {
        _id: 'review_' + Date.now(),
        user: {
          _id: dummyUser._id,
          name: dummyUser.name,
          avatar: dummyUser.avatar
        },
        book,
        rating,
        comment,
        createdAt: new Date().toISOString()
      };
      
      return createApiResponse(newReview);
    }
    
    const response = await api.post('/api/reviews', { bookId, rating, comment });
    return response.data;
  },
  
  deleteReview: async (reviewId: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createApiResponse({ message: 'Review deleted successfully' });
    }
    
    const response = await api.delete(`/api/reviews/${reviewId}`);
    return response.data;
  }
};

// Admin API
export const adminAPI = {
  // Book Management
  getAllBooks: async () => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createApiResponse(dummyBooks);
    }
    
    const response = await api.get('/api/admin/books');
    return response.data;
  },

  addBook: async (bookData: Partial<Book>) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBook: Book = {
        _id: 'book_' + Date.now(),
        title: bookData.title || '',
        author: bookData.author || dummyAuthors[0],
        category: bookData.category || dummyCategories[0],
        cover: bookData.cover || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
        rating: 0,
        totalReviews: 0,
        description: bookData.description || '',
        pages: bookData.pages || 0,
        publishedAt: bookData.publishedAt || new Date().toISOString(),
        isbn: bookData.isbn || '',
        availability: bookData.availability || { total: 1, available: 1 }
      };
      
      return createApiResponse(newBook);
    }
    
    const response = await api.post('/api/admin/books', bookData);
    return response.data;
  },

  updateBook: async (bookId: string, bookData: Partial<Book>) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const existingBook = dummyBooks.find(b => b._id === bookId);
      if (!existingBook) throw createApiError('Book not found', 404);
      
      const updatedBook = { ...existingBook, ...bookData };
      return createApiResponse(updatedBook);
    }
    
    const response = await api.put(`/api/admin/books/${bookId}`, bookData);
    return response.data;
  },

  deleteBook: async (bookId: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createApiResponse({ message: 'Book deleted successfully' });
    }
    
    const response = await api.delete(`/api/admin/books/${bookId}`);
    return response.data;
  },

  // User Management
  getAllUsers: async () => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const { dummyUsers } = await import('../data/dummyData');
      const users = dummyUsers.filter(user => user.role === 'user');
      return createApiResponse(users);
    }
    
    const response = await api.get('/api/admin/users');
    return response.data;
  },

  updateUser: async (userId: string, userData: Partial<User>) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const { dummyUsers } = await import('../data/dummyData');
      const existingUser = dummyUsers.find(u => u._id === userId);
      if (!existingUser) throw createApiError('User not found', 404);
      
      const updatedUser = { ...existingUser, ...userData };
      return createApiResponse(updatedUser);
    }
    
    const response = await api.put(`/api/admin/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId: string) => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createApiResponse({ message: 'User deleted successfully' });
    }
    
    const response = await api.delete(`/api/admin/users/${userId}`);
    return response.data;
  },

  // Loans Management
  getAllLoans: async () => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createApiResponse(dummyLoans);
    }
    
    const response = await api.get('/api/admin/loans');
    return response.data;
  },

  updateLoanStatus: async (loanId: string, status: 'active' | 'returned' | 'overdue') => {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const existingLoan = dummyLoans.find(l => l._id === loanId);
      if (!existingLoan) throw createApiError('Loan not found', 404);
      
      const updatedLoan = { 
        ...existingLoan, 
        status,
        returnedAt: status === 'returned' ? new Date().toISOString() : undefined
      };
      return createApiResponse(updatedLoan);
    }
    
    const response = await api.put(`/api/admin/loans/${loanId}`, { status });
    return response.data;
  }
};

export default api;