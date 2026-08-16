import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../context/AuthContext";

function Login() {
    const { user, login, logout, isAdmin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState<UserRole>("cliente");
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            login(email, rol);
        }
    };

    const handleQuickLogin = (role: UserRole) => {
        if (role === "admin") {
            login("admin@nexshop.com", "admin", "Administrador Principal");
        } else {
            login("cliente@ejemplo.com", "cliente", "Cliente Registrado");
        }
    };

    if (user) {
        return (
            <main className="pt-24 pb-16 min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md w-full p-6 sm:p-8 bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl shadow-xl shadow-slate-900/5 text-center animate-fade-in-up">
                    <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                        isAdmin ? "bg-violet-500/10 text-violet-600" : "bg-sky-500/10 text-sky-600"
                    }`}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black mb-2 bg-gradient-to-r from-slate-900 to-violet-700 bg-clip-text text-transparent">
                        ¡Hola, {user.nombre}!
                    </h2>

                    <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold mb-5 border ${
                        isAdmin ? "bg-violet-500/10 border-violet-500/20 text-violet-700" : "bg-sky-500/10 border-sky-500/20 text-sky-700"
                    }`}>
                        Rol: {isAdmin ? "Administrador" : "Cliente"}
                    </div>

                    <p className="text-slate-500 mb-6 text-xs sm:text-sm">
                        Conectado con: <strong className="text-slate-800">{user.email}</strong>
                    </p>

                    <div className="flex flex-col gap-2.5">
                        {isAdmin && (
                            <Link
                                to="/admin/producto"
                                className="p-3 bg-gradient-to-r from-violet-600 to-violet-800 text-white rounded-xl no-underline font-bold text-xs sm:text-sm border border-white/40 shadow-sm transition-transform hover:-translate-y-0.5"
                            >
                                Panel de Agregar Producto
                            </Link>
                        )}
                        <Link
                            to="/productos"
                            className="p-3 bg-white/60 border border-white text-slate-700 rounded-xl no-underline font-bold text-xs sm:text-sm hover:bg-white transition-colors"
                        >
                            Ver Catálogo de Productos
                        </Link>
                        <button
                            onClick={logout}
                            className="mt-1 p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-600 font-bold text-xs cursor-pointer hover:bg-rose-500/15 transition-colors"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-24 pb-16 min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full p-6 sm:p-8 bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl shadow-xl shadow-slate-900/5 animate-fade-in-up">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 bg-violet-500/10 border border-violet-500/20 text-violet-600">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-violet-700 bg-clip-text text-transparent mb-1">
                        Iniciar Sesión
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm">Elige tu rol e ingresa a NexShop</p>
                </div>

                {/* Quick Access Buttons */}
                <div className="mb-5">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 text-center">
                        Acceso Rápido de Prueba
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                        <button
                            type="button"
                            onClick={() => handleQuickLogin("admin")}
                            className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-xl text-violet-700 font-bold text-xs cursor-pointer hover:bg-violet-500/15 transition-colors"
                        >
                            Modo Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickLogin("cliente")}
                            className="p-2 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-700 font-bold text-xs cursor-pointer hover:bg-sky-500/15 transition-colors"
                        >
                            Modo Cliente
                        </button>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent my-5" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Role selector */}
                    <div>
                        <label className="block mb-1.5 font-bold text-xs text-slate-700">
                            Rol de Usuario
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => setRol("cliente")}
                                className={`p-2 rounded-xl font-bold text-xs cursor-pointer border transition-colors ${
                                    rol === "cliente"
                                        ? "border-sky-500 bg-sky-500/15 text-sky-700"
                                        : "border-white/70 bg-white/40 text-slate-600"
                                }`}
                            >
                                Cliente
                            </button>
                            <button
                                type="button"
                                onClick={() => setRol("admin")}
                                className={`p-2 rounded-xl font-bold text-xs cursor-pointer border transition-colors ${
                                    rol === "admin"
                                        ? "border-violet-600 bg-violet-500/15 text-violet-700"
                                        : "border-white/70 bg-white/40 text-slate-600"
                                }`}
                            >
                                Administrador
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1.5 font-bold text-xs text-slate-700">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="usuario@ejemplo.com"
                            className="input-glass"
                        />
                    </div>

                    <div>
                        <label className="block mb-1.5 font-bold text-xs text-slate-700">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="input-glass pr-16"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-none border-none text-slate-500 font-bold text-xs cursor-pointer hover:text-slate-900"
                            >
                                {showPass ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-1 p-3 bg-gradient-to-r from-violet-600 to-violet-800 border border-white/40 text-white rounded-xl font-bold text-xs sm:text-sm cursor-pointer shadow-md shadow-violet-500/30 hover:-translate-y-0.5 transition-transform"
                    >
                        Ingresar como {rol === "admin" ? "Admin" : "Cliente"} →
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Login;