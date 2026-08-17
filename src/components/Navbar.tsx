import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Navbar() {
    const { totalItems } = useCart();
    const { user, isAdmin } = useAuth();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const linkClass = (path: string) =>
        `no-underline text-sm font-semibold transition-colors duration-200 ${
            isActive(path) ? "text-clay" : "text-stone-500 hover:text-clay"
        }`;

    return (
        <header
            className="sticky top-0 z-50"
            style={{
                background: "rgba(253,251,247,0.92)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: "1px solid #e7ded1",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                {/* Brand */}
                <Link to="/" className="flex items-center gap-2.5 no-underline group shrink-0">
                    <img src={logo} alt="Boutique" className="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <span className="font-display text-2xl font-black tracking-tight text-ink">
                        Boutique
                    </span>
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden md:flex items-center gap-7">
                    <Link to="/" className={linkClass("/")}>
                        Inicio
                    </Link>
                    <Link to="/productos" className={linkClass("/productos")}>
                        Catálogo
                    </Link>
                    {isAdmin && (
                        <Link to="/admin/producto" className="no-underline text-sm font-bold text-clay hover:text-ember transition-colors">
                            + Agregar
                        </Link>
                    )}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="no-underline hidden sm:flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-clay transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        <span className="max-w-[120px] truncate">
                            {user ? user.nombre : "Cuenta"}
                        </span>
                    </Link>

                    <Link
                        to="/carrito"
                        className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-cream bg-ink no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"/>
                            <circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                        <span className="hidden sm:inline">Carrito</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-[11px] font-extrabold text-white bg-clay">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg transition-all duration-200 cursor-pointer border-none"
                        style={{ background: mobileOpen ? "rgba(194,65,12,0.08)" : "transparent" }}
                        aria-label="Menú"
                    >
                        <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
                            style={{ background: mobileOpen ? "#c2410c" : "#44403c" }} />
                        <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 my-1 ${mobileOpen ? "opacity-0" : ""}`}
                            style={{ background: "#44403c" }} />
                        <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
                            style={{ background: mobileOpen ? "#c2410c" : "#44403c" }} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-[#e7ded1] bg-cream px-4 py-3 flex flex-col gap-1 animate-fade-in">
                    <Link to="/" onClick={() => setMobileOpen(false)} className={`no-underline px-3 py-2.5 rounded-lg text-sm font-semibold ${isActive("/") ? "text-clay bg-clay/5" : "text-stone-600"}`}>
                        Inicio
                    </Link>
                    <Link to="/productos" onClick={() => setMobileOpen(false)} className={`no-underline px-3 py-2.5 rounded-lg text-sm font-semibold ${isActive("/productos") ? "text-clay bg-clay/5" : "text-stone-600"}`}>
                        Catálogo
                    </Link>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="no-underline px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-600">
                        {user ? user.nombre : "Cuenta"}
                    </Link>
                    {isAdmin && (
                        <Link to="/admin/producto" onClick={() => setMobileOpen(false)} className="no-underline px-3 py-2.5 rounded-lg text-sm font-bold text-clay">
                            + Agregar Producto
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}

export default Navbar;