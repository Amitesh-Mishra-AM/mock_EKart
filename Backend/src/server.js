import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import { connectDB } from "./db.js";
import products from "./routes/products.js";
import cart from "./routes/cart.js";
import checkout from "./routes/checkout.js";

config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/products", products);
app.use("/api/cart", cart);
app.use("/api/checkout", checkout);

const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(port, () => console.log(`API on http://localhost:${port}`));
});
