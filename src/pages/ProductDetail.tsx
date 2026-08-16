import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getProductById } from "../services/api";
import type { Product } from "../types/Product";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";

function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();
    const { products } = useProducts();

    useEffect(() => {
        if (!id) return;

        const localProduct = products.find((p) => String(p.id) === id);
        if (localProduct && localProduct.id > 10000) {
            setProduct(localProduct);
            setLoading(false);
            return;
        }

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
    }, [id, products]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) {
        return (
            <main className="pt-24 pb-16 min-h-[60vh] flex flex-col justify-center items-center gap-4 text-slate-600 font-semibold">
                <div className="w-12 h-12 border-4 border-violet-500/15 border-t-violet-600 border-r-sky-500 rounded-full animate-spin-fast" />
                <p>Cargando producto...</p>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="pt-24 pb-16 p-8 text-center">
                <p className="text-rose-600 font-bold mb-4">{error || "Producto no encontrado"}</p>
                <Link to="/productos" className="text-violet-600 no-underline font-bold hover:underline text-sm">
                    ← Volver al catálogo
                </Link>
            </main>
        );
    }

    return (
        <main className="pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Breadcrumb */}
                <Link
                    to="/productos"
                    className="inline-flex items-center gap-1.5 text-slate-600 no-underline text-xs font-semibold mb-6 px-3.5 py-1.5 bg-white/50 backdrop-blur-xl border border-white/80 rounded-full shadow-xs hover:text-violet-600 hover:bg-white transition-all"
                >
                    ← Volver al catálogo
                </Link>

                {/* Product Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl overflow-hidden shadow-xs">
                    {/* Image side */}
                    <div className="bg-white/40 flex items-center justify-center p-8 sm:p-10 border-b md:border-b-0 md:border-r border-white/60 relative min-h-[320px]">
                        <img
                            src={product.imagen}
                            alt={product.nombre}
                            className="w-full h-full max-h-72 object-contain drop-shadow-md relative z-10"
                            onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x300?text=Imagen"; }}
                        />
                    </div>

                    {/* Info side */}
                    <div className="p-6 sm:p-8 flex flex-col justify-center">
                        {product.categoria && (
                            <span className="inline-block bg-white/70 border border-white/90 rounded-full px-3 py-0.5 text-[11px] font-extrabold text-violet-600 uppercase tracking-wider mb-3 w-fit shadow-xs">
                                {product.categoria}
                            </span>
                        )}

                        <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-3 tracking-tight">
                            {product.nombre}
                        </h1>

                        <p className="text-2xl sm:text-3xl font-black mb-4 bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">
                            ${product.precio.toLocaleString("es-CO")}
                        </p>

                        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm mb-6">
                            {product.descripcion}
                        </p>

                        <button
                            onClick={handleAddToCart}
                            className={`py-3.5 px-6 border border-white/40 rounded-xl text-white font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-md flex items-center justify-center gap-2 ${
                                added
                                    ? "bg-emerald-600 shadow-emerald-500/30"
                                    : "bg-gradient-to-r from-violet-600 to-violet-800 shadow-violet-500/30 hover:-translate-y-0.5"
                            }`}
                        >
                            {added ? "Agregado al carrito" : "Agregar al Carrito"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductDetail;