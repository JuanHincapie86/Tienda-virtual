import { useProductsContext } from '../context/ProductsContext';

export const useProducts = () => {
  return useProductsContext();
};
