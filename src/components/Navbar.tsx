import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="navbar-logo">🛍️ Mi Tienda</h1>

            <ul className="navbar-links">
                <li>Inicio</li>
                <li>Productos</li>
                <li>Nosotros</li>
                <li>Contacto</li>
            </ul>

            <button className="navbar-cart">
                🛒 Carrito
            </button>
        </nav>
    );
}

export default Navbar;