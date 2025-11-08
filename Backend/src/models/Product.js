import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  sku: { type: String, unique: true, index: true },
  name: String,
  price: Number,
  image: String,
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
