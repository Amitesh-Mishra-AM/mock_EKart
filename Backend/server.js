const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { products } = require("./products");
const { Cart } = require("./cart");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const cart = new Cart();

// Products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get cart
app.get("/api/cart", (req, res) => {
  const items = cart.getItems();
  res.json({
    items,
    total: cart.getTotal(items)
  });
});

// Add to cart
app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;
  cart.add(productId, qty);
  res.json({ ok: true });
});

// Remove from cart
app.delete("/api/cart/:id", (req, res) => {
  cart.remove(req.params.id);
  res.json({ ok: true });
});

// Checkout
app.post("/api/checkout", (req, res) => {
  const { cartItems, name, email } = req.body;
  const total = cart.getTotal(cartItems);

  const receipt = {
    name,
    email,
    items: cartItems,
    total,
    timestamp: new Date().toISOString()
  };

  cart.clear();

  res.json(receipt);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
