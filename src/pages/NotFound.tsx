import { Link } from "react-router";

function NotFound() {
    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4 text-center">
            <div className="max-w-md animate-fade-in-up">
                <p className="font-display text-8xl sm:text-9xl font-black leading-none tracking-tighter text-ink">
                    4<span className="text-clay">0</span>4
                </p>
                <h2 className="font-display text-2xl font-bold text-ink mt-4 mb-3">
                    Página no encontrada
                </h2>
                <p className="text-stone-400 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                    La página que buscas no existe o fue movida a otra dirección.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                    <Link to="/" className="btn-primary text-sm px-6 py-3">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                        Volver al Inicio
                    </Link>
                    <Link to="/productos" className="btn-secondary text-sm px-6 py-3">
                        Ver productos
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default NotFound;