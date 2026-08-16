import { useState } from "react";
import { Link } from "react-router";
import type { Product } from "../types/Product";
import { useCart } from "../hooks/useCart";

interface ProductCardProps {
    product: Product;
    index?: number;
}

function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
    };

    const rating = (4.5 + (product.id % 5) * 0.1).toFixed(1);

    return (
        <article
            className="group relative bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/70 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.04}s` }}
        >
            <Link to={`/productos/${product.id}`} className="no-underline block">
                <div className="relative w-full h-48 bg-gradient-to-br from-white/60 to-slate-50/80 flex items-center justify-center p-4 overflow-hidden border-b border-white/60">
                    {product.categoria && (
                        <span className="absolute top-3 left-3 z-10 bg-white/90 border border-white rounded-full px-2.5 py-0.5 text-[10px] font-extrabold text-violet-700 uppercase tracking-wider shadow-sm">
                            {product.categoria}
                        </span>
                    )}

                    <span className="absolute top-3 right-3 z-10 bg-white/90 border border-white rounded-full px-2.5 py-0.5 text-xs font-bold text-amber-700 flex items-center gap-1 shadow-sm">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {rating}
                    </span>

                    <img
                        className="w-full h-full max-h-36 object-contain mx-auto transition-transform duration-300 drop-shadow-sm group-hover:scale-105"
                        src={product.imagen || "https://via.placeholder.com/200"}
                        alt={product.nombre}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x200?text=Imagen";
                        }}
                    />
                </div>
            </Link>

            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                    <Link to={`/productos/${product.id}`} className="no-underline">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 leading-snug mb-2 group-hover:text-violet-700 transition-colors">
                            {product.nombre}
                        </h3>
                    </Link>

                    <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 mb-4">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm"></span>
                        <span>En Stock</span>
                        <span className="text-slate-400">• Envío 24h</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2 mt-auto">
                    <p className="font-display text-lg sm:text-xl font-extrabold bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent m-0">
                        ${product.precio.toLocaleString("es-CO")}
                    </p>

                    <button
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-md ${
                            added
                                ? "bg-emerald-600 shadow-emerald-500/30"
                                : "bg-gradient-to-r from-violet-600 to-violet-800 shadow-violet-500/25 hover:-translate-y-0.5 hover:shadow-violet-500/40 hover:from-violet-700 hover:to-purple-900 active:scale-95"
                        }`}
                        onClick={handleAdd}
                    >
                        {added ? "Agregado" : "Agregar"}
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;