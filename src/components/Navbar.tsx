import { Link, useLocation } from "react-router";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { totalItems } = useCart();
    const { user, isAdmin } = useAuth();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed top-3 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 flex items-center justify-between px-4 sm:px-6 h-16 bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-slate-900/5 transition-all">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 no-underline group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-sky-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-violet-500/30 transition-transform group-hover:rotate-12 group-hover:scale-105">
                    N
                </div>
                <span className="font-display text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-slate-900 via-violet-700 to-sky-600 bg-clip-text text-transparent tracking-tight">
                    NexShop
                </span>
            </Link>

            {/* Navigation Links */}
            <ul className="hidden md:flex items-center gap-1.5 list-none m-0 p-0">
                <li>
                    <Link
                        to="/"
                        className={`no-underline font-semibold text-sm px-4 py-2 rounded-xl transition-all ${
                            isActive("/")
                                ? "text-violet-600 bg-violet-500/10 border border-violet-500/20"
                                : "text-slate-700 hover:text-violet-600 hover:bg-white/60"
                        }`}
                    >
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link
                        to="/productos"
                        className={`no-underline font-semibold text-sm px-4 py-2 rounded-xl transition-all ${
                            isActive("/productos")
                                ? "text-violet-600 bg-violet-500/10 border border-violet-500/20"
                                : "text-slate-700 hover:text-violet-600 hover:bg-white/60"
                        }`}
                    >
                        Catálogo
                    </Link>
                </li>

                {/* Only Admin can see the Add Product button */}
                {isAdmin && (
                    <li>
                        <Link
                            to="/admin/producto"
                            className="no-underline text-white font-bold text-xs px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-800 border border-white/40 shadow-md shadow-violet-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
                        >
                            + Agregar Producto
                        </Link>
                    </li>
                )}
            </ul>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
                {/* User status / Login link */}
                <Link
                    to="/login"
                    className="no-underline text-xs font-bold px-3 py-1.5 rounded-xl bg-white/70 border border-white text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-white flex items-center gap-2 whitespace-nowrap"
                >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-extrabold ${
                        user
                            ? (isAdmin ? "bg-gradient-to-br from-violet-600 to-purple-900" : "bg-gradient-to-br from-sky-500 to-cyan-700")
                            : "bg-slate-400"
                    }`}>
                        {user ? user.nombre.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="hidden sm:inline">
                        {user ? `${user.nombre} (${user.rol})` : "Cuenta"}
                    </span>
                </Link>

                {/* Cart Button */}
                <Link
                    to="/carrito"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-sky-600 border border-white/40 rounded-xl text-white no-underline font-bold text-sm shadow-md shadow-sky-500/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="hidden sm:inline">Carrito</span>
                    {totalItems > 0 && (
                        <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 bg-white/30 rounded-full text-xs font-extrabold text-white">
                            {totalItems}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;