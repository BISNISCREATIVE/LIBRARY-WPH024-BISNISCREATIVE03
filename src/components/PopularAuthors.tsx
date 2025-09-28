import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { Author, dummyAuthors } from '@/data/dummyData';
import { authorsAPI } from '@/services/api';
import { toast } from 'sonner';

const PopularAuthors = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [displayedAuthors, setDisplayedAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [authorsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAuthors();
  }, []);

  useEffect(() => {
    // Update displayed authors when authors or currentPage changes
    const startIndex = 0;
    const endIndex = currentPage * authorsPerPage;
    setDisplayedAuthors(authors.slice(startIndex, endIndex));
  }, [authors, currentPage, authorsPerPage]);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const response = await authorsAPI.getAuthors();
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
      // Fallback to dummy data
      setAuthors(dummyAuthors);
      toast.error('Failed to load authors, showing sample data');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (displayedAuthors.length < authors.length) {
      setLoadingMore(true);
      // Simulate loading delay
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setLoadingMore(false);
      }, 500);
    }
  };

  const handleAuthorClick = (authorId: string) => {
    navigate(`/author/${authorId}`);
  };

  const hasMoreAuthors = displayedAuthors.length < authors.length;

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Popular Authors</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col items-center p-4 rounded-2xl bg-card">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-3 bg-muted rounded-full animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-20 mb-2 animate-pulse"></div>
              <div className="h-3 bg-muted rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Popular Authors</h2>
        <Button 
          variant="outline" 
          onClick={() => navigate('/authors')}
          className="hidden md:flex"
        >
          View All Authors
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {displayedAuthors.map((author, index) => (
          <motion.div
            key={author._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center p-4 rounded-2xl bg-card hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => handleAuthorClick(author._id)}
          >
            <Avatar className="w-16 h-16 md:w-20 md:h-20 mb-3">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <h3 className="font-semibold text-sm md:text-base text-center mb-2 text-foreground">
              {author.name}
            </h3>
            
            <div className="flex items-center space-x-1 text-primary">
              <Book className="w-4 h-4" />
              <span className="text-sm font-medium">{author.bookCount} books</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreAuthors && (
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
              'Load More Authors'
            )}
          </Button>
        </div>
      )}

      {/* Mobile View All Authors Button */}
      <div className="text-center mt-6 md:hidden">
        <Button 
          variant="outline" 
          onClick={() => navigate('/authors')}
        >
          View All Authors
        </Button>
      </div>

      {/* Authors Count Info */}
      {authors.length > authorsPerPage && (
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Showing {displayedAuthors.length} of {authors.length} authors
        </div>
      )}
    </section>
  );
};

export default PopularAuthors;