export interface Part {
  id: string;
  name: string;
  brand: string;
  price: string;
  delivery: string;
  hot?: boolean;
}

export interface CartItem extends Part {
  quantity: number;
}
