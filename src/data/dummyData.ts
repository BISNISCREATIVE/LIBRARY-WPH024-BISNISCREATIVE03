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
  { _id: '9', name: 'Business & Economics', bookCount: 30 },
  { _id: '10', name: 'Psychology', bookCount: 20 },
  { _id: '11', name: 'Finance & Economics', bookCount: 18 },
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
  {
    _id: '4',
    name: 'Morgan Housel',
    bio: 'Author of "The Psychology of Money" and financial expert.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    bookCount: 5
  },
  {
    _id: '5',
    name: 'Emily Chen',
    bio: 'Psychology professor and bestselling author of behavioral books.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b9f3?w=150&h=150&fit=crop&crop=face',
    bookCount: 7
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
  {
    _id: '4',
    title: 'The Psychology of Money',
    author: dummyAuthors[3],
    category: dummyCategories[8],
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    rating: 4.9,
    totalReviews: 1250,
    description: 'The Psychology of Money explores how emotions, biases, and human behavior shape the way we think about money, investing, and financial decisions. Morgan Housel shares timeless lessons on wealth, greed, and happiness, showing that financial success is not about knowledge, but about behavior.',
    pages: 320,
    publishedAt: '2020-09-08',
    isbn: '978-0-857197-68-2',
    availability: { total: 8, available: 5 }
  },
  {
    _id: '5',
    title: 'Atomic Habits',
    author: dummyAuthors[4],
    category: dummyCategories[6],
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop',
    rating: 4.7,
    totalReviews: 2150,
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
    pages: 320,
    publishedAt: '2018-10-16',
    isbn: '978-0-735211-29-3',
    availability: { total: 6, available: 4 }
  },
  {
    _id: '6',
    title: 'The Lean Startup',
    author: dummyAuthors[2],
    category: dummyCategories[8],
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    rating: 4.3,
    totalReviews: 980,
    description: 'How Today\'s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses.',
    pages: 336,
    publishedAt: '2011-09-13',
    isbn: '978-0-307887-89-9',
    availability: { total: 4, available: 2 }
  },
  {
    _id: '7',
    title: 'Clean Code',
    author: dummyAuthors[2],
    category: dummyCategories[3],
    cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=400&fit=crop',
    rating: 4.6,
    totalReviews: 756,
    description: 'A Handbook of Agile Software Craftsmanship. Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees.',
    pages: 464,
    publishedAt: '2008-08-01',
    isbn: '978-0-132350-88-4',
    availability: { total: 5, available: 3 }
  },
  {
    _id: '8',
    title: 'Thinking, Fast and Slow',
    author: dummyAuthors[4],
    category: dummyCategories[9],
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    rating: 4.4,
    totalReviews: 1890,
    description: 'Daniel Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
    pages: 499,
    publishedAt: '2011-10-25',
    isbn: '978-0-374275-63-1',
    availability: { total: 7, available: 4 }
  }
];

// Dummy Users
export const dummyUsers: User[] = [
  {
    _id: 'user1',
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '081234567890',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    address: '123 Main Street, City, Country',
    bio: 'Book enthusiast and avid reader',
    role: 'user'
  },
  {
    _id: 'user2',
    name: 'Jane Smith',
    email: 'janesmith@email.com',
    phone: '081234567891',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b9f3?w=150&h=150&fit=crop&crop=face',
    address: '456 Oak Avenue, City, Country',
    bio: 'Fiction lover and weekend reader',
    role: 'user'
  },
  {
    _id: 'user3',
    name: 'Mike Johnson',
    email: 'mikejohnson@email.com',
    phone: '081234567892',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    address: '789 Pine Street, City, Country',
    bio: 'Technology enthusiast and programming book collector',
    role: 'user'
  },
  {
    _id: 'admin1',
    name: 'Admin User',
    email: 'admin@email.com',
    phone: '081234567800',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    address: 'Admin Office, Library Building',
    bio: 'Library administrator',
    role: 'admin'
  }
];

export const dummyUser: User = dummyUsers[0];

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