import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { borrowedAPI } from '@/services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Header from '@/components/Header';
import toast from 'react-hot-toast';

interface BorrowedBook {
  _id: string;
  book: {
    _id: string;
    title: string;
    author: string;
    cover: string;
    category: string;
  };
  borrowDate: string;
  dueDate: string;
  status: 'active' | 'returned' | 'overdue';
  duration: number;
}

const BorrowedList = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BorrowedBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'returned' | 'overdue'>('all');
  const [activeTab, setActiveTab] = useState<'profile' | 'borrowed' | 'reviews'>('borrowed');

  useEffect(() => {
    if (isAuthenticated) {
      fetchBorrowedBooks();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    applyFilters();
  }, [borrowedBooks, searchQuery, activeFilter]);

  const fetchBorrowedBooks = async () => {
    try {
      setIsLoading(true);
      // Simulate API call with mock data
      const mockData: BorrowedBook[] = [
        {
          _id: '1',
          book: {
            _id: '1',
            title: 'Book Name',
            author: 'Author name',
            cover: '/api/placeholder/120/160',
            category: 'Category'
          },
          borrowDate: '2025-08-29',
          dueDate: '2025-08-31',
          status: 'active',
          duration: 3
        },
        {
          _id: '2',
          book: {
            _id: '2',
            title: 'Book Name',
            author: 'Author name',
            cover: '/api/placeholder/120/160',
            category: 'Category'
          },
          borrowDate: '2025-08-29',
          dueDate: '2025-08-31',
          status: 'returned',
          duration: 3
        },
        {
          _id: '3',
          book: {
            _id: '3',
            title: 'Book Name',
            author: 'Author name',
            cover: '/api/placeholder/120/160',
            category: 'Category'
          },
          borrowDate: '2025-08-29',
          dueDate: '2025-08-31',
          status: 'overdue',
          duration: 3
        }
      ];
      setBorrowedBooks(mockData);
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
      toast.error('Failed to load borrowed books');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...borrowedBooks];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(item => item.status === activeFilter);
    }

    setFilteredBooks(filtered);
  };

  const handleGiveReview = (bookId: string) => {
    toast.success('Review functionality will be implemented');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'returned':
        return 'text-blue-600';
      case 'overdue':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login to view your borrowed books.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Tabs */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-muted rounded-lg p-1 flex">
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'borrowed'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('borrowed')}
              >
                Borrowed List
              </button>
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-6">Borrowed List</h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search book"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'all', label: 'All' },
              { key: 'active', label: 'Active' },
              { key: 'returned', label: 'Returned' },
              { key: 'overdue', label: 'Overdue' }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(filter.key as any)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Borrowed Books List */}
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="animate-pulse flex space-x-4">
                      <div className="w-20 h-28 bg-muted rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-4 bg-muted rounded w-1/3"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBooks.map((item) => (
                <Card key={item._id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Status</span>
                        <Badge 
                          variant="secondary" 
                          className={`capitalize ${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">Due Date</span>
                        <div className="text-sm text-red-500">
                          {formatDate(item.dueDate)}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <img
                        src={item.book.cover}
                        alt={item.book.title}
                        className="w-20 h-28 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground mb-1">
                          {item.book.category}
                        </div>
                        <h3 className="font-semibold text-lg mb-1">
                          {item.book.title}
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          {item.book.author}
                        </p>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(item.borrowDate)} • Duration {item.duration} Days
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => handleGiveReview(item.book._id)}
                      >
                        Give Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredBooks.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No borrowed books found.</p>
            </div>
          )}

          {/* Load More */}
          {filteredBooks.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline">Load More</Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BorrowedList;