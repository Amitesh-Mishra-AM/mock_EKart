import { Router } from "express";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

const router = Router();

// tiny helper
function getEmail(req) {
  return req.headers["x-user-email"]?.toLowerCase();
}

router.get("/", async (req, res) => {
  const email = getEmail(req);
  if (!email) return res.status(400).json({ error: "Missing x-user-email" });

  const items = await CartItem.find({ userEmail: email }).populate("productId");
  const shaped = items.map(it => ({
    productId: it.productId._id,
    name: it.productId.name,
    price: it.productId.price,
    image: it.productId.image,
    qty: it.qty
  }));
  const total = shaped.reduce((s, x) => s + x.price * x.qty, 0);
  res.json({ items: shaped, total });
});

router.post("/", async (req, res) => {
  const email = getEmail(req);
  if (!email) return res.status(400).json({ error: "Missing x-user-email" });

  const { productId, qty } = req.body || {};
  if (!productId || !Number.isInteger(qty) || qty <= 0) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const prod = await Product.findById(productId);
  if (!prod) return res.status(404).json({ error: "Product not found" });

  const upsert = await CartItem.findOneAndUpdate(
    { userEmail: email, productId },
    { $set: { qty } },
    { upsert: true, new: true }
  );
  res.json({ ok: true, id: upsert._id });
});

router.delete("/:productId", async (req, res) => {
  const email = getEmail(req);
  if (!email) return res.status(400).json({ error: "Missing x-user-email" });

  const { productId } = req.params;
  await CartItem.findOneAndDelete({ userEmail: email, productId });
  res.json({ ok: true });
});

export default router;
