import { supabase } from "./supabase";
import type { Product } from "../types/Product";

interface ProductRow {
    id: number;
    nombre: string;
    precio: number;
    imagen: string | null;
    descripcion: string | null;
    categoria: string | null;
    created_at: string;
}

function mapRow(row: ProductRow): Product {
    return {
        id: row.id,
        nombre: row.nombre,
        precio: Number(row.precio),
        imagen: row.imagen ?? "",
        descripcion: row.descripcion ?? "",
        categoria: row.categoria ?? "",
    };
}

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return (data ?? []).map(mapRow);
}

export const fetchProducts = getProducts;

export async function getProductById(id: string | number): Promise<Product> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) throw new Error(`Producto con ID ${id} no encontrado`);

    return mapRow(data as ProductRow);
}

export const fetchProductById = getProductById;
export const fetchProductsById = getProductById;

export async function addProduct(product: Omit<Product, "id">): Promise<Product> {
    const { data, error } = await supabase
        .from("products")
        .insert({
            nombre: product.nombre,
            precio: product.precio,
            imagen: product.imagen || null,
            descripcion: product.descripcion,
            categoria: product.categoria,
        })
        .select()
        .single();

    if (error) throw new Error(error.message);

    return mapRow(data as ProductRow);
}

export async function uploadProductImage(file: File): Promise<string> {
    const extension = file.name.split(".").pop() || "png";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

    const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file, { contentType: file.type });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
}