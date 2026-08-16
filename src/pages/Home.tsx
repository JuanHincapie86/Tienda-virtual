import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { products, loading, error } = useProducts();
    const { isAdmin } = useAuth();

    if (loading) {
        return (
            <main className="pt-24 pb-16 min-h-[60vh] flex flex-col justify-center items-center gap-4 text-slate-600 font-semibold">
                <div className="w-12 h-12 border-4 border-violet-500/15 border-t-violet-600 border-r-sky-500 rounded-full animate-spin-fast" />
                <p>Cargando catálogo exclusivo...</p>
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

    const featured = products.slice(0, 8);

    return (
        <main className="pt-24 pb-16">
            {/* ─── HERO SECTION ─── */}
            <section className="relative flex items-center justify-center text-center px-4 sm:px-6 pt-6 pb-12 overflow-hidden">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/90 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold text-violet-700 tracking-wide mb-6 shadow-xs animate-fade-in-up">
                        Colección Exclusiva 2026
                    </div>

                    <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 mb-6 animate-fade-in-up">
                        Descubre productos<br />
                        que te <span className="bg-gradient-to-r from-violet-600 via-sky-500 to-rose-500 bg-clip-text text-transparent">inspiran</span>
                    </h1>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto mb-8 animate-fade-in-up">
                        Explora nuestra curaduría de productos de alta calidad, diseño vanguardista y garantía asegurada en cada compra.
                    </p>

                    <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap animate-fade-in-up">
                        <Link
                            to="/productos"
                            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-gradient-to-r from-violet-600 to-violet-800 text-white no-underline rounded-xl font-bold text-sm sm:text-base shadow-md shadow-violet-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            Explorar catálogo →
                        </Link>
                        {isAdmin ? (
                            <Link
                                to="/admin/producto"
                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-white/60 text-slate-700 no-underline rounded-xl font-bold text-sm sm:text-base border border-white backdrop-blur-xl shadow-xs transition-all hover:-translate-y-0.5 hover:bg-white hover:text-violet-600"
                            >
                                + Agregar producto
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-white/60 text-slate-700 no-underline rounded-xl font-bold text-sm sm:text-base border border-white backdrop-blur-xl shadow-xs transition-all hover:-translate-y-0.5 hover:bg-white hover:text-violet-600"
                            >
                                Iniciar Sesión / Roles
                            </Link>
                        )}
                    </div>

                    {/* Stats Bar */}
                    <div className="flex items-center justify-center gap-4 sm:gap-6 mt-12 flex-wrap animate-fade-in-up">
                        <div className="flex items-center gap-3 px-5 py-3 bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl shadow-xs">
                            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 font-extrabold text-sm">
                                N
                            </div>
                            <div className="text-left">
                                <div className="font-display text-xl font-extrabold bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent leading-none">
                                    {products.length}+
                                </div>
                                <div className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-wider">
                                    Productos
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-5 py-3 bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl shadow-xs">
                            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#7c3aed" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                            </div>
                            <div className="text-left">
                                <div className="font-display text-xl font-extrabold bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent leading-none">
                                    4.9
                                </div>
                                <div className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-wider">
                                    Valoración
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-5 py-3 bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl shadow-xs">
                            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 font-extrabold text-xs">
                                24h
                            </div>
                            <div className="text-left">
                                <div className="font-display text-xl font-extrabold bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent leading-none">
                                    Exprés
                                </div>
                                <div className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-wider">
                                    Envío Rápido
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FEATURES BAR ─── */}
            <section className="max-w-7xl mx-auto mb-12 px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3.5 p-4 bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl shadow-xs hover:-translate-y-0.5 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="3" width="15" height="13"></rect>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900">Envío Gratis Nacional</div>
                            <div className="text-[11px] text-slate-500">En compras mayores a $100k</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-4 bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl shadow-xs hover:-translate-y-0.5 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900">Garantía 2 Años</div>
                            <div className="text-[11px] text-slate-500">Protección garantizada</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-4 bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl shadow-xs hover:-translate-y-0.5 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900">Calidad Certificada</div>
                            <div className="text-[11px] text-slate-500">100% Auténticos</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-4 bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl shadow-xs hover:-translate-y-0.5 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                <line x1="1" y1="10" x2="23" y2="10"></line>
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900">Pago Seguro</div>
                            <div className="text-[11px] text-slate-500">Múltiples medios</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FEATURED PRODUCTS ─── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Productos <span className="bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">Destacados</span>
                    </h2>
                    <Link
                        to="/productos"
                        className="text-violet-600 no-underline text-xs sm:text-sm font-bold flex items-center gap-1 hover:text-violet-800 transition-colors"
                    >
                        Ver catálogo completo →
                    </Link>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent my-4 mb-6" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {featured.map((producto, i) => (
                        <ProductCard key={producto.id} product={producto} index={i} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;