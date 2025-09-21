import { motion } from "framer-motion";
import { BookOpen, Lightbulb, DollarSign, FlaskConical, Microscope, GraduationCap } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "@/store/slices/uiSlice";

const categories = [
  { id: "fiction", name: "Fiction", icon: BookOpen, color: "bg-yellow-100 text-yellow-600" },
  { id: "non-fiction", name: "Non-Fiction", icon: BookOpen, color: "bg-blue-100 text-blue-600" },
  { id: "self-improvement", name: "Self-Improvement", icon: Lightbulb, color: "bg-green-100 text-green-600" },
  { id: "finance", name: "Finance", icon: DollarSign, color: "bg-blue-100 text-blue-600" },
  { id: "science", name: "Science", icon: FlaskConical, color: "bg-purple-100 text-purple-600" },
  { id: "education", name: "Education", icon: GraduationCap, color: "bg-orange-100 text-orange-600" },
];

const CategoryGrid = () => {
  const dispatch = useDispatch();

  const handleCategorySelect = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategorySelect(category.id)}
              className="flex flex-col items-center p-4 rounded-2xl bg-category-bg hover:bg-category-hover transition-colors group"
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-3 ${category.color} group-hover:scale-110 transition-transform`}>
                <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span className="text-xs md:text-sm font-medium text-center text-foreground">
                {category.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;