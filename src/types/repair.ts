export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  requiresParts: boolean;
  category: string;
}

export interface SelectedPart {
  partId: string;
  name: string;
  brand: string;
  price: string;
  quantity: number;
  source: "user" | "catalog" | "cart";
}

export interface RepairRequest {
  serviceId: string;
  carId: string;
  parts: SelectedPart[];
  notes?: string;
}
