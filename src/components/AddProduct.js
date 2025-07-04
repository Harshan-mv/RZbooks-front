import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const [msg, setMsg] = useState("");

  // ✅ Read API base URL from environment variable
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/products/add`, form);
      setMsg("Product added successfully");
      setForm({ name: "", price: "", description: "", image: "" });
    } catch (err) {
      setMsg("Failed to add product");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} /><br /><br />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} /><br /><br />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} /><br /><br />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br /><br />
        <button type="submit">Add Product</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default AddProduct;
