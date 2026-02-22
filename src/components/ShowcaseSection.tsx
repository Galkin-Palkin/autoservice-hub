import { ShoppingCart, Clock, Percent, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Part } from "@/types/part";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const parts: Part[] = [
  { id: "part-1", name: "Тормозные колодки Brembo", brand: "BMW 5 Series", price: "8 500 ₽", delivery: "В наличии", hot: true },
  { id: "part-2", name: "Масляный фильтр Mann", brand: "Toyota Camry", price: "1 200 ₽", delivery: "В наличии", hot: false },
  { id: "part-3", name: "Амортизатор KYB", brand: "Honda CR-V", price: "12 400 ₽", delivery: "2-3 дня", hot: false },
  { id: "part-4", name: "Свечи зажигания NGK", brand: "Volkswagen Golf", price: "3 800 ₽", delivery: "В наличии", hot: true },
];

const promos = [
  { title: "Замена масла", desc: "Бесплатная диагностика при замене масла", discount: "-30%", color: "from-accent to-amber-soft" },
  { title: "Подвеска", desc: "Скидка на ремонт подвески до конца месяца", discount: "-20%", color: "from-primary to-steel-dark" },
  { title: "Новым клиентам", desc: "Скидка на первый заказ запчастей", discount: "-15%", color: "from-accent to-primary" },
];

const ShowcaseSection = () => {
  const { addItem } = useCart();

  const handleAddToCart = (part: Part) => {
    addItem(part);
    toast.success(`Добавлено: ${part.name}`);
  };

  return (
    <section id="promo" className="py-10 tablet:py-16 xl:py-24 bg-background">
      <div className="container">
        {/* Актуальные запчасти */}
        <div className="mb-10 tablet:mb-16 xl:mb-24">
          <div className="flex flex-col tablet:flex-row tablet:items-end tablet:justify-between gap-3 mb-6 tablet:mb-8">
            <div className="min-w-0">
              <span className="text-accent text-xs font-semibold uppercase tracking-widest">Каталог</span>
              <h2 className="font-display text-2xl tablet:text-3xl xl:text-4xl text-foreground mt-1 tracking-tight break-words">АКТУАЛЬНЫЕ ЗАПЧАСТИ</h2>
            </div>
            <Button variant="ghost" className="hidden tablet:flex text-muted-foreground hover:text-accent shrink-0 w-fit">
              Все запчасти <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 xl:grid-cols-4 gap-4 tablet:gap-6">
            {parts.map((part, i) => (
              <div
                key={part.name}
                className="group relative bg-card rounded-xl p-4 tablet:p-5 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-card-hover animate-fade-up min-w-0"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {part.hot && (
                  <span className="absolute top-2 right-2 tablet:top-3 tablet:right-3 bg-accent-gradient text-accent-foreground text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                    Хит
                  </span>
                )}
                <div className="w-10 h-10 tablet:w-12 tablet:h-12 rounded-lg bg-secondary flex items-center justify-center mb-3 tablet:mb-4 shrink-0">
                  <Star className="w-4 h-4 tablet:w-5 tablet:h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-card-foreground text-xs tablet:text-sm mb-1 break-words line-clamp-2">{part.name}</h3>
                <p className="text-muted-foreground text-xs mb-2 tablet:mb-3 truncate">{part.brand}</p>
                <div className="flex items-center gap-2 mb-3 tablet:mb-4">
                  <Clock className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span className={`text-xs truncate ${part.delivery === "В наличии" ? "text-green-600" : "text-muted-foreground"}`}>
                    {part.delivery}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <span className="font-display text-lg tablet:text-xl text-foreground truncate">{part.price}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground shrink-0"
                    onClick={() => handleAddToCart(part)}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1 shrink-0" />
                    В корзину
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Акции */}
        <div>
          <div className="mb-6 tablet:mb-8">
            <span className="text-accent text-xs font-semibold uppercase tracking-widest">Выгодно</span>
            <h2 className="font-display text-2xl tablet:text-3xl xl:text-4xl text-foreground mt-1 tracking-tight break-words">АКЦИИ И ПРЕДЛОЖЕНИЯ</h2>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 xl:grid-cols-3 gap-4 tablet:gap-6">
            {promos.map((promo, i) => (
              <div
                key={promo.title}
                className="relative rounded-xl p-5 tablet:p-6 xl:p-8 bg-hero-gradient overflow-hidden group cursor-pointer animate-fade-up min-w-0"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute top-3 right-3 tablet:top-4 tablet:right-4 bg-accent-gradient text-accent-foreground font-display text-lg tablet:text-2xl px-2.5 py-1 tablet:px-3 rounded-lg">
                  {promo.discount}
                </div>
                <Percent className="w-6 h-6 tablet:w-8 tablet:h-8 text-accent/40 mb-3 tablet:mb-4 shrink-0" />
                <h3 className="font-display text-lg tablet:text-xl text-primary-foreground mb-2 break-words pr-16">{promo.title}</h3>
                <p className="text-primary-foreground/60 text-xs tablet:text-sm break-words">{promo.desc}</p>
                <Button variant="ghost" className="mt-3 tablet:mt-4 text-accent hover:bg-accent/10 px-0 text-sm">
                  Подробнее <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
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
