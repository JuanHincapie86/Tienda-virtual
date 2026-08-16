import type { Product } from './Product';

export interface CartItemType {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItemType[];
  totalAmount: number;
  totalItems: number;
}
