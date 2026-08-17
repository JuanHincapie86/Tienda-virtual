import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getProductById } from "../services/api";
import type { Product } from "../types/Product";
import { useCart } from "../hooks/useCart";

function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        if (!id) return;

        async function fetchDetail() {
            try {
                setLoading(true);
                const data = await getProductById(id!);
                setProduct(data);
            } catch {
                setError("No se pudo cargar la información del producto.");
            } finally {
                setLoading(false);
            }
        }
        fetchDetail();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) {
        return (
            <main className="min-h-[60vh] flex flex-col justify-center items-center gap-5 text-stone-500">
                <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-[3px] border-orange-500/10" />
                    <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-orange-600 border-r-orange-400 animate-spin" />
                </div>
                <p className="font-semibold text-sm">Cargando producto...</p>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="min-h-[60vh] flex items-center justify-center px-4 text-center">
                <div className="max-w-md">
                    <p className="text-rose-600 font-bold mb-5 text-sm">{error || "Producto no encontrado"}</p>
                    <Link to="/productos" className="btn-primary text-xs px-6 py-2.5">
                        ← Volver al catálogo
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16">
                <Link
                    to="/productos"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-500 no-underline hover:text-clay transition-colors mb-8"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                    </svg>
                    Volver al catálogo
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                    {/* Image */}
                    <div className="relative animate-fade-in-up">
                        <div className="rounded-[2rem] overflow-hidden border border-[#e7ded1]"
                            style={{ background: "linear-gradient(135deg, #ffffff, #faf3e8)" }}>
                            <img
                                src={product.imagen}
                                alt={product.nombre}
                                className="w-full aspect-square object-contain p-10 sm:p-14 transition-transform duration-500 hover:scale-105"
                                onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x300?text=Imagen"; }}
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="lg:sticky lg:top-24 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        {product.categoria && (
                            <p className="label-caps mb-3">
                                {product.categoria}
                            </p>
                        )}

                        <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-ink leading-snug mb-5">
                            {product.nombre}
                        </h1>

                        <p className="font-display text-3xl sm:text-4xl font-black text-clay mb-7">
                            ${product.precio.toLocaleString("es-CO")}
                        </p>

                        <div className="flex items-center gap-2 text-xs font-semibold mb-7">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-emerald-700">En Stock</span>
                            <span className="text-stone-300">·</span>
                            <span className="text-stone-400">Envío en 24 horas</span>
                        </div>

                        <p className="text-stone-500 leading-relaxed text-sm mb-8">
                            {product.descripcion}
                        </p>

                        <button
                            onClick={handleAddToCart}
                            className="btn-primary w-full py-4 text-sm"
                            style={added ? {
                                background: "linear-gradient(135deg, #10b981, #059669)",
                                boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
                            } : undefined}
                        >
                            {added ? (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                    Agregado al Carrito
                                </>
                            ) : (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                                    </svg>
                                    Agregar al Carrito
                                </>
                            )}
                        </button>

                        <div className="mt-9 border-t border-[#e7ded1]">
                            <div className="flex items-center justify-between py-4 border-b border-[#eee6da]">
                                <span className="text-sm font-bold text-ink">Envío</span>
                                <span className="text-sm text-stone-500">Gratis en compras mayores a $100k</span>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b border-[#eee6da]">
                                <span className="text-sm font-bold text-ink">Garantía</span>
                                <span className="text-sm text-stone-500">2 años de protección</span>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <span className="text-sm font-bold text-ink">Devoluciones</span>
                                <span className="text-sm text-stone-500">30 días de garantía</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProductDetail;