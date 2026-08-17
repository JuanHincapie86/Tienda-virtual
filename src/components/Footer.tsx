import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Footer() {
    const { isAdmin } = useAuth();

    return (
        <footer style={{ background: "#1c1917" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2.5 mb-4">
                            <img src={logo} alt="Boutique" className="w-10 h-10 rounded-full object-cover" />
                            <span className="font-display text-2xl font-black tracking-tight text-cream">
                                Boutique
                            </span>
                        </div>
                        <p className="text-sm text-cream/50 leading-relaxed max-w-xs">
                            Tienda virtual premium con entrega inmediata y garantía en cada compra.
                        </p>
                    </div>

                    <div>
                        <p className="label-caps mb-4" style={{ color: "#d97706" }}>Tienda</p>
                        <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                            <li>
                                <Link to="/productos" className="no-underline text-sm text-cream/70 hover:text-cream transition-colors">
                                    Catálogo completo
                                </Link>
                            </li>
                            <li>
                                <Link to="/carrito" className="no-underline text-sm text-cream/70 hover:text-cream transition-colors">
                                    Mi carrito
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="no-underline text-sm text-cream/70 hover:text-cream transition-colors">
                                    Mi cuenta
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="label-caps mb-4" style={{ color: "#d97706" }}>Cuenta</p>
                        <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                            <li>
                                <Link to="/login" className="no-underline text-sm text-cream/70 hover:text-cream transition-colors">
                                    Iniciar sesión
                                </Link>
                            </li>
                            <li>
                                <Link to="/registro" className="no-underline text-sm text-cream/70 hover:text-cream transition-colors">
                                    Crear cuenta
                                </Link>
                            </li>
                            {isAdmin && (
                                <li>
                                    <Link to="/admin/producto" className="no-underline text-sm text-cream/70 hover:text-cream transition-colors">
                                        Panel de administrador
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <p className="label-caps mb-4" style={{ color: "#d97706" }}>Contacto</p>
                        <ul className="flex flex-col gap-2.5 list-none m-0 p-0 text-sm text-cream/70">
                            <li>hola@boutique.com</li>
                            <li>+57 300 123 4567</li>
                            <li>Bogotá, Colombia</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-cream/10 flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-xs text-cream/40 m-0">
                        © {new Date().getFullYear()} Boutique. Todos los derechos reservados.
                    </p>
                    <p className="text-xs text-cream/40 m-0">Hecho con React y Supabase</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;