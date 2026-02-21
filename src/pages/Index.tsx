import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import ActionCards from "@/components/ActionCards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ActionCards />
      <ShowcaseSection />
      <Footer />
    </div>
  );
};

export default Index;
