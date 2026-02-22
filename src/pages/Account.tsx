import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Wrench,
  Car,
  CreditCard,
  Plus,
  Trash2,
  Star,
  Calendar,
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useAccount } from "@/context/AccountContext";
import { toast } from "sonner";
import type { PaymentMethodType } from "@/types/account";

const CAR_MODELS = [
  "Lada Granta",
  "Lada Vesta",
  "Lada XRAY",
  "Lada Niva",
  "Lada Largus",
  "Kia Rio",
  "Kia K5",
  "Kia Sportage",
  "Kia Sorento",
  "Hyundai Solaris",
  "Hyundai Creta",
  "Hyundai Tucson",
  "Toyota Camry",
  "Toyota RAV4",
  "Toyota Corolla",
  "Volkswagen Polo",
  "Volkswagen Tiguan",
  "Škoda Octavia",
  "Škoda Kodiaq",
  "Renault Logan",
  "Renault Duster",
  "Chevrolet Niva",
  "Geely Coolray",
  "Haval F7",
  "Другая",
];

const carPlateSchema = z
  .string()
  .min(1, "Введите номер")
  .transform((s) => s.replace(/\s/g, "").toUpperCase())
  .refine(
    (s) => /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/.test(s),
    "Формат: буква, 3 цифры, 2 буквы, код региона (например А123БВ777)"
  );

const carFormSchema = z.object({
  plateNumber: z.string().min(1, "Введите гос. номер").pipe(carPlateSchema),
  model: z.string().min(1, "Выберите модель"),
});

const paymentFormSchema = z.object({
  type: z.enum(["card", "sbp", "cash"]),
  title: z.string().min(1, "Название способа оплаты"),
  last4: z.string().optional(),
}).refine(
  (data) => data.type !== "card" || (data.last4 && /^\d{4}$/.test(data.last4)),
  { message: "Для карты укажите последние 4 цифры", path: ["last4"] }
);

type CarFormValues = z.infer<typeof carFormSchema>;
type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const Account = () => {
  const { user } = useAuth();
  const {
    cars,
    repairHistory,
    paymentMethods,
    addCar,
    removeCar,
    addRepairRecord,
    addPaymentMethod,
    setDefaultPaymentMethod,
    removePaymentMethod,
  } = useAccount();

  const carForm = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: { plateNumber: "", model: "" },
  });

  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: { type: "card", title: "", last4: "" },
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userId = user.email;

  const onAddCar = (data: CarFormValues) => {
    addCar(data.plateNumber.replace(/\s/g, "").toUpperCase(), data.model, userId);
    toast.success("Автомобиль добавлен");
    carForm.reset();
  };

  const onAddPayment = (data: PaymentFormValues) => {
    addPaymentMethod(
      data.type as PaymentMethodType,
      data.title,
      userId,
      data.last4 || undefined
    );
    toast.success("Способ оплаты добавлен");
    paymentForm.reset({ type: "card", title: "", last4: "" });
  };

  const getCarById = (carId: string) => cars.find((c) => c.id === carId);
  const paymentTypeLabel: Record<PaymentMethodType, string> = {
    card: "Банковская карта",
    sbp: "СБП",
    cash: "Наличные",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-20 tablet:pt-24 pb-10 tablet:pb-16">
        <div className="flex items-center gap-2 mb-6 tablet:mb-8 min-w-0">
          <User className="w-7 h-7 tablet:w-8 tablet:h-8 text-accent shrink-0" />
          <h1 className="font-display text-2xl tablet:text-3xl text-foreground tracking-tight truncate">
            Личный кабинет
          </h1>
        </div>
        <p className="text-muted-foreground mb-4 tablet:mb-6 text-sm tablet:text-base break-words">
          {user.name} · {user.email}
        </p>

        <Tabs defaultValue="repair" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-auto p-1 gap-0.5 tablet:gap-1 bg-muted">
            <TabsTrigger value="repair" className="flex items-center justify-center gap-1 tablet:gap-2 py-2 tablet:py-2.5 text-xs tablet:text-sm">
              <Wrench className="w-3.5 h-3.5 tablet:w-4 tablet:h-4 shrink-0" />
              <span className="hidden tablet:inline truncate">История ремонта</span>
            </TabsTrigger>
            <TabsTrigger value="cars" className="flex items-center justify-center gap-1 tablet:gap-2 py-2 tablet:py-2.5 text-xs tablet:text-sm">
              <Car className="w-3.5 h-3.5 tablet:w-4 tablet:h-4 shrink-0" />
              <span className="hidden tablet:inline truncate">Мои автомобили</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center justify-center gap-1 tablet:gap-2 py-2 tablet:py-2.5 text-xs tablet:text-sm">
              <CreditCard className="w-3.5 h-3.5 tablet:w-4 tablet:h-4 shrink-0" />
              <span className="hidden tablet:inline truncate">Оплата</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="repair" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl">История ремонта</CardTitle>
                <CardDescription>
                  Записи о проведённом ремонте по вашим автомобилям
                </CardDescription>
              </CardHeader>
              <CardContent>
                {repairHistory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Wrench className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Пока нет записей о ремонте</p>
                    <p className="text-sm mt-1">
                      После обращений в сервис история появится здесь
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {repairHistory.map((r) => {
                      const car = getCarById(r.carId);
                      return (
                        <li
                          key={r.id}
                          className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-4 bg-card"
                        >
                          <div className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground">{r.description}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(r.date).toLocaleDateString("ru-RU", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                                {car && ` · ${car.plateNumber} ${car.model}`}
                              </p>
                            </div>
                          </div>
                          <span className="font-display text-foreground whitespace-nowrap">
                            {r.amount.toLocaleString("ru-RU")} ₽
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cars" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl">Мои автомобили</CardTitle>
                <CardDescription>
                  Добавьте автомобиль: гос. номер и модель
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...carForm}>
                  <form onSubmit={carForm.handleSubmit(onAddCar)} className="flex flex-col tablet:flex-row gap-4">
                    <FormField
                      control={carForm.control}
                      name="plateNumber"
                      render={({ field }) => (
                        <FormItem className="tablet:max-w-[200px]">
                          <FormLabel>Гос. номер</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="А123БВ777"
                              className="font-mono uppercase"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={carForm.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem className="flex-1 min-w-0 tablet:min-w-[180px]">
                          <FormLabel>Модель</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите модель" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CAR_MODELS.map((m) => (
                                <SelectItem key={m} value={m}>
                                  {m}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-end">
                      <Button type="submit" className="bg-accent-gradient text-accent-foreground">
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить
                      </Button>
                    </div>
                  </form>
                </Form>

                {cars.length > 0 && (
                  <ul className="space-y-2 pt-2 border-t">
                    {cars.map((car) => (
                      <li
                        key={car.id}
                        className="flex items-center justify-between rounded-md border px-4 py-3"
                      >
                        <span className="font-mono font-medium">{car.plateNumber}</span>
                        <span className="text-muted-foreground">{car.model}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeCar(car.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl">Способы оплаты</CardTitle>
                <CardDescription>
                  Привяжите карту, СБП или укажите оплату наличными
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...paymentForm}>
                  <form
                    onSubmit={paymentForm.handleSubmit(onAddPayment)}
                    className="space-y-4"
                  >
                    <FormField
                      control={paymentForm.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Тип</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="card">Банковская карта</SelectItem>
                              <SelectItem value="sbp">СБП</SelectItem>
                              <SelectItem value="cash">Наличные</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={paymentForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Название (например: Основная карта)</FormLabel>
                          <FormControl>
                            <Input placeholder="Основная карта" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {paymentForm.watch("type") === "card" && (
                      <FormField
                        control={paymentForm.control}
                        name="last4"
                        render={({ field }) => (
                          <FormItem className="max-w-[120px]">
                            <FormLabel>Последние 4 цифры карты</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="1234"
                                maxLength={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <Button type="submit" className="bg-accent-gradient text-accent-foreground">
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить способ оплаты
                    </Button>
                  </form>
                </Form>

                {paymentMethods.length > 0 && (
                  <ul className="space-y-2 pt-2 border-t">
                    {paymentMethods.map((pm) => (
                      <li
                        key={pm.id}
                        className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-2 rounded-md border px-3 tablet:px-4 py-3 min-w-0"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-wrap">
                          <CreditCard className="w-4 h-4 text-muted-foreground" />
                          <span>{paymentTypeLabel[pm.type]} — {pm.title}</span>
                          {pm.last4 && (
                            <span className="text-muted-foreground text-sm">
                              ······ {pm.last4}
                            </span>
                          )}
                          {pm.isDefault && (
                            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {!pm.isDefault && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDefaultPaymentMethod(pm.id)}
                            >
                              По умолчанию
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removePaymentMethod(pm.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button asChild variant="outline">
            <Link to="/">На главную</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Account;
