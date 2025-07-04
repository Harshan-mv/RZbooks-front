import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";

function App() {
  return (
    <BrowserRouter>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h1>Welcome to Ebooks Store</h1>
        <nav style={{ marginBottom: "30px" }}>
          <Link to="/register" style={{ marginRight: "20px" }}>Register</Link>
          <Link to="/login">Login</Link>
          {/* <Link to="/add-product">Add Product</Link> */}
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
