import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          <Route path="collection" element={<div className="p-20 text-center">Collection Page Coming Soon</div>} />
          <Route path="about" element={<div className="p-20 text-center">About Page Coming Soon</div>} />
          <Route path="contact" element={<div className="p-20 text-center">Contact Page Coming Soon</div>} />
        </Route>
      </Routes>
    </Router>
  );
}
