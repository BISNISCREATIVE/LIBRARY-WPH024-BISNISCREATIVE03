import { useState, useEffect } from 'react';
import { Book, Author, Category } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { X, Upload, CheckCircle } from 'lucide-react';
import { adminAPI } from '@/services/api';
import { toast } from 'sonner';

interface BookFormProps {
  book?: Book;
  authors: Author[];
  categories: Category[];
  onClose: () => void;
  onSave: (book: Book) => void;
}

const BookForm = ({ book, authors, categories, onClose, onSave }: BookFormProps) => {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    authorId: book?.author._id || '',
    categoryId: book?.category._id || '',
    description: book?.description || '',
    pages: book?.pages || 0,
    isbn: book?.isbn || '',
    cover: book?.cover || '',
    totalCopies: book?.availability.total || 1,
    availableCopies: book?.availability.available || 1,
    publishedAt: book?.publishedAt ? book.publishedAt.split('T')[0] : ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.authorId) newErrors.authorId = 'Author is required';
    if (!formData.categoryId) newErrors.categoryId = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.pages <= 0) newErrors.pages = 'Pages must be greater than 0';
    if (!formData.cover.trim()) newErrors.cover = 'Cover image URL is required';
    if (formData.totalCopies <= 0) newErrors.totalCopies = 'Total copies must be greater than 0';
    if (formData.availableCopies < 0) newErrors.availableCopies = 'Available copies cannot be negative';
    if (formData.availableCopies > formData.totalCopies) newErrors.availableCopies = 'Available copies cannot exceed total copies';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setLoading(true);
    
    try {
      const selectedAuthor = authors.find(a => a._id === formData.authorId);
      const selectedCategory = categories.find(c => c._id === formData.categoryId);

      if (!selectedAuthor || !selectedCategory) {
        throw new Error('Invalid author or category selected');
      }

      const bookData = {
        title: formData.title,
        author: selectedAuthor,
        category: selectedCategory,
        description: formData.description,
        pages: formData.pages,
        isbn: formData.isbn,
        cover: formData.cover,
        availability: {
          total: formData.totalCopies,
          available: formData.availableCopies
        },
        publishedAt: formData.publishedAt || new Date().toISOString()
      };

      let result;
      if (book) {
        result = await adminAPI.updateBook(book._id, bookData);
      } else {
        result = await adminAPI.addBook(bookData);
      }

      setShowSuccess(true);
      setTimeout(() => {
        onSave(result.data);
        onClose();
      }, 2000);

    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {book ? 'Book Updated Successfully!' : 'Book Added Successfully!'}
          </h3>
          <p className="text-muted-foreground text-center">
            The book has been {book ? 'updated' : 'added'} to the library system.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{book ? 'Edit Book' : 'Add New Book'}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Author and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author">Author *</Label>
              <Select value={formData.authorId} onValueChange={(value) => setFormData({ ...formData, authorId: value })}>
                <SelectTrigger className={errors.authorId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author._id} value={author._id}>{author.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.authorId && <p className="text-sm text-red-500 mt-1">{errors.authorId}</p>}
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                <SelectTrigger className={errors.categoryId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && <p className="text-sm text-red-500 mt-1">{errors.categoryId}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={errors.description ? 'border-red-500' : ''}
              rows={3}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Pages, ISBN, Published Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="pages">Pages *</Label>
              <Input
                id="pages"
                type="number"
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) || 0 })}
                className={errors.pages ? 'border-red-500' : ''}
              />
              {errors.pages && <p className="text-sm text-red-500 mt-1">{errors.pages}</p>}
            </div>

            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="publishedAt">Published Date</Label>
              <Input
                id="publishedAt"
                type="date"
                value={formData.publishedAt}
                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <Label htmlFor="cover">Cover Image URL *</Label>
            <Input
              id="cover"
              value={formData.cover}
              onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
              className={errors.cover ? 'border-red-500' : ''}
              placeholder="https://example.com/image.jpg"
            />
            {errors.cover && <p className="text-sm text-red-500 mt-1">{errors.cover}</p>}
            {formData.cover && (
              <div className="mt-2">
                <img src={formData.cover} alt="Cover preview" className="w-24 h-32 object-cover rounded" />
              </div>
            )}
          </div>

          {/* Copies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalCopies">Total Copies *</Label>
              <Input
                id="totalCopies"
                type="number"
                value={formData.totalCopies}
                onChange={(e) => setFormData({ ...formData, totalCopies: parseInt(e.target.value) || 0 })}
                className={errors.totalCopies ? 'border-red-500' : ''}
              />
              {errors.totalCopies && <p className="text-sm text-red-500 mt-1">{errors.totalCopies}</p>}
            </div>

            <div>
              <Label htmlFor="availableCopies">Available Copies *</Label>
              <Input
                id="availableCopies"
                type="number"
                value={formData.availableCopies}
                onChange={(e) => setFormData({ ...formData, availableCopies: parseInt(e.target.value) || 0 })}
                className={errors.availableCopies ? 'border-red-500' : ''}
              />
              {errors.availableCopies && <p className="text-sm text-red-500 mt-1">{errors.availableCopies}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : book ? 'Update Book' : 'Add Book'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookForm;