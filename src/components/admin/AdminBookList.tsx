import { useState, useEffect } from 'react';
import { Book, Author, Category, dummyBooks, dummyAuthors, dummyCategories } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { adminAPI } from '@/services/api';
import { toast } from 'sonner';
import BookForm from './BookForm';

const AdminBookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>(dummyAuthors);
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllBooks();
      setBooks(response.data);
    } catch (error) {
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteBook = async (bookId: string, bookTitle: string) => {
    try {
      await adminAPI.deleteBook(bookId);
      setBooks(books.filter(book => book._id !== bookId));
      toast.success(`"${bookTitle}" has been deleted successfully`);
    } catch (error) {
      toast.error('Failed to delete book');
    }
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleFormSave = (book: Book) => {
    if (editingBook) {
      setBooks(books.map(b => b._id === book._id ? book : b));
      toast.success('Book updated successfully');
    } else {
      setBooks([...books, book]);
      toast.success('Book added successfully');
    }
    setShowForm(false);
    setEditingBook(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Book Management</h2>
        <Button onClick={handleAddBook} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add New Book
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search books by title, author, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Books Grid */}
      <div className="grid gap-6">
        {filteredBooks.map((book) => (
          <Card key={book._id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Book Cover */}
                <div className="flex-shrink-0">
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className="w-full md:w-32 h-48 md:h-40 object-cover rounded-lg"
                  />
                </div>

                {/* Book Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold line-clamp-2">{book.title}</h3>
                      <p className="text-muted-foreground">by {book.author.name}</p>
                    </div>
                    <Badge variant="secondary">{book.category.name}</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {book.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span>Pages: {book.pages}</span>
                    <span>Rating: {book.rating}⭐ ({book.totalReviews} reviews)</span>
                    <span>Available: {book.availability.available}/{book.availability.total}</span>
                  </div>

                  {book.isbn && (
                    <p className="text-sm text-muted-foreground">ISBN: {book.isbn}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col gap-2">
                  <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={() => setSelectedBook(book)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={() => handleEditBook(book)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Book</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{book.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteBook(book._id, book.title)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found matching your search.</p>
        </div>
      )}

      {/* Book Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <BookForm
            book={editingBook || undefined}
            authors={authors}
            categories={categories}
            onClose={handleFormClose}
            onSave={handleFormSave}
          />
        </DialogContent>
      </Dialog>

      {/* Book Details Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book Details</DialogTitle>
          </DialogHeader>
          {selectedBook && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <img 
                  src={selectedBook.cover} 
                  alt={selectedBook.title}
                  className="w-32 h-48 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">{selectedBook.title}</h3>
                  <p className="text-muted-foreground">by {selectedBook.author.name}</p>
                  <Badge variant="secondary">{selectedBook.category.name}</Badge>
                  <p className="text-sm">{selectedBook.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Pages:</span> {selectedBook.pages}
                </div>
                <div>
                  <span className="font-medium">Rating:</span> {selectedBook.rating}⭐ ({selectedBook.totalReviews})
                </div>
                <div>
                  <span className="font-medium">Available:</span> {selectedBook.availability.available}/{selectedBook.availability.total}
                </div>
                <div>
                  <span className="font-medium">Published:</span> {new Date(selectedBook.publishedAt).toLocaleDateString()}
                </div>
                {selectedBook.isbn && (
                  <div className="col-span-2">
                    <span className="font-medium">ISBN:</span> {selectedBook.isbn}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookList;