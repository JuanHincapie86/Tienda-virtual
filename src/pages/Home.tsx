import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import "./Home.css";

function Home() {
    const productos: Product[] = [
        {
            id: 1,
            nombre: "Camiseta",
            precio: 50000,
            imagen: "https://via.placeholder.com/300",
        },
        {
            id: 2,
            nombre: "Pantalón",
            precio: 80000,
            imagen: "https://via.placeholder.com/300",
        },
        {
            id: 3,
            nombre: "Zapatos",
            precio: 150000,
            imagen: "https://via.placeholder.com/300",
        },
        {
            id: 4,
            nombre: "Gorra",
            precio: 30000,
            imagen: "https://via.placeholder.com/300",
        },

        {
            id: 5,
            nombre: "Chaqueta",
            precio: 120000,
            imagen: "https://via.placeholder.com/300",
        },
    ];

    return (
        <main>
            <h2>Bienvenido a Mi Tienda</h2>

            <p>Encuentra los mejores productos.</p>

            <section className="products-section">
                <h2>Nuestros productos</h2>

                <div className="products-grid">
                    {productos.map((producto) => (
                        <ProductCard
                            key={producto.id}
                            product={producto}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;