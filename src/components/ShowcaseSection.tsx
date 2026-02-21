import { ShoppingCart, Clock, Percent, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const parts = [
  { name: "Тормозные колодки Brembo", brand: "BMW 5 Series", price: "8 500 ₽", delivery: "В наличии", hot: true },
  { name: "Масляный фильтр Mann", brand: "Toyota Camry", price: "1 200 ₽", delivery: "В наличии", hot: false },
  { name: "Амортизатор KYB", brand: "Honda CR-V", price: "12 400 ₽", delivery: "2-3 дня", hot: false },
  { name: "Свечи зажигания NGK", brand: "Volkswagen Golf", price: "3 800 ₽", delivery: "В наличии", hot: true },
];

const promos = [
  { title: "Замена масла", desc: "Бесплатная диагностика при замене масла", discount: "-30%", color: "from-accent to-amber-soft" },
  { title: "Подвеска", desc: "Скидка на ремонт подвески до конца месяца", discount: "-20%", color: "from-primary to-steel-dark" },
  { title: "Новым клиентам", desc: "Скидка на первый заказ запчастей", discount: "-15%", color: "from-accent to-primary" },
];

const ShowcaseSection = () => {
  return (
    <section id="promo" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Актуальные запчасти */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-accent text-xs font-semibold uppercase tracking-widest">Каталог</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-1 tracking-tight">АКТУАЛЬНЫЕ ЗАПЧАСТИ</h2>
            </div>
            <Button variant="ghost" className="hidden sm:flex text-muted-foreground hover:text-accent">
              Все запчасти <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {parts.map((part, i) => (
              <div
                key={part.name}
                className="group relative bg-card rounded-xl p-5 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-card-hover animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {part.hot && (
                  <span className="absolute top-3 right-3 bg-accent-gradient text-accent-foreground text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                    Хит
                  </span>
                )}
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-card-foreground text-sm mb-1">{part.name}</h3>
                <p className="text-muted-foreground text-xs mb-3">{part.brand}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className={`text-xs ${part.delivery === "В наличии" ? "text-green-600" : "text-muted-foreground"}`}>
                    {part.delivery}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl text-foreground">{part.price}</span>
                  <Button size="sm" variant="outline" className="h-8 text-xs border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    В корзину
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Акции */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-accent text-xs font-semibold uppercase tracking-widest">Выгодно</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-1 tracking-tight">АКЦИИ И ПРЕДЛОЖЕНИЯ</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {promos.map((promo, i) => (
              <div
                key={promo.title}
                className="relative rounded-xl p-6 md:p-8 bg-hero-gradient overflow-hidden group cursor-pointer animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute top-4 right-4 bg-accent-gradient text-accent-foreground font-display text-2xl px-3 py-1 rounded-lg">
                  {promo.discount}
                </div>
                <Percent className="w-8 h-8 text-accent/40 mb-4" />
                <h3 className="font-display text-xl text-primary-foreground mb-2">{promo.title}</h3>
                <p className="text-primary-foreground/60 text-sm">{promo.desc}</p>
                <Button variant="ghost" className="mt-4 text-accent hover:bg-accent/10 px-0">
                  Подробнее <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
