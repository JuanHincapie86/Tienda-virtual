import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { useAuth } from "../context/AuthContext";
import heroImg from "../assets/hero.png";

function Home() {
    const { products, loading, error } = useProducts();
    const { isAdmin } = useAuth();

    if (loading) {
        return (
            <main className="min-h-[60vh] flex flex-col justify-center items-center gap-5 text-stone-500">
                <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-[3px] border-orange-500/10" />
                    <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-orange-600 border-r-orange-400 animate-spin" />
                </div>
                <p className="font-semibold text-sm tracking-wide">Cargando productos exclusivos...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-[60vh] flex justify-center items-center px-4">
                <div className="text-center max-w-md">
                    <p className="text-rose-600 font-bold text-sm">{error}</p>
                </div>
            </main>
        );
    }

    const featured = products.slice(0, 8);
    const heroProduct = products[0];

    const features = [
        { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, title: "Envío Gratis Nacional", desc: "En compras mayores a $100k" },
        { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Garantía 2 Años", desc: "Protección garantizada" },
        { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, title: "Calidad Certificada", desc: "100% auténticos" },
        { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, title: "Pago Seguro", desc: "Múltiples medios" },
    ];

    return (
        <main>
            {/* ─── HERO ─── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                <div className="animate-fade-in-up">
                    <p className="label-caps mb-5">
                        Colección Exclusiva · 2026
                    </p>
                    <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-ink mb-6">
                        Productos que{" "}
                        <em className="text-clay font-display">inspiran</em>{" "}
                        cada día
                    </h1>
                    <p className="text-stone-500 text-base leading-relaxed max-w-md mb-9">
                        Una curaduría premium con diseño vanguardista, envío rápido y garantía asegurada en cada compra.
                    </p>

                    <div className="flex items-center gap-3 flex-wrap mb-12">
                        <Link to="/productos" className="btn-primary text-sm sm:text-base px-7 sm:px-9 py-3.5">
                            Explorar catálogo
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                            </svg>
                        </Link>
                        <Link to={isAdmin ? "/admin/producto" : "/login"} className="btn-secondary text-sm sm:text-base px-7 sm:px-9 py-3.5">
                            {isAdmin ? "+ Agregar producto" : "Iniciar sesión"}
                        </Link>
                    </div>

                    <div className="flex items-center gap-8 border-t border-[#e7ded1] pt-7">
                        <div>
                            <div className="font-display text-3xl font-black text-ink leading-none">
                                {products.length}+
                            </div>
                            <p className="label-caps mt-2" style={{ color: "#78716c" }}>Productos</p>
                        </div>
                        <div className="w-px h-10 bg-[#e7ded1]" />
                        <div>
                            <div className="font-display text-3xl font-black text-ink leading-none">4.9</div>
                            <p className="label-caps mt-2" style={{ color: "#78716c" }}>Valoración</p>
                        </div>
                        <div className="w-px h-10 bg-[#e7ded1]" />
                        <div>
                            <div className="font-display text-3xl font-black text-ink leading-none">24h</div>
                            <p className="label-caps mt-2" style={{ color: "#78716c" }}>Envío</p>
                        </div>
                    </div>
                </div>

                <div className="relative animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    <div className="absolute -inset-5 -rotate-2 rounded-[2.5rem] opacity-70"
                        style={{ background: "linear-gradient(135deg, #f3d6ae 0%, #efcba0 100%)" }} />
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-[#e7ded1] bg-white shadow-xl">
                        <img
                            src={heroProduct?.imagen || heroImg}
                            alt={heroProduct?.nombre || "Producto destacado"}
                            className="w-full h-full object-contain p-12"
                            onError={(e) => { (e.target as HTMLImageElement).src = heroImg; }}
                        />
                    </div>
                    <div className="absolute -bottom-5 left-8 bg-white rounded-2xl border border-[#e7ded1] px-5 py-3.5 shadow-lg flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-sm font-bold text-ink">Envío gratis hoy</span>
                    </div>
                </div>
            </section>

            {/* ─── FEATURES BAND ─── */}
            <section className="border-y border-[#e7ded1]" style={{ background: "#ffffff" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="flex items-start gap-3.5 animate-fade-in-up" style={{ animationDelay: `${0.05 + i * 0.05}s` }}>
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-clay/10 text-clay">
                                {f.icon}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-ink">{f.title}</div>
                                <div className="text-xs text-stone-400 mt-0.5">{f.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FEATURED PRODUCTS ─── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                <div className="flex items-end justify-between gap-4 flex-wrap mb-9">
                    <div>
                        <p className="label-caps mb-2">Lo más destacado</p>
                        <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-ink">
                            Productos destacados
                        </h2>
                    </div>
                    <Link to="/productos" className="text-sm font-bold text-clay no-underline hover:text-ember transition-colors">
                        Ver catálogo completo →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {featured.map((producto, i) => (
                        <ProductCard key={producto.id} product={producto} index={i} />
                    ))}
                </div>
            </section>

            {/* ─── CTA BAND ─── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
                <div className="rounded-3xl relative overflow-hidden px-8 py-16 text-center" style={{ background: "#1c1917" }}>
                    <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
                        style={{ background: "radial-gradient(circle, #d97706, transparent 70%)" }} />
                    <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
                        style={{ background: "radial-gradient(circle, #c2410c, transparent 70%)" }} />

                    <p className="label-caps mb-4" style={{ color: "#d97706" }}>Registro gratuito</p>
                    <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-cream mb-4">
                        Únete a la tienda
                    </h2>
                    <p className="text-cream/60 text-sm sm:text-base mb-9 max-w-md mx-auto">
                        Crea tu cuenta y empieza a comprar productos exclusivos con envío inmediato.
                    </p>
                    <Link to="/registro" className="btn-primary text-sm sm:text-base px-8 py-3.5">
                        Crear cuenta
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Home;