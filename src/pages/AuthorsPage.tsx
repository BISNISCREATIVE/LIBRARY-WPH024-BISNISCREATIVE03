import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Search } from "lucide-react";
import Header from '@/components/Header';
import { Author } from '@/data/dummyData';
import { authorsAPI } from '@/services/api';
import { toast } from 'sonner';

const AuthorsPage = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  useEffect(() => {
    // Filter authors based on search query
    if (searchQuery.trim()) {
      const filtered = authors.filter(author =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAuthors(filtered);
    } else {
      setFilteredAuthors(authors);
    }
  }, [authors, searchQuery]);

  const fetchAuthors = async (page = 1, reset = false) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await authorsAPI.getAuthorsWithPagination(page, 12);
      const newAuthors = response.data.authors || response.data;
      const paginationData = response.data.pagination;

      if (reset || page === 1) {
        setAuthors(newAuthors);
      } else {
        setAuthors(prev => [...prev, ...newAuthors]);
      }

      setPagination(paginationData);
      setHasMore(paginationData?.hasNext || false);
      setCurrentPage(page);

    } catch (error) {
      console.error('Error fetching authors:', error);
      toast.error('Failed to load authors');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      fetchAuthors(currentPage + 1);
    }
  };

  const handleAuthorClick = (authorId: string) => {
    navigate(`/author/${authorId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-20 pb-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading authors...</p>
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
          <h1 className="text-3xl font-bold mb-8">All Authors</h1>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search authors..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Authors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
            {filteredAuthors.map((author, index) => (
              <motion.div
                key={author._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 12) * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center p-4 rounded-2xl bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleAuthorClick(author._id)}
              >
                <Avatar className="w-16 h-16 md:w-20 md:h-20 mb-3">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <h3 className="font-semibold text-sm md:text-base text-center mb-2 text-foreground line-clamp-2">
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
          {hasMore && !searchQuery && (
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
                    Loading More...
                  </>
                ) : (
                  'Load More Authors'
                )}
              </Button>
            </div>
          )}

          {/* Results Info */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            {searchQuery ? (
              `Found ${filteredAuthors.length} authors matching "${searchQuery}"`
            ) : (
              pagination ? (
                `Showing ${authors.length} of ${pagination.total} authors`
              ) : (
                `Showing ${authors.length} authors`
              )
            )}
          </div>

          {/* No Results */}
          {filteredAuthors.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? 'No authors found matching your search.' : 'No authors available.'}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthorsPage;