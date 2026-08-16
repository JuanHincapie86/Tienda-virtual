import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole = "admin" }) => {
    const { user, isAdmin } = useAuth();

    if (!user) {
        return (
            <main className="pt-24 pb-16 min-h-screen flex items-center justify-center px-4 text-center">
                <div className="bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl p-8 shadow-xl shadow-slate-900/5 max-w-md w-full animate-fade-in-up">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h2 className="text-xl font-black text-slate-900 mb-2">
                        Acceso Restringido
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed">
                        Debes iniciar sesión como <strong>Administrador</strong> para agregar nuevos productos.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-800 text-white rounded-xl no-underline font-bold text-xs sm:text-sm border border-white/40 shadow-md shadow-violet-500/30"
                    >
                        Iniciar Sesión como Admin →
                    </Link>
                </div>
            </main>
        );
    }

    if (requiredRole === "admin" && !isAdmin) {
        return (
            <main className="pt-24 pb-16 min-h-screen flex items-center justify-center px-4 text-center">
                <div className="bg-white/50 backdrop-blur-xl border border-rose-500/20 rounded-2xl p-8 shadow-xl shadow-rose-900/5 max-w-md w-full animate-fade-in-up">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                        </svg>
                    </div>
                    <h2 className="text-xl font-black text-slate-900 mb-2">
                        Permisos Insuficientes
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed">
                        Actualmente estás conectado como <strong className="text-sky-600">Cliente</strong> ({user.email}). Solo los usuarios con rol <strong>Administrador</strong> pueden agregar productos.
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <Link
                            to="/login"
                            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-violet-800 text-white rounded-xl no-underline font-bold text-xs border border-white/40 shadow-sm"
                        >
                            Cambiar a Administrador
                        </Link>
                        <Link
                            to="/productos"
                            className="px-5 py-2.5 bg-white/60 border border-white text-slate-700 rounded-xl no-underline font-bold text-xs"
                        >
                            Ver productos
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return <>{children}</>;
};
