import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-auto.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Профессиональный автосервис" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 pt-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-medium uppercase tracking-wider">Работаем ежедневно 8:00 — 21:00</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-[0.95] tracking-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            ЗАПЧАСТИ
            <br />
            <span className="text-gradient-accent">+ СЕРВИС</span>
          </h1>

          <p className="text-primary-foreground/70 text-base md:text-lg max-w-lg mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Оригинальные запчасти для любых марок авто с доставкой. Профессиональный ремонт и обслуживание от сертифицированных мастеров.
          </p>

          {/* VIN Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Введите VIN или Frame-код..."
                className="w-full h-12 md:h-14 pl-12 pr-4 rounded-lg bg-card/95 backdrop-blur-sm text-card-foreground placeholder:text-muted-foreground border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
              />
            </div>
            <Button className="h-12 md:h-14 px-8 bg-accent-gradient text-accent-foreground font-semibold text-sm shadow-glow hover:opacity-90 transition-opacity">
              Найти запчасти
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "50 000+", label: "Запчастей в наличии" },
              { value: "12 лет", label: "На рынке" },
              { value: "98%", label: "Довольных клиентов" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl md:text-3xl text-accent">{stat.value}</div>
                <div className="text-primary-foreground/50 text-xs uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
