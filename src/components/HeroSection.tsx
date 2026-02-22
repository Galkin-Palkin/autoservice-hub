import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-auto.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] tablet:min-h-[90vh] xl:min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Профессиональный автосервис" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 pt-20 pb-12 tablet:pt-24 xl:pt-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 tablet:px-4 rounded-full border border-accent/30 bg-accent/10 mb-4 tablet:mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="text-accent text-[10px] tablet:text-xs font-medium uppercase tracking-wider">Работаем ежедневно 8:00 — 21:00</span>
          </div>

          <h1 className="font-display text-3xl min-[400px]:text-4xl tablet:text-5xl xl:text-6xl 2xl:text-7xl text-primary-foreground leading-[0.95] tracking-tight mb-4 tablet:mb-6 animate-fade-up break-words" style={{ animationDelay: "0.1s" }}>
            ЗАПЧАСТИ
            <br />
            <span className="text-gradient-accent">+ СЕРВИС</span>
          </h1>

          <p className="text-primary-foreground/70 text-sm tablet:text-base xl:text-lg max-w-lg mb-6 tablet:mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Оригинальные запчасти для любых марок авто с доставкой. Профессиональный ремонт и обслуживание от сертифицированных мастеров.
          </p>

          {/* VIN Search */}
          <div className="flex flex-col tablet:flex-row gap-3 mb-6 tablet:mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative flex-1 w-full min-w-0 max-w-md">
              <Search className="absolute left-3 tablet:left-4 top-1/2 -translate-y-1/2 w-4 h-4 tablet:w-5 tablet:h-5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Введите VIN или Frame-код..."
                className="w-full h-11 tablet:h-12 xl:h-14 pl-10 tablet:pl-12 pr-3 tablet:pr-4 rounded-lg bg-card/95 backdrop-blur-sm text-card-foreground placeholder:text-muted-foreground border border-border/50 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
              />
            </div>
            <Button className="h-11 tablet:h-12 xl:h-14 px-6 tablet:px-8 bg-accent-gradient text-accent-foreground font-semibold text-sm shadow-glow hover:opacity-90 transition-opacity shrink-0">
              Найти запчасти
              <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 tablet:gap-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "50 000+", label: "Запчастей в наличии" },
              { value: "12 лет", label: "На рынке" },
              { value: "98%", label: "Довольных клиентов" },
            ].map((stat) => (
              <div key={stat.label} className="min-w-0">
                <div className="font-display text-xl tablet:text-2xl xl:text-3xl text-accent">{stat.value}</div>
                <div className="text-primary-foreground/50 text-[10px] tablet:text-xs uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
