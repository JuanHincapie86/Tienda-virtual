import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Login() {
    const { user, login, logout, isAdmin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            setLoading(true);
            await login(email, password);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        return (
            <main className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-clay/10 text-clay">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                    </div>
                    <h2 className="font-display text-3xl font-black text-ink mb-3">
                        ¡Hola, {user.nombre}!
                    </h2>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-6" style={{ background: "#fdf3e8", color: "#b45309" }}>
                        Rol: {isAdmin ? "Administrador" : "Cliente"}
                    </span>
                    <p className="text-stone-400 mb-8 text-sm">
                        Conectado como <strong className="text-stone-600">{user.email}</strong>
                    </p>
                    <div className="flex flex-col gap-2.5">
                        {isAdmin && (
                            <Link to="/admin/producto" className="btn-primary py-3 text-sm">
                                Panel de Agregar Producto
                            </Link>
                        )}
                        <Link to="/productos" className="btn-secondary py-3 text-sm">
                            Ver Catálogo de Productos
                        </Link>
                        <button
                            onClick={() => { void logout(); }}
                            className="mt-1 py-2.5 px-4 rounded-lg font-bold text-xs cursor-pointer transition-colors border-none bg-transparent text-rose-500 hover:bg-rose-50"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2">
            {/* Decorative panel */}
            <div className="hidden lg:flex flex-col justify-between p-12 text-cream relative overflow-hidden"
                style={{ background: "#1c1917" }}>
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(circle, #d97706, transparent 70%)" }} />
                <div className="relative">
                    <div className="flex items-center gap-2.5">
                        <img src={logo} alt="Boutique" className="w-10 h-10 rounded-full object-cover" />
                        <span className="font-display text-2xl font-black tracking-tight text-cream">Boutique</span>
                    </div>
                </div>
                <div className="relative">
                    <p className="label-caps mb-4" style={{ color: "#d97706" }}>Bienvenido de nuevo</p>
                    <h2 className="font-display text-5xl font-black leading-[1.1] tracking-tight mb-5">
                        Vuelve a tus{" "}
                        <em className="text-clay" style={{ color: "#d97706" }}>compras</em>
                    </h2>
                    <p className="text-cream/60 text-sm leading-relaxed max-w-sm">
                        Accede a tu cuenta para continuar explorando una curaduría premium con envío inmediato.
                    </p>
                </div>
                <p className="relative text-xs text-cream/40">
                    © {new Date().getFullYear()} Boutique
                </p>
            </div>

            {/* Form */}
            <div className="flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-sm">
                    <p className="label-caps mb-3">Iniciar sesión</p>
                    <h1 className="font-display text-4xl font-black tracking-tight text-ink mb-8">
                        Bienvenido
                    </h1>

                    {error && (
                        <div className="p-4 mb-5 rounded-xl font-bold text-xs flex items-center gap-2.5"
                            style={{ background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.16)", color: "#be123c" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <label className="block mb-1.5 font-bold text-xs text-stone-600">
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
                            <label className="block mb-1.5 font-bold text-xs text-stone-600">
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
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-stone-400 font-bold text-xs cursor-pointer hover:text-stone-700 transition-colors"
                                >
                                    {showPass ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3.5 text-sm"
                            style={loading ? { opacity: 0.8, cursor: "default" } : undefined}
                        >
                            {loading ? "Ingresando..." : "Ingresar"}
                        </button>
                    </form>

                    <p className="text-center text-stone-400 text-sm mt-8">
                        ¿No tienes cuenta?{" "}
                        <Link to="/registro" className="text-clay font-bold no-underline hover:text-ember transition-colors">
                            Regístrate gratis
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Login;