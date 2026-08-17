import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole = "admin" }) => {
    const { user, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <main className="min-h-[60vh] flex flex-col justify-center items-center gap-5 text-stone-500">
                <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-[3px] border-orange-500/10" />
                    <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-orange-600 border-r-orange-400 animate-spin" />
                </div>
                <p className="font-semibold text-sm">Verificando sesión...</p>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-[70vh] flex items-center justify-center px-4 text-center">
                <div className="max-w-md">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-clay/10 text-clay">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-ink mb-2">
                        Acceso Restringido
                    </h2>
                    <p className="text-stone-400 text-sm mb-7 leading-relaxed">
                        Debes iniciar sesión como <strong className="text-stone-600">Administrador</strong> para agregar nuevos productos.
                    </p>
                    <Link to="/login" className="btn-primary text-sm px-6 py-3">
                        Iniciar Sesión como Admin
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </Link>
                </div>
            </main>
        );
    }

    if (requiredRole === "admin" && !isAdmin) {
        return (
            <main className="min-h-[70vh] flex items-center justify-center px-4 text-center">
                <div className="max-w-md">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-rose-500/10 text-rose-500">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                        </svg>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-ink mb-2">
                        Permisos Insuficientes
                    </h2>
                    <p className="text-stone-400 text-sm mb-7 leading-relaxed">
                        Actualmente estás conectado como <strong className="text-clay">Cliente</strong> ({user.email}). Solo los usuarios con rol <strong className="text-stone-600">Administrador</strong> pueden agregar productos.
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <Link to="/login" className="btn-primary text-sm px-5 py-2.5">
                            Cambiar a Administrador
                        </Link>
                        <Link to="/productos" className="btn-secondary text-sm px-5 py-2.5">
                            Ver productos
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return <>{children}</>;
};