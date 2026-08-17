import React, { createContext, useState, useEffect, useContext, useCallback, type ReactNode } from 'react';
import type { Product } from '../types/Product';
import { getProducts, addProduct as createProduct } from '../services/api';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  refresh: () => Promise<void>;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener productos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(refresh);
  }, [refresh]);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    await createProduct(product);
    await refresh();
  };

  return (
    <ProductsContext.Provider value={{ products, loading, error, addProduct, refresh }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProductsContext must be used inside ProductsProvider');
  return ctx;
};