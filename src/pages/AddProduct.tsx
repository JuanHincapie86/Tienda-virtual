import { useState } from "react";
import { useNavigate } from "react-router";
import { useProductsContext } from "../context/ProductsContext";
import { uploadProductImage } from "../services/api";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
    "hogar",
    "deportes",
    "tecnología",
    "otro",
];

const INITIAL: Omit<Product, "id"> = {
    nombre: "",
    precio: 0,
    imagen: "",
    descripcion: "",
    categoria: "otro",
};

function AddProduct() {
    const { addProduct } = useProductsContext();
    const navigate = useNavigate();

    const [form, setForm] = useState<Omit<Product, "id">>(INITIAL);
    const [errors, setErrors] = useState<Partial<Record<keyof Omit<Product, "id">, string>>>({});
    const [saved, setSaved] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const previewProduct: Product = {
        ...form,
        id: 99999,
        nombre: form.nombre || "Nombre del producto",
        precio: form.precio || 0,
        imagen: form.imagen || "",
    };

    const validate = (): boolean => {
        const newErrors: typeof errors = {};
        if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
        if (form.precio <= 0) newErrors.precio = "El precio debe ser mayor a 0";
        if (!form.descripcion.trim()) newErrors.descripcion = "La descripción es requerida";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "precio" ? Math.max(0, Number(value)) : value,
        }));
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setSubmitting(true);
            setSubmitError(null);

            let imagenUrl = form.imagen;
            if (imageFile) {
                imagenUrl = await uploadProductImage(imageFile);
            }

            await addProduct({ ...form, imagen: imagenUrl });
            setSaved(true);
            setTimeout(() => {
                navigate("/productos");
            }, 1800);
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "Error al guardar el producto");
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setForm(INITIAL);
        setErrors({});
        setSaved(false);
        setImageFile(null);
        setSubmitError(null);
    };

    return (
        <main>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16">
                <div className="mb-9 border-b border-[#e7ded1] pb-8 animate-fade-in-up">
                    <p className="label-caps mb-2">Panel de administrador</p>
                    <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-ink">
                        Agregar producto
                    </h1>
                    <p className="text-stone-400 text-sm mt-2">
                        Completa el formulario para publicar un nuevo producto en el catálogo.
                    </p>
                </div>

                {saved && (
                    <div className="p-4 mb-6 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 animate-fade-in-up"
                        style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)", color: "#047857" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Producto guardado con éxito. Redirigiendo al catálogo...
                    </div>
                )}

                {submitError && (
                    <div className="p-4 mb-6 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 animate-fade-in-up"
                        style={{ background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.16)", color: "#be123c" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {submitError}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-7 border border-[#e7ded1] rounded-2xl bg-white p-6 sm:p-8 flex flex-col gap-5 animate-fade-in-up"
                    >
                        <div>
                            <label className="block mb-1.5 font-bold text-xs text-stone-600">Nombre del producto *</label>
                            <input
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="ej. Camiseta premium de algodón"
                                className="input-glass"
                            />
                            {errors.nombre && <p className="text-rose-600 text-xs font-semibold mt-1">{errors.nombre}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-1.5 font-bold text-xs text-stone-600">Precio (COP) *</label>
                                <input
                                    name="precio"
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    value={form.precio || ""}
                                    onChange={handleChange}
                                    placeholder="ej. 49900"
                                    className="input-glass"
                                />
                                {errors.precio && <p className="text-rose-600 text-xs font-semibold mt-1">{errors.precio}</p>}
                            </div>

                            <div>
                                <label className="block mb-1.5 font-bold text-xs text-stone-600">Categoría</label>
                                <select
                                    name="categoria"
                                    value={form.categoria}
                                    onChange={handleChange}
                                    className="input-glass cursor-pointer"
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat} className="bg-white text-stone-900">
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1.5 font-bold text-xs text-stone-600">URL de la imagen</label>
                            <input
                                name="imagen"
                                value={form.imagen}
                                onChange={handleChange}
                                placeholder="https://ejemplo.com/imagen.jpg"
                                className="input-glass"
                            />
                            <p className="text-stone-400 text-[11px] mt-1">
                                Pega el enlace directo o sube un archivo abajo
                            </p>
                        </div>

                        <div>
                            <label className="block mb-1.5 font-bold text-xs text-stone-600">O sube una imagen</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] ?? null;
                                    setImageFile(file);
                                    if (file) {
                                        const objectUrl = URL.createObjectURL(file);
                                        setForm((prev) => ({ ...prev, imagen: objectUrl }));
                                    }
                                }}
                                className="input-glass file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-none file:bg-orange-500/10 file:text-orange-700 file:font-bold file:text-xs file:cursor-pointer"
                            />
                            <p className="text-stone-400 text-[11px] mt-1">
                                {imageFile ? `Archivo seleccionado: ${imageFile.name}` : "La imagen se guardará en Supabase Storage"}
                            </p>
                        </div>

                        <div>
                            <label className="block mb-1.5 font-bold text-xs text-stone-600">Descripción *</label>
                            <textarea
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                placeholder="Describe el producto, sus características y beneficios..."
                                rows={4}
                                className="input-glass resize-y min-h-[100px] leading-relaxed"
                            />
                            {errors.descripcion && <p className="text-rose-600 text-xs font-semibold mt-1">{errors.descripcion}</p>}
                        </div>

                        <div className="flex gap-3 flex-wrap mt-2">
                            <button
                                type="submit"
                                disabled={saved || submitting}
                                className="btn-primary flex-1 py-3 px-6 text-xs sm:text-sm"
                                style={(saved || submitting) ? {
                                    background: "linear-gradient(135deg, #10b981, #059669)",
                                    opacity: 0.85,
                                    cursor: "default",
                                } : undefined}
                            >
                                {saved ? (
                                    <>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        Guardado
                                    </>
                                ) : submitting ? (
                                    <>
                                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
                                            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                                            <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
                                            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                                        </svg>
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        Publicar Producto
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                                        </svg>
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="btn-secondary py-3 px-5 text-xs sm:text-sm"
                            >
                                Limpiar
                            </button>
                        </div>
                    </form>

                    <div className="lg:col-span-5 lg:sticky lg:top-24 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        <p className="label-caps mb-3" style={{ color: "#78716c" }}>
                            Previsualización en tiempo real
                        </p>
                        <div className="max-w-sm mx-auto lg:max-w-none">
                            <ProductCard product={previewProduct} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AddProduct;