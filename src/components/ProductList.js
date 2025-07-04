import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/all")
      .then(res => setProducts(res.data))
      .catch(err => console.log("Error fetching products"));
  }, []);

  const loadRazorpay = async (product) => {
    try {
      const res = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: product.price
      });

      const { id: order_id, amount, currency } = res.data;

      const options = {
        key: "rzp_test_d1JOhyRPpYIB5o", // replace with your Razorpay Key ID
        amount,
        currency,
        name: "RazorPay Demo Store",
        description: product.name,
        order_id,
        handler: function (response) {
          alert("Payment Successful!");
          console.log("Payment ID:", response.razorpay_payment_id);
          console.log("Order ID:", response.razorpay_order_id);
          console.log("Signature:", response.razorpay_signature);
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
