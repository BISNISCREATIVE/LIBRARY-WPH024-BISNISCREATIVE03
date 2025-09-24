// Dummy data for the library application
export interface Book {
  _id: string;
  title: string;
  author: {
    _id: string;
    name: string;
    bio?: string;
  };
  category: {
    _id: string;
    name: string;
  };
  cover: string;
  rating: number;
  totalReviews: number;
  description: string;
  pages: number;
  publishedAt: string;
  isbn?: string;
  availability: {
    total: number;
    available: number;
  };
}

export interface Author {
  _id: string;
  name: string;
  bio: string;
  avatar: string;
  bookCount: number;
}

export interface Category {
  _id: string;
  name: string;
  bookCount: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: string;
  bio?: string;
  role: 'user' | 'admin';
}

export interface Loan {
  _id: string;
  book: Book;
  borrowedAt: string;
  dueAt: string;
  returnedAt?: string;
  status: 'active' | 'returned' | 'overdue';
}

export interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  book: Book;
  rating: number;
  comment: string;
  createdAt: string;
}

// Dummy Categories
export const dummyCategories: Category[] = [
  { _id: '1', name: 'Fiction', bookCount: 45 },
  { _id: '2', name: 'Non-Fiction', bookCount: 32 },
  { _id: '3', name: 'Science', bookCount: 28 },
  { _id: '4', name: 'Technology', bookCount: 35 },
  { _id: '5', name: 'History', bookCount: 22 },
  { _id: '6', name: 'Biography', bookCount: 18 },
  { _id: '7', name: 'Self-Help', bookCount: 15 },
  { _id: '8', name: 'Mystery', bookCount: 25 },
];

// Dummy Authors
export const dummyAuthors: Author[] = [
  {
    _id: '1',
    name: 'John Smith',
    bio: 'Bestselling author with over 20 years of experience in fiction writing.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bookCount: 12
  },
  {
    _id: '2',
    name: 'Sarah Johnson',
    bio: 'Science fiction author known for her imaginative storytelling.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b9f3?w=150&h=150&fit=crop&crop=face',
    bookCount: 8
  },
  {
    _id: '3',
    name: 'Michael Brown',
    bio: 'Technology expert and bestselling author of programming books.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bookCount: 15
  },
];

// Dummy Books
export const dummyBooks: Book[] = [
  {
    _id: '1',
    title: 'The Great Adventure',
    author: dummyAuthors[0],
    category: dummyCategories[0],
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    rating: 4.5,
    totalReviews: 124,
    description: 'An epic tale of adventure and discovery that will take you on a journey through uncharted territories and unknown dangers.',
    pages: 320,
    publishedAt: '2023-01-15',
    isbn: '978-0-123456-78-9',
    availability: { total: 5, available: 3 }
  },
  {
    _id: '2',
    title: 'Future Technologies',
    author: dummyAuthors[2],
    category: dummyCategories[3],
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
    rating: 4.2,
    totalReviews: 89,
    description: 'Explore the cutting-edge technologies that will shape our future and transform the way we live and work.',
    pages: 450,
    publishedAt: '2023-03-22',
    isbn: '978-0-987654-32-1',
    availability: { total: 3, available: 1 }
  },
  {
    _id: '3',
    title: 'Space Odyssey',
    author: dummyAuthors[1],
    category: dummyCategories[2],
    cover: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=400&fit=crop',
    rating: 4.8,
    totalReviews: 203,
    description: 'A thrilling science fiction novel about humanity\'s journey to the stars and the challenges they face in the cosmos.',
    pages: 380,
    publishedAt: '2023-02-10',
    isbn: '978-0-555666-77-8',
    availability: { total: 4, available: 2 }
  },
];

// Dummy User
export const dummyUser: User = {
  _id: 'user1',
  name: 'John Doe',
  email: 'johndoe@email.com',
  phone: '081234567890',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  address: '123 Main Street, City, Country',
  bio: 'Book enthusiast and avid reader',
  role: 'user'
};

// Dummy Loans
export const dummyLoans: Loan[] = [
  {
    _id: 'loan1',
    book: dummyBooks[0],
    borrowedAt: '2024-01-15T10:00:00Z',
    dueAt: '2024-02-15T23:59:59Z',
    status: 'active'
  },
  {
    _id: 'loan2',
    book: dummyBooks[1],
    borrowedAt: '2024-01-10T10:00:00Z',
    dueAt: '2024-02-10T23:59:59Z',
    returnedAt: '2024-02-08T14:30:00Z',
    status: 'returned'
  },
  {
    _id: 'loan3',
    book: dummyBooks[2],
    borrowedAt: '2023-12-01T10:00:00Z',
    dueAt: '2024-01-01T23:59:59Z',
    status: 'overdue'
  },
];

// Dummy Reviews
export const dummyReviews: Review[] = [
  {
    _id: 'review1',
    user: {
      _id: 'user1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    book: dummyBooks[0],
    rating: 5,
    comment: 'An absolutely fantastic read! Couldn\'t put it down.',
    createdAt: '2024-01-20T15:30:00Z'
  },
  {
    _id: 'review2',
    user: {
      _id: 'user2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b9f3?w=150&h=150&fit=crop&crop=face'
    },
    book: dummyBooks[0],
    rating: 4,
    comment: 'Great story with well-developed characters. Highly recommended!',
    createdAt: '2024-01-18T09:15:00Z'
  },
];

// API Response helpers
export const createApiResponse = <T>(data: T, message = 'Success') => ({
  success: true,
  message,
  data
});

export const createApiError = (message: string, statusCode = 400) => ({
  success: false,
  message,
  statusCode
});