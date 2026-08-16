import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import type { Product } from '../types/Product';
import { getProducts } from '../services/api';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'>) => void;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

let localIdCounter = 10000;

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setApiProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al obtener productos');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    localIdCounter += 1;
    const newProduct: Product = { ...product, id: localIdCounter };
    setLocalProducts((prev) => [newProduct, ...prev]);
  };

  const products = [...localProducts, ...apiProducts];

  return (
    <ProductsContext.Provider value={{ products, loading, error, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProductsContext must be used inside ProductsProvider');
  return ctx;
};
