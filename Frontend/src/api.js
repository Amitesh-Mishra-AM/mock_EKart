const API = "http://localhost:5000/api";

export const getProducts = async () =>
  (await fetch(`${API}/products`)).json();

export const addToCart = async (productId, qty) =>
  fetch(`${API}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty })
  });

export const getCart = async () =>
  (await fetch(`${API}/cart`)).json();

export const removeItem = async (id) =>
  fetch(`${API}/cart/${id}`, { method: "DELETE" });

export const checkout = async (cartItems, name, email) =>
  (await fetch(`${API}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems, name, email })
  })).json();
