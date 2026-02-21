import { useState } from "react";
import { Menu, X, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-border/10">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-accent-gradient flex items-center justify-center">
            <span className="font-display text-accent-foreground font-bold text-lg">З</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-primary-foreground text-lg tracking-wide">ЗАПЧАСТИ</span>
            <span className="font-display text-accent text-lg tracking-wide"> + СЕРВИС</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#parts" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium tracking-wide uppercase">
            Запчасти
          </a>
          <a href="#service" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium tracking-wide uppercase">
            Ремонт
          </a>
          <a href="#promo" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium tracking-wide uppercase">
            Акции
          </a>
          <a href="tel:+78001234567" className="flex items-center gap-1.5 text-primary-foreground/70 hover:text-accent transition-colors text-sm">
            <Phone className="w-3.5 h-3.5" />
            8 (800) 123-45-67
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden md:flex text-primary-foreground/80 hover:text-accent hover:bg-accent/10">
            <User className="w-4 h-4 mr-2" />
            Войти
          </Button>
          <Button size="sm" className="hidden md:flex bg-accent-gradient text-accent-foreground hover:opacity-90 font-semibold shadow-glow">
            Регистрация
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-primary-foreground/80 p-2"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-border/10 animate-fade-in">
          <nav className="container py-4 flex flex-col gap-3">
            <a href="#parts" className="text-primary-foreground/70 hover:text-accent py-2 text-sm uppercase tracking-wide">Запчасти</a>
            <a href="#service" className="text-primary-foreground/70 hover:text-accent py-2 text-sm uppercase tracking-wide">Ремонт</a>
            <a href="#promo" className="text-primary-foreground/70 hover:text-accent py-2 text-sm uppercase tracking-wide">Акции</a>
            <a href="tel:+78001234567" className="text-primary-foreground/70 py-2 text-sm flex items-center gap-2">
              <Phone className="w-4 h-4" /> 8 (800) 123-45-67
            </a>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm" className="flex-1 border-primary-foreground/20 text-primary-foreground hover:bg-accent/10">
                Войти
              </Button>
              <Button size="sm" className="flex-1 bg-accent-gradient text-accent-foreground">
                Регистрация
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
