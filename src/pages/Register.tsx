import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Register() {
    const { signUp, user } = useAuth();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (password !== confirm) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            setLoading(true);
            const { needsConfirmation } = await signUp(email, password, nombre);
            if (needsConfirmation) {
                setSuccess("Revisa tu correo electrónico para confirmar tu cuenta antes de iniciar sesión.");
            } else {
                navigate("/productos");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al crear la cuenta");
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        return (
            <main className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <h2 className="font-display text-3xl font-black text-ink mb-3">
                        Ya tienes una sesión activa
                    </h2>
                    <p className="text-stone-400 text-sm mb-8">
                        Estás conectado como <strong className="text-stone-600">{user.email}</strong>
                    </p>
                    <Link to="/productos" className="btn-primary py-3 text-sm">
                        Ir al catálogo
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2">
            {/* Decorative panel */}
            <div className="hidden lg:flex flex-col justify-between p-12 text-cream relative overflow-hidden"
                style={{ background: "#1c1917" }}>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(circle, #c2410c, transparent 70%)" }} />
                <div className="relative">
                    <div className="flex items-center gap-2.5">
                        <img src={logo} alt="Boutique" className="w-10 h-10 rounded-full object-cover" />
                        <span className="font-display text-2xl font-black tracking-tight text-cream">Boutique</span>
                    </div>
                </div>
                <div className="relative">
                    <p className="label-caps mb-4" style={{ color: "#d97706" }}>Nuevo aquí</p>
                    <h2 className="font-display text-5xl font-black leading-[1.1] tracking-tight mb-5">
                        Crea tu cuenta en{" "}
                        <em className="text-clay" style={{ color: "#d97706" }}>minutos</em>
                    </h2>
                    <p className="text-cream/60 text-sm leading-relaxed max-w-sm">
                        Únete gratis como cliente y accede a productos premium con envío inmediato.
                    </p>
                </div>
                <p className="relative text-xs text-cream/40">
                    © {new Date().getFullYear()} Boutique
                </p>
            </div>

            {/* Form */}
            <div className="flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-sm">
                    <p className="label-caps mb-3">Registro</p>
                    <h1 className="font-display text-4xl font-black tracking-tight text-ink mb-8">
                        Crear cuenta
                    </h1>

                    {success && (
                        <div className="p-4 mb-5 rounded-xl font-bold text-xs flex items-center gap-2.5"
                            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)", color: "#047857" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            {success}
                        </div>
                    )}

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
                                Nombre
                            </label>
                            <input
                                type="text"
                                required
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Tu nombre"
                                className="input-glass"
                            />
                        </div>

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
                                    placeholder="Mínimo 6 caracteres"
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

                        <div>
                            <label className="block mb-1.5 font-bold text-xs text-stone-600">
                                Confirmar Contraseña
                            </label>
                            <input
                                type={showPass ? "text" : "password"}
                                required
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                placeholder="Repite tu contraseña"
                                className="input-glass"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3.5 text-sm"
                            style={loading ? { opacity: 0.8, cursor: "default" } : undefined}
                        >
                            {loading ? "Creando cuenta..." : "Crear Cuenta"}
                        </button>
                    </form>

                    <p className="text-center text-stone-400 text-sm mt-8">
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/login" className="text-clay font-bold no-underline hover:text-ember transition-colors">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Register;