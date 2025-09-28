import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Book, Star, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import { Author, Book as BookType } from '@/data/dummyData';
import { authorsAPI } from '@/services/api';
import { toast } from 'sonner';

const AuthorDetail = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<BookType[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [booksPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  useEffect(() => {
    // Update displayed books when books or currentPage changes
    const startIndex = 0;
    const endIndex = currentPage * booksPerPage;
    setDisplayedBooks(books.slice(startIndex, endIndex));
  }, [books, currentPage, booksPerPage]);

  const fetchAuthorData = async () => {
    try {
      setLoading(true);
      const [authorResponse, booksResponse] = await Promise.all([
        authorsAPI.getAuthor(authorId!),
        authorsAPI.getAuthorBooks(authorId!)
      ]);
      
      setAuthor(authorResponse.data);
      setBooks(booksResponse.data);
    } catch (error) {
      console.error('Error fetching author data:', error);
      toast.error('Failed to load author information');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (displayedBooks.length < books.length) {
      setLoadingMore(true);
      // Simulate loading delay
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setLoadingMore(false);
      }, 500);
    }
  };

  const hasMoreBooks = displayedBooks.length < books.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-20 pb-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading author information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-20 pb-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Author Not Found</h2>
            <p className="text-muted-foreground mb-8">The author you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')}>Go Back Home</Button>
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
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Author Profile */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Author Avatar */}
                <div className="flex-shrink-0">
                  <Avatar className="w-32 h-32 md:w-40 md:h-40">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback className="text-2xl">
                      {author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Author Info */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Book className="h-4 w-4" />
                        <span>{author.bookCount} books</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Biography</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Books Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Books by {author.name}</h2>
            
            {books.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No books found for this author.</p>
              </div>
            ) : (
              <>
                {/* Books Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  {displayedBooks.map((book, index) => (
                    <motion.div
                      key={book._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <BookCard
                        id={book._id}
                        title={book.title}
                        author={book.author.name}
                        cover={book.cover}
                        rating={book.rating}
                        onClick={() => navigate(`/book/${book._id}`)}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMoreBooks && (
                  <div className="text-center">
                    <Button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      variant="outline"
                      size="lg"
                    >
                      {loadingMore ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                          Loading...
                        </>
                      ) : (
                        'Load More Books'
                      )}
                    </Button>
                  </div>
                )}

                {/* Books Count Info */}
                <div className="text-center mt-4 text-sm text-muted-foreground">
                  Showing {displayedBooks.length} of {books.length} books
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthorDetail;