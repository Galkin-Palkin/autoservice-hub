import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import ActionCards from "@/components/ActionCards";
import Footer from "@/components/Footer";

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
    return () => clearTimeout(t);
  }, [hash]);

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
