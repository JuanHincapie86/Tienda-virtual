import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const ALL = "Todos";

const CATEGORY_NAMES: Record<string, string> = {
    "electronics": "Electrónica",
    "jewelery": "Joyería",
    "men's clothing": "Ropa Hombre",
    "women's clothing": "Ropa Mujer",
    "hogar": "Hogar",
    "deportes": "Deportes",
    "tecnología": "Tecnología",
};

function Products() {
    const { products, loading, error } = useProducts();
    const [activeFilter, setActiveFilter] = useState(ALL);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high" | "name">("default");

    const rawCategories = Array.from(new Set(products.map((p) => p.categoria).filter(Boolean)));
    const categories = [ALL, ...rawCategories];

    // Filter products
    let filtered = products.filter((p) => {
        const matchesCategory = activeFilter === ALL || p.categoria === activeFilter;
        const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Sort products
    if (sortBy === "price-low") {
        filtered = [...filtered].sort((a, b) => a.precio - b.precio);
    } else if (sortBy === "price-high") {
        filtered = [...filtered].sort((a, b) => b.precio - a.precio);
    } else if (sortBy === "name") {
        filtered = [...filtered].sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    if (loading) {
        return (
            <main className="pt-24 pb-16 min-h-[60vh] flex flex-col justify-center items-center gap-4 text-slate-600 font-semibold">
                <div className="w-12 h-12 border-4 border-violet-500/15 border-t-violet-600 border-r-sky-500 rounded-full animate-spin-fast" />
                <p>Cargando productos...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="pt-24 pb-16 min-h-[60vh] flex justify-center items-center text-rose-600 font-bold">
                <p>{error}</p>
            </main>
        );
    }

    return (
        <main className="pt-24 pb-16">
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                    <div>
                        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Catálogo <span className="bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">Completo</span>
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1">
                            Explora nuestra colección con entrega inmediata
                        </p>
                    </div>

                    <span className="bg-white/60 border border-white/80 rounded-full px-3.5 py-1 text-xs font-bold text-violet-700 shadow-xs backdrop-blur-md">
                        {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
                    </span>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent my-4 mb-6" />

                {/* Toolbar: Search + Sort */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-6">
                    {/* Search Input */}
                    <div className="relative flex-1 min-w-[260px]">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar por nombre o palabra clave..."
                            className="input-glass pl-10 pr-9 text-xs sm:text-sm py-2.5"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-none border-none text-slate-400 font-bold text-xs hover:text-rose-600 cursor-pointer"
                                title="Limpiar búsqueda"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Sort Selector */}
                    <div className="flex items-center gap-2 shrink-0">
                        <label className="text-xs font-bold text-slate-500 whitespace-nowrap hidden sm:inline">
                            Ordenar por:
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="input-glass w-full sm:w-auto min-w-[180px] cursor-pointer text-xs sm:text-sm py-2.5"
                        >
                            <option value="default">Destacados</option>
                            <option value="price-low">Precio: Menor a Mayor</option>
                            <option value="price-high">Precio: Mayor a Menor</option>
                            <option value="name">Nombre (A-Z)</option>
                        </select>
                    </div>
                </div>

                {/* Filter Category Tabs */}
                <div className="flex items-center gap-1.5 flex-wrap mb-8 p-1.5 bg-white/40 backdrop-blur-xl border border-white/80 rounded-2xl shadow-xs">
                    {categories.map((cat) => {
                        const displayName = CATEGORY_NAMES[cat] || (cat === ALL ? "Todos" : cat);
                        const count = cat === ALL
                            ? products.length
                            : products.filter((p) => p.categoria === cat).length;
                        const isSelected = activeFilter === cat;

                        return (
                            <button
                                key={cat}
                                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                                    isSelected
                                        ? "bg-gradient-to-r from-violet-600 to-violet-800 text-white shadow-xs"
                                        : "text-slate-700 hover:text-violet-600 hover:bg-white/60"
                                }`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                <span>{displayName}</span>
                                <span className={`inline-flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded-full text-[10px] font-bold ${
                                    isSelected ? "bg-white/25 text-white" : "bg-black/5 text-slate-600"
                                }`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Products Grid or Empty Search State */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {filtered.map((producto, i) => (
                            <ProductCard key={producto.id} product={producto} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 px-6 bg-white/40 backdrop-blur-xl border border-white/80 rounded-2xl my-6">
                        <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                            No se encontraron productos
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm mb-5">
                            Intenta buscar con otro término o selecciona una categoría diferente.
                        </p>
                        <button
                            onClick={() => { setActiveFilter(ALL); setSearchTerm(""); }}
                            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-violet-800 text-white border-none rounded-xl font-bold text-xs cursor-pointer shadow-sm hover:-translate-y-0.5 transition-transform"
                        >
                            Restablecer Filtros
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Products;