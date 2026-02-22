import { Link } from "react-router-dom";
import { Search, Wrench, ArrowRight } from "lucide-react";

const ActionCards = () => {
  return (
    <section id="parts" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-10">
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">Что вам нужно?</span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mt-1 tracking-tight">ВЫБЕРИТЕ НАПРАВЛЕНИЕ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Подбор запчастей */}
          <a
            href="#"
            className="group relative rounded-2xl p-8 md:p-10 bg-card border-2 border-border hover:border-accent/50 transition-all duration-500 overflow-hidden hover:shadow-card-hover"
          >
            <div className="absolute inset-0 bg-accent-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Search className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3 tracking-tight">
                ПОДБОР ЗАПЧАСТЕЙ
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Введите VIN-код вашего автомобиля и получите доступ к полному каталогу оригинальных запчастей с ценами и сроками доставки.
              </p>
              <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                Перейти к поиску <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* Запись на ремонт */}
          <Link
            to="/repair"
            className="group relative rounded-2xl p-8 md:p-10 bg-hero-gradient border-2 border-border/10 hover:border-accent/30 transition-all duration-500 overflow-hidden hover:shadow-card-hover"
          >
            <div className="absolute inset-0 bg-accent-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                <Wrench className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-primary-foreground mb-3 tracking-tight">
                ЗАПИСЬ НА РЕМОНТ
              </h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
                Выберите авто из профиля, услугу из прайс-листа и удобное время. Вы сами решаете — использовать свои запчасти или купить у нас.
              </p>
              <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                Записаться <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActionCards;
