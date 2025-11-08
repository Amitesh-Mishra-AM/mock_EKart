import { Router } from "express";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

const router = Router();

router.post("/", async (req, res) => {
  const email = req.headers["x-user-email"]?.toLowerCase();
  const { name } = req.body || {};
  if (!email || !name) return res.status(400).json({ error: "Missing name/email" });

  const items = await CartItem.find({ userEmail: email }).populate("productId");
  if (items.length === 0) return res.status(400).json({ error: "Cart empty" });

  const lineItems = items.map(it => ({
    sku: it.productId.sku,
    name: it.productId.name,
    price: it.productId.price,
    qty: it.qty,
    lineTotal: it.productId.price * it.qty
  }));
  const total = lineItems.reduce((s, x) => s + x.lineTotal, 0);
  const timestamp = new Date().toISOString();

  // clear cart
  await CartItem.deleteMany({ userEmail: email });

  res.json({
    receipt: {
      name,
      email,
      total,
      items: lineItems,
      timestamp
    }
  });
});

export default router;
