import React, { useState } from "react";
import axios from "axios";
import LoginNavbar from "./LoginNavbar";
import './AddProduct.css';

function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", description: "", quantity: "" });
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  // ✅ Read API base URL from environment variable
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png")) {
      setImage(file);
    } else {
      setMsg("Only JPG, JPEG, or PNG images are allowed.");
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!image) {
      setMsg("Please upload a JPG, JPEG, or PNG image.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("quantity", form.quantity);
      formData.append("image", image);
      await axios.post(`${API_BASE_URL}/api/products/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMsg("Product added successfully");
      setForm({ name: "", price: "", description: "", quantity: "" });
      setImage(null);
    } catch (err) {
      setMsg("Failed to add product");
    }
  };

  return (
    <>
      <LoginNavbar />
      <div className="add-product-container">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required /><br />
          <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required type="number" min="0" step="0.01" /><br />
          <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required type="number" min="0" step="1" /><br />
          <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={handleImageChange} required /><br />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required /><br />
          <button type="submit">Add Product</button>
        </form>
        {msg && <p className="add-product-msg">{msg}</p>}
      </div>
    </>
  );
}

export default AddProduct;
