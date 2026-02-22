export interface UserCar {
  id: string;
  plateNumber: string;
  model: string;
  userId: string;
}

export interface RepairRecord {
  id: string;
  date: string;
  description: string;
  carId: string;
  amount: number;
  userId: string;
}

export type PaymentMethodType = "card" | "sbp" | "cash";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  title: string;
  last4?: string;
  isDefault: boolean;
  userId: string;
}
