import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router";

const FREE_SHIPPING_THRESHOLD = 100000;

function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        if (coupon.trim().toUpperCase() === "NEX10") {
            setDiscount(0.10);
            setCouponMsg({ text: "Cupón NEX10 aplicado (10% Dcto)", isError: false });
        } else {
            setDiscount(0);
            setCouponMsg({ text: "Cupón no válido. Pruebe con 'NEX10'", isError: true });
        }
    };

    const finalDiscountAmount = totalPrice * discount;
    const finalPrice = totalPrice - finalDiscountAmount;
    const freeShippingProgress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
    const amountLeftForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

    return (
        <main className="pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-violet-700 to-sky-600 bg-clip-text text-transparent">
                        Tu Carrito de Compras
                    </h1>
                    {cart.length > 0 && (
                        <p className="text-slate-500 text-xs sm:text-sm mt-1">
                            {totalItems} {totalItems === 1 ? "artículo seleccionado" : "artículos seleccionados"}
                        </p>
                    )}
                </div>

                {/* Empty State */}
                {cart.length === 0 && (
                    <div className="bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl p-12 text-center shadow-xs max-w-xl mx-auto">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-extrabold text-slate-900 mb-2">
                            Tu carrito está vacío
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm mb-6">
                            Explora nuestro catálogo y descubre nuestras ofertas.
                        </p>
                        <Link
                            to="/productos"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-800 text-white rounded-xl no-underline font-bold text-xs sm:text-sm shadow-md shadow-violet-500/30 hover:-translate-y-0.5 transition-transform"
                        >
                            Explorar catálogo de productos →
                        </Link>
                    </div>
                )}

                {/* Cart Items & Summary */}
                {cart.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Items Column */}
                        <div className="lg:col-span-8 flex flex-col gap-4">

                            {/* Free Shipping Progress Card */}
                            <div className="p-4 sm:p-5 bg-white/60 backdrop-blur-xl border border-violet-500/20 rounded-2xl shadow-xs">
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-slate-800">
                                        {amountLeftForFreeShipping === 0
                                            ? "Tienes Envío Gratis Calificado"
                                            : `Agrega $${amountLeftForFreeShipping.toLocaleString("es-CO")} más para Envío Gratis`}
                                    </span>
                                    <span className="text-violet-600">{Math.round(freeShippingProgress)}%</span>
                                </div>
                                <div className="h-2 w-full bg-violet-500/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-violet-600 to-sky-500 rounded-full transition-all duration-300"
                                        style={{ width: `${freeShippingProgress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Items List */}
                            {cart.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 flex-wrap shadow-xs hover:border-violet-500/30 transition-all"
                                >
                                    {/* Product info */}
                                    <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                                        <div className="w-16 h-16 rounded-xl shrink-0 bg-white/70 flex items-center justify-center border border-violet-500/10 p-2">
                                            <img
                                                src={item.product.imagen}
                                                alt={item.product.nombre}
                                                className="w-full h-full object-contain max-h-12"
                                                onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/54"; }}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="m-0 text-xs sm:text-sm font-bold text-slate-900 truncate">
                                                {item.product.nombre}
                                            </h4>
                                            <p className="mt-0.5 text-xs text-slate-500">
                                                ${item.product.precio.toLocaleString("es-CO")} c/u
                                            </p>
                                        </div>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            className="w-8 h-8 rounded-lg border border-violet-500/20 bg-white/80 text-violet-600 font-extrabold text-sm flex items-center justify-center cursor-pointer hover:bg-violet-500/10 transition-colors"
                                        >-</button>

                                        <span className="font-extrabold min-w-5 text-center text-slate-900 text-xs sm:text-sm">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            className="w-8 h-8 rounded-lg border border-violet-500/20 bg-white/80 text-violet-600 font-extrabold text-sm flex items-center justify-center cursor-pointer hover:bg-violet-500/10 transition-colors"
                                        >+</button>

                                        <span className="ml-2 font-black text-xs sm:text-sm min-w-[70px] text-right bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">
                                            ${(item.product.precio * item.quantity).toLocaleString("es-CO")}
                                        </span>

                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="ml-2 w-8 h-8 rounded-lg border border-rose-500/25 bg-rose-500/10 text-rose-600 text-xs flex items-center justify-center cursor-pointer hover:bg-rose-500/20 transition-colors"
                                            title="Eliminar"
                                        >✕</button>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-start mt-1">
                                <button
                                    onClick={clearCart}
                                    className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-600 font-bold text-xs cursor-pointer hover:bg-rose-500/20 transition-colors"
                                >
                                    Vaciar carrito
                                </button>
                            </div>
                        </div>

                        {/* Summary Column */}
                        <div className="lg:col-span-4 sticky top-24">
                            <div className="bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl p-6 shadow-xs">
                                <h3 className="text-base font-extrabold text-slate-900 mb-4">
                                    Resumen de Pedido
                                </h3>

                                <div className="flex flex-col gap-2.5 text-xs">
                                    <div className="flex justify-between text-slate-500">
                                        <span>Subtotal ({totalItems} ítems)</span>
                                        <span className="font-bold text-slate-900">${totalPrice.toLocaleString("es-CO")}</span>
                                    </div>

                                    <div className="flex justify-between text-slate-500">
                                        <span>Envío Estimado</span>
                                        <span className={`font-bold ${amountLeftForFreeShipping === 0 ? "text-emerald-600" : "text-slate-900"}`}>
                                            {amountLeftForFreeShipping === 0 ? "GRATIS" : "$12,000"}
                                        </span>
                                    </div>

                                    {discount > 0 && (
                                        <div className="flex justify-between text-emerald-600 font-bold">
                                            <span>Descuento (10%)</span>
                                            <span>-${finalDiscountAmount.toLocaleString("es-CO")}</span>
                                        </div>
                                    )}

                                    <div className="h-px bg-violet-500/15 my-1.5" />

                                    <div className="flex justify-between items-center">
                                        <span className="font-extrabold text-xs sm:text-sm text-slate-900">Total</span>
                                        <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">
                                            ${(finalPrice + (amountLeftForFreeShipping === 0 ? 0 : 12000)).toLocaleString("es-CO")}
                                        </span>
                                    </div>
                                </div>

                                {/* Promo Coupon Code */}
                                <form onSubmit={handleApplyCoupon} className="mt-5">
                                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                                        Código de descuento (NEX10)
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={coupon}
                                            onChange={(e) => setCoupon(e.target.value)}
                                            placeholder="Código de cupón"
                                            className="input-glass py-2 px-3 text-xs"
                                        />
                                        <button
                                            type="submit"
                                            className="px-3 py-2 bg-violet-500/10 border border-violet-500/20 rounded-xl text-violet-600 font-bold text-xs cursor-pointer hover:bg-violet-500/20 transition-colors"
                                        >
                                            Aplicar
                                        </button>
                                    </div>
                                    {couponMsg && (
                                        <p className={`text-[11px] font-bold mt-1 ${couponMsg.isError ? "text-rose-600" : "text-emerald-600"}`}>
                                            {couponMsg.text}
                                        </p>
                                    )}
                                </form>

                                {/* Checkout Button */}
                                <button className="w-full mt-6 py-3.5 bg-gradient-to-r from-violet-600 to-violet-800 border border-white/40 rounded-xl text-white text-sm font-extrabold cursor-pointer shadow-md shadow-violet-500/30 hover:-translate-y-0.5 transition-all">
                                    Proceder al Pago Seguro →
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </main>
    );
}

export default Cart;