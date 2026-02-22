import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

function parsePrice(priceStr: string): number {
  const num = priceStr.replace(/\s/g, "").replace("₽", "");
  return parseInt(num, 10) || 0;
}

const Cart = () => {
  const { items, count, removeItem, updateQuantity } = useCart();

  const total = items.reduce((sum, i) => sum + parsePrice(i.price) * i.quantity, 0);
  const totalFormatted = total.toLocaleString("ru-RU") + " ₽";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-20 tablet:pt-24 pb-10 tablet:pb-16">
        <div className="flex items-center gap-2 mb-6 tablet:mb-8 min-w-0">
          <ShoppingCart className="w-7 h-7 tablet:w-8 tablet:h-8 text-accent shrink-0" />
          <h1 className="font-display text-2xl tablet:text-3xl text-foreground tracking-tight truncate">
            Корзина {count > 0 && `(${count})`}
          </h1>
        </div>

        {items.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-2">Корзина пуста</p>
              <p className="text-sm text-muted-foreground mb-6">
                Добавьте запчасти с главной страницы
              </p>
              <Button asChild>
                <Link to="/">На главную</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 tablet:gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2 space-y-4 min-w-0">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4 p-4 min-w-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-card-foreground truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <p className="font-display text-lg text-foreground mt-1">
                          {item.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 tablet:gap-4 shrink-0">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-r-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="min-w-[2rem] text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-l-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="min-w-0">
              <Card>
                <CardHeader>
                  <h2 className="font-display text-xl text-card-foreground">Итого</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Товары ({count})</span>
                    <span className="font-display text-foreground">{totalFormatted}</span>
                  </div>
                  <Button asChild className="w-full bg-accent-gradient text-accent-foreground">
                    <Link to="/">
                      Оформить заказ <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/">Продолжить покупки</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
