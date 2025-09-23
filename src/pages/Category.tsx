import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { booksAPI } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';

interface Book {
  _id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  category: string;
}

interface FilterState {
  categories: string[];
  ratings: number[];
}

const Category = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    ratings: []
  });

  const categories = [
    'Fiction',
    'Non-fiction',
    'Self-Improve',
    'Finance',
    'Science',
    'Education'
  ];

  const ratingOptions = [5, 4, 3, 2, 1];

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [books, filters, searchQuery]);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await booksAPI.getBooks();
      setBooks(response.books || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...books];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(book =>
        filters.categories.includes(book.category)
      );
    }

    // Rating filter
    if (filters.ratings.length > 0) {
      filtered = filtered.filter(book =>
        filters.ratings.some(rating => Math.floor(book.rating) === rating)
      );
    }

    setFilteredBooks(filtered);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      ratings: checked
        ? [...prev.ratings, rating]
        : prev.ratings.filter(r => r !== rating)
    }));
  };

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <label htmlFor={category} className="text-sm font-medium">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">Rating</h3>
        <div className="space-y-3">
          {ratingOptions.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.ratings.includes(rating)}
                onCheckedChange={(checked) =>
                  handleRatingChange(rating, checked as boolean)
                }
              />
              <label htmlFor={`rating-${rating}`} className="text-sm font-medium">
                ⭐ {rating}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-20">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
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
          <h1 className="text-3xl font-bold mb-6">Book List</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Filter className="w-5 h-5" />
                    <span className="font-semibold">FILTER</span>
                  </div>
                  <FilterSection />
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowMobileFilter(!showMobileFilter)}
                  className="w-full"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  FILTER
                </Button>
              </div>

              {/* Mobile Filter Panel */}
              {showMobileFilter && (
                <Card className="lg:hidden mb-6">
                  <CardContent className="p-4">
                    <FilterSection />
                  </CardContent>
                </Card>
              )}

              {/* Search Bar - Mobile Only */}
              <div className="lg:hidden mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search book"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book._id}
                    id={book._id}
                    title={book.title}
                    author={book.author}
                    cover={book.cover}
                    rating={book.rating}
                    onClick={() => navigate(`/book/${book._id}`)}
                  />
                ))}
              </div>

              {filteredBooks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No books found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Category;