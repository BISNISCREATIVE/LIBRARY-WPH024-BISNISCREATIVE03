import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  onClick?: () => void;
}

const BookCard = ({ id, title, author, cover, rating, onClick }: BookCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-0">
          <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm md:text-base mb-1 line-clamp-2 text-foreground">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-2">
              {author}
            </p>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-foreground">{rating}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookCard;