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

    let filtered = products.filter((p) => {
        const matchesCategory = activeFilter === ALL || p.categoria === activeFilter;
        const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-low") {
        filtered = [...filtered].sort((a, b) => a.precio - b.precio);
    } else if (sortBy === "price-high") {
        filtered = [...filtered].sort((a, b) => b.precio - a.precio);
    } else if (sortBy === "name") {
        filtered = [...filtered].sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    if (loading) {
        return (
            <main className="min-h-[60vh] flex flex-col justify-center items-center gap-5 text-stone-500">
                <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-[3px] border-orange-500/10" />
                    <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-orange-600 border-r-orange-400 animate-spin" />
                </div>
                <p className="font-semibold text-sm tracking-wide">Cargando productos...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-[60vh] flex justify-center items-center px-4">
                <p className="text-rose-600 font-bold text-sm">{error}</p>
            </main>
        );
    }

    return (
        <main>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16">
                {/* Header */}
                <div className="flex items-end justify-between gap-4 flex-wrap mb-9 border-b border-[#e7ded1] pb-8 animate-fade-in-up">
                    <div>
                        <p className="label-caps mb-2">Catálogo</p>
                        <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-ink">
                            Todos los productos
                        </h1>
                    </div>
                    <span className="text-sm font-bold text-stone-400">
                        {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
                    </span>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 animate-fade-in-up"
                    style={{ animationDelay: "0.05s" }}>
                    <div className="relative flex-1 max-w-sm">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar productos..."
                            className="input-glass pl-10 pr-9 py-2.5"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-stone-400 font-bold text-xs hover:text-rose-500 cursor-pointer transition-colors"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as "default" | "price-low" | "price-high" | "name")}
                        className="input-glass w-full sm:w-auto min-w-[180px] cursor-pointer py-2.5"
                    >
                        <option value="default">Destacados</option>
                        <option value="price-low">Menor precio</option>
                        <option value="price-high">Mayor precio</option>
                        <option value="name">Nombre (A-Z)</option>
                    </select>
                </div>

                {/* Category tabs */}
                <div className="flex items-center gap-6 flex-wrap mb-10 border-b border-[#e7ded1] animate-fade-in-up"
                    style={{ animationDelay: "0.1s" }}>
                    {categories.map((cat) => {
                        const displayName = CATEGORY_NAMES[cat] || (cat === ALL ? "Todos" : cat);
                        const count = cat === ALL
                            ? products.length
                            : products.filter((p) => p.categoria === cat).length;
                        const isSelected = activeFilter === cat;

                        return (
                            <button
                                key={cat}
                                className={`inline-flex items-center gap-1.5 pb-3.5 text-sm font-bold border-b-2 cursor-pointer transition-colors duration-200 ${
                                    isSelected
                                        ? "border-clay text-clay"
                                        : "border-transparent text-stone-400 hover:text-stone-600"
                                }`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                {displayName}
                                <span className="text-xs text-stone-300 font-semibold">
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {filtered.map((producto, i) => (
                            <ProductCard key={producto.id} product={producto} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 animate-fade-in">
                        <h3 className="font-display text-2xl font-bold text-ink mb-2">
                            No se encontraron productos
                        </h3>
                        <p className="text-stone-400 text-sm mb-7 max-w-sm mx-auto">
                            Intenta buscar con otro término o selecciona una categoría diferente.
                        </p>
                        <button
                            onClick={() => { setActiveFilter(ALL); setSearchTerm(""); }}
                            className="btn-primary text-xs px-6 py-2.5"
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