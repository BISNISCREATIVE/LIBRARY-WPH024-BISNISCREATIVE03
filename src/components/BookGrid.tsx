import { motion } from "framer-motion";
import BookCard from "./BookCard";
import { Button } from "@/components/ui/button";

// Mock data for books
const mockBooks = [
  {
    id: "1",
    title: "21 Rasa Bakso Pak Bowo",
    author: "Tuhu",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    rating: 4.9,
  },
  {
    id: "2",
    title: "Irresistible",
    author: "Lisa Kleypas",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    rating: 4.9,
  },
  {
    id: "3",
    title: "Oliver Twist",
    author: "Charles Dickens",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    rating: 4.9,
  },
  {
    id: "4",
    title: "White Fang",
    author: "Jack London",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    rating: 4.9,
  },
  {
    id: "5",
    title: "The Scarred Woman",
    author: "Jussi Adler-Olsen",
    cover: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=400&fit=crop",
    rating: 4.9,
  },
  {
    id: "6",
    title: "Silent Patient",
    author: "Alex Michaelides",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
    rating: 4.9,
  },
  {
    id: "7",
    title: "Kapan Pindah Rumah",
    author: "Fiersa Besari",
    cover: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop",
    rating: 4.9,
  },
  {
    id: "8",
    title: "Yeti Yang Abadi",
    author: "Tere Liye",
    cover: "https://images.unsplash.com/photo-1566398474442-ce95e4e25eef?w=300&h=400&fit=crop",
    rating: 4.9,
  },
  {
    id: "9",
    title: "Rumah Yang Menelan Penghuninya",
    author: "Kenken Layla",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    rating: 4.9,
  },
  {
    id: "10",
    title: "Other Half of Me",
    author: "Elsa Puspita",
    cover: "https://images.unsplash.com/photo-1568667256549-094345857637?w=300&h=400&fit=crop",
    rating: 4.9,
  },
];

const BookGrid = () => {
  const handleBookClick = (bookId: string) => {
    console.log("Book clicked:", bookId);
    // Navigate to book detail page
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Recommendation</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {mockBooks.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BookCard
              {...book}
              onClick={() => handleBookClick(book.id)}
            />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Load More
        </Button>
      </div>
    </section>
  );
};

export default BookGrid;