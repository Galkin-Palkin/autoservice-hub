import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Phone, ShoppingCart, LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-border/10">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-9 h-9 rounded-md bg-accent-gradient flex items-center justify-center">
            <span className="font-display text-accent-foreground font-bold text-lg">З</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-primary-foreground text-lg tracking-wide">ЗАПЧАСТИ</span>
            <span className="font-display text-accent text-lg tracking-wide"> + СЕРВИС</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/#parts" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium tracking-wide uppercase">
            Запчасти
          </Link>
          <Link to="/repair" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium tracking-wide uppercase">
            Ремонт
          </Link>
          <Link to="/#promo" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm font-medium tracking-wide uppercase">
            Акции
          </Link>
          <a href="tel:+78001234567" className="flex items-center gap-1.5 text-primary-foreground/70 hover:text-accent transition-colors text-sm">
            <Phone className="w-3.5 h-3.5" />
            8 (800) 123-45-67
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="relative hidden md:flex text-primary-foreground/80 hover:text-accent hover:bg-accent/10">
            <Link to="/cart">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Корзина
              {count > 0 && (
                <Badge className="ml-1.5 h-5 min-w-5 px-1.5 bg-accent text-accent-foreground border-0 text-xs">
                  {count}
                </Badge>
              )}
            </Link>
          </Button>
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden md:flex text-primary-foreground/80 hover:text-accent hover:bg-accent/10">
                <Link to="/account">
                  <UserCircle className="w-4 h-4 mr-2" />
                  Личный кабинет
                </Link>
              </Button>
              <span className="hidden md:inline text-primary-foreground/80 text-sm truncate max-w-[120px]">
                {user.name}
              </span>
              <Button variant="ghost" size="sm" className="hidden md:flex text-primary-foreground/80 hover:text-accent" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden md:flex text-primary-foreground/80 hover:text-accent hover:bg-accent/10">
                <Link to="/login">
                  <User className="w-4 h-4 mr-2" />
                  Войти
                </Link>
              </Button>
              <Button asChild size="sm" className="hidden md:flex bg-accent-gradient text-accent-foreground hover:opacity-90 font-semibold shadow-glow">
                <Link to="/register">Регистрация</Link>
              </Button>
            </>
          )}
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
            <Link to="/#parts" className="text-primary-foreground/70 hover:text-accent py-2 text-sm uppercase tracking-wide" onClick={() => setMobileOpen(false)}>Запчасти</Link>
            <Link to="/repair" className="text-primary-foreground/70 hover:text-accent py-2 text-sm uppercase tracking-wide" onClick={() => setMobileOpen(false)}>Ремонт</Link>
            <Link to="/#promo" className="text-primary-foreground/70 hover:text-accent py-2 text-sm uppercase tracking-wide" onClick={() => setMobileOpen(false)}>Акции</Link>
            <a href="tel:+78001234567" className="text-primary-foreground/70 py-2 text-sm flex items-center gap-2">
              <Phone className="w-4 h-4" /> 8 (800) 123-45-67
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild variant="outline" size="sm" className="border-primary-foreground/20 text-primary-foreground hover:bg-accent/10">
                <Link to="/cart">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Корзина {count > 0 && `(${count})`}
                </Link>
              </Button>
              {user ? (
                <>
                  <Button asChild variant="outline" size="sm" className="border-primary-foreground/20 text-primary-foreground hover:bg-accent/10">
                    <Link to="/account">
                      <UserCircle className="w-4 h-4 mr-2" />
                      Личный кабинет
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary-foreground" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" /> Выйти ({user.name})
                  </Button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1 border-primary-foreground/20 text-primary-foreground">
                    <Link to="/login">Войти</Link>
                  </Button>
                  <Button asChild size="sm" className="flex-1 bg-accent-gradient text-accent-foreground">
                    <Link to="/register">Регистрация</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
