import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quantityItem: { type: Number },
  priceItem: { type: Number },
  total: { type: Number },
});

itemSchema.index({ user: 1, product: 1 }, { unique: true });

export const ItemModel = mongoose.model("Item", itemSchema);
