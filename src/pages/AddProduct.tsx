import { useState } from "react";
import { useNavigate } from "react-router";
import { useProductsContext } from "../context/ProductsContext";
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        addProduct(form);
        setSaved(true);
        setTimeout(() => {
            navigate("/productos");
        }, 1800);
    };

    const handleReset = () => {
        setForm(INITIAL);
        setErrors({});
        setSaved(false);
    };

    return (
        <main className="pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="mb-8 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/80 rounded-full px-3.5 py-1 text-xs font-bold text-violet-700 mb-3 shadow-xs">
                        Panel de Administrador
                    </div>
                    <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-violet-700 to-sky-600 bg-clip-text text-transparent">
                        Agregar Producto
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">
                        Completa el formulario para publicar un nuevo producto en el catálogo.
                    </p>
                </div>

                {/* Success banner */}
                {saved && (
                    <div className="p-4 mb-6 bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-xl text-cyan-700 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs animate-fade-in-up">
                        Producto guardado con éxito. Redirigiendo al catálogo...
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-4 animate-fade-in-up">

                        {/* Nombre */}
                        <div>
                            <label className="block mb-1.5 font-bold text-xs text-slate-700">Nombre del producto *</label>
                            <input
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="ej. Camiseta premium de algodón"
                                className="input-glass"
                            />
                            {errors.nombre && <p className="text-rose-600 text-xs font-semibold mt-1">{errors.nombre}</p>}
                        </div>

                        {/* Precio + Categoría */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1.5 font-bold text-xs text-slate-700">Precio (COP) *</label>
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
                                <label className="block mb-1.5 font-bold text-xs text-slate-700">Categoría</label>
                                <select
                                    name="categoria"
                                    value={form.categoria}
                                    onChange={handleChange}
                                    className="input-glass cursor-pointer"
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat} className="bg-white text-slate-900">
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Imagen URL */}
                        <div>
                            <label className="block mb-1.5 font-bold text-xs text-slate-700">URL de la imagen</label>
                            <input
                                name="imagen"
                                value={form.imagen}
                                onChange={handleChange}
                                placeholder="https://ejemplo.com/imagen.jpg"
                                className="input-glass"
                            />
                            <p className="text-slate-400 text-[11px] mt-1">
                                Pega el enlace directo a la imagen del producto
                            </p>
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="block mb-1.5 font-bold text-xs text-slate-700">Descripción *</label>
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

                        {/* Actions */}
                        <div className="flex gap-3 flex-wrap mt-2">
                            <button
                                type="submit"
                                disabled={saved}
                                className={`flex-1 py-3 px-6 border border-white/40 rounded-xl font-bold text-xs sm:text-sm text-white cursor-pointer transition-all shadow-md ${
                                    saved
                                        ? "bg-cyan-600 opacity-85 cursor-default"
                                        : "bg-gradient-to-r from-violet-600 to-violet-800 shadow-violet-500/30 hover:-translate-y-0.5"
                                }`}
                            >
                                {saved ? "Guardado" : "Publicar Producto →"}
                            </button>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="py-3 px-4 bg-white/50 border border-white rounded-xl text-slate-600 font-bold text-xs sm:text-sm cursor-pointer hover:bg-white transition-colors"
                            >
                                Limpiar
                            </button>
                        </div>
                    </form>

                    {/* PREVIEW */}
                    <div className="lg:col-span-5 sticky top-24 animate-fade-in-up">
                        <p className="text-slate-500 text-[11px] font-extrabold uppercase tracking-wider mb-3">
                            Previsualización en Tiempo Real
                        </p>
                        <div className="max-w-sm mx-auto lg:max-w-none">
                            <ProductCard product={previewProduct} />
                        </div>
                        <p className="text-slate-400 text-xs mt-3 leading-relaxed text-center lg:text-left">
                            Así se verá tu producto en el catálogo.
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default AddProduct;
