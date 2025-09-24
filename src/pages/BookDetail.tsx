import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { booksAPI, loansAPI } from '@/services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import toast from 'react-hot-toast';

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  cover: string;
  rating: number;
  pages: number;
  reviews: number;
}

interface Review {
  _id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [borrowLoading, setBorrowLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setIsLoading(true);
      const bookResponse = await booksAPI.getBook(id!);
      setBook(bookResponse.book);
      
      // Simulate reviews data
      setReviews([
        {
          _id: '1',
          user: { name: 'John Doe', avatar: '/api/placeholder/40/40' },
          rating: 5,
          comment: 'Lorem ipsum dolor sit amet consectetur. Pulvinar porttitor aliquam viverra nunc sed facilisis.',
          createdAt: '2025-08-25T15:38:00Z'
        },
        {
          _id: '2',
          user: { name: 'Jane Smith', avatar: '/api/placeholder/40/40' },
          rating: 4,
          comment: 'Lorem ipsum dolor sit amet consectetur. Pulvinar porttitor aliquam viverra nunc sed facilisis.',
          createdAt: '2025-08-25T15:38:00Z'
        }
      ]);

      // Fetch related books
      if (bookResponse.book?.category) {
        const relatedResponse = await booksAPI.getBooksByCategory(bookResponse.book.category);
        setRelatedBooks(relatedResponse.books?.slice(0, 5) || []);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      toast.error('Failed to load book details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBorrowBook = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to borrow books');
      navigate('/login');
      return;
    }

    try {
      setBorrowLoading(true);
      await loansAPI.borrowBook(id!);
      toast.success('Book borrowed successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to borrow book');
    } finally {
      setBorrowLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-20">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-[3/4] bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Book not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <button onClick={() => navigate('/')} className="hover:text-foreground">
            Home
          </button>
          <span>›</span>
          <button onClick={() => navigate('/category')} className="hover:text-foreground">
            Category
          </button>
          <span>›</span>
          <span className="text-foreground">{book.title}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Book Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Book Cover */}
            <div className="relative">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Book Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {book.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <p className="text-xl text-muted-foreground mb-4">{book.author}</p>
                
                <div className="flex items-center space-x-1 mb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium">{book.rating}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{book.pages}</div>
                    <div className="text-sm text-muted-foreground">Page</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{Math.floor(book.rating * 10) / 10}</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{book.reviews}</div>
                    <div className="text-sm text-muted-foreground">Reviews</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => toast.success('Added to cart!')}
                >
                  Add to Cart
                </Button>
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleBorrowBook}
                  disabled={borrowLoading}
                >
                  {borrowLoading ? 'Borrowing...' : 'Borrow Book'}
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Review</h2>
            <div className="flex items-center space-x-2 mb-6">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{book.rating} ({reviews.length} Ulasan)</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <Card key={review._id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={review.user.avatar} />
                        <AvatarFallback>
                          {getInitials(review.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{review.user.name}</h4>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button variant="outline">Load More</Button>
            </div>
          </div>

          {/* Related Books */}
          {relatedBooks.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Books</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {relatedBooks.map((relatedBook) => (
                  <BookCard
                    key={relatedBook._id}
                    id={relatedBook._id}
                    title={relatedBook.title}
                    author={relatedBook.author}
                    cover={relatedBook.cover}
                    rating={relatedBook.rating}
                    onClick={() => navigate(`/book/${relatedBook._id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetail;