import { Product } from '../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  // Servicio dummy para obtener productos
  return [];
};

export const fetchProductById = async (id: string | number): Promise<Product | null> => {
  return null;
};
