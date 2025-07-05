import React, { useEffect, useState } from "react";
import axios from "axios";
import LoginNavbar from "./LoginNavbar";
import "./ProductList.css";
import AddressForm from './AddressForm';
console.log("ProductList loaded");

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addressForm, setAddressForm] = useState({ house: "", street: "", town: "", district: "", state: "", pincode: "" });
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressError, setAddressError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

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
  

  // Fetch addresses for logged-in user
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/api/user/addresses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAddresses(res.data.addresses);
    } catch (err) {
      setAddresses([]);
    }
  };

  // Modal open handler
  const handleBuyNow = (product) => {
    console.log("Buy Now clicked for:", product);
    setSelectedProduct(product);
    setShowModal(true);
    setQuantity(1);
    setSelectedAddressId("");
    setAddressError("");
    setQuantityError("");
    fetchAddresses();
  };

  // Add or edit address
  const handleAddressFormSubmit = async (e) => {
    e.preventDefault();
    setAddressError("");
    const token = localStorage.getItem("token");
    try {
      if (editingAddressId) {
        await axios.put(`${API_BASE_URL}/api/user/address/${editingAddressId}`, addressForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/user/address`, addressForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setAddressForm({ house: "", street: "", town: "", district: "", state: "", pincode: "" });
      setEditingAddressId(null);
      fetchAddresses();
    } catch (err) {
      setAddressError("Failed to save address. Max 3 addresses allowed.");
    }
  };

  // Edit address handler
  const handleEditAddress = (address) => {
    setAddressForm(address);
    setEditingAddressId(address._id);
  };

  // Delete address handler
  const handleDeleteAddress = async (addressId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}/api/user/address/${addressId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchAddresses();
    if (selectedAddressId === addressId) setSelectedAddressId("");
  };

  // Pay Now handler
  const handlePayNow = () => {
    setAddressError("");
    setQuantityError("");
    if (!selectedAddressId) {
      setAddressError("Please select a delivery address.");
      return;
    }
    if (!quantity || quantity < 1 || quantity > 4 || quantity > selectedProduct.quantity) {
      setQuantityError("Invalid quantity.");
      return;
    }
    // Show Razorpay
    loadRazorpay(selectedProduct, quantity, selectedAddressId);
    setShowModal(false);
  };

  // Update loadRazorpay to handle order confirmation
  const loadRazorpay = async (product, qty = 1, addressId = null) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/payment/create-order`, {
        amount: product.price * qty
      });

      const { id: order_id, amount, currency } = res.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "RazorPay Demo Store",
        description: product.name,
        order_id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(`${API_BASE_URL}/api/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              productId: product._id,
              quantity: qty,
              addressId: addressId
            }, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            if (verifyRes.data.success) {
              setOrderSuccess(true);
              setOrderDetails({
                product,
                quantity: qty,
                address: addresses.find(a => a._id === addressId),
                order: verifyRes.data.order
              });
              fetchProducts();
            } else {
              alert(verifyRes.data.message || "❌ Payment Verification Failed.");
              fetchProducts();
            }
          } catch (err) {
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
    }
  };

  // Add fetchProducts function to refresh product list
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products/all`);
      if (res.data.success) {
        setProducts(res.data.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [API_BASE_URL]);

  // Admin check
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Admin: Delete product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="product-list-container">
      <LoginNavbar />
      <div className="product-list-content">
        <h2 className="product-list-title">Farm Products Collection</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product._id} className="product-card" style={{ position: 'relative' }}>
              {product.image && (
                <img src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${product.image}`} alt={product.name} className="product-image" />
              )}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
                <p className="product-description">{product.description}</p>
                {product.quantity === 0 ? (
                  <p style={{ color: 'red', fontWeight: 600 }}>Out of Stock</p>
                ) : product.quantity < 10 ? (
                  <p style={{ color: 'red', fontWeight: 600 }}>Available {product.quantity} stocks</p>
                ) : null}
                <button
                  onClick={() => handleBuyNow(product)}
                  className="buy-button"
                  disabled={product.quantity === 0}
                >
                  Buy Now
                </button>
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      background: '#ff4d4f',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: 18,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                    }}
                    title="Delete Product"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for Buy Now */}
      {showModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delivery Address</h3>
            {addresses.length > 0 && (
              <div>
                {addresses.map(addr => (
                  <div key={addr._id} style={{ marginBottom: 8 }}>
                    <label>
                      <input
                        type="radio"
                        name="address"
                        value={addr._id}
                        checked={selectedAddressId === addr._id}
                        onChange={() => setSelectedAddressId(addr._id)}
                      />
                      {`${addr.house}, ${addr.street}, ${addr.town}, ${addr.district}, ${addr.state}, ${addr.pincode}`}
                    </label>
                    <button onClick={() => handleEditAddress(addr)} style={{ marginLeft: 8 }}>Edit</button>
                    <button onClick={() => handleDeleteAddress(addr._id)} style={{ marginLeft: 4 }}>Delete</button>
                  </div>
                ))}
              </div>
            )}
            {(addresses.length < 3 || addresses.length === 0) && localStorage.getItem("token") ? (
              <AddressForm
                address={addressForm}
                onChange={e => setAddressForm({ ...addressForm, [e.target.name]: e.target.value })}
                onSubmit={handleAddressFormSubmit}
                editing={!!editingAddressId}
                error={addressError}
              />
            ) : null}
            {!localStorage.getItem("token") && (
              <p style={{ color: 'red', marginTop: 16 }}>Please log in to add a delivery address.</p>
            )}
            <div style={{ marginTop: 16 }}>
              <label>Quantity: </label>
              <input
                type="number"
                min={1}
                max={Math.min(4, selectedProduct.quantity)}
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                style={{ width: 60 }}
              />
              {quantityError && <p style={{ color: 'red' }}>{quantityError}</p>}
            </div>
            <div style={{ marginTop: 16 }}>
              <button onClick={handlePayNow} className="buy-button">Pay Now</button>
              <button onClick={() => setShowModal(false)} style={{ marginLeft: 8 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Order Success Modal */}
      {orderSuccess && orderDetails && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Order Placed Successfully!</h3>
            <p><strong>Product:</strong> {orderDetails.product.name}</p>
            <p><strong>Quantity:</strong> {orderDetails.quantity}</p>
            <p><strong>Delivery Address:</strong><br/>
              {orderDetails.address.house}, {orderDetails.address.street},<br/>
              {orderDetails.address.town}, {orderDetails.address.district},<br/>
              {orderDetails.address.state} - {orderDetails.address.pincode}
            </p>
            <button onClick={() => { setOrderSuccess(false); setOrderDetails(null); }} className="buy-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
