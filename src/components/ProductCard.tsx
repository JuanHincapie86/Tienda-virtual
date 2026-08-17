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

    return (
        <article
            className="group relative flex flex-col rounded-2xl border border-[#e7ded1] bg-white overflow-hidden transition-all duration-300 animate-fade-in-up hover:-translate-y-1.5 hover:shadow-xl hover:shadow-clay/10"
            style={{ animationDelay: `${index * 0.05}s` }}
        >
            <Link to={`/productos/${product.id}`} className="no-underline block">
                <div className="relative aspect-[4/3] flex items-center justify-center p-6 overflow-hidden"
                    style={{ background: "#f7f1e8" }}>
                    <img
                        src={product.imagen || "https://via.placeholder.com/200"}
                        alt={product.nombre}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x300?text=Imagen";
                        }}
                    />
                </div>
            </Link>

            <div className="p-5 flex flex-col flex-1">
                {product.categoria && (
                    <p className="label-caps mb-2" style={{ color: "#b45309" }}>
                        {product.categoria}
                    </p>
                )}

                <Link to={`/productos/${product.id}`} className="no-underline">
                    <h3 className="font-display text-lg font-bold text-ink leading-snug line-clamp-2 mb-4 transition-colors duration-200 group-hover:text-clay">
                        {product.nombre}
                    </h3>
                </Link>

                <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-[#eee6da]">
                    <span className="font-display text-xl font-black text-ink">
                        ${product.precio.toLocaleString("es-CO")}
                    </span>

                    <button
                        onClick={handleAdd}
                        title={added ? "Agregado al carrito" : "Agregar al carrito"}
                        className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 cursor-pointer shrink-0"
                        style={added ? {
                            background: "#059669",
                            borderColor: "#059669",
                            color: "#ffffff",
                            boxShadow: "0 6px 16px rgba(5,150,105,0.3)",
                        } : {
                            background: "#ffffff",
                            borderColor: "#c2410c",
                            color: "#c2410c",
                        }}
                        onMouseEnter={(e) => {
                            if (!added) {
                                e.currentTarget.style.background = "#c2410c";
                                e.currentTarget.style.color = "#ffffff";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!added) {
                                e.currentTarget.style.background = "#ffffff";
                                e.currentTarget.style.color = "#c2410c";
                            }
                        }}
                    >
                        {added ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;