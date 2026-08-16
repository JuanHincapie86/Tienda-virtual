import { Link } from "react-router";

function NotFound() {
    return (
        <main className="pt-24 pb-16 min-h-screen flex items-center justify-center px-4 text-center">
            <div className="bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl p-8 sm:p-10 shadow-xl shadow-slate-900/5 max-w-md w-full animate-fade-in-up">
                {/* 404 number */}
                <div className="font-display text-7xl sm:text-8xl font-black leading-none bg-gradient-to-r from-violet-600 via-sky-500 to-rose-500 bg-clip-text text-transparent tracking-tighter mb-2">
                    404
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 mb-2">
                    Página no encontrada
                </h2>

                <p className="text-slate-500 text-xs sm:text-sm mb-8">
                    La página que buscas no existe o ha sido movida a otra dirección.
                </p>

                <div className="flex gap-3 justify-center flex-wrap">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-800 text-white rounded-xl no-underline font-bold text-xs sm:text-sm border border-white/40 shadow-md shadow-violet-500/30 hover:-translate-y-0.5 transition-transform"
                    >
                        Volver al Inicio
                    </Link>
                    <Link
                        to="/productos"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 border border-white text-slate-700 rounded-xl no-underline font-bold text-xs sm:text-sm hover:bg-white transition-colors"
                    >
                        Ver productos
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default NotFound;