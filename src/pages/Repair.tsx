import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wrench,
  Car,
  ShoppingCart,
  Package,
  Check,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  Clock,
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useAccount } from "@/context/AccountContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import type { Service, SelectedPart } from "@/types/repair";
import type { Part } from "@/types/part";

// Mock services data
const SERVICES: Service[] = [
  {
    id: "service-1",
    name: "Замена масла",
    description: "Замена моторного масла и масляного фильтра",
    price: 1500,
    requiresParts: true,
    category: "Обслуживание",
  },
  {
    id: "service-2",
    name: "Диагностика",
    description: "Компьютерная диагностика всех систем автомобиля",
    price: 2000,
    requiresParts: false,
    category: "Диагностика",
  },
  {
    id: "service-3",
    name: "Ремонт подвески",
    description: "Замена амортизаторов, стоек, сайлентблоков",
    price: 5000,
    requiresParts: true,
    category: "Ремонт",
  },
  {
    id: "service-4",
    name: "Замена тормозных колодок",
    description: "Замена передних и задних тормозных колодок",
    price: 2500,
    requiresParts: true,
    category: "Ремонт",
  },
  {
    id: "service-5",
    name: "Ремонт двигателя",
    description: "Диагностика и ремонт двигателя",
    price: 10000,
    requiresParts: true,
    category: "Ремонт",
  },
  {
    id: "service-6",
    name: "Шиномонтаж",
    description: "Монтаж и балансировка колес",
    price: 1200,
    requiresParts: false,
    category: "Обслуживание",
  },
];

// Mock catalog parts (same as in ShowcaseSection)
const CATALOG_PARTS: Part[] = [
  { id: "part-1", name: "Тормозные колодки Brembo", brand: "BMW 5 Series", price: "8 500 ₽", delivery: "В наличии", hot: true },
  { id: "part-2", name: "Масляный фильтр Mann", brand: "Toyota Camry", price: "1 200 ₽", delivery: "В наличии", hot: false },
  { id: "part-3", name: "Амортизатор KYB", brand: "Honda CR-V", price: "12 400 ₽", delivery: "2-3 дня", hot: false },
  { id: "part-4", name: "Свечи зажигания NGK", brand: "Volkswagen Golf", price: "3 800 ₽", delivery: "В наличии", hot: true },
];

type Step = "service" | "car" | "parts";

const Repair = () => {
  const { user } = useAuth();
  const { cars, addCar } = useAccount();
  const { items: cartItems } = useCart();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [selectedParts, setSelectedParts] = useState<SelectedPart[]>([]);
  const [partsTab, setPartsTab] = useState<"cart" | "catalog" | "user">("cart");
  const [showAddCar, setShowAddCar] = useState(false);
  const [newCarPlate, setNewCarPlate] = useState("");
  const [newCarModel, setNewCarModel] = useState("");
  const lastAddedCarRef = useRef<{ plateNumber: string; model: string } | null>(null);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep("car");
    setSelectedParts([]);
  };

  const handleCarSelect = (carId: string) => {
    setSelectedCarId(carId);
    if (selectedService?.requiresParts) {
      setCurrentStep("parts");
    } else {
      handleSubmit();
    }
  };

  // Auto-select newly added car
  useEffect(() => {
    if (lastAddedCarRef.current && cars.length > 0 && currentStep === "car" && !selectedCarId) {
      const newCar = cars.find(
        (c) =>
          c.plateNumber === lastAddedCarRef.current!.plateNumber &&
          c.model === lastAddedCarRef.current!.model
      );
      if (newCar) {
        setSelectedCarId(newCar.id);
        if (selectedService?.requiresParts) {
          setCurrentStep("parts");
        } else if (selectedService && user) {
          // Auto-submit if service doesn't require parts
          toast.success("Заявка на ремонт создана!");
          navigate("/account");
        }
        lastAddedCarRef.current = null;
      }
    }
  }, [cars, currentStep, selectedCarId, selectedService, user, navigate]);

  const handleAddNewCar = () => {
    if (!newCarPlate || !newCarModel || !user) return;
    
    const plateNumber = newCarPlate.replace(/\s/g, "").toUpperCase();
    if (!/^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/.test(plateNumber)) {
      toast.error("Неверный формат гос. номера");
      return;
    }

    addCar(plateNumber, newCarModel, user.email);
    toast.success("Автомобиль добавлен");
    lastAddedCarRef.current = { plateNumber, model: newCarModel };
    
    setNewCarPlate("");
    setNewCarModel("");
    setShowAddCar(false);
  };

  const handleAddPartFromCart = (item: typeof cartItems[0]) => {
    const existing = selectedParts.find((p) => p.partId === item.id);
    if (existing) {
      setSelectedParts(
        selectedParts.map((p) =>
          p.partId === item.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setSelectedParts([
        ...selectedParts,
        {
          partId: item.id,
          name: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
          source: "cart",
        },
      ]);
    }
    toast.success(`Добавлено: ${item.name}`);
  };

  const handleAddPartFromCatalog = (part: Part) => {
    const existing = selectedParts.find((p) => p.partId === part.id);
    if (existing) {
      setSelectedParts(
        selectedParts.map((p) =>
          p.partId === part.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setSelectedParts([
        ...selectedParts,
        {
          partId: part.id,
          name: part.name,
          brand: part.brand,
          price: part.price,
          quantity: 1,
          source: "catalog",
        },
      ]);
    }
    toast.success(`Добавлено: ${part.name}`);
  };

  const handleAddUserPart = () => {
    const partId = `user-part-${Date.now()}`;
    const newPart: SelectedPart = {
      partId,
      name: "Запчасть пользователя",
      brand: "Своя",
      price: "0 ₽",
      quantity: 1,
      source: "user",
    };
    setSelectedParts([...selectedParts, newPart]);
    toast.success("Добавлена запчасть пользователя");
  };

  const handleRemovePart = (partId: string) => {
    setSelectedParts(selectedParts.filter((p) => p.partId !== partId));
  };

  const handleUpdatePartQuantity = (partId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemovePart(partId);
      return;
    }
    setSelectedParts(
      selectedParts.map((p) => (p.partId === partId ? { ...p, quantity } : p))
    );
  };

  const handleSubmit = () => {
    if (!selectedService || !selectedCarId || !user) return;

    // Here you would typically save the repair request
    // For now, we'll just show a success message and navigate
    toast.success("Заявка на ремонт создана!");
    navigate("/account");
  };

  const selectedCar = cars.find((c) => c.id === selectedCarId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-20 tablet:pt-24 pb-10 tablet:pb-16">
        <div className="flex items-center gap-2 mb-6 tablet:mb-8 min-w-0">
          <Wrench className="w-7 h-7 tablet:w-8 tablet:h-8 text-accent shrink-0" />
          <h1 className="font-display text-2xl tablet:text-3xl text-foreground tracking-tight truncate">
            Запись на ремонт
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 tablet:mb-8 overflow-x-auto pb-2 -mx-1">
          <div className="flex items-center gap-2 tablet:gap-4 min-w-max">
            <div className="flex items-center gap-1.5 tablet:gap-2 shrink-0">
              <div
                className={`w-8 h-8 tablet:w-10 tablet:h-10 rounded-full flex items-center justify-center font-semibold text-sm tablet:text-base ${
                  currentStep === "service"
                    ? "bg-accent-gradient text-accent-foreground"
                    : selectedService
                    ? "bg-accent/20 text-accent"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {selectedService ? <Check className="w-5 h-5" /> : "1"}
              </div>
              <span className="text-xs tablet:text-sm font-medium whitespace-nowrap">Услуга</span>
            </div>
            <ArrowRight className="w-3 h-3 tablet:w-4 tablet:h-4 text-muted-foreground shrink-0" />
            <div className="flex items-center gap-1.5 tablet:gap-2 shrink-0">
              <div
                className={`w-8 h-8 tablet:w-10 tablet:h-10 rounded-full flex items-center justify-center font-semibold text-sm tablet:text-base ${
                  currentStep === "car"
                    ? "bg-accent-gradient text-accent-foreground"
                    : selectedCarId
                    ? "bg-accent/20 text-accent"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {selectedCarId ? <Check className="w-5 h-5" /> : "2"}
              </div>
              <span className="text-xs tablet:text-sm font-medium whitespace-nowrap">Автомобиль</span>
            </div>
            {selectedService?.requiresParts && (
              <>
                <ArrowRight className="w-3 h-3 tablet:w-4 tablet:h-4 text-muted-foreground shrink-0" />
                <div className="flex items-center gap-1.5 tablet:gap-2 shrink-0">
                  <div
                    className={`w-8 h-8 tablet:w-10 tablet:h-10 rounded-full flex items-center justify-center font-semibold text-sm tablet:text-base ${
                      currentStep === "parts"
                        ? "bg-accent-gradient text-accent-foreground"
                        : selectedParts.length > 0
                        ? "bg-accent/20 text-accent"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {selectedParts.length > 0 ? <Check className="w-5 h-5" /> : "3"}
                  </div>
                  <span className="text-xs tablet:text-sm font-medium whitespace-nowrap">Запчасти</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {currentStep === "service" && (
          <div className="grid grid-cols-1 tablet:grid-cols-2 xl:grid-cols-3 gap-4">
            {SERVICES.map((service) => (
              <Card
                key={service.id}
                className="cursor-pointer hover:border-accent/50 transition-all"
                onClick={() => handleServiceSelect(service)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl text-foreground">
                      {service.price.toLocaleString("ru-RU")} ₽
                    </span>
                    {service.requiresParts && (
                      <Badge variant="secondary" className="text-xs">
                        Требуются запчасти
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Step 2: Car Selection */}
        {currentStep === "car" && (
          <div className="max-w-2xl space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Выберите автомобиль</CardTitle>
                <CardDescription>
                  Выберите автомобиль из списка или добавьте новый
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cars.length > 0 ? (
                  <div className="space-y-2">
                    {cars.map((car) => (
                      <Card
                        key={car.id}
                        className={`cursor-pointer hover:border-accent/50 transition-all ${
                          selectedCarId === car.id ? "border-accent" : ""
                        }`}
                        onClick={() => handleCarSelect(car.id)}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Car className="w-5 h-5 text-accent" />
                            <div>
                              <p className="font-semibold">{car.model}</p>
                              <p className="text-sm text-muted-foreground">{car.plateNumber}</p>
                            </div>
                          </div>
                          {selectedCarId === car.id && (
                            <Check className="w-5 h-5 text-accent" />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    У вас пока нет добавленных автомобилей
                  </p>
                )}

                {!showAddCar ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowAddCar(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить автомобиль
                  </Button>
                ) : (
                  <Card className="border-accent">
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Гос. номер
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="А123БВ777"
                          value={newCarPlate}
                          onChange={(e) => setNewCarPlate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Модель
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="Toyota Camry"
                          value={newCarModel}
                          onChange={(e) => setNewCarModel(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddNewCar}
                          className="flex-1"
                          disabled={!newCarPlate || !newCarModel}
                        >
                          Добавить
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowAddCar(false);
                            setNewCarPlate("");
                            setNewCarModel("");
                          }}
                        >
                          Отмена
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentStep("service");
                      setSelectedService(null);
                    }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Parts Selection */}
        {currentStep === "parts" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Выберите запчасти</CardTitle>
                <CardDescription>
                  Вы можете выбрать запчасти из корзины, каталога или использовать свои
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={partsTab} onValueChange={(v) => setPartsTab(v as typeof partsTab)}>
                  <TabsList className="grid w-full grid-cols-3 h-auto p-1 gap-0.5">
                    <TabsTrigger value="cart" className="text-xs tablet:text-sm px-2 py-2">
                      <ShoppingCart className="w-3.5 h-3.5 tablet:w-4 tablet:h-4 shrink-0 mr-1 tablet:mr-2" />
                      <span className="truncate">Корзина ({cartItems.length})</span>
                    </TabsTrigger>
                    <TabsTrigger value="catalog" className="text-xs tablet:text-sm px-2 py-2">
                      <Package className="w-3.5 h-3.5 tablet:w-4 tablet:h-4 shrink-0 mr-1 tablet:mr-2" />
                      <span className="truncate">Каталог</span>
                    </TabsTrigger>
                    <TabsTrigger value="user" className="text-xs tablet:text-sm px-2 py-2">
                      <Car className="w-3.5 h-3.5 tablet:w-4 tablet:h-4 shrink-0 mr-1 tablet:mr-2" />
                      <span className="truncate">Свои</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="cart" className="mt-4">
                    {cartItems.length > 0 ? (
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h3 className="font-semibold">{item.name}</h3>
                                  <p className="text-sm text-muted-foreground">{item.brand}</p>
                                  <p className="font-display text-lg text-foreground mt-1">
                                    {item.price}
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => handleAddPartFromCart(item)}
                                >
                                  Добавить
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Корзина пуста
                      </p>
                    )}
                  </TabsContent>

                  <TabsContent value="catalog" className="mt-4">
                    <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                      {CATALOG_PARTS.map((part) => (
                        <Card key={part.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="font-semibold text-sm">{part.name}</h3>
                                <p className="text-xs text-muted-foreground">{part.brand}</p>
                              </div>
                              {part.hot && (
                                <Badge variant="outline" className="text-xs">
                                  Хит
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span
                                className={`text-xs ${
                                  part.delivery === "В наличии"
                                    ? "text-green-600"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {part.delivery}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-display text-lg text-foreground">
                                {part.price}
                              </span>
                              <Button
                                size="sm"
                                onClick={() => handleAddPartFromCatalog(part)}
                              >
                                Добавить
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="user" className="mt-4">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground mb-4">
                          Используйте свои запчасти для ремонта
                        </p>
                        <Button onClick={handleAddUserPart}>
                          <Plus className="w-4 h-4 mr-2" />
                          Добавить свою запчасть
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Selected Parts Summary */}
            {selectedParts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Выбранные запчасти</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedParts.map((part) => (
                      <div
                        key={part.partId}
                        className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-2 p-3 border rounded-lg min-w-0"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{part.name}</p>
                            <Badge variant="secondary" className="text-xs">
                              {part.source === "user"
                                ? "Своя"
                                : part.source === "cart"
                                ? "Из корзины"
                                : "Из каталога"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{part.brand}</p>
                          <p className="font-display text-foreground mt-1">{part.price}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdatePartQuantity(part.partId, part.quantity - 1)
                            }
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{part.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdatePartQuantity(part.partId, part.quantity + 1)
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleRemovePart(part.partId)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep("car");
                  setSelectedParts([]);
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-accent-gradient text-accent-foreground"
                disabled={!selectedService || !selectedCarId}
              >
                Оформить заявку
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Repair;
