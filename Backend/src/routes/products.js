import { Router } from "express";
import Product from "../models/Product.js";
import { seedProducts } from "../data/seedProducts.js";

const router = Router();

// Seed once if empty
router.get("/seed", async (req, res) => {
  const count = await Product.countDocuments();
  if (count > 0) return res.json({ ok: true, seeded: false });
  const docs = await Product.insertMany(seedProducts);
  res.json({ ok: true, seeded: true, count: docs.length });
});

router.get("/", async (req, res) => {
  const q = req.query.q?.trim()?.toLowerCase();
  const min = parseInt(req.query.min || 0, 10);
  const max = parseInt(req.query.max || 1e9, 10);

  let filter = { price: { $gte: min, $lte: max } };
  if (q) filter.name = { $regex: q, $options: "i" };

  const products = await Product.find(filter).sort({ createdAt: 1 });
  res.json(products);
});

export default router;
