import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-hero-gradient-start to-hero-gradient-end rounded-2xl overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={heroBanner}
              alt="Children reading books in clouds"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center py-16 px-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Welcome to
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            >
              Booky
            </motion.h2>
          </div>

          {/* Carousel dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;