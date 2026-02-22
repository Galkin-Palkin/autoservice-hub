import { Link } from "react-router-dom";
import { Search, Wrench, ArrowRight } from "lucide-react";

const ActionCards = () => {
  return (
    <section id="parts" className="py-10 tablet:py-16 xl:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-6 tablet:mb-10">
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">Что вам нужно?</span>
          <h2 className="font-display text-2xl tablet:text-3xl xl:text-4xl text-foreground mt-1 tracking-tight break-words">ВЫБЕРИТЕ НАПРАВЛЕНИЕ</h2>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-6 max-w-4xl mx-auto">
          {/* Подбор запчастей */}
          <a
            href="#"
            className="group relative rounded-xl tablet:rounded-2xl p-5 tablet:p-8 xl:p-10 bg-card border-2 border-border hover:border-accent/50 transition-all duration-500 overflow-hidden hover:shadow-card-hover min-w-0"
          >
            <div className="absolute inset-0 bg-accent-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            <div className="relative min-w-0">
              <div className="w-12 h-12 tablet:w-16 tablet:h-16 rounded-lg tablet:rounded-xl bg-accent/10 flex items-center justify-center mb-4 tablet:mb-6 group-hover:bg-accent/20 transition-colors shrink-0">
                <Search className="w-6 h-6 tablet:w-8 tablet:h-8 text-accent" />
              </div>
              <h3 className="font-display text-xl tablet:text-2xl xl:text-3xl text-foreground mb-2 tablet:mb-3 tracking-tight break-words">
                ПОДБОР ЗАПЧАСТЕЙ
              </h3>
              <p className="text-muted-foreground text-xs tablet:text-sm leading-relaxed mb-4 tablet:mb-6">
                Введите VIN-код вашего автомобиля и получите доступ к полному каталогу оригинальных запчастей с ценами и сроками доставки.
              </p>
              <div className="flex items-center gap-2 text-accent font-semibold text-xs tablet:text-sm group-hover:gap-3 transition-all flex-wrap">
                Перейти к поиску <ArrowRight className="w-4 h-4 shrink-0" />
              </div>
            </div>
          </a>

          {/* Запись на ремонт */}
          <Link
            to="/repair"
            className="group relative rounded-xl tablet:rounded-2xl p-5 tablet:p-8 xl:p-10 bg-hero-gradient border-2 border-border/10 hover:border-accent/30 transition-all duration-500 overflow-hidden hover:shadow-card-hover min-w-0"
          >
            <div className="absolute inset-0 bg-accent-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="relative min-w-0">
              <div className="w-12 h-12 tablet:w-16 tablet:h-16 rounded-lg tablet:rounded-xl bg-accent/20 flex items-center justify-center mb-4 tablet:mb-6 group-hover:bg-accent/30 transition-colors shrink-0">
                <Wrench className="w-6 h-6 tablet:w-8 tablet:h-8 text-accent" />
              </div>
              <h3 className="font-display text-xl tablet:text-2xl xl:text-3xl text-primary-foreground mb-2 tablet:mb-3 tracking-tight break-words">
                ЗАПИСЬ НА РЕМОНТ
              </h3>
              <p className="text-primary-foreground/60 text-xs tablet:text-sm leading-relaxed mb-4 tablet:mb-6">
                Выберите авто из профиля, услугу из прайс-листа и удобное время. Вы сами решаете — использовать свои запчасти или купить у нас.
              </p>
              <div className="flex items-center gap-2 text-accent font-semibold text-xs tablet:text-sm group-hover:gap-3 transition-all flex-wrap">
                Записаться <ArrowRight className="w-4 h-4 shrink-0" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActionCards;
