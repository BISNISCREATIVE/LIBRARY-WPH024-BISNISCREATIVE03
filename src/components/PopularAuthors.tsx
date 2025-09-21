import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Book } from "lucide-react";

const mockAuthors = [
  {
    id: "1",
    name: "J.K. Rowling",
    books: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c921?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Stephen King",
    books: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Agatha Christie",
    books: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Tere Liye",
    books: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

const PopularAuthors = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Popular Authors</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockAuthors.map((author, index) => (
          <motion.div
            key={author.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center p-4 rounded-2xl bg-card hover:bg-accent/50 transition-colors cursor-pointer"
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
              <span className="text-sm font-medium">{author.books} books</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PopularAuthors;