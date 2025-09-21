import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import BookGrid from "@/components/BookGrid";
import PopularAuthors from "@/components/PopularAuthors";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <BookGrid />
        <PopularAuthors />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
