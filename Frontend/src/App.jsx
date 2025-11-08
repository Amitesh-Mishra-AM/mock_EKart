import { useEffect, useState } from "react";
import api, { setUserEmail } from "./api";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import PriceFilter from "./components/PriceFilter";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");

  useEffect(() => {
    loadProducts({});
    if (email) api.defaults.headers.common["x-user-email"] = email;
    loadCart();
    // eslint-disable-next-line
  }, []);

  async function loadProducts(p) {
    const params = {};
    if (p.q) params.q = p.q;
    if (p.min) params.min = p.min;
    if (p.max) params.max = p.max;
    const { data } = await api.get("/api/products", { params });
    setProducts(data);
  }

  async function loadCart() {
    try {
      const { data } = await api.get("/api/cart");
      setCart(data);
    } catch {
      // ignore if email not set yet
    }
  }

  async function addToCart(prod) {
    if (!email) {
      toast("Set your email at checkout first. We’ll remember it.");
      setOpen(true);
      return;
    }
    await api.post("/api/cart", { productId: prod._id, qty: 1 });
    toast.success("Added to cart");
    await loadCart();
  }

  async function updateQty(productId, qty) {
    await api.post("/api/cart", { productId, qty });
    await loadCart();
  }

  async function removeItem(productId) {
    await api.delete(`/api/cart/${productId}`);
    toast("Removed");
    await loadCart();
  }

  async function handleCheckoutSubmit({ name, email }) {
    if (!name || !email) { toast.error("Name and email required"); return; }
    setUserEmail(email);
    setEmail(email);
    localStorage.setItem("userEmail", email);

    try {
      const { data } = await api.post("/api/checkout", { name });
      setOpen(false);
      setCart({ items: [], total: 0 });
      toast.success("Order placed");
      // quick & simple receipt
      alert(`Thanks ${data.receipt.name}!\nTotal: ₹${data.receipt.total}\nAt: ${data.receipt.timestamp}`);
    } catch (e) {
      toast.error(e?.response?.data?.error || "Checkout failed");
    }
  }

  return (
    <>
      <Toaster position="top-center"/>
      <Header cartCount={cart.items.length} onCheckout={() => setOpen(true)} />
      <div className="container">
        <PriceFilter onApply={loadProducts}/>
        <div className="grid" style={{marginTop: 12}}>
          {products.map(p => <ProductCard key={p._id} p={p} onAdd={addToCart} />)}
        </div>

        <div style={{marginTop: 24}}>
          <Cart
            items={cart.items}
            total={cart.total}
            onQty={updateQty}
            onRemove={removeItem}
          />
        </div>
      </div>

      <CheckoutModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCheckoutSubmit}
        emailDefault={email}
      />
    </>
  );
}
