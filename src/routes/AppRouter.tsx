import {
    Routes,
    Route,
} from "react-router";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";
import AddProduct from "../pages/AddProduct";
import { ProtectedRoute } from "../components/ProtectedRoute";

function AppRouter() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />

            <Route
                path="/productos"
                element={<Products />}
            />

            <Route
                path="/carrito"
                element={<Cart />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/registro"
                element={<Register />}
            />

            <Route
                path="/productos/:id"
                element={<ProductDetail />}
            />

            <Route
                path="/admin/producto"
                element={
                    <ProtectedRoute requiredRole="admin">
                        <AddProduct />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}

export default AppRouter;