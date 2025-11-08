import React, { useEffect, useState } from "react";
import { getProducts, addToCart, getCart, removeItem, checkout } from "./api";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = async () => {
    setProducts(await getProducts());
  };

  const loadCart = async () => {
    setCart(await getCart());
  };

  const handleAdd = async (id) => {
    await addToCart(id, 1);
    loadCart();
  };

  const handleRemove = async (id) => {
    await removeItem(id);
    loadCart();
  };

  const handleCheckout = async (name, email) => {
    const r = await checkout(cart.items, name, email);
    setReceipt(r);
    setShowCheckout(false);
    loadCart();
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h2>Mock E-Com Cart</h2>

      <ProductList products={products} onAdd={handleAdd} />

      <Cart cart={cart} onRemove={handleRemove} onCheckout={() => setShowCheckout(true)} />

      {showCheckout && (
        <Checkout onSubmit={handleCheckout} onClose={() => setShowCheckout(false)} />
      )}

      {receipt && (
        <div style={{ background: "#eee", padding: 20, marginTop: 20 }}>
          <h3>Receipt</h3>
          <p>Name: {receipt.name}</p>
          <p>Email: {receipt.email}</p>
          <p>Total: ₹{receipt.total}</p>
          <p>Time: {receipt.timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default App;
