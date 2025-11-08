import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userEmail: { type: String, index: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  qty: Number
}, { timestamps: true });

cartItemSchema.index({ userEmail: 1, productId: 1 }, { unique: true });

export default mongoose.model("CartItem", cartItemSchema);
