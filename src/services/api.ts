import type { Product } from "../types/Product";

const API_URL = "https://fakestoreapi.com/products";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Respuesta inválida de la API");
    }

    return data.map((producto: any) => ({
      id: producto.id,
      nombre: producto.title || "Producto sin nombre",
      precio: producto.price || 0,
      imagen: producto.image || "",
      descripcion: producto.description || "",
      categoria: producto.category || "",
    }));
  } catch (error) {
    console.error("Error en getProducts:", error);
    throw error;
  }
}

export const fetchProducts = getProducts;

export async function getProductById(id: string | number): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`No se encontró el producto con ID ${id}`);
    }

    const producto = await response.json();

    if (!producto || typeof producto !== "object" || !producto.id) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return {
      id: producto.id,
      nombre: producto.title || "Producto sin nombre",
      precio: producto.price || 0,
      imagen: producto.image || "",
      descripcion: producto.description || "",
      categoria: producto.category || "",
    };
  } catch (error) {
    console.error(`Error en getProductById(${id}):`, error);
    throw error;
  }
}

export const fetchProductById = getProductById;
export const fetchProductsById = getProductById;