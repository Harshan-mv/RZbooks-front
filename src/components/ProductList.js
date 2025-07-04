import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products/all`)
      .then(res => {
        if (res.data.success) {
          setProducts(res.data.data); // ✅ Extract only the array
        } else {
          setProducts([]);
          console.error("API Error:", res.data.message);
        }
      })
      .catch(err => {
        console.log("Error fetching products");
        setProducts([]);
      });
  }, [API_BASE_URL]);
  

  const loadRazorpay = async (product) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/payment/create-order`, {
        amount: product.price
      });

      const { id: order_id, amount, currency } = res.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // ⛳ Use from .env
        amount,
        currency,
        name: "RazorPay Demo Store",
        description: product.name,
        order_id,
        handler: async function (response) {
          // ✅ Verify payment on backend
          try {
            const verifyRes = await axios.post(`${API_BASE_URL}/api/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyRes.data.success) {
              alert("🎉 Payment Verified Successfully!");
              console.log("Server verified signature.");
            } else {
              alert("❌ Payment Verification Failed.");
            }
          } catch (err) {
            console.error("Verification Error:", err);
            alert("❌ Verification request failed.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      alert("Failed to initiate payment.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>All Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {products.map(product => (
          <div key={product._id} style={{
            border: "1px solid #ccc",
            padding: "15px",
            width: "250px",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            {product.image && (
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            )}
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <p>{product.description}</p>
            <button onClick={() => loadRazorpay(product)}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
