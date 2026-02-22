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
      <div className="container flex items-center justify-between h-14 tablet:h-16 xl:h-20 gap-2 min-w-0">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-8 h-8 tablet:w-9 tablet:h-9 rounded-md bg-accent-gradient flex items-center justify-center">
            <span className="font-display text-accent-foreground font-bold text-base tablet:text-lg">З</span>
          </div>
          <div className="hidden tablet:block truncate">
            <span className="font-display text-primary-foreground text-base xl:text-lg tracking-wide">ЗАПЧАСТИ</span>
            <span className="font-display text-accent text-base xl:text-lg tracking-wide"> + СЕРВИС</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden tablet:flex items-center gap-4 xl:gap-8 shrink-0">
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
        <div className="flex items-center gap-1.5 tablet:gap-3 shrink-0">
          <Button asChild variant="ghost" size="sm" className="relative hidden tablet:flex text-primary-foreground/80 hover:text-accent hover:bg-accent/10">
            <Link to="/cart" className="flex items-center">
              <ShoppingCart className="w-4 h-4 xl:mr-2 shrink-0" />
              <span className="hidden xl:inline">Корзина</span>
              {count > 0 && (
                <Badge className="ml-1.5 h-5 min-w-5 px-1.5 bg-accent text-accent-foreground border-0 text-xs">
                  {count}
                </Badge>
              )}
            </Link>
          </Button>
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden tablet:flex text-primary-foreground/80 hover:text-accent hover:bg-accent/10">
                <Link to="/account">
                  <UserCircle className="w-4 h-4 mr-2 shrink-0" />
                  <span className="hidden xl:inline">Личный кабинет</span>
                </Link>
              </Button>
              <span className="hidden xl:inline text-primary-foreground/80 text-sm truncate max-w-[120px]">
                {user.name}
              </span>
              <Button variant="ghost" size="sm" className="hidden tablet:flex text-primary-foreground/80 hover:text-accent" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2 shrink-0" />
                <span className="hidden xl:inline">Выйти</span>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden tablet:flex text-primary-foreground/80 hover:text-accent hover:bg-accent/10">
                <Link to="/login">
                  <User className="w-4 h-4 mr-2 shrink-0" />
                  <span className="hidden xl:inline">Войти</span>
                </Link>
              </Button>
              <Button asChild size="sm" className="hidden tablet:flex bg-accent-gradient text-accent-foreground hover:opacity-90 font-semibold shadow-glow">
                <Link to="/register">Регистрация</Link>
              </Button>
            </>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="tablet:hidden text-primary-foreground/80 p-2 touch-manipulation"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="tablet:hidden bg-primary border-t border-border/10 animate-fade-in">
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
