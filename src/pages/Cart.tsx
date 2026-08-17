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
            setCouponMsg({ text: "Cupón no válido. Prueba 'NEX10'", isError: true });
        }
    };

    const finalDiscountAmount = totalPrice * discount;
    const finalPrice = totalPrice - finalDiscountAmount;
    const freeShippingProgress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
    const amountLeftForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

    return (
        <main>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16">
                <div className="mb-9 border-b border-[#e7ded1] pb-8 animate-fade-in-up">
                    <p className="label-caps mb-2">Carrito de compras</p>
                    <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-ink">
                        Tu carrito
                    </h1>
                    {cart.length > 0 && (
                        <p className="text-stone-400 text-sm mt-2">
                            {totalItems} {totalItems === 1 ? "artículo seleccionado" : "artículos seleccionados"}
                        </p>
                    )}
                </div>

                {cart.length === 0 && (
                    <div className="text-center py-20 animate-fade-in-up">
                        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-clay/10 text-clay">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                            </svg>
                        </div>
                        <h2 className="font-display text-2xl font-bold text-ink mb-2">
                            Tu carrito está vacío
                        </h2>
                        <p className="text-stone-400 text-sm mb-8">
                            Explora nuestro catálogo y descubre nuestras ofertas.
                        </p>
                        <Link to="/productos" className="btn-primary text-sm px-7 py-3">
                            Explorar catálogo
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                            </svg>
                        </Link>
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-8">
                            {/* Free shipping progress */}
                            <div className="mb-7 border border-[#e7ded1] rounded-xl p-5 bg-white">
                                <div className="flex justify-between text-xs font-bold mb-2.5">
                                    <span className="text-stone-600">
                                        {amountLeftForFreeShipping === 0
                                            ? "Envío Gratis Calificado"
                                            : `Agrega $${amountLeftForFreeShipping.toLocaleString("es-CO")} más para Envío Gratis`}
                                    </span>
                                    <span className="text-clay">{Math.round(freeShippingProgress)}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: "#f3eadc" }}>
                                    <div
                                        className="h-full rounded-full transition-all duration-500 ease-out"
                                        style={{
                                            width: `${freeShippingProgress}%`,
                                            background: freeShippingProgress >= 100
                                                ? "linear-gradient(135deg, #10b981, #059669)"
                                                : "linear-gradient(135deg, #d97706, #c2410c)",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Items */}
                            {cart.map((item, i) => (
                                <div
                                    key={item.product.id}
                                    className="flex items-center justify-between gap-4 flex-wrap py-6 border-b border-[#eee6da] animate-fade-in-up"
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                    <div className="flex items-center gap-4 flex-1 min-w-[220px]">
                                        <div className="w-20 h-20 rounded-xl shrink-0 flex items-center justify-center p-2 border border-[#f0e6d8]"
                                            style={{ background: "#f7f1e8" }}>
                                            <img
                                                src={item.product.imagen}
                                                alt={item.product.nombre}
                                                className="w-full h-full object-contain max-h-14"
                                                onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/54"; }}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="m-0 font-display text-base font-bold text-ink truncate">
                                                {item.product.nombre}
                                            </h4>
                                            <p className="mt-0.5 text-xs text-stone-400">
                                                ${item.product.precio.toLocaleString("es-CO")} c/u
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2.5 shrink-0">
                                        <div className="flex items-center gap-1 border border-[#e7ded1] rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="w-9 h-9 flex items-center justify-center cursor-pointer font-bold text-sm bg-white text-stone-600 hover:bg-clay hover:text-white transition-colors border-none"
                                            >
                                                −
                                            </button>
                                            <span className="font-bold min-w-[24px] text-center text-ink text-sm">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="w-9 h-9 flex items-center justify-center cursor-pointer font-bold text-sm bg-white text-stone-600 hover:bg-clay hover:text-white transition-colors border-none"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <span className="ml-1 font-display text-lg font-black min-w-[90px] text-right text-ink">
                                            ${(item.product.precio * item.quantity).toLocaleString("es-CO")}
                                        </span>

                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="ml-1 w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer text-xs bg-transparent text-rose-500 hover:bg-rose-50 transition-colors border-none"
                                            title="Eliminar"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-between items-center mt-6">
                                <button
                                    onClick={clearCart}
                                    className="px-4 py-2 rounded-lg font-bold text-xs cursor-pointer bg-transparent text-rose-500 hover:bg-rose-50 transition-colors border-none"
                                >
                                    Vaciar carrito
                                </button>
                                <Link to="/productos" className="text-sm font-bold text-clay no-underline hover:text-ember transition-colors">
                                    ← Seguir comprando
                                </Link>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-4 lg:sticky lg:top-24 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                            <div className="border border-[#e7ded1] rounded-2xl p-6 bg-white">
                                <h3 className="font-display text-xl font-black text-ink mb-6">
                                    Resumen de pedido
                                </h3>

                                <div className="flex flex-col gap-3.5 text-sm">
                                    <div className="flex justify-between text-stone-500">
                                        <span>Subtotal ({totalItems} ítems)</span>
                                        <span className="font-bold text-ink">${totalPrice.toLocaleString("es-CO")}</span>
                                    </div>

                                    <div className="flex justify-between text-stone-500">
                                        <span>Envío estimado</span>
                                        <span className={`font-bold ${amountLeftForFreeShipping === 0 ? "text-emerald-600" : "text-ink"}`}>
                                            {amountLeftForFreeShipping === 0 ? "GRATIS" : "$12,000"}
                                        </span>
                                    </div>

                                    {discount > 0 && (
                                        <div className="flex justify-between text-emerald-600 font-bold">
                                            <span>Descuento (10%)</span>
                                            <span>-${finalDiscountAmount.toLocaleString("es-CO")}</span>
                                        </div>
                                    )}

                                    <div className="h-px bg-[#eee6da] my-1" />

                                    <div className="flex justify-between items-center">
                                        <span className="font-extrabold text-base text-ink">Total</span>
                                        <span className="font-display text-2xl font-black text-ink">
                                            ${(finalPrice + (amountLeftForFreeShipping === 0 ? 0 : 12000)).toLocaleString("es-CO")}
                                        </span>
                                    </div>
                                </div>

                                <form onSubmit={handleApplyCoupon} className="mt-6">
                                    <label className="label-caps block mb-2" style={{ color: "#78716c" }}>
                                        Código de descuento
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={coupon}
                                            onChange={(e) => setCoupon(e.target.value)}
                                            placeholder="Ej: NEX10"
                                            className="input-glass py-2 px-3 text-xs flex-1"
                                        />
                                        <button
                                            type="submit"
                                            className="px-4 py-2 rounded-lg font-bold text-xs cursor-pointer transition-all duration-200 border border-clay text-clay bg-transparent hover:bg-clay hover:text-white"
                                        >
                                            Aplicar
                                        </button>
                                    </div>
                                    {couponMsg && (
                                        <p className={`text-[11px] font-bold mt-1.5 ${couponMsg.isError ? "text-rose-600" : "text-emerald-600"}`}>
                                            {couponMsg.text}
                                        </p>
                                    )}
                                </form>

                                <button
                                    className="w-full mt-6 py-3.5 text-sm font-bold rounded-lg text-cream bg-ink hover:bg-stone-800 transition-colors border-none cursor-pointer"
                                >
                                    Proceder al pago
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Cart;