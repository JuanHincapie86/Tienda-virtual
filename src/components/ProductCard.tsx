import type { Product } from "../types/Product";
import "./ProductCard.css";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="product-card">
            <img
                className="product-image"
                src={product.imagen}
                alt={product.nombre}
            />

            <div className="product-info">
                <h3 className="product-name">
                    {product.nombre}
                </h3>

                <p className="product-price">
                    ${product.precio.toLocaleString("es-CO")}
                </p>

                <button className="product-button">
                    Agregar al carrito
                </button>
            </div>
        </article>
    );
}

export default ProductCard;